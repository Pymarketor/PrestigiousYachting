# Webflow MCP scripts inventory

This file tracks scripts that were added or managed through Webflow MCP / Webflow Apps and whether they should live in this GitHub repository.

Last review: 2026-09-01.

## Site

- Webflow site: Prestigious Yachting
- Webflow site ID: `67c8366124f462f357f7e805`
- Yacht CMS template page ID: `68653f3547f48fe22426f0e7`
- Sunset Yacht Charter page ID: `687a3ef50b905a5e2dc0f019`
- Half-day Yacht Charter page ID: `6a85c5282620c8865b303e9e`

## Migrated to GitHub

These are utility scripts that should be loaded from this repo through jsDelivr or another CDN.

| File | Role | Status |
| --- | --- | --- |
| `py-yacht-video-safe-v2.js` | Safe yacht hero video loading, fallback image handling, reduced motion/data saver behavior | Migrated |
| `py-lazy-litepicker-loader.js` | Lazy-load Litepicker CSS/JS only when the booking/date UI is approached | Migrated |
| `yacht-spec-icons-svg.js` | Replace heavy specification image icons with lightweight inline SVG icons | Migrated |
| `yacht-feature-icons.js` | Decorate official yacht feature values with lightweight inline SVG icons | Migrated |
| `yacht-gallery-mobile-scroll-focus.js` | Mobile gallery scroll-focus utility; keeps Webflow section margins editable | Migrated as lean utility |
| `yacht-mobile-info-fix.js` | Mobile expandable information-card behavior and its scoped mobile CSS | Migrated from `yachtmobileinfofix` v1.0.0; pending Webflow replacement QA |
| `yacht-info-stack-fix.js` | Mobile layout fix when an information card expands | Migrated from `yachtinfostackfix` v1.0.2; pending Webflow replacement QA |
| `py-apple-reveal.js` | Scroll-triggered reveal behavior that honors reduced-motion preferences | Migrated from `py_apple_reveal` v1.0.0; pending Webflow replacement QA |
| `yacht-mobile-input-fix.js` | Accessible labels for yacht request form inputs | Migrated from `yachtmobileinputfix` v1.2.0; pending Webflow replacement QA |

## CDN tags to use in Webflow

Add only the utilities you actually need on the page. Prefer footer placement with `defer`.

```html
<script src="https://cdn.jsdelivr.net/gh/Pymarketor/PrestigiousYachting@main/py-yacht-video-safe-v2.js" defer></script>
<script src="https://cdn.jsdelivr.net/gh/Pymarketor/PrestigiousYachting@main/py-lazy-litepicker-loader.js" defer></script>
<script src="https://cdn.jsdelivr.net/gh/Pymarketor/PrestigiousYachting@main/yacht-spec-icons-svg.js" defer></script>
<script src="https://cdn.jsdelivr.net/gh/Pymarketor/PrestigiousYachting@main/yacht-feature-icons.js" defer></script>
<script src="https://cdn.jsdelivr.net/gh/Pymarketor/PrestigiousYachting@main/yacht-gallery-mobile-scroll-focus.js" defer></script>
<script src="https://cdn.jsdelivr.net/gh/Pymarketor/PrestigiousYachting@main/yacht-mobile-info-fix.js" defer></script>
<script src="https://cdn.jsdelivr.net/gh/Pymarketor/PrestigiousYachting@main/yacht-info-stack-fix.js" defer></script>
<script src="https://cdn.jsdelivr.net/gh/Pymarketor/PrestigiousYachting@main/py-apple-reveal.js" defer></script>
<script src="https://cdn.jsdelivr.net/gh/Pymarketor/PrestigiousYachting@main/yacht-mobile-input-fix.js" defer></script>
```

## Webflow MCP scripts currently applied

### Yacht CMS template

| MCP script ID | Display name | Version | Location | Migration recommendation |
| --- | --- | ---: | --- | --- |
| `yachtmobileinfofix` | YachtMobileInfoFix | 1.0.0 | footer | GitHub equivalent: `yacht-mobile-info-fix.js`; retain the registered script until staging QA confirms parity |
| `yachtinfostackfix` | YachtInfoStackFix | 1.0.2 | footer | GitHub equivalent: `yacht-info-stack-fix.js`; retain the registered script until staging QA confirms parity |
| `yachtexpandinggallery` | YachtExpandingGallery | 1.0.0 | footer | Component behavior; keep separate from utils unless intentionally versioned |
| `py_gallery_design_override` | PY Gallery design override | 1.0.5 | footer | Design override; keep in Designer/Webflow unless component CSS fully moves to GitHub |
| `yachtfeatureicons` | YachtFeatureIcons | 1.0.2 | footer | GitHub equivalent exists: `yacht-feature-icons.js` |
| `yachtgallerymobilescrollfocus` | YachtGalleryMobileScrollFocus | 2.7.0 | footer | GitHub equivalent exists: `yacht-gallery-mobile-scroll-focus.js` |
| `py_apple_reveal` | PY Apple Reveal | 1.0.0 | footer | GitHub equivalent: `py-apple-reveal.js`; retain the registered script until staging QA confirms parity |
| `py_included_cards_css` | PY Included Cards CSS | 1.0.8 | footer | Component CSS; migrate only if the whole included-cards component becomes GitHub-owned |
| `py_included_cards` | PY Included Cards | 1.0.7 | footer | Component logic; migrate only if the whole included-cards component becomes GitHub-owned |
| `yachtmobileinputfix` | YachtMobileInputFix | 1.2.0 | footer | GitHub equivalent: `yacht-mobile-input-fix.js`; retain the registered script until staging QA confirms parity |

### Sunset Yacht Charter page

| MCP script ID | Display name | Version | Location | Migration recommendation |
| --- | --- | ---: | --- | --- |
| `sunsetcharterpage` | SunsetCharterPage | 1.0.2 | footer | Page-specific; keep separate from utils |
| `sunsetsliderguard` | SunsetSliderGuard | 1.0.9 | footer | Utility candidate if reused by Half-day / Day pages |

### Half-day Yacht Charter page

No MCP custom code block was found during the last check.

## Safe replacement checklist

When a utility is moved to GitHub:

1. Add the GitHub/jsDelivr `<script>` tag in Webflow.
2. Publish to staging/Webflow subdomain first.
3. Verify the behavior on desktop and mobile.
4. Only then remove or disable the matching MCP script to avoid duplicate execution.
5. Republish the final site.

Do not remove component scripts until their GitHub version is intentionally created and tested.

## Rules for future scripts

1. Reusable behavior goes into GitHub.
2. One-off page/component experiments can stay in Webflow temporarily.
3. Avoid scripts that force margins, paddings, section widths, or typography that should remain controllable in Webflow Designer.
4. Prefer data attributes for targeting components over fragile class names.
5. Keep video, gallery, form, and navigation logic modular.
6. After updating a GitHub-hosted script, purge/check jsDelivr cache if the live site still serves an old version.
