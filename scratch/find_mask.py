import os

ignore_dirs = {"node_modules", ".next", ".git", ".superpowers"}

for root, dirs, files in os.walk("."):
    dirs[:] = [d for d in dirs if d not in ignore_dirs]
    for file in files:
        if file.endswith((".html", ".css", ".js", ".tsx", ".ts")):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                if "gsap_split_letter-mask" in content:
                    print(f"Found in: {filepath}")
            except Exception:
                pass
