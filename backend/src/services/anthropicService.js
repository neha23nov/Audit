import { TOOLS } from "../engine/pricingData.js"

export async function generateAISummary(input, recommendations, totalMonthlySavings) {
  const totalSpend = input.tools.reduce((s, t) => s + t.monthlySpend, 0)
  const toolCount = input.tools.filter((t) => t.monthlySpend > 0).length

  if (totalMonthlySavings === 0) {
    return `Your ${input.teamSize}-person team's AI stack looks well-optimised. You're running ${toolCount} tool${toolCount > 1 ? "s" : ""} suited to ${input.useCase} work and your plan selections match your team size. No savings opportunities were found — check back when your usage patterns change or vendors update pricing.`
  }

  const sorted = [...recommendations].sort((a, b) => b.potentialSavings - a.potentialSavings)
  const top = sorted[0]
  const second = sorted[1]
  const topName = TOOLS[top.toolId]?.displayName || top.toolId

  let summary = `Your ${input.teamSize}-person team spends $${totalSpend}/month across ${toolCount} AI tool${toolCount > 1 ? "s" : ""} for ${input.useCase} work. `
  summary += `This audit identified $${totalMonthlySavings}/month ($${totalMonthlySavings * 12}/year) in savings. `
  summary += `The biggest opportunity is ${topName} — ${top.reason.split(".")[0].toLowerCase()}. `

  if (second) {
    const secondName = TOOLS[second.toolId]?.displayName || second.toolId
    summary += `${secondName} is the next priority at $${second.potentialSavings}/month. `
  }

  summary += `Redirecting that $${totalMonthlySavings}/month could cover ${Math.floor(totalMonthlySavings / 50)} additional engineering hours or fund your next infrastructure upgrade.`

  return summary
}