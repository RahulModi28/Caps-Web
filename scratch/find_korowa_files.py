import os

ignore_dirs = {"node_modules", ".next", ".git", ".superpowers"}

for root, dirs, files in os.walk("."):
    dirs[:] = [d for d in dirs if d not in ignore_dirs]
    for d in dirs:
        if "korowa" in d.lower():
            print(f"Directory: {os.path.join(root, d)}")
    for file in files:
        if "korowa" in file.lower():
            print(f"File: {os.path.join(root, file)}")
