/**
 * SumoPod AI Service
 * Compatible with OpenAI API format
 * Updated based on latest 2026 Dashboard Research
 */

import { SUMOPOD_MODELS } from '../utils/constants';

export async function generateSumopodContent(
  apiKey: string,
  model: string,
  messages: { role: 'user' | 'assistant' | 'system', content: string }[],
  options: { temperature?: number, max_tokens?: number } = {}
) {
  const response = await fetch('https://ai.sumopod.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens ?? 4096, // Increased for 2026 models
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `SumoPod API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
