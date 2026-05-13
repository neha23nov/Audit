export const TOOLS = {
  cursor: {
    id: "cursor",
    displayName: "Cursor",
    category: "ide",
    useCaseFit: ["coding"],
    plans: {
      hobby: { name: "Hobby", pricePerSeat: 0 },
      pro: { name: "Pro", pricePerSeat: 20 },
      business: { name: "Business", pricePerSeat: 40 }
    }
  },
  github_copilot: {
    id: "github_copilot",
    displayName: "GitHub Copilot",
    category: "ide",
    useCaseFit: ["coding"],
    plans: {
      individual: { name: "Individual", pricePerSeat: 10 },
      business: { name: "Business", pricePerSeat: 19 },
      enterprise: { name: "Enterprise", pricePerSeat: 39 }
    }
  },
  claude: {
    id: "claude",
    displayName: "Claude",
    category: "chat",
    useCaseFit: ["writing", "research", "coding", "mixed"],
    plans: {
      free: { name: "Free", pricePerSeat: 0 },
      pro: { name: "Pro", pricePerSeat: 20 },
      max_5x: { name: "Max 5x", pricePerSeat: 100 },
      max_20x: { name: "Max 20x", pricePerSeat: 200 },
      team: { name: "Team", pricePerSeat: 30, minSeats: 5 },
      enterprise: { name: "Enterprise", pricePerSeat: 60 }
    }
  },
  chatgpt: {
    id: "chatgpt",
    displayName: "ChatGPT",
    category: "chat",
    useCaseFit: ["writing", "research", "coding", "data", "mixed"],
    plans: {
      free: { name: "Free", pricePerSeat: 0 },
      plus: { name: "Plus", pricePerSeat: 20 },
      team: { name: "Team", pricePerSeat: 30, minSeats: 2 },
      enterprise: { name: "Enterprise", pricePerSeat: 60 }
    }
  },
  anthropic_api: {
    id: "anthropic_api",
    displayName: "Anthropic API",
    category: "api",
    useCaseFit: ["coding", "data", "mixed"],
    plans: {
      api_direct: { name: "API Direct", pricePerSeat: 0 }
    }
  },
  openai_api: {
    id: "openai_api",
    displayName: "OpenAI API",
    category: "api",
    useCaseFit: ["coding", "data", "mixed"],
    plans: {
      api_direct: { name: "API Direct", pricePerSeat: 0 }
    }
  },
  gemini: {
    id: "gemini",
    displayName: "Gemini",
    category: "chat",
    useCaseFit: ["writing", "research", "coding", "mixed"],
    plans: {
      free: { name: "Free", pricePerSeat: 0 },
      advanced: { name: "Advanced", pricePerSeat: 20 },
      business: { name: "Business", pricePerSeat: 24 }
    }
  },
  windsurf: {
    id: "windsurf",
    displayName: "Windsurf",
    category: "ide",
    useCaseFit: ["coding"],
    plans: {
      free: { name: "Free", pricePerSeat: 0 },
      pro: { name: "Pro", pricePerSeat: 15 },
      teams: { name: "Teams", pricePerSeat: 30 }
    }
  }
}