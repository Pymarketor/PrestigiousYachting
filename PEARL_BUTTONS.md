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
is inherited. Original proportions are restored: 25px text, 32px vertical / 45px horizontal
padding, 100px radius, five-layer shadow, 25% oval reflection boundary, 12% upper highlight,
and the reference's masked label treatment. Original hover and 4px press travel are retained.
Optional wrapper CSS variables: `--pearl-font-size`, `--pearl-padding-y`, `--pearl-padding-x`.
Use `button-mode="light"` for a pearl-white background and navy `#0f2a49` text/star.
Use `button-mode="dark"` for a navy `#0f2a49` background and white text/star.
Without a mode, dark is the default. Keep both attributes on the placement wrapper;
an explicit mode on the native link itself takes priority over an inherited wrapper mode.
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
