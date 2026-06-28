import { AIProvider, HumanizeOptions, ProviderResponse } from "./types";
import { generatePrompt } from "./prompt";

export const openRouterProvider: AIProvider = async (options: HumanizeOptions): Promise<ProviderResponse> => {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) throw new Error("Missing API Key");

    const prompt = generatePrompt(options);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://humanizeai.com",
        "X-Title": "HumanizeAI"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct:free", // Fallback model
        messages: [{ role: "user", content: prompt }],
        temperature: options.intensity === "Strong" ? 0.9 : options.intensity === "Subtle" ? 0.3 : 0.6,
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) throw new Error("Empty response");

    return {
      success: true,
      text: text.trim(),
      provider: "openrouter"
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};
