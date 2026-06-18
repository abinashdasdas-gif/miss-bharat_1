# 🧠 AI HANDOFF — Miss Bharat World

> Read this first. It is the single source of truth for what this project is, how it's
> built, every decision/gotcha, how to regenerate assets, and exactly where we left off.
> Written for a future AI (or human) resuming with zero prior context.

Repo: **github.com/abinashdasdas-gif/miss-bharat_1**
Last updated: 2026-06-16

---

## 1. What this is
**Miss Bharat World** — an interactive, kid-friendly educational platform for **Classes 1–5**
(ages ~5–10), CBSE-aligned. Games, painted+narrated stories, an autism-friendly mode, all with
a consistent friendly voice. Everything runs **free, offline, no API keys at runtime** (all AI
assets are pre-generated and bundled).

There are **TWO deliverables in this repo**:

| | Path | Stack | Status |
|---|---|---|---|
| **A. Original site** | `miss-bharat-classes-1-5.html` (+ other root `*.html`, `data/content.json`) | single-file vanilla HTML/CSS/JS | live, frozen |
| **B. React app (CURRENT, main work)** | `react-app/` | React 18 + Vite 5 + framer-motion 11, **plain CSS (no Tailwind), JS (no TS)** | active |

**Almost all recent work is in `react-app/`.** The HTML file is the earlier version, kept live.

Live URLs (GitHub Pages):
- HTML site: `https://abinashdasdas-gif.github.io/miss-bharat_1/miss-bharat-classes-1-5.html`
- React app (after deploy is enabled): `https://abinashdasdas-gif.github.io/miss-bharat_1/app/`

---

## 2. Run / build / deploy

```bash
cd react-app
npm install
npm run dev      # dev server on http://localhost:5180  (port fixed in vite.config.js)
npm run build    # outputs react-app/dist
```

**Deploy:** `.github/workflows/deploy.yml` builds the React app on every push to `main` and
publishes a combined site — HTML files at root, React app under `/app/`.
⚠️ **It only works once the repo owner sets GitHub → Settings → Pages → Source → "GitHub Actions".**
That switch is **still pending** (manual, owner-only). Until then the HTML site serves from branch.

Note: the dev server stops between sessions — just `npm run dev` again. To inspect the running app,
use the Claude Preview MCP (launch.json at `C:\Users\Abinash\.claude\.claude\launch.json` runs vite
on port 5181 via `npm --prefix`).

---

