import OpenAI from "openai";

export interface ImageAnalysisResult {
  description: string;
  colors: string[];
  objects: string[];
  style: string;
  composition: string;
  lighting: string;
  mood: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeImage = async (imageUrl: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an AI image analysis assistant. Analyze the image and return JSON with fields: description, colors, objects, style, composition, lighting, mood.",
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this image and return structured JSON only." },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
        },
      ],
    });

    const content = response.choices?.[0]?.message?.content ?? "{}";
    return content;
  } catch (error) {
    console.error("OpenAI analysis failed:", error);
    return "an image that contains visual elements. Please describe the image in detail for better prompt generation.";
  }
};
