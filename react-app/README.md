# Miss Bharat World — React Edition (with framer-motion)

A React + Vite rebuild of the Miss Bharat learning platform, using **framer-motion**
for animations (`<motion.div>`, `AnimatePresence`, staggered children, hover/tap springs).

The original single-file site (`../miss-bharat-classes-1-5.html`) stays live and untouched
while this React version is built out feature by feature.

## Run locally
```bash
cd react-app
npm install
npm run dev
```
Open the URL Vite prints (usually http://localhost:5173).

## Build for production
```bash
npm run build      # outputs to react-app/dist
npm run preview    # preview the production build
```

## Deploy to GitHub Pages
Vite apps need a build step (GitHub Pages can't run React source directly). Options:
1. **GitHub Actions** (recommended): add a workflow that runs `npm ci && npm run build`
   in `react-app/` and publishes `react-app/dist` to the `gh-pages` branch.
2. **Manual**: run `npm run build`, copy `react-app/dist` into a `docs/` folder at the
   repo root, and set GitHub Pages to serve from `/docs`.

`base: './'` is set in `vite.config.js` so assets resolve correctly under the project subpath.

## What's ported so far
- ✅ App shell + tab navigation with framer-motion page transitions (AnimatePresence)
- ✅ Home screen (animated intro + spring button)
- ✅ Games screen (class selector + staggered animated game tiles)
- ✅ Stories list (staggered animated cards)
- ✅ AJAX content load from the shared `../data/content.json`

## Still to port (heavy features from the original)
- ⬜ Chess engine + Tic-Tac-Toe (with 3D pieces, narration, music)
- ⬜ Voice recognition games (en-IN, fuzzy answer matching, thinking animation)
- ⬜ Friendly Indian female narration voice
- ⬜ AI Story Maker (in-browser WebLLM, kid-safe guard, save/persist)
- ⬜ Parent dashboard
