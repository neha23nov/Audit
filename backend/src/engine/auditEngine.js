import { TOOLS } from "./pricingData.js"

function getOfficialCost(toolId, planId, seats) {
  const tool = TOOLS[toolId]
  if (!tool) return 0
  const plan = tool.plans[planId]
  if (!plan) return 0
  return plan.pricePerSeat * seats
}

function checkPlanOverfit(toolId, planId, seats, currentSpend, useCase) {
  const tool = TOOLS[toolId]
  if (!tool) return null

  if (toolId === "claude" && planId === "team" && seats < 5) {
    const proCost = 20 * seats
    const savings = currentSpend - proCost
    if (savings > 0) {
      return {
        toolId,
        currentSpend,
        recommendedAction: `Switch to Claude Pro — ${seats} × $20/seat`,
        potentialSavings: savings,
        reason: `Claude Team has a 5-seat minimum at $30/seat. With only ${seats} seats you pay $${currentSpend}/mo. Pro at $20/seat gives identical features and saves $${savings}/mo.`,
        alternativePlan: "pro"
      }
    }
  }

  if (toolId === "chatgpt" && planId === "team" && seats < 3) {
    const plusCost = 20 * seats
    const savings = currentSpend - plusCost
    if (savings > 0) {
      return {
        toolId,
        currentSpend,
        recommendedAction: `Switch to ChatGPT Plus — ${seats} × $20/seat`,
        potentialSavings: savings,
        reason: `ChatGPT Team at $30/seat targets 5+ person teams. With ${seats} seats, Plus at $20/seat gives the same model access and saves $${savings}/mo.`,
        alternativePlan: "plus"
      }
    }
  }

  if (toolId === "github_copilot" && planId === "enterprise" && seats < 10) {
    const bizCost = 19 * seats
    const savings = currentSpend - bizCost
    if (savings > 0) {
      return {
        toolId,
        currentSpend,
        recommendedAction: `Downgrade to Copilot Business — ${seats} × $19/seat`,
        potentialSavings: savings,
        reason: `Copilot Enterprise at $39/seat adds custom fine-tuning useful only for 10+ engineers. Business at $19/seat covers completions, chat, and org policies and saves $${savings}/mo.`,
        alternativePlan: "business"
      }
    }
  }

  if (toolId === "cursor" && planId === "business" && seats < 5) {
    const proCost = 20 * seats
    const savings = currentSpend - proCost
    if (savings > 0) {
      return {
        toolId,
        currentSpend,
        recommendedAction: `Downgrade to Cursor Pro — ${seats} × $20/seat`,
        potentialSavings: savings,
        reason: `Cursor Business at $40/seat adds SSO and admin dashboards unused under 5 seats. Pro at $20/seat has identical completion limits and saves $${savings}/mo.`,
        alternativePlan: "pro"
      }
    }
  }

  const fits = tool.useCaseFit.includes(useCase) || useCase === "mixed"
  if (!fits) {
    const alt = findCheapestAlternative(useCase, toolId, seats)
    if (alt && alt.monthlyCost < currentSpend) {
      const savings = currentSpend - alt.monthlyCost
      return {
        toolId,
        currentSpend,
        recommendedAction: `Switch to ${TOOLS[alt.toolId].displayName} ${alt.planName}`,
        potentialSavings: savings,
        reason: `${tool.displayName} is optimised for ${tool.useCaseFit.join("/")} workloads. Your primary use case is ${useCase} — ${TOOLS[alt.toolId].displayName} is purpose-built for that at $${alt.monthlyCost}/mo vs your current $${currentSpend}/mo.`,
        alternativeTool: alt.toolId,
        alternativePlan: alt.planId
      }
    }
  }

  return null
}