## 3. React app file map (`react-app/src/`)
- `main.jsx` — entry. **No React.StrictMode** (removed: its dev double-invoke made narration play twice).
- `App.jsx` — page state nav (`home|games|stories|quiet|dashboard`). `home` renders `Landing`
  **outside** the animated `<main>` so its fixed video stays pinned. Fetches `../data/content.json`
  via AJAX → falls back to `data.js` constants. **(See known issue #7.)**
- `components/Header.jsx` — glass sticky nav: 🏠 🎮 📖 🌿 👨‍👩‍👧 + 🎵 music toggle.
- `pages/Landing.jsx` — kid-themed hero over a **fixed CloudFront background video**; animated
  word-stagger title, floating subject badges (⭐🌍🔬➕🔤🎨), glowing CTAs.
- `pages/Games.jsx` — class chips; games grouped into **subject sections** (📘 Maths / 📕 English /
  🎲 Brain Games). `openGame()` routes to chess / tictactoe / balloon / jigsaw / voice. Chess view
  has a **Play / 🕺 Chess Dance** toggle (`chessMode`).
- `pages/Stories.jsx` — story cards (`TiltCard`) → `StoryReader`.
- `pages/QuietSpace.jsx` — **autism-friendly module** 🌿 (sensory toggle, First→Then board,
  numberless SVG timer, no-penalty fade-on-wrong, gentle 2s star, WCAG 2.2 AA). Tasks loaded via
  AJAX from `public/quiet.json` (built-in fallback).
- `pages/Dashboard.jsx` — parent dashboard (tilt stat cards + sliders).
- `components/Chess.jsx` — full engine; 3D wood glyph pieces; piece teaching (`PIECE_INFO`);
  funny **capture battle-cries** (`CAPTURE_LINES`); captured-piece **faint** animation;
  **DifficultyBar** (Easy=mostly random, Medium=greedy capture, Hard=2-ply material minimax).
- `components/ChessDance.jsx` — TPR character lessons for all 6 pieces (Babba, Robo-Rook, Sir Hoppy,
  Bishop Slippy, Queen Bossy-Boots, King Tippy-Toes); animated glyph mimics the real move + Kokoro voice.
- `components/TicTacToe.jsx` — DifficultyBar (Easy=random, Medium=win/block, Hard=**unbeatable minimax**).
- `components/BalloonPop.jsx` — tap floating balloons (GPU **transform**, not layout `top`);
  DifficultyBar tunes cap/spawn/speed.
- `components/Jigsaw.jsx` — swap-puzzle using a **bundled painted story image**; DifficultyBar = 3×3/4×4/5×5.
- `components/VoiceGame.jsx` — speech recognition (`en-IN`, interim results, fuzzy answer match via
  `voiceLogic.js`); listening→thinking mic states; Kokoro praise.
- `components/StoryReader.jsx` — shows the **bundled painted image** `public/stories/s{S}-p{P}.jpg`
  over an SVG scene fallback (`scenes.js`); plays **bundled narration** `public/audio/s{S}-p{P}.wav`
  with browser-voice fallback; page nav + moral on last page.
- `components/TiltCard.jsx` — cursor-reactive 3D-tilt glass card (anti-gravity UX).
- `components/FadeUp.jsx` — reusable framer-motion fade-up.
- `components/DifficultyBar.jsx` — shared Easy/Medium/Hard selector.
- `voice.js` — **browser** `speechSynthesis` fallback; `speak()` prefers Indian-female neural voice; `stopSpeaking()`.
- `say.js` — plays a **Kokoro clip** from `public/audio/phrases.json` if the phrase is in the bank,
  else falls back to `voice.js`. **Use `say()` for anything the app speaks.**
- `imageGen.js` — Hugging Face on-the-fly image gen. **Currently unused** (StoryReader uses bundled
  jpgs). Kept for reference; safe to delete.
- `scenes.js` — hand-built SVG story scenes (the instant/offline fallback art).
- `data.js` — `FALLBACK_CLASSES` (CBSE Maths/English per class + Fun games incl. balloon/jigsaw,
  each game has a `subject`), `FALLBACK_QUESTIONS`, `STORIES` (10 stories: title/emoji/seed/art/
  moral/pages[]), `SCENES`.
- `voiceLogic.js` — `generateQuestion`, `deriveExpected`, `matchesExpected` (fuzzy/Levenshtein), number words.
- `styles.css` — ALL styling. Kid theme: Fredoka/Baloo fonts, candy emoji badges, twinkling stars,
  glass tilt cards, animated background orbs, per-game styles.

---

## 4. The voice system (important)
- **Engine: Kokoro** (`hexgrad/Kokoro-82M`), voice **`af_heart`** (warm female). **NOT Ollama**
  (Ollama has no TTS). Generated **locally** with `kokoro-onnx` (Python), then **saved as files**.
- At runtime the app **only plays bundled audio** (no model, no API, no internet). Dynamic/unknown
  phrases fall back to the browser voice.
- Bundled audio:
  - `public/audio/s{0-9}-p{0-4}.wav` — 50 story narrations.
  - `public/audio/phrases/p*.wav` + `public/audio/phrases.json` — 71 fixed phrases (game moves,
    praise, Quiet Space Q&A, Chess Dance lines, capture battle-cries).
  - `public/audio/bg-music.mp3` — background music ("Adrift Among Infinite Stars"), 🎵 toggle.

---

## 5. The painted story art
- **50 images** `public/stories/s{0-9}-p{0-4}.jpg` — Disney-painted illustrations, one per story page.
- Generated once with **Hugging Face FLUX.1-schnell** (`scripts/gen-art.mjs`). 
- ⚠️ **All free image services are exhausted/paid now** (Pollinations→paid, Gemini free tier=0,
  HF monthly credits get used up). So art is **pre-generated and committed** — never generated at runtime.

---

## 6. Regenerating assets (only if you change story text / add stories / phrases)
All scripts live in `react-app/scripts/`. Put any needed key in `react-app/.env.local` (**git-ignored**).

```bash
# Story narration (Kokoro, local, free) — needs kokoro-onnx model files (see below)
node scripts/dump-stories.mjs        # writes scripts/stories.json from data.js STORIES
python scripts/kokoro_gen.py         # -> public/audio/s*-p*.wav  (skips existing)

# Fixed phrase clips (games/quiet/dance/capture) — edit PHRASES list, then:
python scripts/kokoro_phrases.py     # -> public/audio/phrases/*.wav + phrases.json

# Painted story images (needs a working Hugging Face token in .env.local: VITE_HF_TOKEN)
node scripts/gen-art.mjs             # -> public/stories/s*-p*.jpg  (skips existing)
```
**Kokoro local setup:** `pip install kokoro-onnx soundfile numpy`, then download
`kokoro-v1.0.onnx` + `voices-v1.0.bin` (from thewh1teagle/kokoro-onnx releases) into `scripts/`.
Those two model files are **git-ignored** (large, ~340 MB).

---

## 7. KNOWN ISSUES / TODO (read before deploying!)
1. **AJAX content mismatch on deploy.** `App.jsx` fetches `../data/content.json`. In dev that 404s
   and the app uses the good `FALLBACK_CLASSES` (CBSE + subjects + balloon/jigsaw). But on the
   deployed `/app/`, `../data/content.json` resolves to the **OLD HTML-site content** (no `subject`
   field, no new games) and would **override** the React content. **Fix before relying on deploy:**
   either remove that fetch (use FALLBACK only), or copy the React content into
   `react-app/public/content.json` and fetch that instead.
2. **Enable the deploy:** owner must set Pages Source → "GitHub Actions".
3. **Perf:** landing video (~15 MB) and `bg-music.mp3` (~15 MB) are heavy; consider compressing.

---

## 8. Key decisions & gotchas
- **No secrets in the repo** (it's public). Keys live only in `react-app/.env.local` (git-ignored).
  `.mcp.json` (21st.dev Magic key) is also git-ignored. Saved memory: never expose credentials.
- **Plain CSS + JS** to match the project (the user pasted a TS/Tailwind/framer-12 spec once — it
  was adapted to JS/CSS/framer-11, which is what's installed).
- **Difficulty** (Easy/Medium/Hard via `DifficultyBar`) is on Chess, Tic-Tac-Toe, Balloon Pop, Jigsaw.
  Voice games scale by **class** instead.
- The `.gitignore` is an **allow-list** (`*` ignores everything, then `!file` un-ignores). To commit
  a NEW root file you must add `!yourfile` to `.gitignore`.
- Dev server uses **port 5180** (`vite.config.js` strictPort).

---

## 9. Build history (the journey, so intent is clear)
Started as a voice assistant → grew into the HTML site → then rebuilt as the React app. Major
milestones, roughly in order:
1. React + Vite + framer-motion scaffold; ported Home/Games/Stories.
2. Ported games: Chess (3D pieces, narration), Tic-Tac-Toe, voice games (en-IN, fuzzy match), story reader.
3. Music & sound effects; Parent Dashboard.
4. ProMax/anti-gravity visual polish (glass tilt cards, orbs); then **kid-themed** (Fredoka/Baloo,
   candy badges, twinkling stars, floating-subject hero).
5. CBSE Maths/English content + Duolingo-style subject sections.
6. **Painted story art**: tried Pollinations (went paid) → Gemini (free=0) → settled on **bundling
   pre-generated HF FLUX images** (50 files). User's key insight: *save the images so you don't
   re-fetch.* Same pattern then applied to voice.
7. **Voice everywhere via local Kokoro** (user wanted one consistent voice; Ollama can't TTS, so
   used kokoro-onnx locally → bundled 50 story + 71 phrase clips).
8. 10 stories total (Crow, Lion&Mouse, Peacock, Tortoise&Hare, Ant&Grasshopper, Cap Seller, Honest
   Woodcutter, Fox&Grapes, Golden Egg, Monkey&Crocodile).
9. **The Quiet Space** — autism-friendly module.
10. Kid-themed **video landing page**.
11. **Chess comedy**: a TPR coaching script became **Chess Dance** mode (character lessons) + funny
    **capture battle-cries** + captured-piece **faint** animation.
12. Real **background music** track replaced the synth loop.
13. Two new games: **Balloon Pop** + **Jigsaw Puzzle** (uses painted art).
14. **Difficulty levels** added across Chess / Tic-Tac-Toe / Balloon Pop / Jigsaw.

---

## 10. Where we left off / suggested next steps
- ✅ All features above are built, verified in-browser, committed & pushed to `main`.
- ⏳ **Deploy** is the main open item (Pages Source switch + fix issue #7).
- Ideas/backlog: lighten the landing video; "Ultimate Chaos Board" finale for Chess Dance;
  per-game difficulty for voice games; more stories (run the gen scripts after adding text);
  volume slider in the dashboard; auto-start music on first interaction.
