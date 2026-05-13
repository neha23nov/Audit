export async function sendAuditEmail({ to, companyName, shareId, totalMonthlySavings, highSavings }) {
  const appUrl = process.env.FRONTEND_URL || "http://localhost:5173"
  const auditUrl = `${appUrl}/audit/${shareId}`

  console.log("--- EMAIL (would send in production) ---")
  console.log(`To: ${to}`)
  console.log(`Subject: Your AI spend audit — $${totalMonthlySavings}/mo in savings found`)
  console.log(`Audit URL: ${auditUrl}`)
  console.log(`High savings: ${highSavings}`)
  console.log("----------------------------------------")
}