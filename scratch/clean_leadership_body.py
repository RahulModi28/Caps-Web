import os

lead_path = "app/leadership-body.html"

# Read leadership-body.html
with open(lead_path, "r", encoding="utf-8") as f:
    content = f.read()

# Find the start of <div class="page-wrapper">
start_tag = '<div class="page-wrapper">'
start_idx = content.find(start_tag)
if start_idx == -1:
    print("Error: Could not find <div class=\"page-wrapper\">")
    exit(1)

# Find the end right before </body>
end_idx = content.find("</body>")
if end_idx == -1:
    # If </body> is not found, take everything
    body_content = content[start_idx:]
else:
    body_content = content[start_idx:end_idx]

# Clean up any trailing whitespace
body_content = body_content.strip()

# Write the cleaned body content back
with open(lead_path, "w", encoding="utf-8") as f:
    f.write(body_content)

print(f"Successfully cleaned leadership-body.html! Size: {len(body_content)} bytes")
