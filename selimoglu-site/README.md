# Selimoglu Idea Foundry

Static bilingual portfolio for https://selimoglu.org/. English lives at `/`; Turkish at `/tr/`. Both contain complete visible HTML, reciprocal language alternatives and self canonical URLs. Language follows the URL, not a saved browser preference. Old `?lang=en/tr` links remain supported by the enhancement script.

## Source and preview

Edit `src/page.html` for content/styles and `assets/site-v6.js` for interactions, then run:

```powershell
python tools/build-site.py
python -m http.server 8765 --bind 127.0.0.1
```

The build uses only Python's standard library. It generates `index.html`, `tr/index.html`, `sitemap.xml`, `robots.txt` and `llms.txt`. Do not edit generated files directly. Copy may cite the collection's size as `{projects}` and `{demos}`; the build counts the project panels and hosted demos and fills both in, so the numbers cannot drift. When publishing content changes, update the sitemap's explicit last-modified date in the build script. Preview both `/` and `/tr/`.

This repository directory is the canonical source. The earlier standalone `buy_me_coffee/selimoglu-site` folder is a historical copy, not a publication source.

Project search works across both languages. Category filters, keyboard selection, project fragment links and native screenshot dialogs enhance the HTML. Without JavaScript, every project, screenshot, demo/source link and language link remains available. Public demo scopes and synthetic examples are described in each panel.

## Design and motion

The palette comes from the artwork and the mark: midnight and titanium are sampled from the hero image, and chartreuse is the mark's seed. The mark itself (`assets/foundry-mark-v3.svg`) is the hero sculpture reduced to a sign: the faceted S drawn as a folded titanium ribbon with the seed at its tip. Display type is Fraunces and text is Instrument Sans, both self-hosted from `assets/fonts/` as single subset WOFF2 files (74 KB together) with metric-matched Georgia and Arial fallbacks. `tools/build-fonts.py` rebuilds them from the upstream variable TTFs; see `ASSETS.md`.

One idea runs through the motion: things arrive loose and resolve. The hero line goes from a light, soft cut to a heavy, sharp one across its three words and animates the same way on load, section headings do the same as they enter, and a canvas of live filaments flows from the page edge into the sculpture, continuing the lines painted in the artwork. The canvas pauses when the hero is off screen or the tab is hidden.

A script in the head adds `.motion` to the root only when reduced motion is not requested, and every rule that hides or moves content needs that class. With reduced motion, or without JavaScript, the page renders in its final state and the filaments are drawn once as a still frame. Scroll-triggered states are armed by `site-v6.js` itself, so a script that fails to load cannot leave content hidden.

The accessibility review in the repository root describes the layout before this redesign. Keyboard behaviour, the tab pattern, focus rings per surface, reflow breakpoints and forced-colours rules were carried over, but the measurements in that review have not been repeated.

## Images

PNG masters, full-size lossless project WebPs and editorial art sources are retained for recovery. The hero is shown whole and dissolves into the page at its left and lower edges; below 900px a portrait crop of the same master (`foundry-hero-v2-portrait*.webp`) keeps the sculpture large. Only referenced delivery files are published. `tools/optimize-previews.py` uses Pillow to regenerate 480/800px previews, comparing lossy and lossless encodings and retaining the smaller result. Decision Recheck and Handrail use their compact full original instead of the larger 800px candidate. The full original remains available in the zoom dialog. See `ASSETS.md` for provenance and the social-card renderer.

## Publication

```powershell
python tools/build-site.py
python tools/package-site.py --output site-release.zip
```

Upload the reviewed ZIP to the cPanel document root and extract it there. It contains only public pages, discovery files and referenced assets; assets precede HTML. It excludes `src/`, `tools/`, documentation, PNG masters and unused derivatives. Preserve `nope/`, ownership verification files, `assets/site-v3.js`, `assets/site-v4.js`, `assets/site-v5.js` and unrelated server configuration. Cached older HTML may still request those script versions. The server already provides gzip and one-week image caching; no server configuration change is required. The font files are new: after the first deployment, check that `.woff2` is served as `font/woff2`, and change the versioned file name rather than overwriting a font behind a cached URL.

`BingSiteAuth.xml` is Bing's public site-verification file. Keep it at the production document root; the packaging script includes it when present. It preserves Bing ownership across future deployments without connecting the Search Console account.

The separately reviewed `.htaccess` preserves the existing cPanel PHP handler, redirects HTTP requests for the main hostname to HTTPS (except ACME validation), and sets one-day HSTS without subdomain or preload commitments. Apply this file separately after comparing the current server rules; the content ZIP must not overwrite server configuration. Roll back only the marked Selimoglu HTTPS block if routing fails, and verify `/`, `/tr/`, assets and ownership files from a fresh HTTPS request.

After deployment, verify public HTML/asset hashes and MIME types, both languages, mobile/desktop interactions and PageSpeed results. Submit the production sitemap in Search Console and inspect changed public URLs. Keep sources, assets and recovery scripts integrated into GitHub `main` and record its remote SHA.

## Search and AI discovery

The build publishes accurate WebSite, Organization and project ItemList JSON-LD, a two-URL sitemap and compact `llms.txt` navigation aid. The latter is a community convention, not a search-engine requirement. The robots wildcard policy preserves previous default crawler access while excluding `nope/`; it does not separately change training-crawler policy. No fabricated services, reviews, ratings, legal identity, SearchAction or agent capabilities are declared. Crawl eligibility and valid structured data do not guarantee indexing, ranking or AI citations.

See [the 2026-11-15 search visibility check](SEARCH-VISIBILITY-2026-11-15.md) for verified Bing setup, sitemap processing and actual ChatGPT, Bing Copilot Search and Perplexity observations. Keep brand discovery separate from retrieval after explicitly supplying the domain.

Social preview metadata is in initial HTML with a versioned 1200x630 branded image (`social-share-v2.jpg`, rendered by `tools/render-brand.py`). Application-specific preview tests remain pending account sign-in at the user's request; do not report them as completed.
