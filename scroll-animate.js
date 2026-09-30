// Lightweight, one-time reveals for Webflow's [scroll-animate] elements.
(() => {
  "use strict";

  if (window.__pyScrollAnimateInitialized) return;
  window.__pyScrollAnimateInitialized = true;

  if (!("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const SELECTOR = "[scroll-animate]";
  const SKIP_SELECTOR = "[data-slider], [data-slider-track], [data-yacht-coverflow], [role='carousel'], .marquee-row-gallery, .w-richtext";
  const STYLE_ID = "py-scroll-animate-style";
  const observed = new WeakSet();
  const pendingTrees = new Set();
  let scanFrame = 0;

  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      [scroll-animate].py-scroll-pending {
        opacity: 0;
        transition: opacity .48s cubic-bezier(.22, 1, .36, 1);
      }
      [scroll-animate="fade-up"].py-scroll-pending {
        translate: 0 14px;
        transition: opacity .48s cubic-bezier(.22, 1, .36, 1),
                    translate .68s cubic-bezier(.22, 1, .36, 1);
      }
      [scroll-animate].py-scroll-pending.py-scroll-visible {
        opacity: 1;
        translate: 0 0;
      }
    `;
    document.head.appendChild(style);
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("py-scroll-visible");
      observer.unobserve(entry.target);
    }
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.01 });

  const prepare = (element) => {
    if (observed.has(element)) return;
    observed.add(element);
    // Animated sliders and nested reveals create large, expensive opacity layers.
    if (element.closest(SKIP_SELECTOR) || element.querySelector(SELECTOR)) return;
    element.classList.add("py-scroll-pending");
    revealObserver.observe(element);
  };

  const scan = (tree) => {
    if (!(tree instanceof Element)) return;
    if (tree.matches(SELECTOR)) prepare(tree);
    tree.querySelectorAll(SELECTOR).forEach(prepare);
  };

  const flush = () => {
    scanFrame = 0;
    for (const tree of pendingTrees) scan(tree);
    pendingTrees.clear();
  };

  const boot = () => {
    scan(document.documentElement);
    new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof Element) pendingTrees.add(node);
        }
      }
      if (pendingTrees.size && !scanFrame) scanFrame = requestAnimationFrame(flush);
    }).observe(document.documentElement, { childList: true, subtree: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
