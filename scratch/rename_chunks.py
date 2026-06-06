import os

# 1. Update the mapping prefix inside caps-interactions.js
js_file_path = "public/js/caps-interactions.js"
with open(js_file_path, "r", encoding="utf-8") as f:
    js_content = f.read()

# Replace the chunk name mapping function prefix
old_prefix = '"korowa-school.achunk."'
new_prefix = '"caps-interactions.achunk."'

if old_prefix in js_content:
    js_content = js_content.replace(old_prefix, new_prefix)
    with open(js_file_path, "w", encoding="utf-8") as f:
        f.write(js_content)
    print("Updated caps-interactions.js mapping prefix successfully!")
else:
    print("Warning: old prefix not found in caps-interactions.js, it might have already been modified.")

# 2. Rename the actual chunk files on disk
js_dir = "public/js"
renamed_count = 0
for filename in os.listdir(js_dir):
    if filename.startswith("korowa-school.achunk.") and filename.endswith(".js"):
        old_file_path = os.path.join(js_dir, filename)
        new_filename = filename.replace("korowa-school.achunk.", "caps-interactions.achunk.")
        new_file_path = os.path.join(js_dir, new_filename)
        
        os.rename(old_file_path, new_file_path)
        print(f"Renamed: {filename} -> {new_filename}")
        renamed_count += 1

print(f"Finished renaming {renamed_count} chunks.")
