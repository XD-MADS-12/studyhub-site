// This runs on Vercel's server, keeping your API key secure
export default async function handler(req, res) {
  const AI_API_KEY = process.env.AI_API_KEY;
  
  if (!AI_API_KEY) {
    return res.status(500).json({ 
      error: 'AI API key not configured', 
      details: 'Please set the AI_API_KEY environment variable in Vercel dashboard'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history = [], language = 'english' } = req.body;

    // Add language instruction to the prompt
    const languageInstruction = language === 'bangla' 
      ? 'উত্তরটি বাংলায় লিখুন। ' 
      : 'Respond in English. ';

    // Prepare messages for the API
    const messages = [
      {
        role: 'system',
        content: `You are an expert educational assistant for students. ${languageInstruction}Provide helpful, accurate, and detailed responses to student questions. Format responses with clear structure, examples, and explanations.`
      },
      ...history.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    res.status(200).json({
      response: aiResponse,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ 
      error: 'Failed to process message', 
      details: error.message,
      fallback: getFallbackResponse(message, language)
    });
  }
}

function getFallbackResponse(message, language) {
  if (language === 'bangla') {
    return "দুর্ভাগ্যক্রমে আমি এখন সঠিকভাবে উত্তর দিতে পারছি না। আপনি কি অন্য একটি প্রশ্ন করতে চান? আমি আপনাকে সাহায্য করতে প্রস্তুত আছি!";
  } else {
    return "I'm sorry I couldn't answer your question right now. Could you please ask another question? I'm here to help you!";
  }
}
