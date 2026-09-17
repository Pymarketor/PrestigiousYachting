/* Prestigious Yachting — shared SVG icon loader
 * The fetched SVG is inlined so currentColor follows the Webflow element color.
 * Usage: <span data-py-icon="arrow" aria-hidden="true"></span>
 */
(function () {
  'use strict';

  var repo = 'Pymarketor/PrestigiousYachting';
  var version = 'a0c84bc7924e4e567b6d4be73c46706d9bd6640d';
  var baseUrl = 'https://raw.githubusercontent.com/' + repo + '/' + version + '/icons/';
  var fallbackBaseUrl = 'https://cdn.jsdelivr.net/gh/' + repo + '@' + version + '/icons/';
  var cache = Object.create(null);

  function load(name) {
    if (!/^[a-z0-9-]+$/.test(name)) return Promise.reject(new Error('Invalid icon name'));
    if (!cache[name]) {
      cache[name] = fetch(baseUrl + name + '.svg', { credentials: 'omit', cache: 'no-store' })
        .then(function (response) {
          if (!response.ok) throw new Error('GitHub icon not found: ' + name);
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

  var style = document.createElement('style');
  style.textContent = '.py-icon{display:inline-flex;width:1.25rem;height:1.25rem;line-height:1;color:var(--py-icon-color,currentColor)}.py-icon-wrap.py-icon{width:var(--py-icon-size,2.5rem)!important;height:var(--py-icon-size,2.5rem)!important}.py-icon-wrap.py-icon>.py-icon-svg{width:var(--py-icon-inner-size,1.25rem)!important;height:var(--py-icon-inner-size,1.25rem)!important}.py-icon-svg{display:block;width:100%;height:100%;color:var(--py-icon-color,#333)!important;stroke:var(--py-icon-color,#333)!important;overflow:visible}.py-icon-svg path,.py-icon-svg line,.py-icon-svg polyline,.py-icon-svg polygon{stroke:currentColor}[data-py-icon="external-link"]>.py-icon-svg{transform:none!important}.open-arrow[data-py-icon="external-link"],.open-arrow:has([data-py-icon="external-link"]),.open-arrow-link[data-py-icon="external-link"],.open-arrow-link:has([data-py-icon="external-link"]),.arrow-open[data-py-icon="external-link"],.arrow-open:has([data-py-icon="external-link"]),.arrow-open-link[data-py-icon="external-link"],.arrow-open-link:has([data-py-icon="external-link"]),.arrow-open-other[data-py-icon="external-link"],.arrow-open-other:has([data-py-icon="external-link"]){transform:none!important}.py-icon--left{transform:rotate(180deg)}.py-icon--up{transform:rotate(-90deg)}.py-icon--down{transform:rotate(90deg)}';
  document.head.appendChild(style);

  window.PYIcons = { render: render, load: load, baseUrl: baseUrl, fallbackBaseUrl: fallbackBaseUrl, markIconNodes: markIconNodes };
  function boot() { markIconNodes(); render(); }
  var observer = new MutationObserver(function () { markIconNodes(); render(); });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
}());
