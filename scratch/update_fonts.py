filepath = "/Users/rahulmodi/Desktop/CAPS WEB/public/css/caps-shared.css"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# CDN URLs to replace
url_pangaia = "https://cdn.prod.website-files.com/689b9231663a4f08a91a5f03/689bceac5c887651bf289432_PPPangaia-LightItalic.woff2"
url_dmsans_normal = "https://cdn.prod.website-files.com/689b9231663a4f08a91a5f03/689c17691febf79eb48376ae_DMSans-VariableFont_opsz%2Cwght.woff2"
url_dmsans_italic = "https://cdn.prod.website-files.com/689b9231663a4f08a91a5f03/689c21287ced7c3c645cefbb_DMSans-Italic-VariableFont_opsz%2Cwght.woff2"

# Also try URL-encoded variants (with %2C instead of ,)
url_dmsans_normal_encoded = "https://cdn.prod.website-files.com/689b9231663a4f08a91a5f03/689c17691febf79eb48376ae_DMSans-VariableFont_opsz%2Cwght.woff2"
url_dmsans_italic_encoded = "https://cdn.prod.website-files.com/689b9231663a4f08a91a5f03/689c21287ced7c3c645cefbb_DMSans-Italic-VariableFont_opsz%2Cwght.woff2"

replaces = [
    (url_pangaia, "/fonts/PPPangaia-LightItalic.woff2"),
    (url_dmsans_normal, "/fonts/DMSans-VariableFont_opsz,wght.woff2"),
    (url_dmsans_italic, "/fonts/DMSans-Italic-VariableFont_opsz,wght.woff2"),
    (url_dmsans_normal_encoded, "/fonts/DMSans-VariableFont_opsz,wght.woff2"),
    (url_dmsans_italic_encoded, "/fonts/DMSans-Italic-VariableFont_opsz,wght.woff2")
]

for old, new in replaces:
    # try replacing URL-encoded forms as well
    content = content.replace(old, new)
    content = content.replace(old.replace(",", "%2C"), new)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Font replacement complete!")
