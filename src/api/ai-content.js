import { generateObject } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';

// Create OpenAI provider using Vercel AI Gateway
const openai = createOpenAI({
  apiKey: process.env.AI_API_KEY,
});

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { topic, subject, type = 'study guide', language = 'english' } = await req.json();

    // Add language instruction to the prompt
    const languageInstruction = language === 'bangla' 
      ? 'উত্তরটি বাংলায় লিখুন। ' 
      : 'Respond in English. ';

    const prompt = `${languageInstruction}Generate a comprehensive ${type} about ${topic} for ${subject} students. Include:
    1. Key concepts and definitions
    2. Important formulas or facts
    3. Example problems with solutions
    4. Study tips and common mistakes to avoid
    5. Practice questions for self-assessment
    Format as markdown with clear sections.`;

    const result = await generateObject({
      model: openai('gpt-3.5-turbo'),
      schema: z.object({
        title: z.string(),
        content: z.string(),
        keyPoints: z.array(z.string()),
        examples: z.array(z.string()),
        practiceQuestions: z.array(z.string())
      }),
      prompt: prompt
    });

    return new Response(JSON.stringify({
      content: result.object.content,
      topic: topic,
      subject: subject,
      language: language,
      generatedAt: new Date().toISOString()
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('AI Content Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate content',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
      }
