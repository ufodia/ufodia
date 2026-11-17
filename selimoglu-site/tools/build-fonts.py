"""Build the two self-hosted web fonts from their upstream variable TTFs.

Authoring-only; the deployed static site has no Python dependency.
Needs fonttools and brotli (see requirements-assets.txt).

Upstream sources (SIL Open Font License 1.1, no reserved font names):
  https://github.com/google/fonts/tree/main/ofl/fraunces
      Fraunces[SOFT,WONK,opsz,wght].ttf
  https://github.com/google/fonts/tree/main/ofl/instrumentsans
      InstrumentSans[wdth,wght].ttf

Run from selimoglu-site:
  python tools/build-fonts.py --fraunces path/to/Fraunces.ttf --instrument path/to/InstrumentSans.ttf

Each family ships as one WOFF2 holding only the characters the EN and TR pages
use. Unused axes are pinned or narrowed so the files stay small:
  Fraunces         display only: wght 100-700, SOFT 0-100, opsz pinned to 72, WONK to 0
  Instrument Sans  text and controls: wght 400-700, wdth pinned to 100
Keeping Fraunces' opsz axis would roughly double its size (82 KB against 45 KB).
"""
from argparse import ArgumentParser
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

OUT = Path(__file__).resolve().parents[1] / "assets" / "fonts"

TURKISH = [0x011E, 0x011F, 0x0130, 0x0131, 0x015E, 0x015F]
QUOTES = [0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2026]
# Text face: Basic Latin, Latin-1, Turkish, typographic punctuation, bullet and arrows.
TEXT = (list(range(0x20, 0x7F)) + list(range(0xA0, 0x100)) + TURKISH + QUOTES
        + [0x2022, 0x2190, 0x2191, 0x2192, 0x2193, 0x2196, 0x2197, 0x2198, 0x2199])
# Display face: Basic Latin plus only the accented letters Turkish and English headings need.
DISPLAY = (list(range(0x20, 0x7F)) + TURKISH + QUOTES
           + [0xA0, 0xAB, 0xB7, 0xBB, 0xC2, 0xC7, 0xC9, 0xCE, 0xD6, 0xDB, 0xDC, 0xE2, 0xE7, 0xE9, 0xEE, 0xF6, 0xFB, 0xFC])
FEATURES = ["kern", "liga", "locl", "ccmp", "mark", "mkmk", "calt", "tnum", "lnum", "pnum", "case"]


def build(source, target, limits, unicodes):
    font = TTFont(source)
    font = instancer.instantiateVariableFont(font, limits)
    options = subset.Options()
    options.layout_features = FEATURES
    options.flavor = "woff2"
    options.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14]
    options.notdef_outline = True
    options.desubroutinize = True
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=unicodes)
    subsetter.subset(font)
    font.flavor = "woff2"
    OUT.mkdir(parents=True, exist_ok=True)
    font.save(OUT / target)
    axes = [(axis.axisTag, axis.minValue, axis.maxValue) for axis in font["fvar"].axes]
    missing = [hex(code) for code in unicodes if code not in font.getBestCmap()]
    print(f"{target}\t{(OUT / target).stat().st_size:,} bytes\taxes {axes}\tnot in font {missing}")


def main():
    parser = ArgumentParser(description=__doc__)
    parser.add_argument("--fraunces", type=Path, required=True)
    parser.add_argument("--instrument", type=Path, required=True)
    args = parser.parse_args()
    build(args.fraunces, "fraunces-v1.woff2", {"WONK": 0, "opsz": 72, "wght": (100, 700)}, DISPLAY)
    build(args.instrument, "instrument-sans-v1.woff2", {"wdth": 100, "wght": (400, 700)}, TEXT)


if __name__ == "__main__":
    main()
