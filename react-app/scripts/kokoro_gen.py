# Local Kokoro TTS — generates all story narration with ONE consistent voice. Free, offline, unlimited.
import json, os
from kokoro_onnx import Kokoro
import soundfile as sf

here = os.path.dirname(os.path.abspath(__file__))
kokoro = Kokoro(os.path.join(here, "kokoro-v1.0.onnx"), os.path.join(here, "voices-v1.0.bin"))
stories = json.load(open(os.path.join(here, "stories.json"), encoding="utf-8"))
outdir = os.path.join(here, "..", "public", "audio")
os.makedirs(outdir, exist_ok=True)

VOICE = "af_heart"   # warm friendly female storyteller

for s, story in enumerate(stories):
    pages = story["pages"]
    for p, page in enumerate(pages):
        text = page
        if p == len(pages) - 1:
            text += "  The moral of the story is: " + story["moral"]
        out = os.path.join(outdir, f"s{s}-p{p}.wav")
        samples, sr = kokoro.create(text, voice=VOICE, speed=1.0, lang="en-us")
        sf.write(out, samples, sr)
        print("saved", f"s{s}-p{p}.wav")
print("Done.")
