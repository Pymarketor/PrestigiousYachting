/* Prestigious Yachting — critical CMS yacht template bundle
 * Generated from the modular source files listed below.
 * Edit the source modules, then rebuild this bundle.
 */

/* ===== yacht-template-head.js ===== */
/* Prestigious Yachting — CMS yacht template head utilities.
 * Source of truth: GitHub. Loaded with defer before Finsweet.
 */

/* Migrated Webflow head block 1. */
(() => {
  const unsafeLockSelector = [
    '.f-modal-centre[fs-scrolldisable-element="when-visible"]',
    '.f-modal-centre-other[fs-scrolldisable-element="when-visible"]',
    '.modal-one-click-request[fs-scrolldisable-element="when-visible"]',
    '.modal-favorite-list[fs-scrolldisable-element="when-visible"]',
    '.fs_selectcustom-yacht[fs-scrolldisable-element="when-visible"]'
  ].join(",");

  const neutralize = (root) => {
    if (!(root instanceof Element)) return;
    if (root.matches(unsafeLockSelector)) {
      root.removeAttribute("fs-scrolldisable-element");
    }
    root.querySelectorAll?.(unsafeLockSelector).forEach((element) => {
      element.removeAttribute("fs-scrolldisable-element");
    });
  };

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach(neutralize);
    });
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener("DOMContentLoaded", () => neutralize(document.body), { once: true });
})();

/* Migrated Webflow head block 2. */
document.documentElement.classList.add("cls-lock-accordions");
  (() => {
    let unlocked = false;
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      document.documentElement.classList.remove("cls-lock-accordions");
    };
    const ready = () => {
      const panels = [...document.querySelectorAll(".fs_accordion-1_content")];
      return panels.length > 0 && panels.every((panel) =>
        panel.style.display === "none" || parseFloat(panel.style.height) === 0
      );
    };
    const check = () => {
      if (unlocked) return;
      if (ready()) unlock();
      else requestAnimationFrame(check);
    };
    document.addEventListener("DOMContentLoaded", check, { once: true });
    window.addEventListener("load", () => setTimeout(() => {
      if (ready()) unlock();
    }, 250), { once: true });
    setTimeout(unlock, 3000);
  })();

/* Migrated Webflow head block 3. */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a.link-block-logo-py").forEach((link) => {
    link.setAttribute("aria-label", "Prestigious Yachting home");
  });
}, { once: true });

/* Migrated Webflow head block 4. */
(() => {
  const mobile = matchMedia("(max-width: 767px)");

  const initializeInformationCards = () => {
    document.querySelectorAll(".div-block-79").forEach((card, index) => {
      const trigger = card.querySelector(".code-embed-28");
      const content = card.querySelector(".microcopie");
      if (!trigger || !content || trigger.dataset.infoReady === "true") return;

      const contentId = content.id || `form-information-${index + 1}`;
      content.id = contentId;
      content.setAttribute("role", "tooltip");
      trigger.dataset.infoReady = "true";
      trigger.setAttribute("role", "button");
      trigger.setAttribute("tabindex", "0");
      trigger.setAttribute("aria-controls", contentId);

      const setOpen = (open) => {
        card.classList.toggle("show", open);
        trigger.setAttribute("aria-expanded", String(open));
        trigger.setAttribute("aria-label", open ? "Hide helpful information" : "Show helpful information");
        content.setAttribute("aria-hidden", String(!open));
      };

      const closeOthers = () => {
        document.querySelectorAll(".div-block-79.show").forEach((other) => {
          if (other === card) return;
          other.classList.remove("show");
          const otherTrigger = other.querySelector(".code-embed-28");
          const otherContent = other.querySelector(".microcopie");
          otherTrigger?.setAttribute("aria-expanded", "false");
          otherTrigger?.setAttribute("aria-label", "Show helpful information");
          otherContent?.setAttribute("aria-hidden", "true");
        });
      };

      if (mobile.matches) {
        setOpen(false);
      } else {
        trigger.removeAttribute("aria-expanded");
        content.removeAttribute("aria-hidden");
      }

      const toggle = (event) => {
        if (!mobile.matches) return;
        event.preventDefault();
        event.stopPropagation();
        const shouldOpen = !card.classList.contains("show");
        closeOthers();
        setOpen(shouldOpen);
      };

      trigger.addEventListener("click", toggle);
      trigger.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") toggle(event);
        if (event.key === "Escape") setOpen(false);
      });
    });
  };

  document.addEventListener("click", (event) => {
    if (!mobile.matches || event.target.closest(".div-block-79")) return;
    document.querySelectorAll(".div-block-79.show").forEach((card) => {
      card.classList.remove("show");
      card.querySelector(".code-embed-28")?.setAttribute("aria-expanded", "false");
      card.querySelector(".code-embed-28")?.setAttribute("aria-label", "Show helpful information");
      card.querySelector(".microcopie")?.setAttribute("aria-hidden", "true");
    });
  });

  mobile.addEventListener?.("change", () => {
    if (mobile.matches) return;
    document.querySelectorAll(".div-block-79").forEach((card) => {
      card.classList.remove("show");
      card.querySelector(".code-embed-28")?.removeAttribute("aria-expanded");
      card.querySelector(".microcopie")?.removeAttribute("aria-hidden");
    });
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeInformationCards, { once: true });
  } else {
    initializeInformationCards();
  }
})();

