import os
import urllib.request

ROOT_DIR = "/Users/rahulmodi/Desktop/CAPS WEB"
JS_DIR = os.path.join(ROOT_DIR, "public", "js")
CSS_DIR = os.path.join(ROOT_DIR, "public", "css")

os.makedirs(JS_DIR, exist_ok=True)
os.makedirs(CSS_DIR, exist_ok=True)

# 1. Download Swiper files
swiper_js_url = "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js"
swiper_css_url = "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css"

def download(url, dest):
    print(f"Downloading {url} -> {dest}...")
    try:
        urllib.request.urlretrieve(url, dest)
        print("Success.")
    except Exception as e:
        print(f"Failed: {e}")

download(swiper_js_url, os.path.join(JS_DIR, "swiper-bundle.min.js"))
download(swiper_css_url, os.path.join(CSS_DIR, "swiper-bundle.min.css"))

# 2. Replace CDN URLs in components/slider.js
slider_path = os.path.join(JS_DIR, "components", "slider.js")
if os.path.exists(slider_path):
    with open(slider_path, "r", encoding="utf-8") as f:
        slider_code = f.read()
    
    slider_code = slider_code.replace("https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css", "/css/swiper-bundle.min.css")
    slider_code = slider_code.replace("https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js", "/js/swiper-bundle.min.js")
    
    with open(slider_path, "w", encoding="utf-8") as f:
        f.write(slider_code)
    print("Updated components/slider.js successfully.")

# 3. Replace scroll-timeline in global.js
global_path = os.path.join(JS_DIR, "global.js")
if os.path.exists(global_path):
    with open(global_path, "r", encoding="utf-8") as f:
        global_code = f.read()
        
    global_code = global_code.replace("https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js", "/js/scroll-timeline.js")
    
    with open(global_path, "w", encoding="utf-8") as f:
        f.write(global_code)
    print("Updated global.js successfully.")
