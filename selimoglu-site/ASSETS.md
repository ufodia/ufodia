# Visual assets

The active identity is `assets/foundry-mark-v2.svg`, an original editable vector mark. Its faceted S and separate chartreuse seed represent an idea taking form. Previous variants are retained as source history.

The active editorial images were generated with the built-in OpenAI image tool. They illustrate concepts and do not depict real facilities or products. PNG files retain the generated masters; the WebP encodings and 800px variants are the website delivery assets.

## Hero prompt

Create an art-directed hero for Selimoglu Idea Foundry, an independent software, technology and R&D idea atelier. One continuous precision-folded brushed titanium ribbon evolves from loose fine filament sketches into a sharply resolved architectural S-like object with translucent optical glass. Communicate a thought becoming an engineered artifact. Dark midnight navy studio, restrained chartreuse light, ivory reflections, tactile realism, controlled dramatic side-light, wide landscape with negative space. No people, facility, robot, brain, stock circuitry, screens, legible text, logo or watermark.

Files: `foundry-hero-v2.png`, `foundry-hero-v2.webp`, `foundry-hero-v2-800.webp`.

## Process prompt

Create a premium editorial still life about structured thinking: translucent glass planes and precision-machined titanium frames progress from an open fragmented stack to a resolved geometric form, with fine chartreuse threads connecting selected nodes. Evoke software logic, evidence, iteration and invention through physical materials. Ivory stone plinths, cobalt shadows, restrained green accents, soft daylight, crisp detail, landscape composition. No humans, rooms, third-party logos, text, numbers, watermark or circuitry. Conceptual art, not a product screenshot.

Files: `foundry-process-v2.png`, `foundry-process-v2.webp`, `foundry-process-v2-800.webp`.

## GitHub showcase concept

Generated editorial artwork for the repository showcase: interlocking dark titanium rings and luminous glass threads represent collaboration and ideas taking shape. It is conceptual illustration, not a product screenshot. `foundry-constellation-v1.png` is the master; `foundry-constellation-v1.webp` is the compressed delivery asset.

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

`social-share-v1.svg` is the editable, code-designed 1200×630 sharing card. It reuses the exact faceted S mark, navy/ivory/chartreuse palette, brand typography and a geometric idea-taking-form illustration. `social-share-v1.png` is its opaque delivery image; `foundry-mark-v2-512.png` provides a raster brand icon. The reproducible native Windows renderer is `tools/render-social-share.ps1`. These graphics are designed from vector shapes and typography, with no personal photo.

The initial HTML supplies Open Graph image/title/description properties and a large-image Twitter card. All image URLs are absolute HTTPS URLs. The static preview is English, matching the site's default language; switching the page language also updates its runtime title/description/locale. Preview caches and rendering remain controlled by each sharing application. Change the versioned image URL for a future artwork update rather than overwriting it behind a cached URL.

Project previews now use responsive 480/800px derivatives generated by `tools/optimize-previews.py`, with aspect ratio and interface content preserved. The original lossless WebP remains the enlargement target. Decision Recheck and Handrail omit their 800px candidate because the full original is smaller. Dense interface text is best read in the full original.

Do not deploy this document, scripts, SVG sharing-card source or project/concept PNG masters. `tools/package-site.py` includes only referenced delivery assets, including **social-share-v1.png** and **foundry-mark-v2-512.png**.
