export const TOOL_OPTIONS = [
  { value: "cursor", label: "Cursor" },
  { value: "github_copilot", label: "GitHub Copilot" },
  { value: "claude", label: "Claude" },
  { value: "chatgpt", label: "ChatGPT" },
  { value: "anthropic_api", label: "Anthropic API" },
  { value: "openai_api", label: "OpenAI API" },
  { value: "gemini", label: "Gemini" },
  { value: "windsurf", label: "Windsurf" }
]

export const PLAN_OPTIONS = {
  cursor: [
    { value: "hobby", label: "Hobby — Free" },
    { value: "pro", label: "Pro — $20/seat" },
    { value: "business", label: "Business — $40/seat" }
  ],
  github_copilot: [
    { value: "individual", label: "Individual — $10/seat" },
    { value: "business", label: "Business — $19/seat" },
    { value: "enterprise", label: "Enterprise — $39/seat" }
  ],
  claude: [
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro — $20/seat" },
    { value: "max_5x", label: "Max 5x — $100/seat" },
    { value: "max_20x", label: "Max 20x — $200/seat" },
    { value: "team", label: "Team — $30/seat" },
    { value: "enterprise", label: "Enterprise — $60/seat" }
  ],
  chatgpt: [
    { value: "free", label: "Free" },
    { value: "plus", label: "Plus — $20/seat" },
    { value: "team", label: "Team — $30/seat" },
    { value: "enterprise", label: "Enterprise — $60/seat" }
  ],
  anthropic_api: [{ value: "api_direct", label: "API Direct — pay per token" }],
  openai_api: [{ value: "api_direct", label: "API Direct — pay per token" }],
  gemini: [
    { value: "free", label: "Free" },
    { value: "advanced", label: "Advanced — $20/seat" },
    { value: "business", label: "Business — $24/seat" }
  ],
  windsurf: [
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro — $15/seat" },
    { value: "teams", label: "Teams — $30/seat" }
  ]
}