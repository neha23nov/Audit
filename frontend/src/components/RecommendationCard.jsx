import { TOOL_OPTIONS } from "../constants/tools"

export default function RecommendationCard({ rec }) {
  const toolLabel = TOOL_OPTIONS.find((t) => t.value === rec.toolId)?.label || rec.toolId

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-slate-400 text-xs uppercase tracking-widest">{toolLabel}</span>
          <p className="text-white font-medium mt-1">{rec.recommendedAction}</p>
        </div>
        <div className="text-right shrink-0 ml-4">
          <p className="text-emerald-400 font-bold text-lg">${rec.potentialSavings}/mo</p>
          <p className="text-slate-400 text-xs">${rec.potentialSavings * 12}/yr</p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-sm text-slate-400 border-t border-slate-800 pt-3">
        <span className="line-through">${rec.currentSpend}/mo</span>
        <span>→</span>
        <span className="text-emerald-300">${rec.currentSpend - rec.potentialSavings}/mo</span>
      </div>

      <p className="text-slate-400 text-sm mt-3 leading-relaxed">{rec.reason}</p>
    </div>
  )
}