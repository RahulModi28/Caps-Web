import shutil
import os

original_scraped_path = "scratch/korowa_leadership.html"
target_path = "app/leadership-body.html"

# 1. Copy original scraped file to app/leadership-body.html
print("Copying original scraped file...")
shutil.copy(original_scraped_path, target_path)

# Load copied content
with open(target_path, "r", encoding="utf-8") as f:
    content = f.read()

# 2. Modify CDN entry.js script to local /js/caps-entry.js
print("Replacing entry.js CDN with local version...")
cdn_script = 'src="https://cdn.jsdelivr.net/gh/igniteagency/korowa-school-webflow-site/dist/prod/entry.js"'
local_script = 'src="/js/caps-entry.js"'
content = content.replace(cdn_script, local_script)

with open(target_path, "w", encoding="utf-8") as f:
    f.write(content)

# 3. Run sync_header_footer.py to synchronize branding
print("Running sync_header_footer.py...")
import subprocess
result = subprocess.run(["python3", "scratch/sync_header_footer.py"], capture_output=True, text=True)
print("sync_header_footer.py stdout:", result.stdout)
print("sync_header_footer.py stderr:", result.stderr)

# 4. Run clean_leadership_body.py to remove outer HTML wrapping
print("Running clean_leadership_body.py...")
result = subprocess.run(["python3", "scratch/clean_leadership_body.py"], capture_output=True, text=True)
print("clean_leadership_body.py stdout:", result.stdout)
print("clean_leadership_body.py stderr:", result.stderr)

print("Restoration complete!")
