import os
import re

ignore_dirs = {"node_modules", ".next", ".git", ".superpowers"}
selectors = [r"\.logo_component", r"\.navbar_logo-wrapper", r"\.navbar_container"]

for root, dirs, files in os.walk("."):
    dirs[:] = [d for d in dirs if d not in ignore_dirs]
    for file in files:
        if file.endswith((".html", ".css")):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                for sel in selectors:
                    matches = list(re.finditer(sel, content))
                    if matches:
                        print(f"File {filepath} matches selector {sel} ({len(matches)} times)")
            except Exception:
                pass
