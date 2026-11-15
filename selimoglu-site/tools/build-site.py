"""Build crawlable EN/TR pages and discovery files with Python's standard library.

Run: python tools/build-site.py
Edit src/page.html and assets/site-v3.js, not the generated index pages.
"""
from copy import deepcopy
from dataclasses import dataclass, field
from html import escape
from html.parser import HTMLParser
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://selimoglu.org/'
VOID = set('area base br col embed hr img input link meta param source track wbr'.split())


@dataclass
class Node:
    tag: str
    attrs: dict = field(default_factory=dict)
    children: list = field(default_factory=list)


class Parser(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.root = Node('root')
        self.stack = [self.root]
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        node = Node(tag, dict(attrs))
        self.stack[-1].children.append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]
                break

    def handle_data(self, data):
        self.stack[-1].children.append(data)


def nodes(node):
    yield node
    for child in node.children:
        if isinstance(child, Node):
            yield from nodes(child)


def text(node):
    return ''.join(text(child) if isinstance(child, Node) else child for child in node.children)


def render(node):
    if isinstance(node, str):
        return escape(node, quote=False)
    if node.tag == 'root':
        return ''.join(render(child) for child in node.children)
    attrs = ''.join(' ' + key + ('="' + escape(str(value), quote=True) + '"' if value is not None else '')
                    for key, value in node.attrs.items())
    opening = '<' + node.tag + attrs + '>'
    if node.tag in VOID:
        return opening
    content = ''.join(node.children) if node.tag in ('style', 'script') else ''.join(render(child) for child in node.children)
    return opening + content + '</' + node.tag + '>'


source = Parser((ROOT / 'src/page.html').read_text(encoding='utf-8')).root
source_nodes = list(nodes(source))
panels = {node.attrs['data-panel']: node for node in source_nodes if 'data-panel' in node.attrs}
for option in (node for node in source_nodes if 'data-select' in node.attrs):
    panel = panels[option.attrs['data-select']]
    descriptions = [node for node in nodes(panel) if node.tag == 'p' and 'data-en' in node.attrs][:1]
    labels = [node for node in nodes(option) if 'data-en' in node.attrs] + descriptions
    option.attrs['data-search'] = ' '.join([text(option)] + [node.attrs[lang] for node in labels for lang in ('data-en', 'data-tr')])

