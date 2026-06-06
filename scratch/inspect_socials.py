import re

file_path = "app/caps-body.html"
with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

print("--- SOCIAL MEDIA & KOROWA MENTIONS ---")
keywords = ["facebook.com", "instagram.com", "linkedin.com", "korowa"]
for idx, line in enumerate(lines):
    line_num = idx + 1
    for kw in keywords:
        if kw in line.lower():
            print(f"Line {line_num} ({kw}): {line.strip()[:150]}")
            break
