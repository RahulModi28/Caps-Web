import os
import urllib.request
import urllib.parse

# Setup output folders
ROOT_DIR = "/Users/rahulmodi/Desktop/CAPS WEB"
FONTS_DIR = os.path.join(ROOT_DIR, "public", "fonts")
JS_DIR = os.path.join(ROOT_DIR, "public", "js")
JS_COMPONENTS_DIR = os.path.join(JS_DIR, "components")

os.makedirs(FONTS_DIR, exist_ok=True)
os.makedirs(JS_COMPONENTS_DIR, exist_ok=True)

# Resources to download
FONTS = {
    "PPPangaia-LightItalic.woff2": "https://cdn.prod.website-files.com/689b9231663a4f08a91a5f03/689bceac5c887651bf289432_PPPangaia-LightItalic.woff2",
    "DMSans-VariableFont_opsz,wght.woff2": "https://cdn.prod.website-files.com/689b9231663a4f08a91a5f03/689c17691febf79eb48376ae_DMSans-VariableFont_opsz%2Cwght.woff2",
    "DMSans-Italic-VariableFont_opsz,wght.woff2": "https://cdn.prod.website-files.com/689b9231663a4f08a91a5f03/689c21287ced7c3c645cefbb_DMSans-Italic-VariableFont_opsz%2Cwght.woff2",
}

SCRIPTS = {
    "jquery-3.5.1.min.js": "https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js",
    "finsweet-attributes.js": "https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/attributes.js",
    "global.js": "https://cdn.jsdelivr.net/gh/igniteagency/korowa-school-webflow-site/dist/prod/global.js",
    "scroll-timeline.js": "https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js",
    "components/confetti.js": "https://cdn.jsdelivr.net/gh/igniteagency/korowa-school-webflow-site/dist/prod/components/confetti.js",
    "components/slider.js": "https://cdn.jsdelivr.net/gh/igniteagency/korowa-school-webflow-site/dist/prod/components/slider.js",
    "components/inline-vimeo-player.js": "https://cdn.jsdelivr.net/gh/igniteagency/korowa-school-webflow-site/dist/prod/components/inline-vimeo-player.js",
    "components/counter.js": "https://cdn.jsdelivr.net/gh/igniteagency/korowa-school-webflow-site/dist/prod/components/counter.js",
}

CHUNKS = [
    "db80639074bc0296",
    "bec7a721722e4644",
    "5959ac50b3c857f1",
    "65add74e46fe5245",
    "2aaad8b9b407aaec",
    "e8e7e6855b442808",
    "f919141e3448519b",
    "64873797e35e968c",
    "2f8fd4260fe41f39",
    "22b66e874d42861f",
    "496d56dd8c063ec0",
    "ad6dcd2fc75b294c",
    "dac51c455b7e76af",
    "ba232ca75e256be3",
    "721159f4d5758fab",
    "36b8fb49256177c8"
]

CHUNK_BASE = "https://cdn.prod.website-files.com/689b9231663a4f08a91a5f03/js/"

def download_file(url, output_path):
    print(f"Downloading {url} to {output_path}...")
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            with open(output_path, 'wb') as out_file:
                out_file.write(response.read())
        print("Success.")
    except Exception as e:
        print(f"FAILED to download {url}: {e}")

# 1. Download Fonts
for name, url in FONTS.items():
    download_file(url, os.path.join(FONTS_DIR, name))

# 2. Download Scripts
for name, url in SCRIPTS.items():
    dest = os.path.join(JS_DIR, name)
    download_file(url, dest)

# 3. Download Chunks
for chunk_hash in CHUNKS:
    chunk_name = f"korowa-school.achunk.{chunk_hash}.js"
    url = f"{CHUNK_BASE}{chunk_name}"
    download_file(url, os.path.join(JS_DIR, chunk_name))

print("All downloads complete.")
