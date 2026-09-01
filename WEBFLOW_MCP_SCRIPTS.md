# Webflow MCP scripts inventory

This file tracks scripts that were added or managed through Webflow MCP / Webflow Apps and whether they should live in this GitHub repository.

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

## Webflow MCP scripts currently applied

### Yacht CMS template

| MCP script ID | Display name | Version | Location | Migration recommendation |
| --- | --- | ---: | --- | --- |
| `yachtmobileinfofix` | YachtMobileInfoFix | 1.0.0 | footer | Review source before migrating |
| `yachtinfostackfix` | YachtInfoStackFix | 1.0.2 | footer | Review source before migrating |
| `yachtexpandinggallery` | YachtExpandingGallery | 1.0.0 | footer | Component behavior; keep separate from utils unless intentionally versioned |
| `py_gallery_design_override` | PY Gallery design override | 1.0.5 | footer | Design override; keep in Designer/Webflow unless we move component CSS fully to GitHub |
| `yachtfeatureicons` | YachtFeatureIcons | 1.0.2 | footer | Good candidate for GitHub utility once source is confirmed |
| `yachtgallerymobilescrollfocus` | YachtGalleryMobileScrollFocus | 2.7.0 | footer | Good candidate for GitHub utility once source is confirmed |
| `py_apple_reveal` | PY Apple Reveal | 1.0.0 | footer | Global utility candidate; review source before migrating |
| `py_included_cards_css` | PY Included Cards CSS | 1.0.8 | footer | Component CSS; migrate only if the whole component becomes GitHub-owned |
| `py_included_cards` | PY Included Cards | 1.0.7 | footer | Component logic; migrate only if the whole component becomes GitHub-owned |
| `yachtmobileinputfix` | YachtMobileInputFix | 1.2.0 | footer | Utility candidate, but verify no overlap with Designer styles before migrating |

### Sunset Yacht Charter page

| MCP script ID | Display name | Version | Location | Migration recommendation |
| --- | --- | ---: | --- | --- |
| `sunsetcharterpage` | SunsetCharterPage | 1.0.2 | footer | Page-specific; keep separate from utils |
| `sunsetsliderguard` | SunsetSliderGuard | 1.0.9 | footer | Utility candidate if reused by Half-day / Day pages |

### Half-day Yacht Charter page

No MCP custom code block was found during the last check.

## Webflow embed/update checklist

When a utility is moved to GitHub, replace the Webflow MCP/script block with a jsDelivr script tag:

```html
<script src="https://cdn.jsdelivr.net/gh/Pymarketor/PrestigiousYachting@main/FILENAME.js" defer></script>
```

Prefer adding scripts at the end of the footer unless the script must run before rendering.

## Rules for future scripts

1. Reusable behavior goes into GitHub.
2. One-off page/component experiments can stay in Webflow temporarily.
3. Avoid scripts that force margins, paddings, section widths, or typography that should remain controllable in Webflow Designer.
4. Prefer data attributes for targeting components over fragile class names.
5. Keep video, gallery, form, and navigation logic modular.
6. After updating a GitHub-hosted script, purge/check jsDelivr cache if the live site still serves an old version.
