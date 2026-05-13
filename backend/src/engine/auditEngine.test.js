import { runAudit } from "./auditEngine.js"

describe("runAudit", () => {
  test("flags Claude Team with fewer than 5 seats", () => {
    const result = runAudit({
      tools: [{ toolId: "claude", plan: "team", seats: 2, monthlySpend: 60 }],
      teamSize: 2,
      useCase: "writing"
    })
    expect(result.totalMonthlySavings).toBeGreaterThan(0)
    expect(result.recommendations[0].reason).toContain("5-seat minimum")
  })

  test("flags two chat tools as redundant", () => {
    const result = runAudit({
      tools: [
        { toolId: "claude", plan: "pro", seats: 1, monthlySpend: 20 },
        { toolId: "chatgpt", plan: "plus", seats: 1, monthlySpend: 20 }
      ],
      teamSize: 1,
      useCase: "writing"
    })
    expect(result.recommendations.length).toBeGreaterThan(0)
  })

  test("returns zero savings for an already optimal stack", () => {
    const result = runAudit({
      tools: [{ toolId: "cursor", plan: "pro", seats: 1, monthlySpend: 20 }],
      teamSize: 1,
      useCase: "coding"
    })
    expect(result.totalMonthlySavings).toBe(0)
  })

  test("flags Copilot Enterprise under 10 seats", () => {
    const result = runAudit({
      tools: [{ toolId: "github_copilot", plan: "enterprise", seats: 3, monthlySpend: 117 }],
      teamSize: 3,
      useCase: "coding"
    })
    expect(result.totalMonthlySavings).toBeGreaterThan(0)
    expect(result.recommendations[0].alternativePlan).toBe("business")
  })

  test("annual savings equals 12x monthly", () => {
    const result = runAudit({
      tools: [{ toolId: "claude", plan: "team", seats: 2, monthlySpend: 60 }],
      teamSize: 2,
      useCase: "writing"
    })
    expect(result.totalAnnualSavings).toBe(result.totalMonthlySavings * 12)
  })

  test("flags billing discrepancy when spend exceeds official price", () => {
    const result = runAudit({
      tools: [{ toolId: "cursor", plan: "pro", seats: 2, monthlySpend: 100 }],
      teamSize: 2,
      useCase: "coding"
    })
    expect(result.recommendations.length).toBeGreaterThan(0)
    expect(result.recommendations[0].recommendedAction).toContain("billing")
  })
})