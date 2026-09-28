# Homepage formula yacht coverflow

The homepage uses `home-formula-yachts.js`, adapted from the existing GitHub `yacht-similar-section.js` component. The original yacht-page component is unchanged.

## Webflow setup

Site: `67c8366124f462f357f7e805`
Home page: `6842afef6fa9a12bf89c9e70`

On the three existing `.slider-charter` elements:

| Formula | Attribute | Webflow element |
| --- | --- | --- |
| sunset | `data-yacht-coverflow="sunset"` | `af22e275-e657-b4bf-5817-74693e21aaf8` |
| half | `data-yacht-coverflow="half"` | `fd7226be-a72d-cbf1-8344-a9e0874b1d92` |
| day | `data-yacht-coverflow="day"` | `70ae6204-2beb-6e46-a7db-b35922b0d1e7` |

Each frame also has `data-slider="false"`. This prevents the legacy `custom-slider.js` from initializing it. That script remains loaded for the other homepage sliders.

The home head loads this pinned script once, before the legacy slider:

```html
<script src="https://cdn.jsdelivr.net/gh/Pymarketor/PrestigiousYachting@cc3b7901c1cdf0a65b790dcd318c49512b4dfe8c/home-formula-yachts.js" defer></script>
```

The native Yachts collection lists, CMS bindings, formula-specific filters, ascending length sort and limit of 10 are unchanged. Headings, outer containers, CTA blocks, explanatory text and their typography are not rewritten. Finsweet's decorative list items are excluded from yacht navigation.

## Behavior

- Same 3D coverflow geometry as the existing similar-yacht component, with responsive 3:2 cards.
- Independent selection per formula; starts near the middle of each list.
- Existing yacht images and links; selected boat's model, price and specifications shown below.
- Native tariff-to-FAQ link retained.
- Arrow buttons, left/right keyboard navigation, pointer dragging and touch support.
- No autoplay; reduced-motion skips animated settling.
- Decorative arrows reused without an extra icon fetch.
- Native CMS list/listitem semantics preserved.
- Image URLs and CMS contents are never replaced by this script.

## Verification — 2026-09-28

- JavaScript syntax check passes.
- GitHub source and immutable CDN response match the local source.
- Local preview uses current CMS data with original formula filters: 2 Sunset, 5 Half-day, 5 Day items available in the retrieved data.
- Tested desktop (1440px) and mobile (390px), independent selection, arrows, keyboard, drag, last-item boundary, synchronized captions and absence of horizontal page overflow.
- Saved in Webflow draft only; not published. Published-site validation remains to be done after publication.
- Local preview: `home-formula-yachts-preview.html`.

## Rollback

Remove the single `home-formula-yachts.js` tag from the home head, remove `data-yacht-coverflow` from the three frames and restore `data-slider="true"`. Other legacy slider attributes and all original CMS nodes remain in Webflow.
