// Prestigious Yachting — shared scroll reveal for [scroll-animate] elements.
(() => {
  "use strict";

  if (window.__pyScrollAnimateInitialized) return;
  window.__pyScrollAnimateInitialized = true;

  const SELECTOR = "[scroll-animate]";
  const observed = new WeakSet();

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      element.classList.add("in-view");
      observer.unobserve(element);
      setTimeout(() => {
        element.classList.remove("in-view", "will-animate");
      }, 700);
    });
  }, { threshold: 0.4 });

  const observeElement = (element) => {
    if (!(element instanceof Element) || !element.matches(SELECTOR) || observed.has(element)) return;
    observed.add(element);
    element.classList.add("will-animate");
    revealObserver.observe(element);
  };

  const observeTree = (node) => {
    if (!(node instanceof Element)) return;
    observeElement(node);
    node.querySelectorAll(SELECTOR).forEach(observeElement);
  };

  const boot = () => {
    observeTree(document.documentElement);
    new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(observeTree);
      });
    }).observe(document.documentElement, { childList: true, subtree: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
