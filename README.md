# Miss Bharat World - Story Creator Edition ✨

A beautiful, interactive educational game for kids with voice control and AI-powered story generation using Claude.

## Features

- 🎮 10+ educational games (Quiz, Counting, Balloon Pop, Memory, Words, Roti Fractions, Times Tables, Weather, Story Time, Chess, Color Mixer, Shape Sorter)
- 🎤 Voice input & recognition on every screen
- 👩‍🏫 Miss Bharat character guides kids through learning
- 📖 AI Story Creator - generates personalized stories based on class level, hero, and setting
- 🌍 5 class levels with adaptive difficulty
- ⭐ Scoring system with rewards

## Setup

### ⚡ Quick Start with GitHub Codespaces (Easiest!)

1. Go to your GitHub repo: https://github.com/abinashdasdas-gif/miss-bharat_1
2. Click **"Code"** → **"Codespaces"** → **"Create codespace on main"**
3. Wait 2-3 minutes for the environment to load
4. **Copy the env file:**
   ```bash
   cp .env.example .env
   ```
5. **Edit .env** and add your Claude API key:
   ```bash
   # Open .env and replace sk-ant-your-api-key-here with your actual key
   nano .env
   ```
6. **Install and start:**
   ```bash
   npm install
   npm start
   ```
7. Click the notification to open the app in a browser
8. Share the URL with anyone!

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   Create a `.env` file in the root directory:
   ```
   CLAUDE_API_KEY=your_api_key_here
   PORT=3000
   ```

3. **Start the backend server:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   - Backend runs on `http://localhost:3000`
   - Open `miss-bharat-world_8.html` in Chrome/Edge
   - Voice control requires microphone permission

## How It Works

- **Frontend:** Pure HTML/CSS/JavaScript (no build step needed)
- **Backend:** Node.js + Express handles Claude API calls securely
- **Voice:** Web Speech API for voice input (Chrome/Edge)
- **Story Creator:** Dynamic prompts adjust based on class level

## Story Creator Levels

- **Class 1:** Simple 3-4 letter words, basic phonics
- **Class 2:** 4-5 letter words, simple sentences
- **Class 3:** Complex vocabulary, compound sentences
- **Class 4:** Advanced grammar, plot development
- **Class 5:** Creative storytelling, plot twists, character development

## Security

⚠️ **Never commit your `.env` file!** It's in `.gitignore` to protect your API key.

## Games Included

1. Quiz Adventure
2. Counting Fun
3. Balloon Pop Maths
4. Memory Match
5. Build Words
6. Roti Fractions
7. Times Tables
8. Weather Explorer
9. Story Time
10. Fun Chess
11. Color Mixer
12. Shape Sorter
13. Talk to Miss Bharat
14. Story Creator ✨

## Voice Commands

### At Home Screen
- Say a game name: "Quiz", "Chess", "Story Creator"
- Switch class: "Class 3"

### In Games
- Speak the answer
- Say "Home" to return to hub

## License

MIT

## Author

Created with ❤️ for kids learning with Miss Bharat
