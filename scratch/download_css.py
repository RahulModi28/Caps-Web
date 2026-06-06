import urllib.request
import os

url = "https://cdn.prod.website-files.com/689b9231663a4f08a91a5f03/css/korowa-school.692fbe84ef119e0f675018fc.bef1e3609.opt.min.css"
output_dir = "public/css"
output_file = os.path.join(output_dir, "leadership-specific.css")

# Create output dir if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

print(f"Downloading CSS from: {url}")
try:
    headers = {'User-Agent': 'Mozilla/5.0'}
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as response:
        css_data = response.read()
    
    with open(output_file, "wb") as f:
        f.write(css_data)
        
    print(f"Successfully downloaded CSS and saved to {output_file} ({len(css_data)} bytes)")
except Exception as e:
    print(f"Error downloading CSS: {e}")
    exit(1)
