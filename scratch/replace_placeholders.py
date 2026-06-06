import os

html_path = "app/leadership-body.html"

# Load the file
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Define the replacement mappings for Mentors and SCs (using Option C: glassmorphic blur mesh orb)
replacements = {
    # Dr. Kennedy Andrew Thomas
    '<div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 350px; color: #a0aec0; font-weight: bold;">Director Image Placeholder</div>': 
    '''<div class="team-member_image placeholder-mesh-card" style="height: 350px;">
      <div class="placeholder-mesh-orb-1"></div>
      <div class="placeholder-mesh-orb-2"></div>
      <div class="placeholder-mesh-glass">
        <span class="placeholder-mesh-initials">KT</span>
        <span class="placeholder-mesh-role">Mentor</span>
      </div>
    </div>''',
    
    # Dr. Sibi Shaji
    '<div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 350px; color: #a0aec0; font-weight: bold;">Coordinator Image Placeholder</div>':
    '''<div class="team-member_image placeholder-mesh-card" style="height: 350px;">
      <div class="placeholder-mesh-orb-1"></div>
      <div class="placeholder-mesh-orb-2"></div>
      <div class="placeholder-mesh-glass">
        <span class="placeholder-mesh-initials">SS</span>
        <span class="placeholder-mesh-role">Mentor</span>
      </div>
    </div>''',
    
    # Aarav Mehta
    '<div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 350px; color: #a0aec0; font-weight: bold;">Aarav Image Placeholder</div>':
    '''<div class="team-member_image placeholder-mesh-card" style="height: 350px;">
      <div class="placeholder-mesh-orb-1"></div>
      <div class="placeholder-mesh-orb-2"></div>
      <div class="placeholder-mesh-glass">
        <span class="placeholder-mesh-initials">AM</span>
        <span class="placeholder-mesh-role">Coordinator</span>
      </div>
    </div>''',
    
    # Diya Sharma
    '<div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 350px; color: #a0aec0; font-weight: bold;">Diya Image Placeholder</div>':
    '''<div class="team-member_image placeholder-mesh-card" style="height: 350px;">
      <div class="placeholder-mesh-orb-1"></div>
      <div class="placeholder-mesh-orb-2"></div>
      <div class="placeholder-mesh-glass">
        <span class="placeholder-mesh-initials">DS</span>
        <span class="placeholder-mesh-role">Coordinator</span>
      </div>
    </div>''',
}

# Define the replacement mappings for Team Leads (using Option A: radial brand gradient with initials)
team_leads = {
    "Rohan": "RD",
    "Neha": "NR",
    "Kabir": "KM",
    "Ananya": "AI",
    "Arjun": "AN",
    "Riya": "RS",
    "Siddharth": "SR",
    "Meera": "MJ",
    "Devika": "DK",
    "Varun": "VD",
    "Ishaan": "IS",
    "Sneha": "SG",
    "Rahul": "RV",
    "Priya": "PS",
    "Aditya": "AG",
    "Tanvi": "TS",
}

for name, initials in team_leads.items():
    target = f'<div class="team-member_image placeholder-image" style="background-color: #f0f4f8; display: flex; align-items: center; justify-content: center; height: 250px; color: #a0aec0; font-weight: bold;">{name}</div>'
    replacement = f'''<div class="team-member_image placeholder-gradient-card" style="height: 250px;">
                      <div class="placeholder-gradient-glow"></div>
                      <span class="placeholder-gradient-initials">{initials}</span>
                    </div>'''
    replacements[target] = replacement

# Perform replacements
for target, replacement in replacements.items():
    if target in content:
        content = content.replace(target, replacement)
    else:
        print(f"Warning: Target markup not found for replacement: {target[:80]}...")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Placeholders successfully updated in leadership-body.html!")
