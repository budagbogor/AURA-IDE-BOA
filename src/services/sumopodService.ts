/**
 * SumoPod AI Service
 * Compatible with OpenAI API format
 * Updated based on latest 2026 Dashboard Research
 */

export const SUMOPOD_MODELS = [
  // Google Gemini Series
  { id: 'gemini/gemini-2.0-flash', name: 'Gemini 2.0 Flash' },
  { id: 'gemini/gemini-2.0-flash-lite', name: 'Gemini 2.0 Flash Lite' },
  { id: 'gemini/gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
  { id: 'gemini/gemini-2.5-pro', name: 'Gemini 2.5 Pro' },
  { id: 'gemini/gemini-3-flash-preview', name: 'Gemini 3 Flash (Preview)' },
  
  // Anthropic Claude Series
  { id: 'claude-haiku-4-5', name: 'Claude Haiku 4.5' },
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet' },
  
  // OpenAI Series (Sumopod Optimized)
  { id: 'gpt-4o', name: 'GPT-4o' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini' },
  { id: 'gpt-5', name: 'GPT-5 (Experimental)' },
  { id: 'gpt-5.1', name: 'GPT-5.1' },

  // DeepSeek Series
  { id: 'deepseek-r1', name: 'DeepSeek R1' },
  { id: 'deepseek-v3-2', name: 'DeepSeek V3.2' },

  // Other Modern Models
  { id: 'kimi-k2', name: 'Kimi K2' },
  { id: 'kimi-k2-thinking', name: 'Kimi K2 (Thinking)' },
  { id: 'glm-5', name: 'GLM 5' },
  { id: 'atoma_mixtral-8x7b', name: 'Mixtral 8x7b (Atoma)' },
];

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
