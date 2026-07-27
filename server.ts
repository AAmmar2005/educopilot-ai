import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '1mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Socratic AI Tutor Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, studentName, topic, aiTone } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'Gemini API key is missing. Please configure GEMINI_API_KEY in environment variables.',
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const studentContext = studentName ? ` The student's name is ${studentName}.` : '';
    const topicContext = topic ? ` The current subject/topic being discussed is "${topic}".` : '';

    let toneInstruction = 'Use a warm, natural, conversational Socratic tone.';
    if (aiTone === 'Friendly') {
      toneInstruction = 'Use an exceptionally friendly, gentle, and highly supportive tone. Praise effort generously and provide comforting explanations.';
    } else if (aiTone === 'Strict') {
      toneInstruction = 'Use a direct, rigorous, and academically strict tone. Focus on exact definitions, challenge assumptions directly, and hold high standards.';
    } else if (aiTone === 'Balanced') {
      toneInstruction = 'Use a balanced, clear, and encouraging educational tone.';
    }

    const systemInstruction = `You are a Socratic AI tutor. Speak like a real, caring human tutor — not a scripted bot.${studentContext}${topicContext}
- ${toneInstruction} Vary your sentence structure and wording so responses don't feel repetitive or templated.
- Give responses with real depth — don't just ask a one-line question and stop. Add helpful context, a short real-world example or analogy, or a brief explanation before inviting the student to think further.
- Still follow the Socratic method (guide the student to think rather than just handing over the full answer immediately), but be generous with helpful context along the way.
- Adapt response length to the topic's complexity — simple questions get a concise, warm reply; deeper topics deserve a fuller, more thorough explanation with examples.
- Use the student's name occasionally and naturally, not in every single message.
- Make the conversation feel like genuine one-on-one tutoring, not a quiz bot.`;

    const formattedContents = messages.map((m: any) => {
      const role = (m.role === 'student' || m.role === 'user') ? 'user' : 'model';
      const text = typeof m.text === 'string' ? m.text : String(m.text || '');
      return {
        role,
        parts: [{ text }],
      };
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: formattedContents,
      config: {
        systemInstruction,
      },
    });

    const replyText = response.text || 'I am here to help. What aspect of this topic would you like to explore next?';

    return res.json({ text: replyText });
  } catch (err: any) {
    console.error('Error in /api/chat:', err);
    return res.status(500).json({
      error: err.message || 'Failed to process AI tutor request. Please try again.',
    });
  }
});

// Topic Extractor Endpoint
app.post('/api/extract-topics', async (req, res) => {
  try {
    const { messages, currentTopic } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Gemini API key is missing.' });
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.json({ topic: currentTopic || 'General Study', topics: [currentTopic || 'General Study'] });
    }

    const conversationText = messages
      .slice(-6)
      .map((m: any) => `${m.role}: ${m.text}`)
      .join('\n');

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Based on this tutoring conversation, identify 1 primary overarching topic title (e.g. "Photosynthesis", "Quadratic Formulas", "Newton's First Law") and 2-3 specific subtopic tags.

Conversation:
${conversationText}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            primaryTopic: { type: Type.STRING },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ['primaryTopic', 'tags'],
        },
      },
    });

    const data = JSON.parse(response.text || '{}');
    return res.json({
      topic: data.primaryTopic || currentTopic || 'General Study',
      topics: Array.isArray(data.tags) ? data.tags : [data.primaryTopic || 'General Study'],
    });
  } catch (err) {
    console.error('Error in /api/extract-topics:', err);
    return res.json({ topic: req.body.currentTopic || 'General Study', topics: ['General Study'] });
  }
});

// AI Evaluation Endpoint
app.post('/api/evaluate', async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({ error: 'Question / Topic is required.' });
    }

    if (!answer || typeof answer !== 'string' || !answer.trim()) {
      return res.status(400).json({ error: 'Your answer is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'Gemini API key is missing. Please configure GEMINI_API_KEY in environment variables.',
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are an expert, encouraging AI tutor evaluating a student's answer to a academic question or study prompt.

Question / Topic:
"${question.trim()}"

Student's Answer:
"${answer.trim()}"

Tasks:
1. Provide constructive, clear, and actionable feedback (3 to 4 sentences). Point out what was correct and what could be improved or explained better.
2. Give a numerical score out of 100 based on accuracy, completeness, understanding, and clarity.
3. Identify 2 to 3 specific weak topics or foundational concepts the student should review to strengthen their knowledge.

Be objective, helpful, and concise.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.NUMBER,
              description: 'Numerical score from 0 to 100 based on answer quality',
            },
            feedback: {
              type: Type.STRING,
              description: 'Constructive evaluation feedback (3-4 sentences)',
            },
            weakTopics: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '2 to 3 specific weak topics or concepts to review',
            },
          },
          required: ['score', 'feedback', 'weakTopics'],
        },
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error('Received empty response from Gemini AI.');
    }

    const data = JSON.parse(responseText);

    // Normalize and sanitize score
    let score = Math.round(Number(data.score) || 0);
    score = Math.max(0, Math.min(100, score));

    const feedback = typeof data.feedback === 'string' ? data.feedback.trim() : '';
    const weakTopics = Array.isArray(data.weakTopics)
      ? data.weakTopics.map((t: unknown) => String(t).trim()).filter(Boolean)
      : [];

    return res.json({
      score,
      feedback,
      weakTopics,
    });
  } catch (err: any) {
    console.error('Error in /api/evaluate:', err);
    return res.status(500).json({
      error: err.message || 'Failed to evaluate answer. Please try again.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
