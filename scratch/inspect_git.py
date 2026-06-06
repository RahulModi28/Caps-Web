import subprocess

try:
    output = subprocess.check_output(
        ["git", "log", "-S", "gsap_split_letter-mask", "-p"],
        stderr=subprocess.STDOUT
    ).decode("utf-8")
    print(output[:5000]) # print first 5000 characters
except Exception as e:
    print("Error:", e)
