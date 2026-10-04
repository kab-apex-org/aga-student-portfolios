#!/usr/bin/env python3
"""Move embedded student artwork images into small, cacheable files."""

from __future__ import annotations

import base64
import hashlib
import io
import json
import re
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
WORKS = ROOT / "works"
ASSETS = WORKS / "assets"
THUMBS = ROOT / "assets" / "thumbs"
DATA_IMAGE = re.compile(r"data:image/(png|jpe?g|webp|gif);base64,([A-Za-z0-9+/=]+)", re.I)


def optimize_work(path: Path) -> None:
    source = path.read_text(encoding="utf-8")
    urls: list[str] = []
    ASSETS.mkdir(parents=True, exist_ok=True)

    def replace(match: re.Match[str]) -> str:
        kind = match.group(1).lower()
        raw = base64.b64decode(match.group(2))
        digest = hashlib.sha256(raw).hexdigest()[:12]
        extension = "webp" if kind == "png" else "jpg" if kind in ("jpg", "jpeg") else kind
        name = f"{path.stem}-{digest}.{extension}"
        target = ASSETS / name
        if not target.exists():
            if kind == "png":
                Image.open(io.BytesIO(raw)).save(target, "WEBP", quality=90, method=4)
            else:
                target.write_bytes(raw)
        url = f"assets/{name}"
        if url not in urls:
            urls.append(url)
        return url

    updated = DATA_IMAGE.sub(replace, source)
    if updated == source:
        return

    if "data-portfolio-preload" not in updated:
        preload = f"""<script data-portfolio-preload>
window.addEventListener('load', () => {{
  const preload = () => {json.dumps(urls, ensure_ascii=False)}.forEach(src => {{
    const image = new Image();
    image.src = src;
  }});
  if ('requestIdleCallback' in window) requestIdleCallback(preload, {{ timeout: 1500 }});
  else setTimeout(preload, 500);
}});
</script>
"""
        updated = updated.replace("</body>", preload + "</body>")
    path.write_text(updated, encoding="utf-8")
    print(f"{path.name}: {len(source):,} -> {len(updated):,} characters, {len(urls)} images")


def optimize_thumbnails() -> None:
    total_before = total_after = 0
    for png in sorted(THUMBS.glob("*.png")):
        webp = png.with_suffix(".webp")
        if not webp.exists() or png.stat().st_mtime_ns > webp.stat().st_mtime_ns:
            Image.open(png).save(webp, "WEBP", quality=88, method=4)
        total_before += png.stat().st_size
        total_after += webp.stat().st_size
    print(f"Thumbnails: {total_before:,} -> {total_after:,} bytes")


if __name__ == "__main__":
    for work in sorted(WORKS.glob("*.html")):
        optimize_work(work)
    optimize_thumbnails()
