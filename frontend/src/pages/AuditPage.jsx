import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { useAuditStore } from "../store/auditStore"
import { submitAudit } from "../api/auditApi"
import ToolRow from "../components/ToolRow"

const USE_CASES = ["coding", "writing", "data", "research", "mixed"]

export default function AuditPage() {
  const navigate = useNavigate()
  const { tools, teamSize, useCase, addTool, removeTool, updateTool, setTeamSize, setUseCase, setResult } =
    useAuditStore()
  const [error, setError] = useState("")

  const mutation = useMutation({
    mutationFn: submitAudit,
    onSuccess: (data) => {
      setResult(data)
      navigate("/results")
    },
    onError: () => setError("Something went wrong. Please try again.")
  })

  function handleAddTool() {
    addTool({ toolId: "cursor", plan: "pro", seats: 1, monthlySpend: 20 })
  }

  function handleSubmit() {
    setError("")
    if (tools.length === 0) {
      setError("Add at least one tool to audit.")
      return
    }
    mutation.mutate({ tools, teamSize, useCase })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <a href="/" className="text-slate-400 text-sm hover:text-white mb-8 inline-block">
          ← Back
        </a>

        <h1 className="text-3xl font-bold mb-2">Audit your AI spend</h1>
        <p className="text-slate-400 mb-10">Add every AI tool your team pays for.</p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-300 mb-2">Team size</label>
          <input
            type="number"
            min={1}
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 w-32 text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="mb-10">
          <label className="block text-sm font-medium text-slate-300 mb-2">Primary use case</label>
          <div className="flex flex-wrap gap-2">
            {USE_CASES.map((uc) => (
              <button
                key={uc}
                onClick={() => setUseCase(uc)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  useCase === uc
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {uc}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {tools.map((tool, i) => (
            <ToolRow
              key={i}
              tool={tool}
              onChange={(updates) => updateTool(i, updates)}
              onRemove={() => removeTool(i)}
            />
          ))}
        </div>

        <button
          onClick={handleAddTool}
          className="w-full border border-dashed border-slate-600 text-slate-400 hover:border-emerald-500 hover:text-emerald-400 rounded-xl py-3 text-sm font-medium transition-colors mb-8"
        >
          + Add a tool
        </button>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={mutation.isPending}
          className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold text-lg py-4 rounded-xl transition-colors"
        >
          {mutation.isPending ? "Analysing your stack..." : "Get free audit →"}
        </button>
      </div>
    </div>
  )
}