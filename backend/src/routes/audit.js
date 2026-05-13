import { Router } from "express"
import { z } from "zod"
import { nanoid } from "nanoid"
import { Audit } from "../models/Audit.js"
import { runAudit } from "../engine/auditEngine.js"
import { generateAISummary } from "../services/anthropicService.js"

const router = Router()

const toolEntrySchema = z.object({
  toolId: z.string(),
  plan: z.string(),
  seats: z.number().int().min(1).max(10000),
  monthlySpend: z.number().min(0)
})

const auditInputSchema = z.object({
  tools: z.array(toolEntrySchema).min(1).max(20),
  teamSize: z.number().int().min(1),
  useCase: z.enum(["coding", "writing", "data", "research", "mixed"])
})

router.post("/", async (req, res) => {
  const parse = auditInputSchema.safeParse(req.body)
  if (!parse.success) {
    return res.status(400).json({ error: "Invalid input", details: parse.error.flatten() })
  }

  const input = parse.data
  const { recommendations, totalMonthlySavings, totalAnnualSavings } = runAudit(input)
  const aiSummary = await generateAISummary(input, recommendations, totalMonthlySavings)
  const shareId = nanoid(10)

  const audit = await Audit.create({
    shareId,
    input,
    recommendations,
    totalMonthlySavings,
    totalAnnualSavings,
    aiSummary
  })

  return res.status(201).json({
    shareId: audit.shareId,
    recommendations,
    totalMonthlySavings,
    totalAnnualSavings,
    aiSummary
  })
})

router.get("/:shareId", async (req, res) => {
  const audit = await Audit.findOne({ shareId: req.params.shareId })
  if (!audit) return res.status(404).json({ error: "Audit not found" })

  return res.json({
    shareId: audit.shareId,
    recommendations: audit.recommendations,
    totalMonthlySavings: audit.totalMonthlySavings,
    totalAnnualSavings: audit.totalAnnualSavings,
    aiSummary: audit.aiSummary,
    input: {
      tools: audit.input.tools.map((t) => ({ toolId: t.toolId, plan: t.plan, seats: t.seats })),
      teamSize: audit.input.teamSize,
      useCase: audit.input.useCase
    },
    createdAt: audit.createdAt
  })
})

export default router