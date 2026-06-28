import { AIProvider, HumanizeOptions, ProviderResponse } from "./types";
import { generatePrompt } from "./prompt";

export const groqProvider: AIProvider = async (options: HumanizeOptions): Promise<ProviderResponse> => {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("Missing API Key");

    const prompt = generatePrompt(options);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama3-70b-8192", // Fast and capable model
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
      provider: "groq"
    };
  } catch (error) {
    // Return structured failure instead of raw error to keep backend secure
    return {
      success: false,
    };
  }
};
