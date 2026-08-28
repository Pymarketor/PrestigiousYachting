(() => {
  "use strict";

  const ROOT_SELECTOR = ":is(.similar-yacht-section, .section-similar-yachts)";
  const CARD_SELECTOR = ".cms_list-item.similar, [data-slider-slide][instance='similar']";
  const STYLE_ID = "py-similar-coverflow-v3-style";
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

  const installStyles = () => {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] {
        --py-cf-card: clamp(280px, 45vw, 720px);
        --py-cf-control: 2.875rem;
        position: relative;
        width: 100%;
        max-width: none !important;
        background: transparent !important;
        overflow: clip;
        isolation: isolate;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] :is(.similar-yacht-container, .container-similar-yachts) {
        box-sizing: border-box;
        width: 100%;
        max-width: none;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .similar-yacht-global {
        width: 100%;
        max-width: none;
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .slider-gallery {
        position: relative;
        display: block;
        box-sizing: border-box;
        width: 100%;
        max-width: none;
        height: auto !important;
        min-height: 0 !important;
        margin: 0 !important;
        padding: 3rem 0 2.5rem;
        gap: 0 !important;
        background: transparent !important;
        overflow: visible;
        outline: none;
        cursor: grab;
        touch-action: pan-y;
        perspective-origin: center center;
        user-select: none;
        -webkit-user-select: none;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .slider-gallery:active {
        cursor: grabbing;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .slider-gallery:focus-visible {
        outline: 2px solid rgba(25, 45, 70, .72);
        outline-offset: -4px;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .collection-list-wrapper-5 {
        display: block !important;
        width: 100%;
        max-width: none !important;
        height: auto !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: visible;
        transform: none !important;
        transform-style: preserve-3d !important;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .track-slider-similar-yacht {
        position: relative;
        display: block;
        box-sizing: border-box;
        width: 100%;
        min-height: 1px;
        margin: 0;
        padding: 0;
        gap: 0 !important;
        scroll-snap-type: none !important;
        scroll-behavior: auto !important;
        scroll-padding: 0 !important;
        transition: none !important;
        overflow: visible;
        transform-style: preserve-3d !important;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .cms_list-item.similar,
      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] [data-slider-slide][instance="similar"] {
        position: absolute !important;
        top: 0 !important;
        left: 50% !important;
        display: block !important;
        flex: none !important;
        box-sizing: border-box !important;
        width: var(--py-cf-card) !important;
        min-width: 0 !important;
        max-width: none !important;
        height: calc(var(--py-cf-card) * .6666667) !important;
        min-height: 0 !important;
        margin: 0 !important;
        scroll-snap-align: none !important;
        overflow: hidden !important;
        border: 0 !important;
        border-radius: 2rem !important;
        background: #f1f2f4 !important;
        box-shadow: 0 18px 42px rgba(18, 32, 50, .18) !important;
        opacity: 0;
        transform-origin: center center;
        transform-style: preserve-3d;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transition: none !important;
        animation: none !important;
        will-change: transform, opacity;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .cms_list-item.similar > .yacht-card-favorite,
      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] [data-slider-slide][instance="similar"] > .yacht-card-favorite,
      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .card-favorite-yacht-image {
        position: relative !important;
        display: block !important;
        flex: none !important;
        width: 100% !important;
        min-width: 100% !important;
        max-width: none !important;
        height: 100% !important;
        min-height: 100% !important;
        max-height: none !important;
        margin: 0 !important;
        overflow: hidden !important;
        border-radius: 1rem !important;
        box-shadow: none !important;
        aspect-ratio: 3 / 2 !important;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .image-yacht-card {
        position: absolute !important;
        inset: 0 !important;
        display: block !important;
        width: 100% !important;
        min-width: 100% !important;
        max-width: none !important;
        height: 100% !important;
        min-height: 100% !important;
        max-height: none !important;
        margin: 0 !important;
        border-radius: 1rem !important;
        object-fit: cover !important;
        object-position: center !important;
        aspect-ratio: 3 / 2 !important;
        transform: none !important;
        pointer-events: none;
        user-select: none;
        -webkit-user-drag: none;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .card-favorite-yacht-image > .forrward-link {
        position: absolute !important;
        inset: 0 !important;
        z-index: 5 !important;
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        opacity: 0 !important;
        cursor: grab !important;
        pointer-events: none !important;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .cms_list-item.similar > .description-yacht-card,
      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] [data-slider-slide][instance="similar"] > .description-yacht-card {
        display: none !important;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .card-favorite-yacht-image > .open-arrow {
        z-index: 12 !important;
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        cursor: pointer !important;
        pointer-events: auto !important;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .slider-padding-start,
      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .slider-padding-end {
        display: none !important;
      }

      ${ROOT_SELECTOR} .arrow-scroll-left-card-other,
      ${ROOT_SELECTOR} .arrow-scroll-right-card-other {
        position: absolute !important;
        top: 50% !important;
        z-index: 220 !important;
        display: grid !important;
        width: var(--py-cf-control, 2.875rem) !important;
        min-width: var(--py-cf-control, 2.875rem) !important;
        height: var(--py-cf-control, 2.875rem) !important;
        min-height: var(--py-cf-control, 2.875rem) !important;
        padding: .8125rem !important;
        place-items: center !important;
        border: 1px solid rgba(255, 255, 255, .72) !important;
        border-radius: 50% !important;
        color: #1d2938 !important;
        background: rgba(255, 255, 255, .76) !important;
        box-shadow: 0 10px 30px rgba(13, 27, 46, .14) !important;
        backdrop-filter: blur(14px) saturate(125%);
        -webkit-backdrop-filter: blur(14px) saturate(125%);
        transform: translateY(-50%) !important;
        transition: background-color 180ms ease, opacity 180ms ease !important;
        cursor: pointer;
      }

      ${ROOT_SELECTOR} .arrow-scroll-left-card-other {
        left: clamp(.75rem, 3vw, 2.5rem) !important;
      }

      ${ROOT_SELECTOR} .arrow-scroll-right-card-other {
        right: clamp(.75rem, 3vw, 2.5rem) !important;
      }

      ${ROOT_SELECTOR} .arrow-scroll-left-card-other svg {
        transform: none !important;
        transform-origin: center !important;
      }

      ${ROOT_SELECTOR} .arrow-scroll-right-card-other svg {
        transform: rotate(180deg) !important;
        transform-origin: center !important;
      }

      ${ROOT_SELECTOR} .arrow-scroll-left-card-other:hover,
      ${ROOT_SELECTOR} .arrow-scroll-right-card-other:hover {
        background: rgba(255, 255, 255, .96) !important;
      }

      ${ROOT_SELECTOR} .arrow-scroll-left-card-other:focus-visible,
      ${ROOT_SELECTOR} .arrow-scroll-right-card-other:focus-visible {
        outline: 2px solid rgba(25, 45, 70, .78) !important;
        outline-offset: 3px !important;
      }

      ${ROOT_SELECTOR} .arrow-scroll-left-card-other.is-unavailable,
      ${ROOT_SELECTOR} .arrow-scroll-right-card-other.is-unavailable {
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-count="0"] .arrow-scroll-left-card-other,
      ${ROOT_SELECTOR}[data-py-coverflow-count="0"] .arrow-scroll-right-card-other,
      ${ROOT_SELECTOR}[data-py-coverflow-count="1"] .arrow-scroll-left-card-other,
      ${ROOT_SELECTOR}[data-py-coverflow-count="1"] .arrow-scroll-right-card-other {
        display: none !important;
      }

      .py-cf-caption {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        min-height: 10rem;
        padding: .125rem 1.5rem 0;
        text-align: center;
        opacity: 0;
        transform: translateY(5px);
        transition: opacity 300ms ease, transform 300ms ease;
      }

      .py-cf-caption.is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      .py-cf-caption__title {
        margin: 0;
        color: #24282f;
        font-size: .9375rem;
        font-weight: 600;
        line-height: 1.2;
      }

      .py-cf-caption__subtitle {
        margin: .35rem 0 0;
        color: rgba(36, 40, 47, .58);
        font-size: .8125rem;
        line-height: 1.3;
      }

      .py-cf-caption__meta {
        display: grid;
        width: 100%;
        max-width: 14.375rem;
        margin: 1.25rem 0 0;
        padding: 0;
        color: #24282f;
        font-size: .75rem;
      }

      .py-cf-caption__row {
        display: flex;
        justify-content: space-between;
        gap: 1.25rem;
        padding: .3125rem 0;
      }

      .py-cf-caption__label {
        display: inline-flex;
        align-items: center;
        gap: .4375rem;
        color: rgba(36, 40, 47, .52);
      }

      .py-cf-caption__icon {
        display: inline-flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        width: 1rem;
        height: 1rem;
        color: rgba(36, 40, 47, .68);
      }

      .py-cf-caption__icon svg {
        display: block;
        width: 100%;
        height: 100%;
        overflow: visible;
      }

      .py-cf-caption__value {
        margin: 0;
        font-weight: 500;
        text-align: right;
      }

      @media screen and (max-width: 767px) {
        ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] {
          --py-cf-card: min(78vw, 390px);
          --py-cf-control: 2.75rem;
        }

        ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .slider-gallery {
          padding: 2.25rem 0 2rem;
        }

        ${ROOT_SELECTOR} .arrow-scroll-left-card-other {
          left: .625rem !important;
        }

        ${ROOT_SELECTOR} .arrow-scroll-right-card-other {
          right: .625rem !important;
        }

        .py-cf-caption {
          min-height: 9.5rem;
          padding-right: 1rem;
          padding-left: 1rem;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .py-cf-caption,
        ${ROOT_SELECTOR} .arrow-scroll-left-card-other,
        ${ROOT_SELECTOR} .arrow-scroll-right-card-other {
          transition: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  };

  const cleanText = (value) => (value || "")
    .replace(/\s+/g, " ")
    .replace(/From(?=\d)/i, "From ")
    .replace(/(?<=\d)Guests?/i, (match) => " " + match)
    .replace(/\s*\/\s*/g, " / ")
    .trim();

  const initialize = (root) => {
    if (!(root instanceof HTMLElement) || root.dataset.pyCoverflowMounted === "true") return;
    const frame = root.querySelector(".slider-gallery, [slider-instance='similar']");
    const track = root.querySelector(".track-slider-similar-yacht, [data-slider-track][instance='similar']");
    const global = root.querySelector(".similar-yacht-global") || frame?.parentElement;
    const previousControl = root.querySelector(".arrow-scroll-left-card-other");
    const nextControl = root.querySelector(".arrow-scroll-right-card-other");
    if (!(frame instanceof HTMLElement) || !(track instanceof HTMLElement) || !(global instanceof HTMLElement)) return;

    root.dataset.pyCoverflowMounted = "true";
    frame.removeAttribute("data-slider");
    frame.removeAttribute("slider-instance");
    root.querySelectorAll("[data-slider-prev], [data-slider-next]").forEach((control) => {
      control.removeAttribute("data-slider-prev");
      control.removeAttribute("data-slider-next");
    });
    frame.setAttribute("role", "region");
    frame.setAttribute("aria-roledescription", "carousel");
    frame.setAttribute("aria-label", "Similar yacht carousel");
    if (!frame.hasAttribute("tabindex")) frame.tabIndex = 0;

    const caption = document.createElement("div");
    caption.className = "py-cf-caption";
    caption.setAttribute("aria-live", "polite");
    global.appendChild(caption);

    let cards = [];
    let position = 0;
    let target = 0;
    let cardWidth = 0;
    let selected = -1;
    let animationFrame = null;
    let syncFrame = null;
    let drag = null;
    let suppressClick = false;
    let resizeObserver = null;
    let initializedCardCount = 0;

    const rotate = 44;
    const depth = .6;
    const perspective = 3;
    const falloff = .56;
    const fade = .1;
    const gap = -.18;
    const loop = false;

    const indexAt = (value) => cards.length
      ? Math.max(0, Math.min(cards.length - 1, Math.round(value)))
      : 0;

    const normalizePosition = (value) => cards.length
      ? Math.max(0, Math.min(cards.length - 1, value))
      : 0;

    const updateControls = () => {
      const atStart = !cards.length || position <= .001;
      const atEnd = !cards.length || position >= cards.length - 1 - .001;
      [[previousControl, atStart], [nextControl, atEnd]].forEach(([control, unavailable]) => {
        if (!(control instanceof HTMLElement)) return;
        control.classList.toggle("is-unavailable", unavailable);
        control.setAttribute("aria-disabled", String(unavailable));
        control.setAttribute("aria-hidden", String(unavailable));
        control.tabIndex = unavailable ? -1 : 0;
      });
    };

    const createText = (tag, className, text) => {
      const element = document.createElement(tag);
      element.className = className;
      element.textContent = text;
      return element;
    };

    const createSpecificationIcon = (type) => {
      const icon = document.createElement("span");
      icon.className = "py-cf-caption__icon";
      icon.setAttribute("aria-hidden", "true");
      icon.innerHTML = type === "guests"
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m18 8 4 4-4 4M6 8l-4 4 4 4M2 12h20"/></svg>';
      return icon;
    };

    const renderCaption = (index) => {
      const card = cards[index];
      if (!card) return;
      const title = cleanText(
        card.querySelector(".model-yacht-card.similar > [fs-list-field='Model']")?.textContent ||
        card.querySelector(".model-yacht-card.similar")?.firstElementChild?.textContent
      ) || "Yacht charter";
      const price = cleanText(card.querySelector(".wrapper-price-yacht-card")?.textContent);
      const specifications = Array.from(card.querySelectorAll(".wrapper-specifications-yacht-card .specifications-yacht-card"))
        .map((element) => cleanText(element.textContent))
        .filter(Boolean);

      caption.classList.remove("is-visible");
      caption.replaceChildren();
      caption.appendChild(createText("p", "py-cf-caption__title", title));
      if (price) caption.appendChild(createText("p", "py-cf-caption__subtitle", price));

      if (specifications.length) {
        const list = document.createElement("dl");
        list.className = "py-cf-caption__meta";
        specifications.forEach((value, specificationIndex) => {
          const isGuests = /guests?/i.test(value);
          const row = document.createElement("div");
          row.className = "py-cf-caption__row";
          const label = createText("dt", "py-cf-caption__label", isGuests ? "Guests" : specificationIndex === 1 ? "Length" : "Details");
          label.prepend(createSpecificationIcon(isGuests ? "guests" : "length"));
          const normalizedValue = isGuests ? cleanText(value.replace(/guests?/i, "")) : value;
          const detail = createText("dd", "py-cf-caption__value", normalizedValue);
          row.append(label, detail);
          list.appendChild(row);
        });
        caption.appendChild(list);
      }

      requestAnimationFrame(() => caption.classList.add("is-visible"));
    };

    const updateSelection = () => {
      const current = indexAt(position);
      cards.forEach((card, index) => {
        card.setAttribute("aria-current", String(index === current));
        card.setAttribute("aria-label", (index + 1) + " of " + cards.length);
        const imageLink = card.querySelector(".forrward-link[href]");
        const arrowLink = card.querySelector(".open-arrow[href]");
        if (imageLink instanceof HTMLElement) imageLink.tabIndex = -1;
        if (arrowLink instanceof HTMLElement) arrowLink.tabIndex = index === current ? 0 : -1;
      });
      root.dataset.pyCoverflowIndex = String(current);
      if (current !== selected) {
        selected = current;
        renderCaption(current);
      }
      updateControls();
    };

    const paint = () => {
      if (!cards.length || !cardWidth) return;
      const pitch = cardWidth * (1 + gap);

      cards.forEach((card, index) => {
        let offset = index - position;
        if (loop && cards.length > 1) {
          offset = ((offset % cards.length) + cards.length) % cards.length;
          if (offset > cards.length / 2) offset -= cards.length;
        }

        const distance = Math.abs(offset);
        const ramp = Math.pow(distance, falloff);
        const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);
        const edge = !loop || cards.length <= 2
          ? 1
          : Math.min(1, Math.max(0, cards.length / 2 - distance));
        const opacity = Math.max(0, 1 - fade * distance) * edge;

        card.style.transform =
          "translateX(calc(-50% + " + (offset * pitch) + "px)) " +
          "translateZ(" + (-depth * cardWidth * ramp) + "px) " +
          "rotateY(" + (-tilt) + "deg)";
        card.style.opacity = String(opacity);
        card.style.zIndex = String(100 - Math.round(distance));
        card.style.visibility = opacity <= 0 ? "hidden" : "visible";
        card.style.pointerEvents = opacity <= 0 ? "none" : "auto";
      });
      updateSelection();
    };

    const measure = () => {
      if (!cards.length) return;
      cardWidth = cards[0].offsetWidth;
      if (!cardWidth) return;
      track.style.height = Math.ceil(cards[0].offsetHeight) + "px";
      frame.style.perspective = Math.ceil(cardWidth * perspective) + "px";
      paint();
    };

    const settle = (destination) => {
      if (!cards.length) return;
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      target = normalizePosition(destination);

      if (reducedMotion.matches) {
        position = target;
        paint();
        animationFrame = null;
        return;
      }

      const step = () => {
        const remaining = target - position;
        if (Math.abs(remaining) < .0004) {
          position = target;
          paint();
          animationFrame = null;
          return;
        }
        position += remaining * .16;
        paint();
        animationFrame = requestAnimationFrame(step);
      };
      animationFrame = requestAnimationFrame(step);
    };

    const nudge = (amount) => settle(Math.round(target) + amount);

    const goTo = (index) => {
      const destination = loop && cards.length > 1
        ? index + Math.round((target - index) / cards.length) * cards.length
        : index;
      settle(destination);
    };

    const controlAction = (event) => {
      const control = event.target instanceof Element
        ? event.target.closest(".arrow-scroll-left-card-other, .arrow-scroll-right-card-other")
        : null;
      if (!(control instanceof HTMLElement) || !root.contains(control)) return false;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (control.matches(".arrow-scroll-left-card-other")) nudge(-1);
      else nudge(1);
      return true;
    };

    root.addEventListener("click", controlAction, true);
    root.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") controlAction(event);
    }, true);

    frame.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        nudge(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        nudge(1);
      }
    });

    frame.addEventListener("pointerdown", (event) => {
      if (!cards.length || event.button > 0) return;
      if (event.target instanceof Element && event.target.closest(".arrow-scroll-left-card-other, .arrow-scroll-right-card-other, .open-arrow")) return;
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      animationFrame = null;
      target = position;
      frame.setPointerCapture?.(event.pointerId);
      drag = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        position,
        velocity: 0,
        time: performance.now(),
        moved: false
      };
    });

    frame.addEventListener("pointermove", (event) => {
      if (!drag || drag.id !== event.pointerId || !cardWidth) return;
      const deltaX = event.clientX - drag.x;
      const deltaY = event.clientY - drag.y;
      if (Math.abs(deltaX) > 6) drag.moved = true;
      if (Math.abs(deltaX) <= Math.abs(deltaY) && !drag.moved) return;
      event.preventDefault();
      const pitch = cardWidth * (1 + gap);
      const now = performance.now();
      const previousPosition = position;
      position = normalizePosition(drag.position - deltaX / pitch);
      drag.velocity = ((position - previousPosition) / Math.max(now - drag.time, 1)) * 1000;
      drag.time = now;
      paint();
    }, { passive: false });

    const finishDrag = (event) => {
      if (!drag || drag.id !== event.pointerId) return;
      const moved = drag.moved;
      const carried = Math.max(-2, Math.min(2, drag.velocity * .18));
      drag = null;
      if (moved) {
        suppressClick = true;
        setTimeout(() => { suppressClick = false; }, 0);
      }
      settle(Math.round(position + carried));
    };

    frame.addEventListener("pointerup", finishDrag);
    frame.addEventListener("pointercancel", finishDrag);

    frame.addEventListener("click", (event) => {
      const card = event.target instanceof Element ? event.target.closest(CARD_SELECTOR) : null;
      if (!(card instanceof HTMLElement)) return;
      if (suppressClick) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
      const itemLink = event.target instanceof Element
        ? event.target.closest(".card-favorite-yacht-image > .forrward-link[href], .card-favorite-yacht-image > .open-arrow[href]")
        : null;
      if (itemLink instanceof HTMLAnchorElement) return;
      const index = cards.indexOf(card);
      if (index >= 0 && index !== indexAt(position)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        goTo(index);
      }
    }, true);

    const scheduleSync = () => {
      if (syncFrame !== null) cancelAnimationFrame(syncFrame);
      syncFrame = requestAnimationFrame(() => {
        syncFrame = null;
        cards = Array.from(track.children).filter((element) => element.matches?.(CARD_SELECTOR));
        root.dataset.pyCoverflowCount = String(cards.length);

        if (cards.length && cards.length !== initializedCardCount) {
          position = Math.floor(cards.length / 2);
          target = position;
          initializedCardCount = cards.length;
        } else {
          position = normalizePosition(position);
          target = normalizePosition(target);
        }

        if (!cards.length) {
          initializedCardCount = 0;
          root.removeAttribute("data-py-coverflow-ready");
          track.style.removeProperty("height");
          caption.replaceChildren();
          return;
        }

        root.dataset.pyCoverflowReady = "true";
        cards.forEach((card) => {
          card.setAttribute("role", "group");
          card.setAttribute("aria-roledescription", "slide");
          const image = card.querySelector("img");
          if (image) {
            image.setAttribute("draggable", "false");
            image.setAttribute("loading", "lazy");
            image.setAttribute("decoding", "async");
          }
        });

        resizeObserver?.disconnect();
        resizeObserver = new ResizeObserver(measure);
        resizeObserver.observe(frame);
        cards.forEach((card) => resizeObserver.observe(card));
        selected = -1;
        requestAnimationFrame(measure);
      });
    };

    const listObserver = new MutationObserver(scheduleSync);
    listObserver.observe(track, { childList: true });
    scheduleSync();
  };

  const boot = () => {
    installStyles();
    document.querySelectorAll(ROOT_SELECTOR).forEach(initialize);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
  window.addEventListener("load", boot, { once: true });
  setTimeout(boot, 700);
  setTimeout(boot, 1800);
})();
