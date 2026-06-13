# Miss Bharat World - God Level Edition 🚀✨

An ultimate, beautiful interactive educational platform for kids (Classes 1-5) with voice control, AI-powered story generation, and 5 unique class-specific learning experiences.

## 🎯 Features

- 🎮 **40+ Educational Games** - 8 games per class level tailored to age and learning needs
- 🎤 **Advanced Voice Control** - AI voice recognition and text-to-speech
- 👩‍🏫 **Miss Bharat AI Guide** - Personalized learning companion
- 📖 **AI Story Creator** - Generates dynamic stories based on class, hero, and setting
- 🌍 **5 Unique Class Experiences** - Distinct visual themes and game collections
- ⭐ **Scoring & Achievements** - Track progress and earn badges
- 🎨 **God Level Design** - ProMax UX with animations, glassmorphism, and modern aesthetics
- 📱 **Fully Responsive** - Works on all devices (mobile, tablet, desktop)

## 📂 Available Versions

### 🚀 **God Level Edition** (Recommended!)
**File:** `miss-bharat-godlevel.html`
- 5 unique class-specific pages with custom themes
- Class 1: Bright pink & orange (Ages 6) 🌟
- Class 2: Green & blue (Ages 7) 🚀
- Class 3: Purple & cyan (Ages 8) ⭐
- Class 4: Hot pink & cyan (Ages 9) 🎯
- Class 5: Dark premium theme (Ages 10) 👑
- Enhanced animations and modern UI
- Premium card designs with glassmorphism

### 📋 **Classic Edition**
**File:** `index.html` (with ProMax UX enhancements)
- Original 14 games with modern design updates
- Anti-gravity card hover effects
- Animated gradient backgrounds
- All voice features intact

### 🎨 **Other Versions**
- `miss-bharat-premium.html` - Premium design variant
- `miss-bharat-adventures.html` - Class-specific adventures

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
8. Access either version:
   - **God Level:** Open `miss-bharat-godlevel.html` for the ultimate experience
   - **Classic:** Open `index.html` for the original enhanced games

### 🎮 Online Play (Live)
- **God Level Version:** https://abinashdasdas-gif.github.io/miss-bharat_1/miss-bharat-godlevel.html
- **Classic Version:** https://abinashdasdas-gif.github.io/miss-bharat_1/
- **Premium Version:** https://abinashdasdas-gif.github.io/miss-bharat_1/miss-bharat-premium.html

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

## 🎓 Class-Specific Learning Paths

### Class 1 - Fun Adventures 🌟 (Age 6)
**Design:** Bright pink & orange with playful animations
- Count Me | Color Play | Letter Quest | Shape Hunt
- Rhyme Time | Memory Game | Story Time | Voice Chat
- Focus: Basic numbers, letters, shapes, colors
- Time: 15-20 minutes per session

### Class 2 - Growing Smart 🚀 (Age 7)
**Design:** Green & blue with engaging interactions
- Word Builder | Number Friends | Pattern Quest | Riddle Master
- Story Creator | Chat Master | Music Rhythm | Speed Count
- Focus: Words, patterns, logic, basic reading
- Time: 20-25 minutes per session

### Class 3 - Knowledge Explorer ⭐ (Age 8)
**Design:** Purple & cyan with advanced challenges
- Knowledge Quiz | Word Puzzle | Math Master | Logic Game
- Science Quest | Story Master | Debate Time | Chess Challenge
- Focus: Complex concepts, problem-solving, knowledge
- Time: 25-30 minutes per session

### Class 4 - Advanced Challenger 🎯 (Age 9)
**Design:** Hot pink & cyan with premium interactions
- Advanced Quiz | Code Breaker | Debate Topics | Research Quest
- Strategy Game | Data Analysis | Story Craft | Master Chat
- Focus: Higher-order thinking, creativity, strategy
- Time: 30-40 minutes per session

### Class 5 - Elite Champions 👑 (Age 10)
**Design:** Dark premium theme with competitive elements
- Championship Quiz | Master Challenge | Tournament Mode | Create Project
- Global Quest | Leaderboard | Master Craft | AI Chat Pro
- Focus: Excellence, competition, leadership, creativity
- Time: 40-50 minutes per session

## 🎮 Games Included (Per Class)

Each class has 8 games optimized for their level:
- **Communication:** Quiz games, debates, chat interactions
- **Logic:** Puzzles, patterns, strategy games
- **Creativity:** Story creation, projects, art challenges
- **Math:** Counting, tables, data analysis
- **Language:** Words, spelling, reading comprehension
- **Problem-Solving:** Chess, riddles, code breaking
- **Science:** Quests, research challenges
- **Social:** Competitions, leaderboards, tournaments

## 🎨 Design Features

### God Level Edition Highlights
- **Animated Gradient Orbs** - Subtle moving backgrounds
- **Anti-Gravity Cards** - Cards lift on hover with smooth easing
- **Glassmorphism Effects** - Frosted glass appearance on cards
- **Shimmer Animations** - Elegant shine effects on interaction
- **Responsive Grid Layouts** - Adapts to all screen sizes
- **Premium Typography** - Montserrat and Poppins fonts
- **Voice Integration** - Full voice control system
- **Floating Elements** - Animated UI components
- **Class Themes** - Unique color schemes per class
- **Performance Optimized** - Smooth 60fps animations

## 🎤 Voice Commands

### At Home Screen
- Say a game name: "Quiz", "Chess", "Story Creator"
- Switch class: "Class 1", "Class 2", "Class 3", "Class 4", "Class 5"

### In Games
- Speak the answer to questions
- Say "Home" to return to hub
- Say "Help" for assistance
- Voice recognition works in all games

## License

MIT

## Author

Created with ❤️ for kids learning with Miss Bharat
