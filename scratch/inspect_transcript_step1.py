import json

transcript_path = "/Users/rahulmodi/.gemini/antigravity/brain/02813b1c-be60-4706-a357-617c3c9ee1b4/.system_generated/logs/transcript.jsonl"

with open(transcript_path, "r", encoding="utf-8") as f:
    for line in f:
        data = json.loads(line)
        idx = data.get("step_index", 0)
        if 4840 <= idx < 4868:
            source = data.get("source")
            step_type = data.get("type")
            if source == "MODEL" and data.get("content"):
                print(f"--- Step {idx} CONTENT ({step_type}) ---")
                print(data.get("content"))
