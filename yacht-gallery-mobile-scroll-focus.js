/* Prestigious Yachting — yacht gallery mobile scroll focus
   Keeps Webflow layout editable. Only manages mobile active image behaviour. */
(function () {
  "use strict";

  var ROOT_SELECTOR = "[data-py-expanding-gallery]";
  var CARD_SELECTOR = "[data-py-expanding-card]";
  var IMAGE_SELECTOR = "img, video";
  var STYLE_ID = "py-gallery-mobile-scroll-focus-css";
  var MOBILE_QUERY = "(max-width: 767px)";
  var FOCUS_LINE = 0.52;
  var HYSTERESIS = 24;
  var TRANSITION_MS = 680;

  var mq = window.matchMedia ? window.matchMedia(MOBILE_QUERY) : null;
  var activeRoot = null;
  var activeCard = null;
  var raf = 0;
  var enabled = false;
  var resizeTimer = 0;

  function isMobile() {
    return mq ? mq.matches : window.innerWidth <= 767;
  }

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;

    var css = "" +
      "@media (max-width:767px){" +
      ROOT_SELECTOR + "{--py-gallery-thumb-h:clamp(106px,31vw,136px);--py-gallery-active-h:min(66.666vw,420px);}" +
      ROOT_SELECTOR + " " + CARD_SELECTOR + "{height:var(--py-gallery-thumb-h);min-height:var(--py-gallery-thumb-h);overflow:hidden;border-radius:0!important;transition:height " + TRANSITION_MS + "ms cubic-bezier(.65,0,.35,1),opacity 360ms ease,transform 520ms cubic-bezier(.22,1,.36,1);will-change:height,transform;transform:translateZ(0);}" +
      ROOT_SELECTOR + " " + CARD_SELECTOR + ".is-active," + ROOT_SELECTOR + " " + CARD_SELECTOR + "[data-py-active='true']{height:var(--py-gallery-active-h);min-height:var(--py-gallery-active-h);}" +
      ROOT_SELECTOR + " " + CARD_SELECTOR + " " + IMAGE_SELECTOR + "{width:100%!important;height:100%!important;max-width:none!important;display:block;object-fit:cover!important;border-radius:0!important;transition:transform " + TRANSITION_MS + "ms cubic-bezier(.65,0,.35,1),filter 420ms ease,opacity 420ms ease;transform:scale(1.018);}" +
      ROOT_SELECTOR + " " + CARD_SELECTOR + ".is-active " + IMAGE_SELECTOR + "," + ROOT_SELECTOR + " " + CARD_SELECTOR + "[data-py-active='true'] " + IMAGE_SELECTOR + "{transform:scale(1);}" +
      ROOT_SELECTOR + " .py-gallery-zoom," + ROOT_SELECTOR + " [data-py-gallery-zoom]{opacity:0;pointer-events:none;transition:opacity 220ms ease,transform 220ms ease;}" +
      ROOT_SELECTOR + " " + CARD_SELECTOR + ".is-active .py-gallery-zoom," + ROOT_SELECTOR + " " + CARD_SELECTOR + "[data-py-active='true'] .py-gallery-zoom," + ROOT_SELECTOR + " " + CARD_SELECTOR + ".is-active [data-py-gallery-zoom]," + ROOT_SELECTOR + " " + CARD_SELECTOR + "[data-py-active='true'] [data-py-gallery-zoom]{opacity:1;pointer-events:auto;}" +
      "}" +
      "@media (prefers-reduced-motion:reduce){" + ROOT_SELECTOR + " " + CARD_SELECTOR + "," + ROOT_SELECTOR + " " + CARD_SELECTOR + " " + IMAGE_SELECTOR + "{transition:none!important;}}";

    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  function getRoots() {
    return Array.prototype.slice.call(document.querySelectorAll(ROOT_SELECTOR));
  }

  function getCards(root) {
    if (!root) return [];
    return Array.prototype.slice.call(root.querySelectorAll(CARD_SELECTOR)).filter(function (card) {
      return card.offsetParent !== null || card.getClientRects().length > 0;
    });
  }

  function setActive(root, next) {
    if (!root || !next || next === activeCard) return;

    getCards(root).forEach(function (card) {
      var isActive = card === next;
      card.classList.toggle("is-active", isActive);
      card.setAttribute("data-py-active", isActive ? "true" : "false");
      if (isActive) card.setAttribute("aria-current", "true");
      else card.removeAttribute("aria-current");
    });

    activeRoot = root;
    activeCard = next;
  }

  function nearestCard(root) {
    var cards = getCards(root);
    if (!cards.length) return null;

    var targetY = window.innerHeight * FOCUS_LINE;
    var best = null;
    var bestDistance = Infinity;

    cards.forEach(function (card) {
      var rect = card.getBoundingClientRect();
      var center = rect.top + rect.height / 2;
      var distance = Math.abs(center - targetY);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = card;
      }
    });

    if (activeCard && cards.indexOf(activeCard) !== -1) {
      var activeRect = activeCard.getBoundingClientRect();
      var activeCenter = activeRect.top + activeRect.height / 2;
      var activeDistance = Math.abs(activeCenter - targetY);
      if (activeDistance <= bestDistance + HYSTERESIS) return activeCard;
    }

    return best;
  }

  function update() {
    raf = 0;
    if (!enabled || !isMobile()) return;

    var roots = getRoots();
    var bestRoot = null;
    var bestCard = null;
    var bestDistance = Infinity;
    var targetY = window.innerHeight * FOCUS_LINE;

    roots.forEach(function (root) {
      var card = nearestCard(root);
      if (!card) return;
      var rect = card.getBoundingClientRect();
      var distance = Math.abs(rect.top + rect.height / 2 - targetY);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestRoot = root;
        bestCard = card;
      }
    });

    if (bestRoot && bestCard) setActive(bestRoot, bestCard);
  }

  function requestUpdate() {
    if (raf) return;
    raf = window.requestAnimationFrame(update);
  }

  function resetDesktopState() {
    getRoots().forEach(function (root) {
      getCards(root).forEach(function (card) {
        card.classList.remove("is-active");
        card.removeAttribute("data-py-active");
        card.removeAttribute("aria-current");
      });
    });
    activeRoot = null;
    activeCard = null;
  }

  function handleResize() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      if (isMobile()) requestUpdate();
      else resetDesktopState();
    }, 120);
  }

  function bindCards() {
    getRoots().forEach(function (root) {
      getCards(root).forEach(function (card) {
        if (card.__pyGalleryFocusBound) return;
        card.__pyGalleryFocusBound = true;
        card.addEventListener("click", function () {
          if (isMobile()) setActive(root, card);
        }, { passive: true });
      });
    });
  }

  function enable() {
    if (enabled) return;
    enabled = true;
    injectStyles();
    bindCards();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });
    requestUpdate();
  }

  function init() {
    injectStyles();
    bindCards();
    enable();

    var observer = new MutationObserver(function () {
      bindCards();
      requestUpdate();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });

    if (mq && mq.addEventListener) {
      mq.addEventListener("change", function () {
        if (isMobile()) requestUpdate();
        else resetDesktopState();
      });
    } else if (mq && mq.addListener) {
      mq.addListener(function () {
        if (isMobile()) requestUpdate();
        else resetDesktopState();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
