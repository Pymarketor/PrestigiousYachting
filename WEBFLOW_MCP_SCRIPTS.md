# Webflow yacht template — script map

This repository is the source of truth for the Webflow CMS yacht template.

Last review: 2026-09-07.

## Webflow target

- Site: Prestigious Yachting
- Site ID: `67c8366124f462f357f7e805`
- Yacht CMS template page ID: `68653f3547f48fe22426f0e7`
- Published collection path: `/yachts/{slug}`

## Production delivery

Webflow downloads two JavaScript bundles. The source modules below remain independent and editable.

| Bundle | Location | Source modules | Purpose |
| --- | --- | ---: | --- |
| `yacht-template-critical.bundle.js` | head, defer | 3 | Paint guards, hero video and mobile gallery focus |
| `yacht-template-runtime.bundle.js` | footer, defer | 8 | Accessibility, semantics, UI fixes, icons and similar yachts |

The template also loads `yacht-template-styles.css`, Finsweet Attributes and Litepicker.

`cms-agentic-navigation.js` is the shared accessibility and agent-navigation layer for every CMS template. Load it once from Webflow site-wide footer custom code, not separately inside each template.

## Source-module order

| Priority | File | Location | Purpose |
| ---: | --- | --- | --- |
| 0 | `yacht-template-styles.css` | head | Consolidated template, gallery and media-stability styles |
| 1 | `yacht-template-head.js` | head, defer | Scroll-lock guard, accordion paint guard, logo label and responsive information cards |
| 2 | Finsweet Attributes v2 | head, async module | Required Webflow attributes only |
| 3 | Litepicker CSS + JS | head | Kept eager for booking reliability |
| 4 | `py-yacht-video-safe-v2.js` | footer, defer | Single authoritative hero-video controller |
| 5 | `array-cms.js` | footer, defer, standalone | CMS array parsing |
| 6 | `cascade-ready-inputs.js` | footer, defer, standalone | Form input readiness |
| 7 | `yacht-template-footer.js` | runtime bundle | Accessibility, modal scroll, agentic navigation, media semantics and formula parameter |
| 8 | `yacht-spec-icons-svg.js` | footer, defer | Specification icons |
| 9 | `yacht-feature-icons.js` | footer, defer | Feature icons |
| 10 | `yacht-gallery-mobile-scroll-focus.js` | footer, defer | Mobile viewport focus and smooth expansion |
| 11 | `yacht-mobile-info-fix.js` | footer, defer | Mobile information cards |
| 12 | `yacht-info-stack-fix.js` | footer, defer | Mobile expanded-card layout |
| 13 | `yacht-expanding-gallery.js` | footer, standalone | Single authoritative gallery controller and design |
| 15 | `py-apple-reveal.js` | footer, defer | Reduced-motion-aware reveal |
| 16 | `py-included-cards-css.js` | footer, defer, standalone | Included-card styling |
| 17 | `py-included-cards.js` | footer, defer, standalone | Included-card behavior |
| 18 | `yacht-mobile-input-fix.js` | footer, defer | Mobile form labels |
| 19 | `similarsectionv1.js` | footer, defer | Similar-yachts section; intentionally last because it is non-critical |

## Rules

1. No reusable JavaScript is written inline in Webflow.
2. Webflow custom code contains only CDN tags, Webflow CMS bindings and resource hints.
3. Production URLs are pinned to an immutable Git commit.
4. Edit a focused source file, commit it, then update the production pin after QA.
5. Never load two video controllers. `py-yacht-video-safe-v2.js` is authoritative.
6. Keep Litepicker eager until a lazy-loading change passes modal-open tests on iOS and Android.
7. Preserve `prefers-reduced-motion` behavior for every animation.
8. Do not force Webflow spacing or typography from JavaScript.
9. Keep direct children of every ARIA `list` as `listitem`, `presentation` or `none`; the agentic Lighthouse audit validates this relationship.

## Release checklist

1. Validate JavaScript syntax.
2. Update the GitHub files.
3. Run `node scripts/build-yacht-bundles.mjs`, then pin every changed jsDelivr URL to the new commit.
4. Publish Webflow.
5. Verify desktop and mobile interactions.
6. Run PageSpeed Insights on the published URL.
7. Check title, meta description, canonical, robots, sitemap and rendered JSON-LD.
8. Purge the jsDelivr file URL only if an old immutable pin was accidentally reused.

## Removed duplication

The former inline hero-video controller is no longer part of the delivery plan. It competed with `py-yacht-video-safe-v2.js` for play/pause state and viewport behavior.

The runtime bundle deliberately excludes `array-cms.js`, `cascade-ready-inputs.js`, the included-card modules and `yacht-expanding-gallery.js`, because Webflow loads those files independently. This prevents duplicate download, parsing and initialization logic.

The repository also contains `llms.txt`. It must be served as `text/plain` from `https://www.prestigiousyachting.com/llms.txt` through the domain/CDN layer; storing it on GitHub alone does not expose it at the website root.
