import mongoose from "mongoose"

const leadSchema = new mongoose.Schema(
  {
    auditShareId: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    companyName: String,
    role: String,
    teamSize: Number,
    totalMonthlySavings: Number,
    highSavings: Boolean
  },
  { timestamps: true }
)

leadSchema.index({ email: 1, auditShareId: 1 }, { unique: true })

export const Lead = mongoose.model("Lead", leadSchema)