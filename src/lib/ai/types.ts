export interface HumanizeOptions {
  text: string;
  tone: string;
  intensity: string;
  grammarFix: boolean;
  improveReadability: boolean;
  preserveFormatting: boolean;
  preserveKeywords: boolean;
  expandOutput: boolean;
  shortenOutput: boolean;
}

export interface ProviderResponse {
  success: boolean;
  text?: string;
  provider?: "groq" | "gemini" | "openrouter";
  message?: string;
}

export type AIProvider = (options: HumanizeOptions) => Promise<ProviderResponse>;
