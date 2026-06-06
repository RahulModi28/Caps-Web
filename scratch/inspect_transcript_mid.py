import json

transcript_path = "/Users/rahulmodi/.gemini/antigravity/brain/02813b1c-be60-4706-a357-617c3c9ee1b4/.system_generated/logs/transcript.jsonl"

with open(transcript_path, "r", encoding="utf-8") as f:
    for line in f:
        data = json.loads(line)
        idx = data.get("step_index", 0)
        if 4650 <= idx < 4880:
            source = data.get("source")
            step_type = data.get("type")
            print(f"Step {idx} | Source: {source} | Type: {step_type}")
            if step_type == "USER_INPUT":
                print(f"  User Input: {data.get('content')}")
            elif step_type == "PLANNER_RESPONSE":
                thinking = data.get('thinking')
                if thinking:
                    print(f"  Thinking: {thinking[:150]}...")
            if "tool_calls" in data and data["tool_calls"]:
                for tc in data["tool_calls"]:
                    args_str = str(tc.get("args"))
                    if len(args_str) > 150:
                        args_str = args_str[:150] + "..."
                    print(f"  Tool Call: {tc.get('name')} args: {args_str}")
