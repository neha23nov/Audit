import { create } from "zustand"
import { persist } from "zustand/middleware"

const defaultState = {
  tools: [],
  teamSize: 1,
  useCase: "mixed",
  result: null
}

export const useAuditStore = create(
  persist(
    (set) => ({
      ...defaultState,
      setTeamSize: (teamSize) => set({ teamSize }),
      setUseCase: (useCase) => set({ useCase }),
      setResult: (result) => set({ result }),
      addTool: (entry) => set((s) => ({ tools: [...s.tools, entry] })),
      removeTool: (index) => set((s) => ({ tools: s.tools.filter((_, i) => i !== index) })),
      updateTool: (index, updates) =>
        set((s) => ({ tools: s.tools.map((t, i) => (i === index ? { ...t, ...updates } : t)) })),
      reset: () => set(defaultState)
    }),
    { name: "audit-form-state" }
  )
)