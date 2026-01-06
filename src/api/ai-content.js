export default async function handler(req, res) {
  const AI_API_KEY = process.env.AI_API_KEY;
  
  if (!AI_API_KEY) {
    return res.status(500).json({ error: 'AI API key not configured' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { topic, subject, type = 'study guide', language = 'english' } = req.body;

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

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert educational content creator. Generate high-quality study materials for students. If requested in Bangla, respond in Bangla.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`AI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    res.status(200).json({
      content: content,
      topic: topic,
      subject: subject,
      language: language,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate content', 
      details: error.message 
    });
  }
}
