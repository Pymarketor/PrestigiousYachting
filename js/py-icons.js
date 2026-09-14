/* Prestigious Yachting — shared SVG icon loader
 * The fetched SVG is inlined so currentColor follows the Webflow element color.
 * Usage: <span data-py-icon="arrow" aria-hidden="true"></span>
 */
(function () {
  'use strict';

  var repo = 'Pymarketor/PrestigiousYachting';
  var version = 'main';
  var baseUrl = 'https://cdn.jsdelivr.net/gh/' + repo + '@' + version + '/icons/';
  var fallbackBaseUrl = 'https://raw.githubusercontent.com/' + repo + '/' + version + '/icons/';
  var cache = Object.create(null);

  function load(name) {
    if (!/^[a-z0-9-]+$/.test(name)) return Promise.reject(new Error('Invalid icon name'));
    if (!cache[name]) {
      cache[name] = fetch(baseUrl + name + '.svg', { credentials: 'omit', cache: 'no-store' })
        .then(function (response) {
          if (!response.ok) throw new Error('CDN icon not found: ' + name);
          return response.text();
        })
        .catch(function () {
          return fetch(fallbackBaseUrl + name + '.svg', { credentials: 'omit', cache: 'no-store' }).then(function (response) {
            if (!response.ok) throw new Error('Icon not found: ' + name);
            return response.text();
          });
        })
        .then(function (svgText) {
          var doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
          var svg = doc.documentElement;
          if (!svg || svg.nodeName.toLowerCase() !== 'svg') throw new Error('Invalid SVG: ' + name);
          svg.removeAttribute('xmlns');
          svg.setAttribute('aria-hidden', 'true');
          svg.setAttribute('focusable', 'false');
          return svg;
        });
    }
    return cache[name];
  }

  function render(root) {
    (root || document).querySelectorAll('[data-py-icon]').forEach(function (target) {
      if (target.dataset.pyIconLoaded === 'true') return;
      var name = target.dataset.pyIcon;
      load(name).then(function (svg) {
        var copy = svg.cloneNode(true);
        copy.classList.add('py-icon-svg');
        copy.style.setProperty('display', 'block', 'important');
        copy.style.setProperty('width', '100%', 'important');
        copy.style.setProperty('height', '100%', 'important');
        copy.style.setProperty('min-width', '1px', 'important');
        copy.style.setProperty('min-height', '1px', 'important');
        copy.style.setProperty('opacity', '1', 'important');
        copy.style.setProperty('visibility', 'visible', 'important');
        copy.style.setProperty('overflow', 'visible', 'important');
        copy.style.setProperty('color', 'var(--py-icon-color, #333)', 'important');
        copy.style.setProperty('stroke', 'var(--py-icon-color, #333)', 'important');
        target.replaceChildren(copy);
        target.dataset.pyIconLoaded = 'true';
      }).catch(function (error) {
        console.warn('[PY icons]', error.message);
      });
    });
  }

  function markIconNodes() {
    document.querySelectorAll('[data-py-icon]').forEach(function (target) {
      target.classList.add('py-icon', 'py-icon-wrap', 'is-glass');
    });
  }

  // Migration bridge for legacy Webflow embeds still present in published CMS templates.
  // New embeds should use data-py-icon directly.
  function migrateLegacyEmbeds() {
    var mappings = [
      ['.fs_accordion-1_icon, .more-picto, .open-arrow', 'expand'],
      ['.picto-arrow-exit, .error-cross, .fs_modal-1_close-icon, .fs_modal-1_close-icon-2, .f-icon-regular', 'cross'],
      ['.open-arrow-link', 'external-link'],
      ['[data-slider-prev], [class*="arrow-scroll-left"], [class*="arrow-slide-left"]', 'chevron-left'],
      ['[data-slider-next], [class*="arrow-scroll-right"], [class*="arrow-slide-right"]', 'chevron-right']
    ];
    mappings.forEach(function (mapping) {
      document.querySelectorAll(mapping[0]).forEach(function (target) {
        if (target.dataset.pyIconLoaded === 'true' || target.dataset.pyIcon) return;
        target.dataset.pyIcon = mapping[1];
        target.classList.add('py-icon', 'py-icon-wrap', 'is-glass');
        target.replaceChildren();
      });
    });
  }

  var style = document.createElement('style');
  style.textContent = '.py-icon{display:inline-flex;width:1em;height:1em;line-height:1;color:var(--py-icon-color,currentColor)}.py-icon-svg{display:block;width:100%;height:100%;color:var(--py-icon-color,#333)!important;stroke:var(--py-icon-color,#333)!important;overflow:visible}.py-icon-svg path,.py-icon-svg line,.py-icon-svg polyline,.py-icon-svg polygon{stroke:currentColor}.py-icon--left{transform:rotate(180deg)}.py-icon--up{transform:rotate(-90deg)}.py-icon--down{transform:rotate(90deg)}';
  document.head.appendChild(style);

  window.PYIcons = { render: render, load: load, baseUrl: baseUrl, fallbackBaseUrl: fallbackBaseUrl, markIconNodes: markIconNodes };
  function boot() { migrateLegacyEmbeds(); markIconNodes(); render(); }
  var observer = new MutationObserver(function () { migrateLegacyEmbeds(); markIconNodes(); render(); });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
}());
