import { useNavigate } from "react-router-dom"
import { useAuditStore } from "../store/auditStore"
import RecommendationCard from "../components/RecommendationCard"
import LeadCaptureForm from "../components/LeadCaptureForm"

export default function ResultsPage() {
  const navigate = useNavigate()
  const result = useAuditStore((s) => s.result)

  if (!result) {
    navigate("/audit")
    return null
  }

  const { shareId, recommendations, totalMonthlySavings, totalAnnualSavings, aiSummary } = result
  const shareUrl = `${window.location.origin}/audit/${shareId}`

  function handleCopy() {
    navigator.clipboard.writeText(shareUrl)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <a href="/" className="text-slate-400 text-sm hover:text-white mb-8 inline-block">
          ← New audit
        </a>

        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 mb-8 text-center">
          {totalMonthlySavings === 0 ? (
            <>
              <div className="text-4xl mb-3">✓</div>
              <h1 className="text-2xl font-bold mb-2">You're spending well</h1>
              <p className="text-slate-400">No savings opportunities found for your current stack.</p>
            </>
          ) : (
            <>
              <p className="text-slate-400 text-sm uppercase tracking-widest mb-2">Potential savings</p>
              <div className="text-6xl font-bold text-emerald-400 mb-1">${totalMonthlySavings}/mo</div>
              <div className="text-slate-300 text-xl">${totalAnnualSavings}/yr</div>
            </>
          )}
        </div>

        {aiSummary && (
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-8">
            <p className="text-slate-300 leading-relaxed">{aiSummary}</p>
          </div>
        )}

        {totalMonthlySavings >= 500 && (
          <div className="bg-emerald-900/40 border border-emerald-700 rounded-2xl p-6 mb-8">
            <h3 className="text-emerald-300 font-semibold mb-2">You qualify for a Credex consultation</h3>
            <p className="text-slate-300 text-sm mb-4">
              At $500+/month in savings, Credex can likely get you the same tools at 20–40% less through discounted credits. No lock-in.
            </p>
            
            <a  href="https://credex.rocks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors"
            >
              Book a free Credex consultation →
            </a>
          </div>

        )}


        {recommendations.length > 0 && (
          <div className="space-y-4 mb-8">
            <h2 className="text-lg font-semibold">Per-tool breakdown</h2>
            {recommendations.map((rec, i) => (
              <RecommendationCard key={i} rec={rec} />
            ))}
          </div>
        )}

        <div className="mb-8">
          <LeadCaptureForm shareId={shareId} totalMonthlySavings={totalMonthlySavings} />
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
          <p className="text-sm text-slate-400 mb-3">Share this audit</p>
          <div className="flex items-center gap-3">
            <input
              readOnly
              value={shareUrl}
              className="flex-1 bg-slate-800 border border-slate-600 text-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="bg-slate-700 hover:bg-slate-600 text-white text-sm px-4 py-2 rounded-lg transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}