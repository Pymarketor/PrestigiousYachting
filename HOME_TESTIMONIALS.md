# Home Google reviews columns

Webflow site: `67c8366124f462f357f7e805`.
Home page: `6842afef6fa9a12bf89c9e70`.
Reviews collection: `68624d348f6ca816166febc7`.

The existing collection list remains dynamic, sorted by `reviewdate` descending,
limited to 10 reviews, with no filter or pagination. The text is bound to
`Comments` and the date to `ReviewDate` in the Webflow Designer; these bindings
were reconnected after unlinking dropped them. Date format is `MMMM D, YYYY`.
The original rating markup remains in place. No live Google API request is added.

`home-testimonials-columns.css` and `home-testimonials-columns.js` adapt these
server-rendered cards to three columns above 1024px, two above 768px and one below.
Every original review is retained at every breakpoint. Duplicates used for the
CSS animation are inert and hidden from assistive technology.

The CSS provides a static grid when JavaScript is unavailable. Animation pauses
outside the viewport, in background tabs and on hover or focus. The pause button
exposes the complete original reviews in a scrollable region. Reduced-motion
users receive that static scrollable list automatically. There is no React,
Tailwind, Motion dependency, per-frame JavaScript or runtime CMS request.

## Webflow draft integration

Only the home instance of the shared `Treadmill` component was unlinked; the
other instance and original component definition remain unchanged.
The native home heading, review summary, Google review link and existing spacer
are visible and unchanged. No CSS targets their visibility or section spacing.
Only the horizontal animation embed was replaced by immutable CDN tags.

Embed ID: `4cf4daff-f3b3-da18-ae6f-dc92ca2afd16` on the home page.
Source pin: `69bca9b44f3096e7294cb9b8738abdd3f8e907ae`.

Changes are saved to Webflow but have not been published. Publish and check
the generated class names, rendering and CMS updates on the live page before
claiming a PageSpeed score improvement.

## Local preview and verification

`testimonials-preview.html` uses the ten real reviews supplied by the user.
It is a visual fixture, not a replacement CMS source. `index.html` is the local
export with the native heading/annexes retained and only the animation replaced.

Browser QA checks desktop/mobile/tablet columns, retained review counts,
horizontal overflow, pause behavior, reduced motion and no-JavaScript fallback.

## Recovery

To restore the previous CMS carousel, replace the home-only unlinked block with
an instance of the preserved `Treadmill` component. Keep the native heading and
annexes untouched. Do not edit or unregister the shared original component.
