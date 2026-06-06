import os

html_path = "app/leadership-body.html"

# Load the file
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Define the replacement mapping for the 8 Korowa leaders
replacements = {
    # 1. Mrs Frances Booth
    '<img loading="lazy" src="https://cdn.prod.website-files.com/689b9231663a4f08a91a5f19/693f8a8604c8fca5222a7a22_Headshots25-217.webp" alt="" class="team-member_image"/>':
    '''<div class="placeholder-mesh-card">
      <div class="placeholder-mesh-orb-1"></div>
      <div class="placeholder-mesh-orb-2"></div>
      <div class="placeholder-mesh-glass">
        <span class="placeholder-mesh-initials" style="font-size: 3rem;">FB</span>
        <span class="placeholder-mesh-role">Principal</span>
      </div>
    </div>''',
    
    # 2. Dr Jennifer Bailey Smith
    '<img loading="lazy" src="https://cdn.prod.website-files.com/689b9231663a4f08a91a5f19/693f8a9d94ae793d5d8e396a_Headshots25-141.webp" alt="" class="team-member_image"/>':
    '''<div class="placeholder-mesh-card">
      <div class="placeholder-mesh-orb-1"></div>
      <div class="placeholder-mesh-orb-2"></div>
      <div class="placeholder-mesh-glass">
        <span class="placeholder-mesh-initials" style="font-size: 2.2rem;">JBS</span>
        <span class="placeholder-mesh-role">Deputy Principal</span>
      </div>
    </div>''',
    
    # 3. Kerry Irvine
    '<img loading="lazy" src="https://cdn.prod.website-files.com/689b9231663a4f08a91a5f19/693f8ad2ae1dc26106afc8fd_Headshots25-071.webp" alt="" class="team-member_image"/>':
    '''<div class="placeholder-mesh-card">
      <div class="placeholder-mesh-orb-1"></div>
      <div class="placeholder-mesh-orb-2"></div>
      <div class="placeholder-mesh-glass">
        <span class="placeholder-mesh-initials" style="font-size: 3rem;">KI</span>
        <span class="placeholder-mesh-role">Head of Junior</span>
      </div>
    </div>''',
    
    # 4. Courtney Stammers
    '<img loading="lazy" src="https://cdn.prod.website-files.com/689b9231663a4f08a91a5f19/69caf304834b7b324b3f86c3_17Mar26-023%20(1).webp" alt="" class="team-member_image"/>':
    '''<div class="placeholder-mesh-card">
      <div class="placeholder-mesh-orb-1"></div>
      <div class="placeholder-mesh-orb-2"></div>
      <div class="placeholder-mesh-glass">
        <span class="placeholder-mesh-initials" style="font-size: 3rem;">CS</span>
        <span class="placeholder-mesh-role">Head of Senior</span>
      </div>
    </div>''',
    
    # 5. Lucy Menting
    '<img loading="lazy" src="https://cdn.prod.website-files.com/689b9231663a4f08a91a5f19/693f8f8c83053674c29c64c8_Headshots25-034.webp" alt="" class="team-member_image"/>':
    '''<div class="placeholder-mesh-card">
      <div class="placeholder-mesh-orb-1"></div>
      <div class="placeholder-mesh-orb-2"></div>
      <div class="placeholder-mesh-glass">
        <span class="placeholder-mesh-initials" style="font-size: 3rem;">LM</span>
        <span class="placeholder-mesh-role">Director</span>
      </div>
    </div>''',
    
    # 6. Christian Lawless
    '<img loading="lazy" src="https://cdn.prod.website-files.com/689b9231663a4f08a91a5f19/693f90b1df396cf7befeaf96_Headshots25-025.webp" alt="" class="team-member_image"/>':
    '''<div class="placeholder-mesh-card">
      <div class="placeholder-mesh-orb-1"></div>
      <div class="placeholder-mesh-orb-2"></div>
      <div class="placeholder-mesh-glass">
        <span class="placeholder-mesh-initials" style="font-size: 3rem;">CL</span>
        <span class="placeholder-mesh-role">Director</span>
      </div>
    </div>''',
    
    # 7. Bill Petridis
    '<img loading="lazy" src="https://cdn.prod.website-files.com/689b9231663a4f08a91a5f19/693f8eab8db0ba8857eecada_Headshots25-013.webp" alt="" class="team-member_image"/>':
    '''<div class="placeholder-mesh-card">
      <div class="placeholder-mesh-orb-1"></div>
      <div class="placeholder-mesh-orb-2"></div>
      <div class="placeholder-mesh-glass">
        <span class="placeholder-mesh-initials" style="font-size: 3rem;">BP</span>
        <span class="placeholder-mesh-role">CIDO</span>
      </div>
    </div>''',
    
    # 8. Sue Black
    '<img loading="lazy" src="https://cdn.prod.website-files.com/689b9231663a4f08a91a5f19/69406cbfcb79cbc400cb255b_Sue%20Black.webp" alt="" class="team-member_image"/>':
    '''<div class="placeholder-mesh-card">
      <div class="placeholder-mesh-orb-1"></div>
      <div class="placeholder-mesh-orb-2"></div>
      <div class="placeholder-mesh-glass">
        <span class="placeholder-mesh-initials" style="font-size: 3rem;">SB</span>
        <span class="placeholder-mesh-role">Director</span>
      </div>
    </div>''',
}

# Apply replacements
replaced_count = 0
for target, replacement in replacements.items():
    if target in content:
        content = content.replace(target, replacement)
        replaced_count += 1
    else:
        print(f"Warning: Target markup not found for replacement: {target[:120]}...")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Replaced {replaced_count} image tags with glassmorphic placeholders!")