;

/* ===== py-yacht-video-safe-v2.js ===== */
(() => {
  const initYachtVideo = () => {
    document.querySelectorAll(".video-container.yacht, .video-container").forEach((container) => {
      if (container.dataset.pyVideoSafeReady === "true") return;

      const content = container.querySelector(".video-content");
      const video = content?.querySelector(".video-element");
      const fallback = content?.querySelector(".video-fallback");
      const fallbackImage = fallback?.querySelector("img");
      const controls = container.querySelector(".video-controls.w-embed, .video-controls");
      const button = container.querySelector(".video-play-toggle");

      if (!content || !video) return;
      container.dataset.pyVideoSafeReady = "true";

      const source = Array.from(video.querySelectorAll("source"))
        .map((item) => item.getAttribute("src") || "")
        .find((src) => src.trim());

      const showPosterOnly = () => {
        video.pause();
        video.setAttribute("preload", "none");
        video.style.display = "none";
        content.classList.remove("is-video-ready");
        if (fallback) {
          fallback.style.display = "block";
          fallback.style.opacity = "1";
          fallback.style.visibility = "visible";
        }
        if (controls) controls.style.display = "none";
      };

      if (!source) {
        showPosterOnly();
        return;
      }

      const canAutoplay =
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        !navigator.connection?.saveData;

      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.playsInline = true;
      video.removeAttribute("autoplay");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.setAttribute("preload", "none");

      const poster = fallbackImage?.currentSrc || fallbackImage?.src;
      if (poster) video.setAttribute("poster", poster);

      if (fallbackImage) {
        fallbackImage.loading = "eager";
        fallbackImage.fetchPriority = "high";
        fallbackImage.decoding = "async";
      }

      if (controls) controls.style.removeProperty("display");
      if (button) {
        button.style.removeProperty("display");
        button.setAttribute("type", "button");
      }

      let inView = false;
      let userPaused = !canAutoplay;
      let mediaPrepared = false;

      const prepareMedia = () => {
        if (mediaPrepared) return;
        mediaPrepared = true;
        video.setAttribute("preload", "metadata");
        video.load();
      };

      const setButtonState = (playing) => {
        if (!button) return;
        button.setAttribute("aria-label", playing ? "Pause yacht video" : "Play yacht video");
        button.setAttribute("aria-pressed", String(playing));
      };

      const revealVideo = () => {
        content.classList.add("is-video-ready");
        if (fallback) {
          fallback.style.opacity = "0";
          fallback.style.pointerEvents = "none";
        }
      };

      const showFallback = () => {
        content.classList.remove("is-video-ready");
        if (fallback) {
          fallback.style.display = "block";
          fallback.style.opacity = "1";
          fallback.style.visibility = "visible";
          fallback.style.pointerEvents = "auto";
        }
        setButtonState(false);
      };

      const play = () => {
        if (userPaused || !inView || document.hidden) return;
        prepareMedia();
        video.play()
          .then(() => {
            revealVideo();
            setButtonState(true);
          })
          .catch(showFallback);
      };

      const pause = (manual = false) => {
        if (manual) userPaused = true;
        video.pause();
        setButtonState(false);
      };

      // Capture phase is intentional: it keeps Webflow interactions or embedded
      // controls from cancelling the play/pause action after this handler runs.
      button?.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        prepareMedia();
        if (video.paused || video.ended) {
          userPaused = false;
          play();
        } else {
          pause(true);
        }
      }, true);

      video.addEventListener("playing", () => {
        revealVideo();
        setButtonState(true);
      });
      video.addEventListener("pause", () => setButtonState(false));
      video.addEventListener("error", showPosterOnly);

      const observer = new IntersectionObserver(([entry]) => {
        inView = Boolean(entry?.isIntersecting);
        if (inView) {
          prepareMedia();
          play();
        } else {
          pause(false);
        }
      }, { threshold: 0.25, rootMargin: "100px 0px" });

      observer.observe(container);

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) pause(false);
        else play();
      });

      showFallback();
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initYachtVideo, { once: true });
  } else {
    initYachtVideo();
  }
})();