descriptions = {
    'en': 'Selimoglu Idea Foundry is an independent software and R&D atelier. Explore open-source experiments in AI review, privacy, documents and practical tools.',
    'tr': 'Selimoglu Idea Foundry bağımsız bir yazılım ve Ar-Ge atölyesidir. Yapay zekâ inceleme, gizlilik, belge ve pratik araç projelerini keşfedin.'
}
titles = {'en': 'Selimoglu Idea Foundry — Ideas take shape', 'tr': 'Selimoglu Idea Foundry — Fikirler şekil alır'}
project_records = []
for language in ('en', 'tr'):
    document = deepcopy(source)
    all_nodes = list(nodes(document))
    for node in all_nodes:
        if 'data-en' in node.attrs and 'data-tr' in node.attrs:
            node.children = [node.attrs['data-' + language]]
        for attr in ('alt', 'aria', 'placeholder'):
            translated = node.attrs.get('data-' + language + '-' + attr)
            if translated is not None:
                node.attrs['aria-label' if attr == 'aria' else attr] = translated
        node.attrs = {key: value for key, value in node.attrs.items() if not key.startswith(('data-en', 'data-tr'))}
        if node.tag == 'html':
            node.attrs['lang'] = language
        if node.tag == 'title':
            node.children = [titles[language]]
        if 'data-lang' in node.attrs:
            node.attrs.pop('aria-pressed', None)
            if node.attrs['data-lang'] == language:
                node.attrs['aria-current'] = 'page'
            else:
                node.attrs.pop('aria-current', None)
        if node.tag == 'meta':
            key = node.attrs.get('name', node.attrs.get('property'))
            if key in ('description', 'og:description', 'twitter:description'):
                node.attrs['content'] = descriptions[language]
            elif key in ('og:title', 'twitter:title'):
                node.attrs['content'] = titles[language]
            elif key == 'og:url':
                node.attrs['content'] = BASE + ('tr/' if language == 'tr' else '')
            elif key == 'og:locale':
                node.attrs['content'] = 'tr_TR' if language == 'tr' else 'en_US'
            elif key == 'og:locale:alternate':
                node.attrs['content'] = 'en_US' if language == 'tr' else 'tr_TR'
            elif key in ('og:image:alt', 'twitter:image:alt') and language == 'tr':
                node.attrs['content'] = 'Selimoglu Idea Foundry logosu. Ideas take shape. Yazılım deneyleri, pratik araçlar ve yeni olasılıklar.'

    page_url = BASE + ('tr/' if language == 'tr' else '')
    head = next(node for node in all_nodes if node.tag == 'head')
    head.children += [Node('link', {'rel': 'canonical', 'href': page_url})]
    head.children += [Node('link', {'rel': 'alternate', 'hreflang': lang, 'href': BASE + path})
                      for lang, path in (('en', ''), ('tr', 'tr/'), ('x-default', ''))]
    items = []
    for position, panel in enumerate((node for node in all_nodes if 'data-panel' in node.attrs), 1):
        descendants = list(nodes(panel))
        name = text(next(node for node in descendants if node.tag == 'h3'))
        copy = next(node for node in descendants if node.attrs.get('class') == 'panel-copy')
        description = text(next(node for node in copy.children if isinstance(node, Node) and node.tag == 'p'))
        repository = next(node.attrs['href'] for node in descendants if node.tag == 'a' and 'source-link' in node.attrs.get('class', ''))
        item = {'@type': 'SoftwareSourceCode', 'name': name, 'description': description,
                'url': page_url + '#' + panel.attrs['id'], 'codeRepository': repository}
        preview = next((node for node in descendants if 'data-preview' in node.attrs), None)
        if preview:
            item['image'] = BASE.rstrip('/') + preview.attrs['href']
        items.append({'@type': 'ListItem', 'position': position, 'item': item})
        if language == 'en':
            project_records.append((name, description, repository))
    graph = {'@context': 'https://schema.org', '@graph': [
        {'@type': 'Organization', '@id': BASE + '#atelier', 'name': 'Selimoglu Idea Foundry',
         'alternateName': 'Selimoglu', 'url': BASE, 'description': descriptions[language],
         'logo': {'@type': 'ImageObject', 'url': BASE + 'assets/foundry-mark-v2-512.png', 'width': 512, 'height': 512}},
        {'@type': 'WebSite', '@id': BASE + '#website', 'url': BASE, 'name': 'Selimoglu Idea Foundry',
         'alternateName': 'Selimoglu', 'inLanguage': ['en', 'tr'], 'publisher': {'@id': BASE + '#atelier'}},
        {'@type': 'CollectionPage', '@id': page_url + '#page', 'url': page_url, 'name': titles[language],
         'description': descriptions[language], 'inLanguage': language, 'isPartOf': {'@id': BASE + '#website'},
         'about': {'@id': BASE + '#atelier'}, 'mainEntity': {'@type': 'ItemList', 'numberOfItems': len(items), 'itemListElement': items}}
    ]}
    head.children.append(Node('script', {'type': 'application/ld+json'}, [json.dumps(graph, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')]))
    destination = ROOT / ('tr/index.html' if language == 'tr' else 'index.html')
    destination.parent.mkdir(exist_ok=True)
    destination.write_text('<!doctype html>\n' + render(document).strip() + '\n', encoding='utf-8')
    print(destination.relative_to(ROOT), destination.stat().st_size, 'bytes')

(ROOT / 'sitemap.xml').write_text('''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://selimoglu.org/</loc><lastmod>2026-11-15</lastmod></url>
  <url><loc>https://selimoglu.org/tr/</loc><lastmod>2026-11-15</lastmod></url>
</urlset>
''', encoding='utf-8')
(ROOT / 'robots.txt').write_text('User-agent: *\nDisallow: /nope/\n\nSitemap: https://selimoglu.org/sitemap.xml\n', encoding='utf-8')
overview = '''# Selimoglu Idea Foundry

> Selimoglu is an independent software and R&D atelier exploring AI review, privacy, documents and practical tools.

## Website
- [English](https://selimoglu.org/): Project collection, real interface screenshots, public demos and source links.
- [Türkçe](https://selimoglu.org/tr/): Projeler, gerçek ekran görüntüleri, canlı demolar ve kaynak bağlantıları.

## Public projects
'''
overview += '\n'.join(f'- [{name}]({url}): {description}' for name, description, url in project_records)
overview += '\n\n## Context\nThe website labels conceptual artwork separately from real project screenshots. Hosted demos use examples; IntentWeft is a local developer skill/CLI with setup and worked-review links. Project panels explain limitations. This file is a concise navigation aid, not a guarantee of indexing or AI citation.\n'
(ROOT / 'llms.txt').write_text(overview, encoding='utf-8')
