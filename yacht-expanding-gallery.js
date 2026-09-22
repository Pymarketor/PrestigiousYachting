/* Prestigious Yachting — authoritative runtime for Gallery Yacht Section. */
(() => {
  "use strict";

  // The CMS gallery is now a Webflow Collection List. Keep the data
  // attributes as an override, but use the stable CMS targets as defaults.
  const ROOT = "[data-py-expanding-gallery]";
  const OUTER = "[data-py-expanding-track]";
  const LIST = "[data-py-gallery-list]";
  const CARD = "[data-py-expanding-card]";
  // Keep the fallback <img> selector inside every gallery scope. A raw comma
  // here would expand `${FULL_ROOT} ${IMAGE}` into a global `img` rule.
  const IMAGE = ":is([data-py-gallery-image], img)";
  const FULL_ROOT = "[data-py-gallery-runtime=\"expanding\"]";
  const COMPACT_ROOT = "[data-py-gallery-runtime=\"compact\"]";
  const STYLE_ID = "py-expanding-gallery-css";

  const style = document.getElementById(STYLE_ID) || document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    ${FULL_ROOT}{box-sizing:border-box!important;display:block!important;width:100%!important;max-width:100%!important;height:auto!important;min-height:0!important;overflow:visible!important}
    ${FULL_ROOT} ${OUTER}{display:block!important;width:100%!important;height:auto!important;min-height:0!important}
    ${FULL_ROOT} ${LIST}{display:grid!important;width:100%!important;height:auto!important;grid-template-columns:1fr!important;gap:.675rem!important}
    ${FULL_ROOT} .py-gallery-row{display:grid!important;width:100%!important;height:clamp(28rem,42vw,38rem)!important;min-height:28rem!important;grid-template-rows:1fr!important;gap:.675rem!important;transition:grid-template-columns .45s cubic-bezier(.22,1,.36,1)!important}
    ${FULL_ROOT} ${CARD}{position:relative!important;display:block!important;min-width:0!important;min-height:0!important;overflow:hidden!important;border-radius:.675rem!important;background:#e8e8e8!important;cursor:pointer!important;isolation:isolate!important}
    ${FULL_ROOT} ${IMAGE}{display:block!important;width:100%!important;height:100%!important;min-width:100%!important;object-fit:cover!important;object-position:center!important;border-radius:.675rem!important;transform:scale(1.035);transition:transform .35s cubic-bezier(.22,1,.36,1)!important}
    ${FULL_ROOT} ${CARD}[data-active="true"] ${IMAGE}{transform:scale(1)}
    ${FULL_ROOT} .py-gallery-zoom{position:absolute!important;right:.875rem!important;bottom:.875rem!important;z-index:4!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;opacity:0;transform:scale(.96);cursor:zoom-in!important;transition:opacity .2s ease,transform .2s ease!important}
    ${FULL_ROOT} ${CARD}[data-active="true"] .py-gallery-zoom,${FULL_ROOT} ${CARD}:focus-within .py-gallery-zoom{opacity:1;transform:scale(1)}
    .wrapper-main-gallery{height:auto!important;min-height:0!important;align-items:stretch!important}
    .wrapper-main-gallery>.video-container.yacht{box-sizing:border-box!important;flex:1 1 0!important;width:auto!important;min-width:0!important;height:auto!important;aspect-ratio:auto!important;align-self:stretch!important;margin:0!important;border-radius:.675rem!important;overflow:hidden!important}
    .wrapper-main-gallery>.video-container.yacht>.video-container-loaded{inset:0!important;width:100%!important;height:100%!important;border-radius:inherit!important;overflow:hidden!important}
    .wrapper-main-gallery>.video-container.yacht .video-content,.wrapper-main-gallery>.video-container.yacht .video-fallback,.wrapper-main-gallery>.video-container.yacht .video-start-frame,.wrapper-main-gallery>.video-container.yacht .video-element{width:100%!important;height:100%!important;border-radius:inherit!important}
    .wrapper-main-gallery>${COMPACT_ROOT}{box-sizing:border-box!important;display:block!important;flex:0 0 45%!important;width:45%!important;max-width:45%!important;min-width:45%!important;height:auto!important;min-height:0!important;padding:0 0 0 .625rem!important;overflow:visible!important}
    ${COMPACT_ROOT} .flex-v-gallery{display:grid!important;width:100%!important;height:auto!important;min-height:0!important;padding:0!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;grid-template-rows:none!important;grid-auto-rows:auto!important;gap:.625rem!important}
    ${COMPACT_ROOT} .flex-v-gallery>${CARD}{position:relative!important;width:100%!important;height:auto!important;aspect-ratio:3/2!important;min-width:0!important;min-height:0!important;overflow:hidden!important;border-radius:.675rem!important;background-color:#e8e8e8!important;background-position:center!important;background-repeat:no-repeat!important;background-size:cover!important}
    .py-gallery-dialog{--py-gallery-modal-gutter:clamp(1rem,4vw,4rem);position:fixed!important;inset:0!important;z-index:2147482999!important;box-sizing:border-box!important;width:100vw!important;max-width:none!important;height:100dvh!important;max-height:none!important;margin:0!important;padding:clamp(4.75rem,7vw,6rem) var(--py-gallery-modal-gutter) clamp(1rem,3vw,2rem)!important;overflow:hidden!important;border:0!important;background:rgb(0 0 0 / 48%)!important;-webkit-backdrop-filter:blur(18px) saturate(120%);backdrop-filter:blur(18px) saturate(120%)}
    .py-gallery-dialog[open]{display:grid!important;place-items:center!important}
    .py-gallery-dialog::backdrop{background:rgb(0 0 0 / 48%)!important;-webkit-backdrop-filter:blur(18px) saturate(120%);backdrop-filter:blur(18px) saturate(120%)}
    .py-gallery-dialog__panel{position:relative;display:grid;width:min(88vw,90rem);height:min(82dvh,58rem);min-height:0;grid-template-rows:minmax(0,1fr) auto;overflow:hidden;border:1px solid rgb(255 255 255 / 68%);border-radius:clamp(1.5rem,2.5vw,2rem);background:#f5f5f7;box-shadow:0 40px 100px rgb(0 0 0 / 38%),0 2px 10px rgb(0 0 0 / 12%);isolation:isolate;animation:py-gallery-dialog-in .42s cubic-bezier(.22,1,.36,1) both}
    .py-gallery-dialog__stage{display:grid;min-width:0;min-height:0;padding:0;place-items:stretch;overflow:hidden;background:#0b0b0c}
    .py-gallery-dialog__image{display:block!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;padding:0!important;object-fit:cover!important;object-position:center!important;border-radius:0!important;background:#0b0b0c}
    .py-gallery-dialog__footer{display:grid;box-sizing:border-box;min-height:4.75rem;grid-template-columns:minmax(4rem,1fr) auto minmax(4rem,1fr);align-items:center;gap:1rem;padding:.75rem clamp(1rem,2vw,1.75rem);border-top:1px solid rgb(0 0 0 / 8%);background:rgb(245 245 247 / 92%);-webkit-backdrop-filter:blur(18px) saturate(130%);backdrop-filter:blur(18px) saturate(130%)}
    .py-gallery-dialog__count,.py-gallery-dialog__hint{margin:0;color:rgb(29 29 31 / 58%);font-size:.75rem;font-weight:500;line-height:1.2;letter-spacing:.01em}
    .py-gallery-dialog__hint{text-align:right}
    .py-gallery-dialog__dots{display:flex;align-items:center;justify-content:flex-start;gap:.5rem;max-width:min(62vw,42rem);padding:.25rem;overflow-x:auto;overflow-y:hidden;scrollbar-width:none}
    .py-gallery-dialog__dots::-webkit-scrollbar{display:none}
    .py-gallery-dialog__dot{box-sizing:border-box;width:3.5rem;height:2.25rem;min-width:3.5rem;padding:0;overflow:hidden;border:2px solid transparent;border-radius:.5rem;background:#d2d2d7;opacity:.58;cursor:pointer;transition:border-color .2s ease,opacity .2s ease,transform .2s ease}
    .py-gallery-dialog__dot-image{display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center!important;border-radius:calc(.5rem - 2px)!important;pointer-events:none}
    .py-gallery-dialog__dot:hover,.py-gallery-dialog__dot:focus-visible{opacity:.9;outline:0;transform:scale(1.04)}
    .py-gallery-dialog__dot[aria-current="true"]{border-color:#1d1d1f;opacity:1;transform:scale(1.06)}
    .py-gallery-dialog__close,.py-gallery-dialog__nav{--py-icon-size:3rem;--py-icon-inner-size:1.125rem;position:fixed!important;z-index:2147483000!important;border:1px solid rgb(255 255 255 / 72%)!important;color:#1d1d1f!important;background:rgb(245 245 247 / 88%)!important;box-shadow:0 10px 32px rgb(0 0 0 / 20%),inset 0 0 1px rgb(255 255 255 / 90%)!important;-webkit-backdrop-filter:blur(18px) saturate(140%)!important;backdrop-filter:blur(18px) saturate(140%)!important;transition:background-color .2s ease,transform .2s ease,box-shadow .2s ease!important}
    .py-gallery-dialog__close{top:max(1.25rem,env(safe-area-inset-top));right:max(1.25rem,env(safe-area-inset-right))}
    .py-gallery-dialog__nav{top:50%;transform:translateY(-50%)}
    .py-gallery-dialog__nav--prev{left:max(1rem,env(safe-area-inset-left))}.py-gallery-dialog__nav--next{right:max(1rem,env(safe-area-inset-right))}
    .py-gallery-dialog__close:hover,.py-gallery-dialog__close:focus-visible,.py-gallery-dialog__nav:hover,.py-gallery-dialog__nav:focus-visible{background:rgb(255 255 255 / 98%)!important;box-shadow:0 14px 36px rgb(0 0 0 / 24%),inset 0 0 1px #fff!important;outline:0}
    .py-gallery-dialog__close:hover,.py-gallery-dialog__close:focus-visible{transform:scale(1.04)}
    .py-gallery-dialog__nav:hover,.py-gallery-dialog__nav:focus-visible{transform:translateY(-50%) scale(1.04)}
    .py-gallery-dialog__nav--prev .py-icon-svg,.py-gallery-dialog__nav--next .py-icon-svg{transform:none!important}
    @keyframes py-gallery-dialog-in{from{opacity:0;transform:translateY(18px) scale(.985)}to{opacity:1;transform:translateY(0) scale(1)}}
    @media screen and (max-width:767px){.wrapper-main-gallery{height:auto!important;min-height:0!important}.wrapper-main-gallery>${COMPACT_ROOT}{padding-left:.25rem!important}${COMPACT_ROOT} .flex-v-gallery{gap:.25rem!important}${FULL_ROOT} ${LIST},${FULL_ROOT} .py-gallery-row{gap:.5rem!important}${FULL_ROOT} .py-gallery-row{height:auto!important;min-height:0!important;grid-template-columns:1fr!important;transition:grid-template-rows .45s cubic-bezier(.22,1,.36,1)!important}${FULL_ROOT} ${CARD}{min-height:54px!important;border-radius:.55rem!important}${FULL_ROOT} ${IMAGE}{border-radius:.55rem!important}.py-gallery-dialog{padding:max(4.5rem,calc(env(safe-area-inset-top) + 3.5rem)) .5rem max(4.75rem,calc(env(safe-area-inset-bottom) + 4rem))!important}.py-gallery-dialog__panel{width:calc(100vw - 1rem);height:calc(100dvh - 9.25rem);border-radius:1.35rem}.py-gallery-dialog__footer{min-height:3.75rem;grid-template-columns:3rem minmax(0,1fr);padding:.5rem .75rem}.py-gallery-dialog__hint{display:none}.py-gallery-dialog__dots{max-width:none;gap:.375rem}.py-gallery-dialog__dot{width:2.75rem;height:1.8rem;min-width:2.75rem;border-radius:.4rem}.py-gallery-dialog__dot-image{border-radius:calc(.4rem - 2px)!important}.py-gallery-dialog__close,.py-gallery-dialog__nav{--py-icon-size:2.75rem;--py-icon-inner-size:1rem}.py-gallery-dialog__close{top:max(.75rem,env(safe-area-inset-top));right:max(.75rem,env(safe-area-inset-right))}.py-gallery-dialog__nav{top:auto!important;bottom:max(.75rem,env(safe-area-inset-bottom));transform:none!important}.py-gallery-dialog__nav--prev{left:max(.75rem,env(safe-area-inset-left))}.py-gallery-dialog__nav--next{right:max(.75rem,env(safe-area-inset-right))}.py-gallery-dialog__nav:hover,.py-gallery-dialog__nav:focus-visible{transform:scale(1.04)}}
    @media(prefers-reduced-motion:reduce){${FULL_ROOT} .py-gallery-row,${FULL_ROOT} ${IMAGE},.py-gallery-dialog__panel,.py-gallery-dialog__dot{transition:none!important;animation:none!important}}
  `;
  if (!style.isConnected) document.head.appendChild(style);

  let dialog;
  let dialogCards = [];
  let dialogIndex = 0;
  let returnFocus;

  const getCardSource = (card) => {
    const image = card.querySelector(IMAGE);
    if (image?.currentSrc || image?.src) {
      return { src: image.currentSrc || image.src, alt: image.alt || "Yacht gallery photo" };
    }
    const match = card.style.backgroundImage.match(/url\(["']?(.+?)["']?\)/);
    return match ? { src: match[1], alt: card.getAttribute("aria-label") || "Yacht gallery photo" } : null;
  };

  const setControlIcon = (control, name) => {
    if (!control) return;
    control.dataset.pyIcon = name;
    const expected = control.querySelector(":scope > .py-icon-svg");
    if (!expected) {
      delete control.dataset.pyIconLoaded;
      control.replaceChildren();
    }
    window.PYIcons?.render(control.parentElement || document);
  };

  const syncDialogIcons = () => {
    if (!dialog) return;
    setControlIcon(dialog.querySelector(".py-gallery-dialog__close"), "cross");
    setControlIcon(dialog.querySelector(".py-gallery-dialog__nav--prev"), "chevron-left");
    setControlIcon(dialog.querySelector(".py-gallery-dialog__nav--next"), "chevron-right");
  };

  const syncDialogPagination = () => {
    const viewer = ensureDialog();
    const count = viewer.querySelector(".py-gallery-dialog__count");
    const dots = viewer.querySelector(".py-gallery-dialog__dots");
    if (count) count.textContent = `${dialogIndex + 1} / ${dialogCards.length}`;
    if (!dots) return;
    if (dots.children.length !== dialogCards.length) {
      dots.replaceChildren(...dialogCards.map((card, index) => {
        const dot = document.createElement("button");
        const source = getCardSource(card);
        dot.className = "py-gallery-dialog__dot";
        dot.type = "button";
        dot.setAttribute("aria-label", source?.alt ? `View photo ${index + 1}: ${source.alt}` : `View photo ${index + 1}`);
        if (source?.src) {
          const thumbnail = document.createElement("img");
          thumbnail.className = "py-gallery-dialog__dot-image";
          thumbnail.src = source.src;
          thumbnail.alt = "";
          thumbnail.loading = "lazy";
          thumbnail.decoding = "async";
          dot.appendChild(thumbnail);
        }
        dot.addEventListener("click", () => showDialogImage(index));
        return dot;
      }));
    }
    [...dots.children].forEach((dot, index) => {
      dot.setAttribute("aria-current", String(index === dialogIndex));
    });
  };

  const showDialogImage = (index) => {
    if (!dialogCards.length) return;
    dialogIndex = (index + dialogCards.length) % dialogCards.length;
    const source = getCardSource(dialogCards[dialogIndex]);
    const target = ensureDialog().querySelector(".py-gallery-dialog__image");
    if (!source || !target) return;
    target.src = source.src;
    target.alt = source.alt;
    syncDialogPagination();
  };

  const ensureDialog = () => {
    if (dialog?.isConnected) return dialog;
    dialog = document.querySelector(".py-gallery-dialog") || document.createElement("dialog");
    dialog.className = "py-gallery-dialog";
    dialog.setAttribute("aria-label", "Yacht photo viewer");
    dialog.innerHTML = `<button class="py-gallery-dialog__close py-icon-wrap is-glass" data-py-icon="cross" type="button" aria-label="Close photo viewer"></button><button class="py-gallery-dialog__nav py-gallery-dialog__nav--prev py-icon-wrap is-glass" data-py-icon="chevron-left" type="button" aria-label="Previous photo"></button><div class="py-gallery-dialog__panel"><div class="py-gallery-dialog__stage"><img class="py-gallery-dialog__image" alt=""></div><div class="py-gallery-dialog__footer"><span class="py-gallery-dialog__count" aria-live="polite"></span><div class="py-gallery-dialog__dots" aria-label="Choose a gallery photo"></div><span class="py-gallery-dialog__hint">Use arrow keys</span></div></div><button class="py-gallery-dialog__nav py-gallery-dialog__nav--next py-icon-wrap is-glass" data-py-icon="chevron-right" type="button" aria-label="Next photo"></button>`;
    if (!dialog.isConnected) document.body.appendChild(dialog);
    dialog.querySelector(".py-gallery-dialog__close").addEventListener("click", () => dialog.close());
    dialog.querySelector(".py-gallery-dialog__nav--prev").addEventListener("click", () => showDialogImage(dialogIndex - 1));
    dialog.querySelector(".py-gallery-dialog__nav--next").addEventListener("click", () => showDialogImage(dialogIndex + 1));
    dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener("close", () => { dialog.querySelector(".py-gallery-dialog__image").removeAttribute("src"); returnFocus?.focus?.({ preventScroll: true }); });
    dialog.addEventListener("keydown", (event) => { if (event.key === "ArrowLeft") showDialogImage(dialogIndex - 1); if (event.key === "ArrowRight") showDialogImage(dialogIndex + 1); });
    syncDialogIcons();
    return dialog;
  };

  const openDialog = (cards, index, trigger) => {
    dialogCards = cards;
    returnFocus = trigger;
    showDialogImage(index);
    const viewer = ensureDialog();
    if (!viewer.open) viewer.showModal?.();
    if (!viewer.open) viewer.setAttribute("open", "");
  };

  const initializeCompact = (root) => {
    if (root.dataset.pyCompactGalleryReady === "true") return true;
    const list = root.querySelector(".flex-v-gallery");
    const cards = list ? [...list.children].filter((card) => card.matches(CARD) && getCardSource(card)) : [];
    if (!list || !cards.length) return false;
    root.dataset.pyGalleryRuntime = "compact";
    root.dataset.pyCompactGalleryReady = "true";
    root.hidden = false;
    list.setAttribute("role", "list");
    list.setAttribute("aria-label", "Yacht gallery previews");
    cards.forEach((card, index) => {
      card.setAttribute("role", "listitem");
      if (!card.getAttribute("aria-label")) card.setAttribute("aria-label", `Yacht gallery image ${index + 1}`);
    });
    return true;
  };

  const initialize = (root) => {
    if (root.closest(".wrapper-main-gallery") || root.querySelector(".flex-v-gallery")) {
      return initializeCompact(root);
    }
    if (root.dataset.pyGalleryReady === "true") return true;
    const outer = root.querySelector(OUTER);
    const list = root.querySelector(LIST) || outer;
    const cards = [...root.querySelectorAll(CARD)].filter((card) => getCardSource(card));
    if (!outer || !list || !cards.length) return false;

    root.dataset.pyGalleryRuntime = "expanding";
    root.dataset.pyGalleryReady = "true";
    root.hidden = false;
    const rows = [];
    for (let start = 0; start < cards.length; start += 5) {
      const row = document.createElement("div");
      row.className = "py-gallery-row";
      row.setAttribute("role", "listitem");
      row.setAttribute("aria-label", `Gallery row ${rows.length + 1}`);
      cards.slice(start, start + 5).forEach((card) => row.appendChild(card));
      list.appendChild(row);
      rows.push(row);
    }

    const mobile = matchMedia("(max-width:767px)");
    const activeByRow = new WeakMap();
    rows.forEach((row) => activeByRow.set(row, 0));
    const render = () => rows.forEach((row) => {
      const rowCards = [...row.querySelectorAll(CARD)];
      const active = Math.min(activeByRow.get(row) || 0, rowCards.length - 1);
      rowCards.forEach((card, index) => { card.dataset.active = String(index === active); card.classList.toggle("is-active", index === active); });
      if (mobile.matches) {
        row.style.gridTemplateColumns = "1fr";
        row.style.gridTemplateRows = rowCards.map((_, index) => index === active ? "minmax(0,66.666vw)" : "54px").join(" ");
      } else {
        row.style.gridTemplateRows = "1fr";
        row.style.gridTemplateColumns = rowCards.map((_, index) => index === active ? "5fr" : "1fr").join(" ");
      }
    });

    rows.forEach((row) => [...row.querySelectorAll(CARD)].forEach((card, index) => {
      const image = card.querySelector(IMAGE);
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      if (image) image.draggable = false;
      const source = getCardSource(card);
      card.setAttribute("aria-label", source?.alt ? `Expand image: ${source.alt}` : `Expand yacht gallery image ${cards.indexOf(card) + 1}`);
      let zoom = card.querySelector(".py-gallery-zoom");
      if (!zoom) {
        zoom = document.createElement("button");
        zoom.type = "button";
        zoom.className = "py-gallery-zoom py-icon-wrap is-glass";
        zoom.dataset.pyIcon = "plus";
        zoom.setAttribute("aria-label", source?.alt ? `Enlarge image: ${source.alt}` : "Enlarge gallery image");
        card.appendChild(zoom);
      }
      setControlIcon(zoom, "plus");
      const activate = () => { activeByRow.set(row, index); render(); };
      card.addEventListener("pointerenter", (event) => { if (event.pointerType === "mouse") activate(); }, { passive: true });
      card.addEventListener("focus", activate);
      card.addEventListener("click", (event) => { if (!event.target.closest("button,a")) activate(); });
      card.addEventListener("keydown", (event) => {
        const rowCards = [...row.querySelectorAll(CARD)];
        let nextIndex = null;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % rowCards.length;
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + rowCards.length) % rowCards.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = rowCards.length - 1;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
          return;
        }
        if (nextIndex === null) return;
        event.preventDefault();
        const nextCard = rowCards[nextIndex];
        activeByRow.set(row, nextIndex);
        render();
        nextCard?.focus({ preventScroll: true });
      });
      zoom.addEventListener("click", (event) => { event.preventDefault(); event.stopPropagation(); openDialog(cards, cards.indexOf(card), zoom); });
    }));
    mobile.addEventListener?.("change", render);
    render();
    [700, 1700].forEach((delay) => setTimeout(() => {
      root.querySelectorAll(".py-gallery-zoom").forEach((control) => setControlIcon(control, "plus"));
      syncDialogIcons();
    }, delay));
    return true;
  };

  const boot = () => {
    const attempt = () => {
      const roots = [...document.querySelectorAll(ROOT)];
      return roots.length > 0 && roots.every(initialize);
    };
    if (attempt()) return;
    const observer = new MutationObserver(() => {
      if (attempt()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 5000);
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
