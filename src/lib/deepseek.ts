import { DeepSeekMessage } from "@/types";

const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/chat/completions';

export const generateWithDeepSeek = async (messages: DeepSeekMessage[], max_tokens: number = 500) => {
  try {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    
    if (!apiKey) {
      throw new Error('DeepSeek API key is not configured');
    }

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
        max_tokens,
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Failed to generate prompt';
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    throw new Error('Failed to generate prompt. Please try again.');
  }
};

export default generateWithDeepSeek;