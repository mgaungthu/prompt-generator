export interface PromptRequest {
  text?: string;
  imageUrl?: string;
  language: string;
  negativePrompts: string;
}

export interface PromptResponse {
  prompt: string;
  error?: string;
}

export interface DeepSeekMessage {
  role: "system" | "user" | "assistant";
  content: string;
}