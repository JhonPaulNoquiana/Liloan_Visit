"""Validate local HTML references, fragments, CSS URLs, and JS redirects."""

from html.parser import HTMLParser
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.references = []
        self.ids = set()
        self.feed(path.read_text(encoding="utf-8"))

    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key == "id":
                self.ids.add(value)
            if key in ("href", "src", "poster") and value:
                self.references.append(value)


def main():
    pages = {path: Page(path) for path in ROOT.rglob("*.html")}
    errors = []
    checked = 0

    def check(source, value):
        nonlocal checked
        url = urlsplit(value.strip())
        if url.scheme or url.netloc:
            return
        checked += 1
        target = (source.parent / unquote(url.path)).resolve() if url.path else source
        if not target.is_relative_to(ROOT) or not target.is_file():
            errors.append(f"{source.relative_to(ROOT)}: missing target {value}")
            return
        # Check exact casing even on Windows, since GitHub Pages is case-sensitive.
        exact = ROOT
        for part in target.relative_to(ROOT).parts:
            if part not in {child.name for child in exact.iterdir()}:
                errors.append(f"{source.relative_to(ROOT)}: incorrect casing {value}")
                break
            exact /= part
        if url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
            errors.append(f"{source.relative_to(ROOT)}: missing fragment {value}")

    for path, page in pages.items():
        for value in page.references:
            check(path, value)
    for path in (ROOT / "assets/css").glob("*.css"):
        for match in re.finditer(r"url\(\s*(['\"]?)(.*?)\1\s*\)", path.read_text(encoding="utf-8")):
            check(path, match[2])
    # Redirects resolve against the page that loads a script.
    for path, page in pages.items():
        for value in page.references:
            if value.endswith(".js") and not urlsplit(value).scheme:
                script = (path.parent / value).resolve()
                if script.is_file():
                    for match in re.finditer(r"window\.location\.href\s*=\s*(['\"])(.*?)\1", script.read_text(encoding="utf-8")):
                        check(path, match[2])
    if errors:
        print("\n".join(errors))
        return 1
    print(f"Validated {checked} local references across {len(pages)} HTML pages: all passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
