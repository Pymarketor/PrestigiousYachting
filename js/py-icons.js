/* Prestigious Yachting — shared SVG icon loader
 * The fetched SVG is inlined so currentColor follows the Webflow element color.
 * Usage: <span data-py-icon="arrow" aria-hidden="true"></span>
 */
(function () {
  'use strict';

  var repo = 'Pymarketor/PrestigiousYachting';
  var version = 'main';
  var baseUrl = 'https://cdn.jsdelivr.net/gh/' + repo + '@' + version + '/icons/';
  var cache = Object.create(null);

  function load(name) {
    if (!/^[a-z0-9-]+$/.test(name)) return Promise.reject(new Error('Invalid icon name'));
    if (!cache[name]) {
      cache[name] = fetch(baseUrl + name + '.svg', { credentials: 'omit' })
        .then(function (response) {
          if (!response.ok) throw new Error('Icon not found: ' + name);
          return response.text();
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
        target.replaceChildren(copy);
        target.dataset.pyIconLoaded = 'true';
      }).catch(function (error) {
        console.warn('[PY icons]', error.message);
      });
    });
  }

  function markLegacyIcons() {
    var mappings = [
      ['.fs_accordion-1_icon', 'expand'],
      ['.more-picto', 'expand'],
      ['.open-arrow-link', 'external-link'],
      ['.picto-arrow-exit, .error-cross', 'cross'],
      ['[data-slider-prev], .arrow-scroll-left-us, .arrow-scroll-left-card-other', 'chevron-left'],
      ['[data-slider-next], .arrow-scroll-right-us, .arrow-scroll-right-card-other', 'chevron-right']
    ];
    mappings.forEach(function (mapping) {
      document.querySelectorAll(mapping[0]).forEach(function (target) {
        if (!target.dataset.pyIcon) target.dataset.pyIcon = mapping[1];
        target.classList.add('py-icon', 'py-icon-wrap', 'is-glass');
        target.replaceChildren();
      });
    });
  }

  var style = document.createElement('style');
  style.textContent = '.py-icon{display:inline-flex;width:1em;height:1em;line-height:1;color:currentColor}.py-icon-svg{display:block;width:100%;height:100%;stroke:currentColor}.py-icon--left{transform:rotate(180deg)}.py-icon--up{transform:rotate(-90deg)}.py-icon--down{transform:rotate(90deg)}';
  document.head.appendChild(style);

  window.PYIcons = { render: render, load: load, baseUrl: baseUrl, markLegacyIcons: markLegacyIcons };
  function boot() { markLegacyIcons(); render(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
}());
