import axios from "axios"

const BASE = import.meta.env.VITE_API_URL || "/api"

export async function submitAudit(data) {
  const res = await axios.post(`${BASE}/audit`, data)
  return res.data
}

export async function fetchAudit(shareId) {
  const res = await axios.get(`${BASE}/audit/${shareId}`)
  return res.data
}

export async function submitLead(payload) {
  await axios.post(`${BASE}/leads`, payload)
}