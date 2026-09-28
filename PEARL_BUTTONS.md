# Pearl buttons — Webflow

The reference React appearance is adapted to native Webflow links/buttons with CSS only.
No runtime JavaScript, React, external fonts or label replacements.

## Native structure

```
Placement wrapper — button="pearl"
└─ Native Link Block — existing destination preserved
   └─ Native text block — editable in the Designer
```

The existing `bg-button` wrapper stays available for placement, alignment and spacing.
Its previous pale background is suppressed only when tagged Pearl. The native font family
is inherited. Compact defaults follow the site's CTA scale: 14px text, 12px vertical / 28px
horizontal padding, 44px target height, 100px radius, five-layer pearl shadow, oval reflection,
upper highlight and masked label. Hover and press states scale with the smaller surface.
Optional wrapper CSS variables: `--pearl-font-size`, `--pearl-padding-y`, `--pearl-padding-x`.
Use `button-mode="light"` for a whitesmoke `#f5f5f5` background and navy `#0f2a49` text/star.
Light mode has a whitesmoke placement wrapper with a subtle inner edge, plus a gently
navy-tinted oval reflection so the layered wrapper remains visible against a white page.
Use `button-mode="dark"` for a navy `#0f2a49` background and white text/star.
Use `button-mode="blue"` for a blue `#06c` background and white text/star.
Without a mode, dark is the default. Keep both attributes on the placement wrapper;
an explicit mode on the native link itself takes priority over an inherited wrapper mode.
Add `without-icon="true"` (or a blank `without-icon` attribute) on either the wrapper or
the native link to hide the decorative sparkle without changing the label.
Keyboard focus remains visible; reduced-motion preferences disable movement.

Duplicate the native wrapper to add another Pearl button, change its label and destination
normally in Webflow, and retain `button="pearl"`. Buttons without the attribute are unaffected.

`pearl-buttons.css` is loaded once in the site head, pinned to a GitHub commit.
Publish Webflow to deploy the saved custom-code change. Custom code must be enabled in
Webflow Preview to see the effect before publishing.

## Verification

Local browser visual comparison completed against the supplied screenshot's shape.
Light and dark computed colours checked, plus label masking and original proportions.
Hover checked: filled decorative star, -4% label motion and fading upper reflection.
No native label, link destination or wrapper placement changes.
