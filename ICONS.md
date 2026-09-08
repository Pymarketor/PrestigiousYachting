# Shared SVG icons

The canonical icons live in `icons/` and are served from the GitHub repository through jsDelivr.
All icons use `currentColor`, so their color comes from the Webflow element or its parent.

Add this script once in Webflow Project Settings → Custom Code → Footer:

```html
<script src="https://cdn.jsdelivr.net/gh/Pymarketor/PrestigiousYachting@main/js/py-icons.js" defer></script>
```

Use an icon anywhere in Webflow with:

```html
<span class="py-icon" data-py-icon="arrow" aria-hidden="true"></span>
```

Available names: `arrow`, `cross`, `plus`, `check`, `search`, `chevron-left`, `chevron-right`, `expand`.
Use a Git tag instead of `main` once the library is stable, for example `@v1.0.0`.
