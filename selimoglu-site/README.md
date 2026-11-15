# selimoglu.org

Static personal website. `index.html`, `portrait.jpg`, and `sitemap.xml` are the production files; no build or dependencies are required.

Preview locally from this directory with `python -m http.server 8765`, then open `http://localhost:8765/`. Deploy the three files to the cPanel document root for selimoglu.org, preserving the existing `nope/` directory and unrelated server configuration. Do not include this README in the public document root. The site links to public GitHub projects and LinkedIn. Update `sitemap.xml`'s `lastmod` when the homepage content changes.
