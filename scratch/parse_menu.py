from html.parser import HTMLParser

class MenuParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_dialog = False
        self.dialog_depth = 0

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == "dialog" and attrs_dict.get("data-dialog-id") == "nav-menu":
            self.in_dialog = True
            
        if self.in_dialog:
            self.dialog_depth += 1
            classes = attrs_dict.get("class", "")
            src = attrs_dict.get("src", "")
            id_val = attrs_dict.get("id", "")
            # We want to check for any images, SVGs, or divs that might contain background images or classes like "crest-wrapper"
            if tag in ["img", "svg", "use"] or "logo" in classes or "crest" in classes or "logo" in id_val or "crest" in id_val:
                print(f"MATCH inside dialog - Tag: {tag}, Class: {classes}, Src: {src}, Id: {id_val}, Attrs: {attrs_dict}")

    def handle_endtag(self, tag):
        if self.in_dialog:
            self.dialog_depth -= 1
            if self.dialog_depth == 0:
                self.in_dialog = False

with open("app/korowa-body.html") as f:
    parser = MenuParser()
    parser.feed(f.read())
