# selimoglu.org

A static bilingual personal website. `index.html` and `sitemap.xml` are the production files; no build or dependencies are required. English is the default; the visitor can switch to Turkish.

Preview locally from this directory with `python -m http.server 8765`, then open `http://localhost:8765/`. Deploy the two files to the cPanel document root for selimoglu.org, preserving the existing `nope/` directory and unrelated server configuration. Do not include this README in the public document root. Update `sitemap.xml`'s `lastmod` when the homepage content changes.