;

/* ===== yacht-gallery-mobile-scroll-focus.js ===== */
/* Prestigious Yachting — mobile viewport focus for the expanding yacht gallery. */
(() => {
  "use strict";

  const ROOT = "[data-py-expanding-gallery]";
  const CARD = "[data-py-expanding-card]";
  const MOBILE = matchMedia("(max-width: 767px)");
  const STYLE_ID = "py-gallery-mobile-scroll-focus-css";
  const FOCUS_LINE = 0.52;
  const HYSTERESIS = 28;
  const TRANSITION_LOCK = 820;

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
          will-change: height;
          transition: height 760ms cubic-bezier(.65, 0, .35, 1) !important;
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
          transform: translateZ(0) scale(1.035) !important;
          filter: saturate(.88) brightness(.96);
          will-change: transform, filter;
          transition:
            transform 760ms cubic-bezier(.65, 0, .35, 1),
            filter 760ms cubic-bezier(.65, 0, .35, 1) !important;
        }
        ${ROOT} ${CARD}[data-active="true"] img,
        ${ROOT} ${CARD}[data-active="true"] video,
        ${ROOT} ${CARD}[data-active="true"] [data-py-gallery-image],
        ${ROOT} ${CARD}.is-active img,
        ${ROOT} ${CARD}.is-active video,
        ${ROOT} ${CARD}.is-active [data-py-gallery-image] {
          transform: translateZ(0) scale(1) !important;
          filter: saturate(1) brightness(1);
        }
        ${ROOT} ${CARD}[data-active="true"] .py-gallery-zoom,
        ${ROOT} ${CARD}.is-active .py-gallery-zoom {
          opacity: 1 !important;
          pointer-events: auto !important;
          transform: scale(1) !important;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        ${ROOT} ${CARD},
        ${ROOT} ${CARD} img,
        ${ROOT} ${CARD} video,
        ${ROOT} [data-py-gallery-image] { transition: none !important; }
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
    let lockedUntil = 0;
    let trailingTimer = 0;

    const activate = (index) => {
      const next = Math.max(0, Math.min(index, cards.length - 1));
      if (next === active && cards[next].dataset.active === "true") return;
      active = next;
      lockedUntil = performance.now() + TRANSITION_LOCK;
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
      if (performance.now() < lockedUntil) {
        clearTimeout(trailingTimer);
        trailingTimer = window.setTimeout(
          requestUpdate,
          Math.max(16, lockedUntil - performance.now() + 16)
        );
        return;
      }
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
