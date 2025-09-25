
import { NextRequest, NextResponse } from 'next/server';
import { PromptRequest, PromptResponse } from '@/types';
import generateWithDeepSeek from '@/lib/deepseek';
import {supabaseServer} from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const { text, language, negativePrompts }: PromptRequest = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text input is required' }, { status: 400 });
    }

    const prompt = await generateWithDeepSeek([
      {
        role: "system",
        content: `You are a prompt engineering expert. Create detailed prompts for AI image generators.
        Respond in ${language}.
        ${negativePrompts ? `Avoid these elements: ${negativePrompts}` : ''}
        Include style, composition, lighting, and mood.`
      },
      {
        role: "user",
        content: `Create an AI image generation prompt based on: ${text}`
      }
    ]);
    // Insert into prompts table
    const { data: record, error: dbError } = await supabaseServer
      .from('prompts')
      .insert([
        {
          type: 'text',
          input_text: text,
          input_image_url: null,
          generated_prompt: prompt,
        }
      ])
      .select()
      .single();
    if (dbError) {
      console.error('Error inserting prompt into database:', dbError);
      return NextResponse.json(
        { error: 'Failed to save prompt to database.' },
        { status: 500 }
      );
    }
    return NextResponse.json({ prompt, record } as PromptResponse);
  } catch (error) {
    console.error('Error generating prompt from text:', error);
    return NextResponse.json(
      { error: 'Failed to generate prompt. Please try again.' }, 
      { status: 500 }
    );
  }
}