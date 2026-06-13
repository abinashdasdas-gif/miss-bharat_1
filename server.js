const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
const CLAUDE_URL = 'https://api.anthropic.com/v1/messages';

app.post('/api/generate-story', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!CLAUDE_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const response = await fetch(CLAUDE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Claude API error:', data);
      return res.status(response.status).json({ error: data.error?.message || 'API error' });
    }

    const story = data.content[0].text;
    res.json({ story });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🎤 Story Creator server running on http://localhost:${PORT}`);
  console.log(`✓ Ready to connect to Claude API`);
});
