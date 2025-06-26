from dotenv import load_dotenv
import os
import openai
import json

load_dotenv()  # Load variables from .env

openai.api_key = os.getenv("OPENAI_API_KEY")


def summarize_text(text, timestamp):
    prompt = (
        f"You are an expert summarizer. "
        f"Summarize the following 5-minute transcript section labeled {timestamp} in 2–3 clear and concise sentences. "
        f"Focus on key points, avoid repetition, and maintain neutrality.\n\n"
        f"Transcript:\n{text}\n\nSummary:"
    )

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",  # or "gpt-3.5-turbo"
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3
        )
        return response.choices[0].message["content"].strip()

    except Exception as e:
        print(f"Error summarizing {timestamp}: {e}")
        return "Summary unavailable."

# Load cleaned transcript
with open("transcript_cleaned.json", "r", encoding="utf-8") as f:
    cleaned_data = json.load(f)

# Generate summaries
summaries = {}
for timestamp, text in cleaned_data.items():
    print(f"Summarizing {timestamp}...")
    summaries[timestamp] = summarize_text(text, timestamp)

# Save to file
with open("response_summary.json", "w", encoding="utf-8") as f:
    json.dump(summaries, f, ensure_ascii=False, indent=2)

print("✅ All summaries saved to response_summary.json")
