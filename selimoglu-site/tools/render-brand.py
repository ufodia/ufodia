"""Render the raster brand assets from their SVG sources with a headless Chromium browser.

Authoring-only; the deployed static site has no Python dependency.
Run from selimoglu-site:  python tools/render-brand.py
Optional: --browser "C:/Program Files/Google/Chrome/Application/chrome.exe"

  assets/foundry-mark-v3.svg   -> assets/foundry-mark-v3-512.png  (512x512, transparent corners)
  assets/social-share-v2.svg   -> assets/social-share-v2.jpg      (1200x630)

The sharing card loads the site's own fonts and hero artwork by relative URL, so the
script serves this directory on a temporary local port while the browser captures it.
A browser is used because it is the only renderer here that honours the variable-font
axes the headline relies on. Pillow (see requirements-assets.txt) encodes the JPEG.
"""
from argparse import ArgumentParser
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import subprocess
import tempfile
import threading

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BROWSERS = (
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
)


class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def capture(browser, profile, url, target, width, height, transparent=False):
    command = [
        str(browser), '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
        '--force-device-scale-factor=1', f'--window-size={width},{height}',
        '--virtual-time-budget=6000', f'--user-data-dir={profile}', f'--screenshot={target}',
    ]
    if transparent:
        command.append('--default-background-color=00000000')
    subprocess.run(command + [url], check=True, timeout=90, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    with Image.open(target) as image:
        image.load()
        if image.size != (width, height):
            raise SystemExit(f'{target.name}: expected {width}x{height}, got {image.size}')


def main():
    parser = ArgumentParser(description=__doc__)
    parser.add_argument('--browser', type=Path, default=next((Path(p) for p in BROWSERS if Path(p).is_file()), None))
    args = parser.parse_args()
    if not args.browser or not args.browser.is_file():
        raise SystemExit('No Chromium browser found; pass --browser.')
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    base = f'http://127.0.0.1:{server.server_address[1]}/assets/'
    assets = ROOT / 'assets'
    try:
        with tempfile.TemporaryDirectory() as work:
            profile = Path(work) / 'profile'
            mark = assets / 'foundry-mark-v3-512.png'
            capture(args.browser, profile, base + 'foundry-mark-v3.svg', mark, 512, 512, transparent=True)
            with Image.open(mark) as image:
                rgba = image.convert('RGBA')
            corner = rgba.getpixel((2, 2))[3]
            rgba.save(mark, 'PNG', optimize=True)
            print(f'{mark.name}\t{mark.stat().st_size:,} bytes\tcorner alpha {corner}')
            card = Path(work) / 'card.png'
            capture(args.browser, profile, base + 'social-share-v2.svg', card, 1200, 630)
            target = assets / 'social-share-v2.jpg'
            with Image.open(card) as image:
                image.convert('RGB').save(target, 'JPEG', quality=90, optimize=True, progressive=True, subsampling=0)
            print(f'{target.name}\t{target.stat().st_size:,} bytes')
    finally:
        server.shutdown()


if __name__ == '__main__':
    main()
