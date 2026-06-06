filepath = "public/css/caps-layout.css"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

keywords = [".logo_component", ".navbar_logo-wrapper", ".navbar_container"]
for kw in keywords:
    print(f"--- Matches for {kw} ---")
    start_pos = 0
    while True:
        pos = content.find(kw, start_pos)
        if pos == -1:
            break
        print(content[max(0, pos-100):min(len(content), pos+300)])
        print("========")
        start_pos = pos + len(kw)
