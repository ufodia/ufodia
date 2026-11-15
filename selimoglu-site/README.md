# Selimoglu Idea Foundry

Static bilingual website for selimoglu.org. English is the default and visitors can switch to Turkish. No build or dependencies are required.

An explicit language choice is saved in this browser and included in the URL (`?lang=en` or `?lang=tr`) so it can be shared. With no saved choice or language parameter, the site opens in English. Project controls progressively enhance the public repository links; all projects remain available without JavaScript. Respect the visitor's reduced-motion preference.

Preview from this directory with `python -m http.server 8765` and open `http://localhost:8765/`. Deploy `index.html`, `sitemap.xml`, and referenced WebP/SVG assets (including `assets/projects/`) to the cPanel document root. Preserve `nope/`, existing verification files, and unrelated server configuration. Do not deploy this README or PNG masters. Update the sitemap `lastmod` when the homepage content changes. Concept art was generated with OpenAI image generation; the brand mark is editable SVG.

The twelve-project collection supports topic/name search across both languages, category filtering and keyboard project selection. Eleven projects have real screenshot previews with an accessible enlargement dialog and a link to the original image. IntentWeft links to its local setup and worked example. See `ASSETS.md` for screenshot provenance and demo verification scope.

Production uses the `-v2` SVG mark and responsive WebP images. Keep the source PNGs for recovery; they do not need uploading. The hero concept is a titanium ribbon evolving from filaments into an engineered S-like form; the process concept is fragments passing through glass frames into a resolved structure. Both were generated with the built-in OpenAI image tool, with no people, facility claims, text, or third-party branding.
