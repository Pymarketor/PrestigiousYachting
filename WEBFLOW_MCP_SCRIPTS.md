# Webflow yacht template — script map

This repository is the source of truth for the Webflow CMS yacht template.

Last review: 2026-09-07.

## Webflow target

- Site: Prestigious Yachting
- Site ID: `67c8366124f462f357f7e805`
- Yacht CMS template page ID: `68653f3547f48fe22426f0e7`
- Published collection path: `/yachts/{slug}`

## Loading order

| Priority | File | Location | Purpose |
| ---: | --- | --- | --- |
| 0 | `yacht-template-styles.css` | head | Consolidated template, gallery and media-stability styles |
| 1 | `yacht-template-head.js` | head, defer | Scroll-lock guard, accordion paint guard, logo label and responsive information cards |
| 2 | Finsweet Attributes v2 | head, async module | Required Webflow attributes only |
| 3 | Litepicker CSS + JS | head | Kept eager for booking reliability |
| 4 | `py-yacht-video-safe-v2.js` | footer, defer | Single authoritative hero-video controller |
| 5 | `array-cms.js` | footer, defer | CMS array parsing |
| 6 | `cascade-ready-inputs.js` | footer, defer | Form input readiness |
| 7 | `yacht-template-footer.js` | footer, defer | Accessibility, modal scroll, navigation, gallery viewer, media semantics and formula parameter |
| 8 | `yacht-spec-icons-svg.js` | footer, defer | Specification icons |
| 9 | `yacht-feature-icons.js` | footer, defer | Feature icons |
| 10 | `yacht-gallery-mobile-scroll-focus.js` | footer, defer | Mobile viewport focus and smooth expansion |
| 11 | `yacht-mobile-info-fix.js` | footer, defer | Mobile information cards |
| 12 | `yacht-info-stack-fix.js` | footer, defer | Mobile expanded-card layout |
| 13 | `yacht-expanding-gallery.js` | footer, defer | Desktop gallery activation |
| 14 | `py-gallery-design-override.js` | footer, defer | Gallery controls and visual override |
| 15 | `py-apple-reveal.js` | footer, defer | Reduced-motion-aware reveal |
| 16 | `py-included-cards-css.js` | footer, defer | Included-card styling |
| 17 | `py-included-cards.js` | footer, defer | Included-card behavior |
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

## Release checklist

1. Validate JavaScript syntax.
2. Update the GitHub files.
3. Pin every jsDelivr URL to the new commit.
4. Publish Webflow.
5. Verify desktop and mobile interactions.
6. Run PageSpeed Insights on the published URL.
7. Check title, meta description, canonical, robots, sitemap and rendered JSON-LD.
8. Purge the jsDelivr file URL only if an old immutable pin was accidentally reused.

## Removed duplication

The former inline hero-video controller is no longer part of the delivery plan. It competed with `py-yacht-video-safe-v2.js` for play/pause state and viewport behavior.
