import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetchAudit } from "../api/auditApi"
import RecommendationCard from "../components/RecommendationCard"
import { TOOL_OPTIONS } from "../constants/tools"

export default function SharePage() {
  const { shareId } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["audit", shareId],
    queryFn: () => fetchAudit(shareId),
    enabled: !!shareId
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-slate-400">Loading audit...</p>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center text-center">
        <div>
          <p className="text-slate-300 text-lg mb-4">Audit not found.</p>
          <a href="/" className="text-emerald-400 underline">
            Run your own audit →
          </a>
        </div>
      </div>
    )
  }

  const { recommendations, totalMonthlySavings, totalAnnualSavings, aiSummary, input } = data

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-8 text-center">
          <p className="text-slate-400 text-sm uppercase tracking-widest mb-2">Shared audit</p>
          <div className="text-5xl font-bold text-emerald-400 mb-1">${totalMonthlySavings}/mo</div>
          <div className="text-slate-300 text-lg">${totalAnnualSavings}/yr potential savings</div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-8 text-sm text-slate-400 flex flex-wrap gap-4">
          <span>Team: {input.teamSize}</span>
          <span className="capitalize">Use case: {input.useCase}</span>
          <span>
            Tools:{" "}
            {input.tools
              .map((t) => TOOL_OPTIONS.find((o) => o.value === t.toolId)?.label || t.toolId)
              .join(", ")}
          </span>
        </div>

        {aiSummary && (
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-8">
            <p className="text-slate-300 leading-relaxed">{aiSummary}</p>
          </div>
        )}

        <div className="space-y-4 mb-10">
          {recommendations.map((rec, i) => (
            <RecommendationCard key={i} rec={rec} />
          ))}
        </div>

        <div className="text-center">
          
         <a   href="/"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
            >
            Audit your own AI spend →
          </a>
        </div>
      </div>
    </div>
  )
}