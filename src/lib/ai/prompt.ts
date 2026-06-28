import { HumanizeOptions } from "./types";

export function generatePrompt(options: HumanizeOptions): string {
  let prompt = `Rewrite the provided text so it sounds natural, fluent, and engaging while preserving its original meaning.

Requirements:
* Preserve all factual information.
* Do not hallucinate or invent details.
* Improve sentence flow.
* Reduce repetitive wording.
* Improve grammar and punctuation.
* Match the selected tone: ${options.tone}.
* Respect the rewrite intensity: ${options.intensity}.
* Keep formatting when requested: ${options.preserveFormatting ? "Yes" : "No"}.
* Return only the rewritten text, without any conversational preamble or explanations.`;

  if (options.grammarFix) prompt += "\n* Strictly fix any grammar issues.";
  if (options.improveReadability) prompt += "\n* Focus heavily on improving readability and structure.";
  if (options.preserveKeywords) prompt += "\n* Ensure key terms and SEO keywords are preserved.";
  if (options.expandOutput) prompt += "\n* Expand the text to add more context and detail naturally.";
  if (options.shortenOutput) prompt += "\n* Be concise and shorten the text while keeping the core message.";

  prompt += `\n\nText to rewrite:\n${options.text}`;

  return prompt;
}
