import { Router } from "express"
import { z } from "zod"
import { Lead } from "../models/Lead.js"
import { Audit } from "../models/Audit.js"
import { sendAuditEmail } from "../services/emailService.js"

const router = Router()

const leadSchema = z.object({
  auditShareId: z.string(),
  email: z.string().email(),
  companyName: z.string().max(200).optional(),
  role: z.string().max(100).optional(),
  teamSize: z.number().int().min(1).optional(),
  honeypot: z.string().max(0).optional()
})

router.post("/", async (req, res) => {
  const parse = leadSchema.safeParse(req.body)
  if (!parse.success) {
    return res.status(400).json({ error: "Invalid input", details: parse.error.flatten() })
  }

  const { auditShareId, email, companyName, role, teamSize, honeypot } = parse.data

  if (honeypot && honeypot.length > 0) {
    return res.status(200).json({ ok: true })
  }

  const audit = await Audit.findOne({ shareId: auditShareId })
  if (!audit) return res.status(404).json({ error: "Audit not found" })

  const highSavings = audit.totalMonthlySavings >= 500

  try {
    const lead = await Lead.create({
      auditShareId,
      email,
      companyName,
      role,
      teamSize,
      totalMonthlySavings: audit.totalMonthlySavings,
      highSavings
    })

    await sendAuditEmail({
      to: email,
      companyName,
      shareId: auditShareId,
      totalMonthlySavings: audit.totalMonthlySavings,
      highSavings
    })

    return res.status(201).json({ ok: true, leadId: lead._id })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "Email already registered for this audit" })
    }
    throw err
  }
})

export default router