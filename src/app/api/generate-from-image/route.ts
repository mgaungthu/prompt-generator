import { NextRequest, NextResponse } from 'next/server';
import { PromptRequest, PromptResponse } from '@/types';
import { analyzeImage } from '@/lib/image-analysis';
import generateWithDeepSeek from '@/lib/deepseek';

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, language, negativePrompts }: PromptRequest = await request.json();

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    const imageDescription = await analyzeImage(imageUrl);

    console.log(imageDescription,'dest');
    
    const prompt = await generateWithDeepSeek([
      {
        role: "system",
        content: `You are a prompt engineering expert. Create detailed prompts for AI image generators.
        Respond in ${language}.
        ${negativePrompts ? `Avoid these: ${negativePrompts}` : ''}
        Include style, composition, lighting, and mood.`
      },
      {
        role: "user",
        content: `Create an AI image generation prompt based on: ${imageDescription}`
      }
    ]);

    return NextResponse.json({ prompt } as PromptResponse);
  } catch (error) {
    console.error('Error generating prompt from image:', error);
    return NextResponse.json(
      { error: 'Failed to generate prompt. Please try again.' }, 
      { status: 500 }
    );
  }
}