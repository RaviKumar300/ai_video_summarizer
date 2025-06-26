# 🎥 AI Video Summarizer

Effortlessly summarize educational and technical videos using AI. Upload a video or provide a YouTube link (feature in progress), extract audio, transcribe it, and generate a structured, timestamped summary using natural language processing and LLMs.

---

# Demo ScreenShot:
![Demo Screenshot](./assets/demo.png)


---


## 🔧 Tech Stack

| Component           | Technology Used                      |
|---------------------|---------------------------------------|
| Frontend UI         | React.js (Vite)                       |
| Transcription       | Vosk (Offline Speech-to-Text)         |
| Stopword Removal    | NLTK (Python NLP toolkit)             |
| Summarization       | OpenAI LLM (GPT API)                  |
| Audio Processing    | FFmpeg                                |
| File Handling       | Python + JSON                         |

---

## 🧠 Features

- 📤 Upload or provide a video (audio.mp3 assumed for now)
- 🧠 Transcribe English audio to text using offline Vosk
- 🧽 Remove stopwords with NLTK
- ✨ Summarize chunks using OpenAI LLM
- 🧾 View interactive, timestamped summaries in browser
- 🧱 Modular, JSON-driven backend pipeline

---

## 🧭 Workflow: How It Works

1. 📥 Input
   - User uploads a video (or later, pastes YouTube link)
   - Audio is extracted as `audio.mp3` and placed in `backend/helper_python/`

2. 🎧 Audio Conversion (external or via FFmpeg)
   - Convert to WAV with:
     - Codec: PCM_s16le
     - Sample rate: 16000 Hz
     - Channels: mono

3. 📝 Transcription
   - `vosk` transcribes audio to text with timestamps
   - Output is chunked (e.g., every 5 minutes)
   - Saved to `transcript.json`

4. 🔍 NLP Cleanup
   - NLTK stopwords removed from each section
   - Cleaned text prepared for summarization

5. 🧠 Summarization
   - Each cleaned chunk is sent to LLM (e.g., GPT-4) via API
   - Responses stored in `response_summary.json`

6. 🔁 Integration with Frontend
   - `mover.py` moves `response_summary.json` to `frontend/public`
   - React component `Body.jsx` loads and renders:
     - Video title
     - Timestamped summaries in a table

---

## 🗂 Project Structure


```
video_summarizer/
│
├── backend/
│ └── helper_python/
│ ├── audio.wav
│ ├── transcriber.py
│ ├── stopword_cleaner.py
│ ├── summarizer.py
│ ├── mover.py
│ ├── transcript.json
│ └── response_summary.json
│
├── frontend/
│ ├── public/
│ │ └── response_summary.json
│ └── src/
│ ├── components/
│ │ └── Body.jsx
│ ├── assets/
│ │ └── [video-placeholder.png, logos, thumbnails]
│ └── App.jsx
│
└── README.md
```

---

## 🚀 Future Improvements

- [ ] Automatic YouTube audio downloading
- [ ] Drag-and-drop UI with real-time progress bar
- [ ] Support for Whisper for multilingual transcription
- [ ] LLM fine-tuning for specific domains (edu, tech)
- [ ] Interactive transcript + audio player sync

---

## 📜 License

This project is for educational/demo use only. Comply with individual licenses of:

- Vosk: Apache 2.0
- NLTK: Apache 2.0
- OpenAI API: Commercial, API Terms Apply

---

## ✨ Authors

Made with 💻 by [Ravi Kumar](https://github.com/RaviKumar300)






