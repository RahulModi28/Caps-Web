import os

caps_path = "app/caps-body.html"
lead_path = "app/leadership-body.html"

# Read both files
with open(caps_path, "r", encoding="utf-8") as f:
    caps_content = f.read()

with open(lead_path, "r", encoding="utf-8") as f:
    lead_content = f.read()

# 1. Extract CAPS header block
# Header block starts at <section class="preloader_component"> and goes up to <main id="main" class="main-wrapper">
caps_header_start = caps_content.find('<section class="preloader_component">')
if caps_header_start == -1:
    print("Error: Could not find preloader in caps-body.html")
    exit(1)

caps_header_end = caps_content.find('<main id="main" class="main-wrapper">')
if caps_header_end == -1:
    print("Error: Could not find main-wrapper in caps-body.html")
    exit(1)

caps_header = caps_content[caps_header_start:caps_header_end]
print(f"Extracted CAPS header of size {len(caps_header)}")

# 2. Extract CAPS footer block
# Footer block starts at <div class="section_footer">
caps_footer_start = caps_content.find('<div class="section_footer">')
if caps_footer_start == -1:
    print("Error: Could not find section_footer in caps-body.html")
    exit(1)

caps_footer = caps_content[caps_footer_start:]
print(f"Extracted CAPS footer of size {len(caps_footer)}")

# 3. Locate segments in leadership-body.html
lead_header_start = lead_content.find('<section class="preloader_component">')
if lead_header_start == -1:
    print("Error: Could not find preloader in leadership-body.html")
    exit(1)

lead_header_end = lead_content.find('<main id="main" class="main-wrapper">')
if lead_header_end == -1:
    print("Error: Could not find main-wrapper in leadership-body.html")
    exit(1)

# Perform header replacement
lead_modified = lead_content[:lead_header_start] + caps_header + lead_content[lead_header_end:]

# Perform footer replacement (find section_footer in the newly modified content)
lead_footer_start = lead_modified.find('<div class="section_footer">')
if lead_footer_start == -1:
    print("Error: Could not find section_footer in leadership-body.html")
    exit(1)

# Replace everything from section_footer to the end with the CAPS footer
lead_final = lead_modified[:lead_footer_start] + caps_footer

# Ensure our dialog flex override style block remains at the end of the file
style_override = """
<style>
  .team-item_content {
    flex: 0 1 auto !important;
  }
</style>
"""

# Insert style block right before </body>
insert_idx = lead_final.find('</body>')
if insert_idx != -1:
    lead_final = lead_final[:insert_idx] + style_override + lead_final[insert_idx:]
else:
    # Fallback to appending
    lead_final += style_override

# Write back to leadership-body.html
with open(lead_path, "w", encoding="utf-8") as f:
    f.write(lead_final)

print("Successfully synchronized header, footer, logo, and menu!")
