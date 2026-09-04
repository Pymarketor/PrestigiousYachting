/* Prestigious Yachting — mobile viewport focus for the expanding yacht gallery. */
(() => {
  "use strict";

  const ROOT = "[data-py-expanding-gallery]";
  const CARD = "[data-py-expanding-card]";
  const MOBILE = matchMedia("(max-width: 767px)");
  const STYLE_ID = "py-gallery-mobile-scroll-focus-css";
  const FOCUS_LINE = 0.52;
  const HYSTERESIS = 28;

  const injectStyles = () => {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      @media screen and (max-width: 767px) {
        ${ROOT} {
          --py-gallery-thumb-height: clamp(118px, 38vw, 152px);
          --py-gallery-active-height: min(66.666vw, 420px);
          height: auto !important;
          min-height: 0 !important;
          overflow-anchor: none;
        }
        ${ROOT} [data-py-expanding-track] {
          display: flex !important;
          flex-direction: column !important;
          height: auto !important;
          min-height: 0 !important;
          overflow: visible !important;
        }
        ${ROOT} .py-gallery-row {
          display: flex !important;
          flex-direction: column !important;
          width: 100% !important;
          height: auto !important;
          min-height: 0 !important;
          grid-template-columns: none !important;
          grid-template-rows: none !important;
          overflow-anchor: none;
          transition: none !important;
        }
        ${ROOT} ${CARD} {
          flex: 0 0 auto !important;
          width: 100% !important;
          height: var(--py-gallery-thumb-height) !important;
          min-height: var(--py-gallery-thumb-height) !important;
          aspect-ratio: auto !important;
          overflow-anchor: none;
          transition: height 640ms cubic-bezier(.65, 0, .35, 1) !important;
        }
        ${ROOT} ${CARD}[data-active="true"],
        ${ROOT} ${CARD}.is-active {
          height: var(--py-gallery-active-height) !important;
          min-height: var(--py-gallery-active-height) !important;
          aspect-ratio: auto !important;
        }
        ${ROOT} ${CARD} img,
        ${ROOT} ${CARD} video,
        ${ROOT} [data-py-gallery-image] {
          width: 100% !important;
          height: 100% !important;
          max-width: none !important;
          object-fit: cover !important;
        }
        ${ROOT} ${CARD}[data-active="true"] .py-gallery-zoom,
        ${ROOT} ${CARD}.is-active .py-gallery-zoom {
          opacity: 1 !important;
          pointer-events: auto !important;
          transform: scale(1) !important;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        ${ROOT} ${CARD} { transition: none !important; }
      }
    `;
    document.head.appendChild(style);
  };

  const setup = (root) => {
    if (root.dataset.pyMobileScrollFocus === "v3") return;
    const cards = [...root.querySelectorAll(CARD)];
    if (!cards.length) return;
    root.dataset.pyMobileScrollFocus = "v3";

    let active = Math.max(0, cards.findIndex((card) => card.dataset.active === "true"));
    let frame = 0;

    const activate = (index) => {
      const next = Math.max(0, Math.min(index, cards.length - 1));
      if (next === active && cards[next].dataset.active === "true") return;
      active = next;
      cards.forEach((card, cardIndex) => {
        const isActive = cardIndex === active;
        card.dataset.active = String(isActive);
        card.classList.toggle("is-active", isActive);
        card.setAttribute("aria-pressed", String(isActive));
      });
    };

    const update = () => {
      frame = 0;
      if (!MOBILE.matches) return;
      const rootRect = root.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rootRect.bottom < 0 || rootRect.top > viewportHeight) return;

      const focusY = viewportHeight * FOCUS_LINE;
      const centers = cards.map((card) => {
        const rect = card.getBoundingClientRect();
        return rect.top + rect.height / 2;
      });
      const currentDistance = Math.abs(centers[active] - focusY);
      let candidate = active;
      let candidateDistance = currentDistance;

      centers.forEach((center, index) => {
        const distance = Math.abs(center - focusY);
        if (distance < candidateDistance) {
          candidate = index;
          candidateDistance = distance;
        }
      });

      if (candidate !== active && candidateDistance + HYSTERESIS < currentDistance) {
        activate(candidate > active ? active + 1 : active - 1);
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    cards.forEach((card, index) => {
      card.addEventListener("click", () => {
        if (MOBILE.matches) activate(index);
      }, { passive: true });
    });

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    window.addEventListener("orientationchange", requestUpdate, { passive: true });
    MOBILE.addEventListener?.("change", requestUpdate);
    activate(active);
    requestUpdate();
  };

  const init = () => {
    injectStyles();
    document.querySelectorAll(ROOT).forEach(setup);
    const observer = new MutationObserver(() => document.querySelectorAll(ROOT).forEach(setup));
    observer.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 5000);
  };

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init, { once: true })
    : init();
})();
