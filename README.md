# THANU AI

A landing page + working AI chat, powered by Claude (Anthropic API).

## Setup

1. Get an API key from https://console.anthropic.com
   - **Note:** this requires being 18+, or having a parent/guardian set up the account and billing for you.
2. Set it as an environment variable before starting the server:

   ```bash
   export ANTHROPIC_API_KEY=your_key_here
   ```

   (On Windows: `set ANTHROPIC_API_KEY=your_key_here`)

3. Install dependencies and run:

   ```bash
   npm install
   npm start
   ```

4. Open http://localhost:3000, click **Try it free**, and chat with THANU AI on the `app.html` page.

## Deploy for free

- **Render / Railway / Fly.io**: connect this project (it needs a server, since `index.js` calls the Anthropic API). Add `ANTHROPIC_API_KEY` as an environment variable in their dashboard — never put it directly in your code or commit it to GitHub.
- **Netlify / Vercel (static only)**: won't work as-is, since those don't run a persistent Node server the same way — you'd need to convert `/api/chat` into a serverless function.

## Real login/signup (Firebase Authentication)

1. Go to https://console.firebase.google.com and create a free project (Spark plan — no credit card needed).
2. Project Settings → General → "Your apps" → Add a Web App → copy the config it gives you.
3. Paste those values into `public/firebase-config.js`.
4. In the Firebase console: Authentication → Sign-in method → enable **Email/Password** and **Google**.
5. Authentication → Settings → Authorized domains → add your deployed domain (e.g. `yourproject.netlify.app`) once you deploy.

Once that's done, signing up on `login.html` creates a real Firebase account, and `app.html` will redirect anyone who isn't logged in back to `login.html`.

## Cost & usage

Every message sent through the chat uses your Anthropic API credits (real money, billed to whoever owns the API key). Before sharing this site publicly or charging users for it:

- Set usage limits in the Anthropic console so costs don't run away.
- Decide how you'll pay for API usage if lots of people start using it.
- Be upfront with users about what the AI can and can't actually do — the capability cards on the homepage (video, song, voice, etc.) are currently just descriptions; only the chat itself is wired up to real AI.

