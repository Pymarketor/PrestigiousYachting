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
Its previous pale background is suppressed only when tagged Pearl. Existing site typography
is inherited, with a 44px minimum target instead of the oversized React demo dimensions.
Navy `#0f2a49`, white reflections, outlined/filled decorative star, hover and press states.
Keyboard focus remains visible; reduced-motion preferences disable movement.

Duplicate the native wrapper to add another Pearl button, change its label and destination
normally in Webflow, and retain `button="pearl"`. Buttons without the attribute are unaffected.

`pearl-buttons.css` is loaded once in the site head, pinned to a GitHub commit.
Publish Webflow to deploy the saved custom-code change. Custom code must be enabled in
Webflow Preview to see the effect before publishing.
