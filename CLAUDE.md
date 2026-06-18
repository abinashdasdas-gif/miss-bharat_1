# Miss Bharat World

👉 **Read [AI_HANDOFF.md](AI_HANDOFF.md) first** — it is the full handoff (architecture, every
decision, how to regenerate assets, known issues, and where we left off).

Quick facts:
- Main app is in **`react-app/`** (React 18 + Vite + framer-motion, **plain CSS, JS — no Tailwind/TS**).
- Dev: `cd react-app && npm run dev` → http://localhost:5180
- Voice = **Kokoro** (local, bundled `.wav` files) — not Ollama. Art = pre-generated, bundled `.jpg`s.
- **No secrets in the repo** — keys go only in `react-app/.env.local` (git-ignored).
- Open item: enable deploy (Pages → "GitHub Actions") and fix the content.json AJAX issue (#7 in handoff).
