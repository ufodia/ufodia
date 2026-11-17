# Visual assets

The active identity is `assets/foundry-mark-v3.svg`, an original editable vector mark. It keeps the outline of the earlier faceted S exactly, and now draws it as one titanium ribbon folded into seven faces on a midnight tile, with the chartreuse seed cut like a crystal at the ribbon's tip. That is the hero sculpture reduced to a mark: the same materials, the same fold, the same seed. `foundry-mark-v3-512.png` is its raster icon with transparent corners. The v2 mark (flat ivory S on navy) and earlier variants are retained as source history, and v2 stays published because the first sharing card and cached pages refer to it.

The active editorial images were generated with the built-in OpenAI image tool. They illustrate concepts and do not depict real facilities or products. PNG files retain the generated masters; the WebP encodings and 800px variants are the website delivery assets.

## Typefaces

Fraunces (display) and Instrument Sans (text and controls) are used under the SIL Open Font License 1.1; neither declares a reserved font name. The licence texts ship beside the fonts as `assets/fonts/OFL-Fraunces.txt` and `assets/fonts/OFL-InstrumentSans.txt`.

`tools/build-fonts.py` produces the two delivery files from the upstream variable TTFs in the Google Fonts repository (`ofl/fraunces` and `ofl/instrumentsans`), retrieved on 2026-11-16. The upstream TTFs are not kept in this repository.

| Delivery file | Size | Kept | Removed |
| --- | --- | --- | --- |
| `fraunces-v1.woff2` | 45 KB | weight 100-700, softness 0-100, Basic Latin plus the Turkish and accented letters headings use | optical-size axis pinned to 72, "wonk" axis pinned to 0, italics |
| `instrument-sans-v1.woff2` | 29 KB | weight 400-700, Basic Latin, Latin-1, Turkish letters, typographic punctuation and arrows | width axis pinned to 100, italics |

Because Fraunces carries only the display character set, keep it to headings; body copy in other scripts or with unusual symbols belongs in Instrument Sans.

## Hero prompt

Create an art-directed hero for Selimoglu Idea Foundry, an independent software, technology and R&D idea atelier. One continuous precision-folded brushed titanium ribbon evolves from loose fine filament sketches into a sharply resolved architectural S-like object with translucent optical glass. Communicate a thought becoming an engineered artifact. Dark midnight navy studio, restrained chartreuse light, ivory reflections, tactile realism, controlled dramatic side-light, wide landscape with negative space. No people, facility, robot, brain, stock circuitry, screens, legible text, logo or watermark.

Files: `foundry-hero-v2.png`, `foundry-hero-v2.webp`, `foundry-hero-v2-800.webp`. `foundry-hero-v2-portrait.webp` and `foundry-hero-v2-portrait-640.webp` are an unretouched crop of the same master (x 540 to 1672, full height) for narrow screens.

The filaments that move across the hero are drawn by `assets/site-v6.js` on a canvas over the image. They are code, not part of the generated artwork, and converge on the point where the painted filaments meet the ribbon.

## Process prompt

Create a premium editorial still life about structured thinking: translucent glass planes and precision-machined titanium frames progress from an open fragmented stack to a resolved geometric form, with fine chartreuse threads connecting selected nodes. Evoke software logic, evidence, iteration and invention through physical materials. Ivory stone plinths, cobalt shadows, restrained green accents, soft daylight, crisp detail, landscape composition. No humans, rooms, third-party logos, text, numbers, watermark or circuitry. Conceptual art, not a product screenshot.

Files: `foundry-process-v2.png`, `foundry-process-v2.webp`, `foundry-process-v2-800.webp`.

## GitHub showcase concept

Generated editorial artwork for the repository showcase: interlocking dark titanium rings and luminous glass threads represent collaboration and ideas taking shape. It is conceptual illustration, not a product screenshot. `foundry-constellation-v1.png` is the master; `foundry-constellation-v1.webp` and the 800px `foundry-constellation-v1-800.webp` are the compressed delivery assets.

## Real project screenshots

The project previews are genuine interface screenshots from the projects' public GitHub repositories, retrieved on 2026-11-15. They are not generated mockups. PNG masters are retained under `assets/projects/`; lossless WebP copies are used on the website. Their decoded RGB pixels were compared with the masters. Demo examples are synthetic. The Handrail screenshot shows the installed extension; the website links to its public practice page and explains the installation requirement.

Each source below is relative to `https://github.com/ufodia/<repository>/blob/main/`.

| Website asset | Repository | Original screenshot |
| --- | --- | --- |
| decision-recheck.webp | decision-recheck | assets/demo-buyer.png |
| sheet-sentry.webp | sheet-sentry | docs/assets/screenshot-review.png |
| cutonce.webp | cutonce | docs/assets/workspace.png |
| agent-crash-lab.webp | agent-crash-lab | docs/assets/screenshot.png |
| handrail.webp | handrail | docs/assets/workspace.png |
| boss-rehearsal.webp | boss-rehearsal | docs/assets/workspace.png |
| fact-fuse.webp | fact-fuse | docs/assets/screenshot.png |
| invented-detail-swipe.webp | invented-detail | docs/assets/screenshot-swipe.png |
| locale-crash.webp | locale-crash | docs/assets/screenshot.png |
| paper-surgery.webp | paper-surgery | docs/assets/screenshot.png |
| memory-mirror.webp | memory-mirror | docs/assets/screenshot-overview.png |

IntentWeft is a local CLI/skill rather than a hosted web app. Its panel reproduces actual `evidence.py check` output for the repository's `report.example.json`, marked as a synthetic example. Setup and worked-review links are provided instead of an invented screenshot or browser demo.

All eleven hosted demos were opened and their bundled examples exercised on 2026-11-15. This checks their public sample flows, not all features, an installed Handrail extension, or private uploads. Screenshots may show an earlier revision than the live demos.

## Social preview

`social-share-v2.svg` is the editable 1200×630 sharing card: the v3 mark and wordmark, the headline in the same light-to-heavy Fraunces setting as the site, and the hero concept image on the right, faded into the midnight background. It contains generated concept artwork, as labelled on the site, and no personal photo. `social-share-v2.jpg` is its delivery image (JPEG, because the card now holds a photograph-like image); `foundry-mark-v3-512.png` provides the raster brand icon.

`tools/render-brand.py` renders both files from their SVG sources with a headless Chromium browser (Edge or Chrome), serving this directory on a temporary local port so the card's relative font and artwork URLs resolve. The first card, `social-share-v1.svg` and `social-share-v1.png`, and its renderer `tools/render-social-share.ps1` are kept unchanged: links shared before this update may still show the cached v1 image.

The initial HTML supplies Open Graph image/title/description properties and a large-image Twitter card. All image URLs are absolute HTTPS URLs. The static preview is English, matching the site's default language; switching the page language also updates its runtime title/description/locale. Preview caches and rendering remain controlled by each sharing application. Change the versioned image URL for a future artwork update rather than overwriting it behind a cached URL.

Project previews now use responsive 480/800px derivatives generated by `tools/optimize-previews.py`, with aspect ratio and interface content preserved. The original lossless WebP remains the enlargement target. Decision Recheck and Handrail omit their 800px candidate because the full original is smaller. Dense interface text is best read in the full original.

Do not deploy this document, scripts, SVG sharing-card source or project/concept PNG masters. `tools/package-site.py` includes only referenced delivery assets, including **social-share-v2.jpg**, the earlier **social-share-v1.png** and **foundry-mark-v3-512.png**.
