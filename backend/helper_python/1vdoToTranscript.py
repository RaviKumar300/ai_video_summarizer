import wave
import json
from vosk import Model, KaldiRecognizer
from datetime import timedelta
from collections import defaultdict

def seconds_to_hhmmss(seconds):
    return str(timedelta(seconds=int(seconds)))

def transcribe_vosk(wav_path, model_path="model-en", chunk_minutes=5):
    wf = wave.open(wav_path, "rb")
    assert wf.getnchannels() == 1 and wf.getframerate() == 16000, "WAV must be mono and 16kHz"

    model = Model(model_path)
    rec = KaldiRecognizer(model, wf.getframerate())
    rec.SetWords(True)

    results = []
    while True:
        data = wf.readframes(4000)
        if len(data) == 0:
            break
        if rec.AcceptWaveform(data):
            results.append(json.loads(rec.Result()))
    results.append(json.loads(rec.FinalResult()))

    # Chunk into 5-minute windows
    chunked = defaultdict(str)
    chunk_sec = chunk_minutes * 60
    for res in results:
        if "result" in res:
            for word in res["result"]:
                start = int(word["start"])
                chunk_idx = start // chunk_sec
                key = f"{seconds_to_hhmmss(chunk_idx * chunk_sec)} - {seconds_to_hhmmss((chunk_idx + 1) * chunk_sec)}"
                chunked[key] += word["word"] + " "

    return dict(chunked)

if __name__ == "__main__":
    transcript = transcribe_vosk("audio.wav", model_path="model-en")

    with open("transcript.json", "w", encoding="utf-8") as f:
        json.dump(transcript, f, ensure_ascii=False, indent=2)

    print("✅ Transcription saved to transcript.json")


"""
make sure terminal is in helper_python dir while running
this .py:  read .wav file -> transcribe with Vosk (later : -> remove filler words -> save to transcript.json (-> later use LLM for summary))

"""



"""
https://cloudconvert.com/mp3-to-wav
| Setting       | Your Choice | ✅ Vosk Requirement                   | Status            |
| ------------- | ----------- | ------------------------------------ | ----------------- |
| Audio Codec   | `pcm_s16le` | Linear PCM 16-bit little-endian      | ✅ Required format |
| Audio Bitrate | 128 kbps    | Doesn't matter (as long as it's PCM) | ✅ Fine            |
| Channels      | `mono`      | Must be mono                         | ✅ Correct         |
| Sample Rate   | `16000 Hz`  | Must be 16000 Hz                     | ✅ Correct         |
| Volume        | `no change` | No specific requirement              | ✅ Fine            |

"""
