/* Prestigious Yachting — shared SVG icon loader.
 * The Webflow element owns the wrapper; data-py-icon only renders the artwork.
 * Usage: <span data-py-icon="plus" aria-hidden="true"></span>
 */
(function () {
  'use strict';

  var repo = 'Pymarketor/PrestigiousYachting';
  var version = 'main';
  var baseUrl = 'https://cdn.jsdelivr.net/gh/' + repo + '@' + version + '/icons/';
  var rawBaseUrl = 'https://raw.githubusercontent.com/' + repo + '/' + version + '/icons/';
  var cache = Object.create(null);

  function fetchSvg(name) {
    return fetch(baseUrl + name + '.svg', { credentials: 'omit', cache: 'no-store' })
      .then(function (response) {
        if (response.ok) return response.text();
        return fetch(rawBaseUrl + name + '.svg', { credentials: 'omit', cache: 'no-store' })
          .then(function (fallback) {
            if (!fallback.ok) throw new Error('Icon not found: ' + name);
            return fallback.text();
          });
      });
  }

  function normalizeSvg(svg, name) {
    if (!svg || svg.nodeName.toLowerCase() !== 'svg') throw new Error('Invalid SVG: ' + name);
    svg.removeAttribute('xmlns');
    svg.removeAttribute('width');
    svg.removeAttribute('height');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    if (!svg.hasAttribute('fill') && !svg.hasAttribute('stroke')) svg.setAttribute('fill', 'currentColor');
    svg.querySelectorAll('[fill]').forEach(function (node) {
      if (node.getAttribute('fill') !== 'none') node.setAttribute('fill', 'currentColor');
    });
    svg.querySelectorAll('[stroke]').forEach(function (node) {
      if (node.getAttribute('stroke') !== 'none') node.setAttribute('stroke', 'currentColor');
    });
    return svg;
  }

  function load(name) {
    if (!/^[a-z0-9-]+$/.test(name)) return Promise.reject(new Error('Invalid icon name'));
    if (!cache[name]) {
      cache[name] = fetchSvg(name).then(function (svgText) {
        var doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
        return normalizeSvg(doc.documentElement, name);
      });
    }
    return cache[name];
  }

  function render(root) {
    var scope = root || document;
    var targets = [];
    if (scope.matches && scope.matches('[data-py-icon]')) targets.push(scope);
    scope.querySelectorAll('[data-py-icon]').forEach(function (target) { targets.push(target); });
    targets.forEach(function (target) {
      target.classList.add('py-icon');
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

  var style = document.createElement('style');
  style.textContent = '.py-icon{display:inline-flex;width:var(--py-icon-inner-size,1.25rem);height:var(--py-icon-inner-size,1.25rem);align-items:center;justify-content:center;line-height:1;color:inherit;flex:0 0 auto}.py-icon>.py-icon-svg{display:block;width:100%;height:100%;overflow:visible}.py-icon-svg [fill]:not([fill="none"]){fill:currentColor!important}.py-icon-svg [stroke]:not([stroke="none"]){stroke:currentColor!important}';
  document.head.appendChild(style);

  window.PYIcons = { render: render, load: load, baseUrl: baseUrl };
  function boot() { render(); }
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType === 1) render(node);
      });
    });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
}());
