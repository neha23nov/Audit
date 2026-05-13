import { TOOL_OPTIONS, PLAN_OPTIONS } from "../constants/tools"

export default function ToolRow({ tool, onChange, onRemove }) {
  const plans = PLAN_OPTIONS[tool.toolId] || []

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <select
          value={tool.toolId}
          onChange={(e) => {
            const newId = e.target.value
            const firstPlan = PLAN_OPTIONS[newId]?.[0]?.value || "pro"
            onChange({ toolId: newId, plan: firstPlan })
          }}
          className="bg-slate-800 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
        >
          {TOOL_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <button
          onClick={onRemove}
          className="text-slate-500 hover:text-red-400 text-sm transition-colors"
        >
          Remove
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Plan</label>
          <select
            value={tool.plan}
            onChange={(e) => onChange({ plan: e.target.value })}
            className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
          >
            {plans.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Seats</label>
          <input
            type="number"
            min={1}
            value={tool.seats}
            onChange={(e) => onChange({ seats: Number(e.target.value) })}
            className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Monthly spend ($)</label>
          <input
            type="number"
            min={0}
            value={tool.monthlySpend}
            onChange={(e) => onChange({ monthlySpend: Number(e.target.value) })}
            className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>
    </div>
  )
}