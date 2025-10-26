import express from 'express';
import fetch from 'node-fetch';

const app = express();

app.get('/lookup', async (req, res) => {
  const { mobile, key } = req.query;

  if (key !== 'apimynk') return res.status(401).json({ error: 'Invalid API key' });
  if (!mobile) return res.status(400).json({ error: 'Mobile number missing' });

  try {
    const upstream = `https://demon.taitanx.workers.dev/?mobile=${encodeURIComponent(mobile)}`;
    const response = await fetch(upstream);
    const text = await response.text();

    let parsed;
    try { parsed = JSON.parse(text); } catch { parsed = text; }

    res.json({
      data: parsed.data,
      api: "by mynk",
      user: "@mynk_mynk_mynk"
    });

  } catch (err) {
    res.status(500).json({ error: 'Upstream error', message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
