import { useNavigate } from "react-router-dom"

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-32 text-center">
        <div className="inline-flex items-center gap-2 bg-slate-800 text-slate-300 text-sm px-4 py-1.5 rounded-full mb-8">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          Free · No signup required
        </div>

        <h1 className="text-5xl font-bold leading-tight mb-6 tracking-tight">
          Stop overpaying for
          <br />
          <span className="text-emerald-400">AI tools</span>
        </h1>

        <p className="text-slate-400 text-xl mb-10 leading-relaxed max-w-xl mx-auto">
          Get a free instant audit of your Cursor, Claude, ChatGPT, and Copilot spend.
          Most startups save $200–800/month in under 5 minutes.
        </p>

        <button
          onClick={() => navigate("/audit")}
          className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-lg px-10 py-4 rounded-xl transition-colors"
        >
          Audit my AI spend →
        </button>

        <p className="mt-4 text-slate-500 text-sm">Takes 2 minutes. Email optional.</p>

        <div className="mt-20 grid grid-cols-3 gap-6">
          {[
            { stat: "$340", label: "Average monthly savings" },
            { stat: "8 tools", label: "Covered in every audit" },
            { stat: "2 min", label: "Time to complete" }
          ].map((item) => (
            <div key={item.stat} className="bg-slate-900 rounded-2xl p-6">
              <div className="text-3xl font-bold text-emerald-400 mb-1">{item.stat}</div>
              <div className="text-slate-400 text-sm">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-slate-900 rounded-2xl p-6 text-left">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-4">Tools we analyse</p>
          <div className="flex flex-wrap gap-2">
            {["Cursor", "GitHub Copilot", "Claude", "ChatGPT", "Anthropic API", "OpenAI API", "Gemini", "Windsurf"].map(
              (t) => (
                <span key={t} className="bg-slate-800 text-slate-300 text-sm px-3 py-1 rounded-full">
                  {t}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}