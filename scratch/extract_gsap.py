import re

filepath = "public/js/korowa-school.achunk.ba232ca75e256be3.js"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

print(f"Total length: {len(content)}")
for match in re.finditer("gsap_split", content, re.IGNORECASE):
    start = max(0, match.start() - 300)
    end = min(len(content), match.end() + 300)
    print("--- MATCH ---")
    print(content[start:end])
