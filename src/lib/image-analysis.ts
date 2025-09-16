import fs from "fs/promises";


export interface ImageAnalysisResult {
  description: string;
  colors: string[];
  objects: string[];
  style: string;
  composition: string;
  lighting: string;
  mood: string;
}

export const analyzeImage = async (imageUrl: string): Promise<string> => {
  try {
    let imageInput: string;


    console.log(convertImageToBase64(imageUrl))

    // 3. Call DeepSeek API
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are an AI image analysis assistant. Analyze the image and return JSON with fields: description, colors, objects, style, composition, lighting, mood.",
          },
          {
            role: "user",
            content: `Analyze this image and return structured JSON only.\n\nImage: ${imageInput}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "{}";

    return content;
  } catch (error) {
    console.error("DeepSeek analysis failed:", error);
    return "an image that contains visual elements. Please describe the image in detail for better prompt generation.";
  }
};


const convertImageToBase64 = async (imageUrl: string): Promise<string> => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
};