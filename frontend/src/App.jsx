import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import AuditPage from "./pages/AuditPage"
import ResultsPage from "./pages/ResultsPage"
import SharePage from "./pages/SharePage"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/audit" element={<AuditPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/audit/:shareId" element={<SharePage />} />
    </Routes>
  )
}