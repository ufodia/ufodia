"""Package referenced public delivery files only. Does not deploy anything."""
from argparse import ArgumentParser
from html.parser import HTMLParser
from pathlib import Path
import re
import zipfile

ROOT = Path(__file__).resolve().parents[1]


class Assets(HTMLParser):
    def __init__(self):
        super().__init__()
        self.paths = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        values = [attrs.get('src', ''), attrs.get('href', '')]
        values += [item.strip().split()[0] for item in attrs.get('srcset', '').split(',') if item.strip()]
        for value in values:
            if value.startswith('/assets/'):
                self.paths.add(value.lstrip('/'))


parser = ArgumentParser(description=__doc__)
parser.add_argument('--output', type=Path, required=True)
args = parser.parse_args()
assets = Assets()
for name in ('index.html', 'tr/index.html'):
    page = (ROOT / name).read_text(encoding='utf-8')
    assets.feed(page)
    # Fonts are referenced from the inline stylesheet rather than from an attribute.
    assets.paths.update(path.lstrip('/') for path in re.findall(r'url\((/assets/[^)\s]+)\)', page))
# Sharing images are referenced by absolute URL. The previous card stays published for links cached with it.
assets.paths.update(('assets/social-share-v2.jpg', 'assets/social-share-v1.png'))
# The Open Font License asks that its text travel with the font files.
assets.paths.update(path.relative_to(ROOT).as_posix() for path in (ROOT / 'assets/fonts').glob('OFL-*.txt'))
verification = ['BingSiteAuth.xml'] if (ROOT / 'BingSiteAuth.xml').is_file() else []
files = sorted(assets.paths) + verification + ['robots.txt', 'llms.txt', 'sitemap.xml', 'tr/index.html', 'index.html']
for name in files:
    target = (ROOT / name).resolve()
    if not target.is_relative_to(ROOT) or not target.is_file():
        raise SystemExit('Missing or invalid delivery file: ' + name)
with zipfile.ZipFile(args.output, 'w', zipfile.ZIP_DEFLATED) as archive:
    for name in files:
        archive.write(ROOT / name, name)
print(f'{args.output}: {len(files)} public files, {args.output.stat().st_size:,} bytes')
