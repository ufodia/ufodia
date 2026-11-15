"""Build responsive screenshot previews without changing the original captures.

From selimoglu-site: python tools/optimize-previews.py
Optional authoring dependency: Pillow (already installed in the development host).
The deployed static site has no Python dependency. Full-size PNG and WebP files
remain untouched; only the corresponding -480.webp and -800.webp files are written.
At each width the smaller of quality-88 and lossless WebP is retained, preserving
sharp screenshot text without unnecessary encoding bloat. No crop or retouching.
"""
from io import BytesIO
from pathlib import Path
from PIL import Image

PROJECTS = (
    "decision-recheck", "sheet-sentry", "cutonce", "agent-crash-lab", "handrail",
    "boss-rehearsal", "fact-fuse", "invented-detail-swipe", "locale-crash",
    "paper-surgery", "memory-mirror",
)
ASSETS = Path(__file__).resolve().parents[1] / "assets" / "projects"


def main():
    totals = {"original": 0, 480: 0, 800: 0}
    for name in PROJECTS:
        source = ASSETS / f"{name}.png"
        full = ASSETS / f"{name}.webp"
        full_size = full.stat().st_size
        totals["original"] += full_size
        with Image.open(source) as capture:
            for width in (480, 800):
                target_width = min(width, capture.width)
                target_height = round(capture.height * target_width / capture.width)
                preview = capture.convert("RGB").resize(
                    (target_width, target_height), Image.Resampling.LANCZOS
                )
                lossy, lossless = BytesIO(), BytesIO()
                preview.save(lossy, "WEBP", quality=88, method=6)
                preview.save(lossless, "WEBP", lossless=True, method=6)
                candidates = {"q88": lossy.getvalue(), "lossless": lossless.getvalue()}
                mode = min(candidates, key=lambda candidate: len(candidates[candidate]))
                target = ASSETS / f"{name}-{width}.webp"
                target.write_bytes(candidates[mode])
                with Image.open(target) as verified:
                    verified.load()
                    assert verified.size == (target_width, target_height)
                size = target.stat().st_size
                totals[width] += size
                note = " (full original is smaller)" if size > full_size else ""
                print(f"{target.name}\t{target_width}x{target_height}\t{size} bytes\t{mode}{note}")
    print("TOTALS", totals)


if __name__ == "__main__":
    main()
