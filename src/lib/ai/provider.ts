import { HumanizeOptions, ProviderResponse } from "./types";
import { groqProvider } from "./groq";
import { geminiProvider } from "./gemini";
import { openRouterProvider } from "./openrouter";

/**
 * Main abstraction layer that handles provider fallback logic.
 * Default order: Groq -> Gemini -> OpenRouter
 */
export async function humanizeText(options: HumanizeOptions): Promise<ProviderResponse> {
  // 1. Try Groq (Primary)
  const groqResponse = await groqProvider(options);
  if (groqResponse.success) {
    return groqResponse;
  }

  // 2. Try Gemini (Fallback)
  const geminiResponse = await geminiProvider(options);
  if (geminiResponse.success) {
    return geminiResponse;
  }

  // 3. Try OpenRouter (Final Fallback)
  const openRouterResponse = await openRouterProvider(options);
  if (openRouterResponse.success) {
    return openRouterResponse;
  }

  // 4. All providers failed
  return {
    success: false,
    message: "Unable to generate content at the moment. Please try again later."
  };
}
