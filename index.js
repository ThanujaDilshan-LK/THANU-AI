// THANU AI — simple static server + AI chat endpoint

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ---- AI chat endpoint ----
// Needs an Anthropic API key set as an environment variable: ANTHROPIC_API_KEY
// Get one at https://console.anthropic.com (requires an adult / guardian's account + billing)
app.post("/api/chat", async (req, res) => {
  const { message, mode } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Missing 'message' in request body." });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "Server is missing ANTHROPIC_API_KEY. Add it as an environment variable before this will work."
    });
  }

  // Give the model real instructions per mode, not just a label
  const modeInstructions = {
    Chat: "You are THANU AI, a friendly general-purpose assistant. Answer clearly and concisely.",
    Code: "You are THANU AI in coding mode. Help write, explain, or debug code. Use code blocks and brief explanations.",
    Lyrics: "You are THANU AI in songwriting mode. Write original song lyrics based on the user's request — mood, genre, and theme. Never reproduce existing copyrighted lyrics.",
    News: "You are THANU AI in news mode. You do not have live internet access, so do not invent current events or fake headlines. If asked for today's news, say you can't fetch live news yet and suggest a reliable news source instead.",
    Write: "You are THANU AI in writing mode. Help draft essays, captions, emails, or other written content in the tone requested.",
    Sinhala: "You are THANU AI. Respond only in Sinhala (සිංහල), in a natural, friendly tone, regardless of what language the user writes in."
  };
  const systemPrompt = modeInstructions[mode] || modeInstructions.Chat;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Anthropic API error:", data);
      return res.status(response.status).json({ error: data.error?.message || "AI request failed." });
    }

    const reply = data.content?.map(block => block.text || "").join("\n") || "";
    res.json({ reply });
  } catch (err) {
    console.error("Request failed:", err);
    res.status(500).json({ error: "Something went wrong talking to the AI." });
  }
});

// fallback: always send index.html for unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`THANU AI running → http://localhost:${PORT}`);
});
