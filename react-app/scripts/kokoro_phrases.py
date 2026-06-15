# Generate Kokoro clips for the app's fixed spoken phrases (same voice as the stories).
import json, os, re
from kokoro_onnx import Kokoro
import soundfile as sf

here = os.path.dirname(os.path.abspath(__file__))
kokoro = Kokoro(os.path.join(here, "kokoro-v1.0.onnx"), os.path.join(here, "voices-v1.0.bin"))
outdir = os.path.join(here, "..", "public", "audio", "phrases")
os.makedirs(outdir, exist_ok=True)
VOICE = "af_heart"

PHRASES = [
    # praise / encouragement
    "Excellent!", "Great job!", "Perfect!", "Well done!", "Super!",
    "Almost! Try again, you can do it!",
    # chess piece info
    "Pawn. It walks one step forward, and captures sideways.",
    "Knight! It jumps in an L-shape and can hop over other pieces.",
    "Bishop. It slides diagonally, as far as you like.",
    "Rook. It slides straight — up, down, or sideways.",
    "Queen, the most powerful piece! She moves any direction.",
    "King. He moves one square in any direction. Keep him safe!",
    # chess flow
    "Let's play chess! Tap any of your pieces and I will tell you how it moves.",
    "Great capture!",
    "You win the game! Wonderful!",
    "The computer wins. Try again, you can do it!",
    # chess moves (you / computer) for each piece
    "You moved the King.", "You moved the Queen.", "You moved the Rook.",
    "You moved the Bishop.", "You moved the Knight.", "You moved the Pawn.",
    "Computer moved the King.", "Computer moved the Queen.", "Computer moved the Rook.",
    "Computer moved the Bishop.", "Computer moved the Knight.", "Computer moved the Pawn.",
    # tic-tac-toe
    "Let's play Tic-Tac-Toe! You are X. Try to get three in a row!",
    "You placed an X.", "Computer placed an O.",
    "Three in a row! You win! Wonderful!",
    "Computer got three in a row. Try again, you can do it!",
    "It's a draw! Good game!",
    "New game! You are X. Good luck!",
]

def norm(t):
    return re.sub(r"\s+", " ", t.lower()).strip()

manifest = {}
for idx, text in enumerate(PHRASES):
    fname = f"p{idx}.wav"
    samples, sr = kokoro.create(text, voice=VOICE, speed=1.0, lang="en-us")
    sf.write(os.path.join(outdir, fname), samples, sr)
    manifest[norm(text)] = fname
    print("saved", fname, "-", text[:40])

with open(os.path.join(here, "..", "public", "audio", "phrases.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False)
print("Done.", len(PHRASES), "phrases")
