# Selimoglu Idea Foundry

Static bilingual portfolio for https://selimoglu.org/. English lives at `/`; Turkish at `/tr/`. Both contain complete visible HTML, reciprocal language alternatives and self canonical URLs. Language follows the URL, not a saved browser preference. Old `?lang=en/tr` links remain supported by the enhancement script.

## Source and preview

Edit `src/page.html` for content/styles and `assets/site-v5.js` for interactions, then run:

```powershell
python tools/build-site.py
python -m http.server 8765 --bind 127.0.0.1
```

The build uses only Python's standard library. It generates `index.html`, `tr/index.html`, `sitemap.xml`, `robots.txt` and `llms.txt`. Do not edit generated files directly. When publishing content changes, update the sitemap's explicit last-modified date in the build script. Preview both `/` and `/tr/`.

This repository directory is the canonical source. The earlier standalone `buy_me_coffee/selimoglu-site` folder is a historical copy, not a publication source.

Project search works across both languages. Category filters, keyboard selection, project fragment links and native screenshot dialogs enhance the HTML. Without JavaScript, every project, screenshot, demo/source link and language link remains available. Public demo scopes and synthetic examples are described in each panel.

## Images

PNG masters, full-size lossless project WebPs and editorial art sources are retained for recovery. Only referenced delivery files are published. `tools/optimize-previews.py` uses Pillow to regenerate 480/800px previews, comparing lossy and lossless encodings and retaining the smaller result. Decision Recheck and Handrail use their compact full original instead of the larger 800px candidate. The full original remains available in the zoom dialog. See `ASSETS.md` for provenance and the social-card renderer.

## Publication

```powershell
python tools/build-site.py
python tools/package-site.py --output site-release.zip
```

Upload the reviewed ZIP to the cPanel document root and extract it there. It contains only public pages, discovery files and referenced assets; assets precede HTML. It excludes `src/`, `tools/`, documentation, PNG masters and unused derivatives. Preserve `nope/`, ownership verification files, `assets/site-v3.js`, `assets/site-v4.js` and unrelated server configuration. Cached older HTML may still request those script versions. The server already provides gzip and one-week image caching; no server configuration change is required.

`BingSiteAuth.xml` is Bing's public site-verification file. Keep it at the production document root; the packaging script includes it when present. It preserves Bing ownership across future deployments without connecting the Search Console account.

The separately reviewed `.htaccess` preserves the existing cPanel PHP handler, redirects HTTP requests for the main hostname to HTTPS (except ACME validation), and sets one-day HSTS without subdomain or preload commitments. Apply this file separately after comparing the current server rules; the content ZIP must not overwrite server configuration. Roll back only the marked Selimoglu HTTPS block if routing fails, and verify `/`, `/tr/`, assets and ownership files from a fresh HTTPS request.

After deployment, verify public HTML/asset hashes and MIME types, both languages, mobile/desktop interactions and PageSpeed results. Submit the production sitemap in Search Console and inspect changed public URLs. Keep sources, assets and recovery scripts integrated into GitHub `main` and record its remote SHA.

## Search and AI discovery

The build publishes accurate WebSite, Organization and project ItemList JSON-LD, a two-URL sitemap and compact `llms.txt` navigation aid. The latter is a community convention, not a search-engine requirement. The robots wildcard policy preserves previous default crawler access while excluding `nope/`; it does not separately change training-crawler policy. No fabricated services, reviews, ratings, legal identity, SearchAction or agent capabilities are declared. Crawl eligibility and valid structured data do not guarantee indexing, ranking or AI citations.

See [the 2026-11-15 search visibility check](SEARCH-VISIBILITY-2026-11-15.md) for verified Bing setup, sitemap processing and actual ChatGPT, Bing Copilot Search and Perplexity observations. Keep brand discovery separate from retrieval after explicitly supplying the domain.

Social preview metadata is in initial HTML with a versioned 1200x630 branded image. Application-specific preview tests remain pending account sign-in at the user's request; do not report them as completed.
