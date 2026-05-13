import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { submitLead } from "../api/auditApi"

export default function LeadCaptureForm({ shareId, totalMonthlySavings }) {
  const [email, setEmail] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [role, setRole] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const mutation = useMutation({
    mutationFn: submitLead,
    onSuccess: () => setSubmitted(true),
    onError: (err) => {
      if (err.response?.status === 409) {
        setSubmitted(true)
      } else {
        setError("Could not save. Please try again.")
      }
    }
  })

  function handleSubmit(e) {
    e.preventDefault()
    setError("")
    if (!email) {
      setError("Email is required.")
      return
    }
    mutation.mutate({ auditShareId: shareId, email, companyName, role, honeypot })
  }

  if (submitted) {
    return (
      <div className="bg-emerald-900/30 border border-emerald-700 rounded-2xl p-6 text-center">
        <div className="text-3xl mb-2">✓</div>
        <p className="text-emerald-300 font-medium">Report sent to {email}</p>
        <p className="text-slate-400 text-sm mt-1">Check your inbox for the full audit.</p>
      </div>
    )
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-1">Get your report by email</h3>
      <p className="text-slate-400 text-sm mb-6">We'll send the full audit. No spam, ever.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <input
          type="email"
          placeholder="Work email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 placeholder-slate-500"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 placeholder-slate-500"
          />
          <input
            type="text"
            placeholder="Your role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 placeholder-slate-500"
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {mutation.isPending ? "Saving..." : "Send me the report →"}
        </button>
      </form>
    </div>
  )
}