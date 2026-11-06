#!/usr/bin/env python3
"""Download latin woff2 files for src/fonts (see src/fonts/README.md)."""
import hashlib, json, pathlib, re, sys, urllib.request

UA = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/104.0.0.0 Safari/537.36"
)
OUT = pathlib.Path(__file__).resolve().parents[1] / "src" / "fonts"
QUERIES = {
    "bricolage-grotesque": "family=Bricolage+Grotesque:wght@500..800&display=swap",
    "figtree": "family=Figtree:wght@400..700&display=swap",
    "jetbrains-mono": "family=JetBrains+Mono:wght@400..500&display=swap",
    "space-grotesk": "family=Space+Grotesk:wght@300..700&display=swap",
    "instrument-serif": "family=Instrument+Serif:ital@0;1&display=swap",
    "instrument-sans": "family=Instrument+Sans:wght@400..700&display=swap",
}


def fetch(url: str, binary: bool = False):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as response:
        data = response.read()
    return data if binary else data.decode("utf-8", "replace")


def is_latin(face: str) -> bool:
    match = re.search(r"unicode-range:\s*([^;]+)", face)
    return bool(match and ("U+0000-00FF" in match.group(1) or match.group(1).strip().startswith("U+0000")))


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for stale in OUT.glob("*.woff2"):
        stale.unlink()
    manifest = {}
    for stem, query in QUERIES.items():
        css = fetch(f"https://fonts.googleapis.com/css2?{query}")
        if "font?kit=" in css:
            raise SystemExit(f"{stem}: Google returned extensionless kit URLs; retry later")
        faces = [face for face in re.split(r"@font-face\s*\{", css)[1:] if is_latin(face)]
        if not faces:
            raise SystemExit(f"{stem}: no latin @font-face blocks")
        entries, seen = [], set()
        for face in faces:
            url = re.search(r"src:\s*url\(([^)]+)\)", face).group(1).strip("\"'")
            if url in seen:
                continue
            seen.add(url)
            weight = (re.search(r"font-weight:\s*([\d ]+)", face) or [None, "400"])[1].strip()
            style = (re.search(r"font-style:\s*(\w+)", face) or [None, "normal"])[1]
            fname = f"{stem}-{weight.replace(' ', '')}-{style}.woff2"
            blob = fetch(url, binary=True)
            if not blob.startswith(b"wOF2"):
                raise SystemExit(f"{fname}: not a woff2 payload")
            (OUT / fname).write_bytes(blob)
            entries.append(
                {
                    "file": fname,
                    "weight": weight,
                    "style": style,
                    "sha256": hashlib.sha256(blob).hexdigest(),
                    "bytes": len(blob),
                }
            )
            print(f"saved {fname} ({len(blob)} bytes)")
        manifest[stem] = entries
    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print("ok", {name: len(files) for name, files in manifest.items()})


if __name__ == "__main__":
    main()
