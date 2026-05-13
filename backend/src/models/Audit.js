import mongoose from "mongoose"

const toolEntrySchema = new mongoose.Schema({
  toolId: String,
  plan: String,
  seats: Number,
  monthlySpend: Number
})

const recommendationSchema = new mongoose.Schema({
  toolId: String,
  currentSpend: Number,
  recommendedAction: String,
  potentialSavings: Number,
  reason: String,
  alternativeTool: String,
  alternativePlan: String
})

const auditSchema = new mongoose.Schema(
  {
    shareId: { type: String, required: true, unique: true, index: true },
    input: {
      tools: [toolEntrySchema],
      teamSize: Number,
      useCase: String
    },
    recommendations: [recommendationSchema],
    totalMonthlySavings: Number,
    totalAnnualSavings: Number,
    aiSummary: String
  },
  { timestamps: true }
)

export const Audit = mongoose.model("Audit", auditSchema)