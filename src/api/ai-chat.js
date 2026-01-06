import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

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
    const { messages, language = 'english' } = await req.json();

    // Add language instruction to the system message
    const languageInstruction = language === 'bangla' 
      ? 'উত্তরটি বাংলায় লিখুন। ' 
      : 'Respond in English. ';

    const lastMessage = messages[messages.length - 1];
    
    const result = await streamText({
      model: openai('gpt-3.5-turbo'),
      system: `You are an expert educational assistant for students. ${languageInstruction}Provide helpful, accurate, and detailed responses to student questions. Format responses with clear structure, examples, and explanations.`,
      messages: [
        ...messages.slice(0, -1),
        { role: 'user', content: lastMessage.content }
      ],
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.error('AI Chat Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process message',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
