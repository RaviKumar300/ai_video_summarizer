import nltk
nltk.download("stopwords")

import json
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import string

# Load transcript
with open("transcript.json", "r", encoding="utf-8") as f:
    transcript = json.load(f)

# Setup stopwords and punctuation
stop_words = set(stopwords.words("english"))
punctuation = set(string.punctuation)

# Clean each chunk
cleaned_transcript = {}

for timestamp, text in transcript.items():
    words = word_tokenize(text.lower())  # lowercase and tokenize
    filtered = [w for w in words if w not in stop_words and w not in punctuation]
    cleaned_transcript[timestamp] = " ".join(filtered)

# Save cleaned version
with open("transcript_cleaned.json", "w", encoding="utf-8") as f:
    json.dump(cleaned_transcript, f, ensure_ascii=False, indent=2)

print("✅ Cleaned transcript saved to transcript_cleaned.json")
