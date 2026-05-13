import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import mongoose from "mongoose"
import rateLimit from "express-rate-limit"
import auditRoutes from "./routes/audit.js"
import leadRoutes from "./routes/lead.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: join(__dirname, "..", ".env") })

const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL || "*" }))
app.use(express.json())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { error: "Too many requests, please try again later." }
})

app.use("/api", limiter)
app.use("/api/audit", auditRoutes)
app.use("/api/leads", leadRoutes)

app.get("/health", (_req, res) => {
  res.json({ status: "ok" })
})

const PORT = process.env.PORT || 4000

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err)
    process.exit(1)
  })