function findCheapestAlternative(useCase, excludeToolId, seats) {
  let best = null
  for (const [toolId, tool] of Object.entries(TOOLS)) {
    if (toolId === excludeToolId) continue
    if (!tool.useCaseFit.includes(useCase)) continue
    for (const [planId, plan] of Object.entries(tool.plans)) {
      if (plan.pricePerSeat === 0) continue
      const cost = plan.pricePerSeat * seats
      if (!best || cost < best.monthlyCost) {
        best = { toolId, planId, planName: plan.name, monthlyCost: cost }
      }
    }
  }
  return best
}

function checkDuplicates(tools, useCase) {
  const results = []

  const chatTools = tools.filter((t) => {
    const def = TOOLS[t.toolId]
    return def && def.category === "chat" && t.monthlySpend > 0
  })

  if (chatTools.length >= 2) {
    const sorted = [...chatTools].sort((a, b) => b.monthlySpend - a.monthlySpend)
    const expensive = sorted[0]
    const cheaper = sorted[sorted.length - 1]
    const preferred = useCase === "data" ? "chatgpt" : "claude"
    if (expensive.toolId !== preferred) {
      results.push({
        toolId: expensive.toolId,
        currentSpend: expensive.monthlySpend,
        recommendedAction: `Drop ${TOOLS[expensive.toolId].displayName}, keep ${TOOLS[cheaper.toolId].displayName}`,
        potentialSavings: expensive.monthlySpend,
        reason: `You're paying for two overlapping chat AI subscriptions. For ${useCase} work, ${TOOLS[preferred]?.displayName || TOOLS[cheaper.toolId].displayName} is the stronger fit. Consolidating saves $${expensive.monthlySpend}/mo with no capability loss.`
      })
    }
  }

  const ideTools = tools.filter((t) => {
    const def = TOOLS[t.toolId]
    return def && def.category === "ide" && t.monthlySpend > 0
  })

  if (ideTools.length >= 2) {
    const sorted = [...ideTools].sort((a, b) => b.monthlySpend - a.monthlySpend)
    const expensive = sorted[0]
    results.push({
      toolId: expensive.toolId,
      currentSpend: expensive.monthlySpend,
      recommendedAction: `Drop ${TOOLS[expensive.toolId].displayName} — consolidate your IDE tools`,
      potentialSavings: expensive.monthlySpend,
      reason: `You're subscribed to ${ideTools.length} AI coding assistants simultaneously. Engineers use one primary tool in practice. Drop the more expensive one and save $${expensive.monthlySpend}/mo.`
    })
  }

  return results
}

export function runAudit(input) {
  const { tools, useCase } = input
  const recommendations = []
  const seen = new Set()

  for (const entry of tools) {
    if (entry.monthlySpend === 0) continue
    const rec = checkPlanOverfit(entry.toolId, entry.plan, entry.seats, entry.monthlySpend, useCase)
    if (rec) {
      recommendations.push(rec)
      seen.add(entry.toolId)
    }
  }

  const duplicates = checkDuplicates(tools, useCase)
  for (const rec of duplicates) {
    if (!seen.has(rec.toolId)) {
      recommendations.push(rec)
      seen.add(rec.toolId)
    }
  }

  for (const entry of tools) {
    if (entry.monthlySpend === 0 || seen.has(entry.toolId)) continue
    const expected = getOfficialCost(entry.toolId, entry.plan, entry.seats)
    const overpayment = entry.monthlySpend - expected
    if (overpayment > 5) {
      recommendations.push({
        toolId: entry.toolId,
        currentSpend: entry.monthlySpend,
        recommendedAction: "Review your billing — you may be on an outdated plan",
        potentialSavings: overpayment,
        reason: `Current pricing for ${TOOLS[entry.toolId]?.displayName} ${entry.plan} at ${entry.seats} seat(s) is $${expected}/mo. You reported $${entry.monthlySpend}/mo — a $${overpayment}/mo discrepancy worth investigating.`
      })
      seen.add(entry.toolId)
    }
  }

  const totalMonthlySavings = recommendations.reduce((sum, r) => sum + r.potentialSavings, 0)
  const totalAnnualSavings = totalMonthlySavings * 12

  return { recommendations, totalMonthlySavings, totalAnnualSavings }
}