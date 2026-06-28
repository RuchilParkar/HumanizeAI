import { AIProvider, HumanizeOptions, ProviderResponse } from "./types";
import { generatePrompt } from "./prompt";

export const geminiProvider: AIProvider = async (options: HumanizeOptions): Promise<ProviderResponse> => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("Missing API Key");

    const prompt = generatePrompt(options);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: options.intensity === "Strong" ? 0.9 : options.intensity === "Subtle" ? 0.3 : 0.6,
        }
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("Empty response");

    return {
      success: true,
      text: text.trim(),
      provider: "gemini"
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};
