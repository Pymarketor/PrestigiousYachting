/* Prestigious Yachting — authoritative runtime for Gallery Yacht Section. */
(() => {
  "use strict";

  const ROOT = "[data-py-expanding-gallery]";
  const OUTER = "[data-py-expanding-track]";
  const LIST = "[data-py-gallery-list]";
  const CARD = "[data-py-expanding-card]";
  const IMAGE = "[data-py-gallery-image]";
  const STYLE_ID = "py-expanding-gallery-css";

  const style = document.getElementById(STYLE_ID) || document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    ${ROOT}{box-sizing:border-box!important;display:block!important;width:100%!important;max-width:100%!important;height:auto!important;min-height:0!important;overflow:visible!important}
    ${ROOT} ${OUTER}{display:block!important;width:100%!important;height:auto!important;min-height:0!important}
    ${ROOT} ${LIST}{display:grid!important;width:100%!important;height:auto!important;grid-template-columns:1fr!important;gap:.675rem!important}
    ${ROOT} .py-gallery-row{display:grid!important;width:100%!important;height:clamp(28rem,42vw,38rem)!important;min-height:28rem!important;grid-template-rows:1fr!important;gap:.675rem!important;transition:grid-template-columns .45s cubic-bezier(.22,1,.36,1)!important}
    ${ROOT} ${CARD}{position:relative!important;display:block!important;min-width:0!important;min-height:0!important;overflow:hidden!important;border-radius:.675rem!important;background:#e8e8e8!important;cursor:pointer!important;isolation:isolate!important}
    ${ROOT} ${IMAGE}{display:block!important;width:100%!important;height:100%!important;min-width:100%!important;object-fit:cover!important;object-position:center!important;border-radius:.675rem!important;transform:scale(1.035);transition:transform .35s cubic-bezier(.22,1,.36,1)!important}
    ${ROOT} ${CARD}[data-active="true"] ${IMAGE}{transform:scale(1)}
    ${ROOT} .py-gallery-zoom{--py-icon-size:2.5rem;--py-icon-inner-size:1.2rem;position:absolute!important;right:.875rem!important;bottom:.875rem!important;z-index:4!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;opacity:0;transform:scale(.96);cursor:zoom-in!important;transition:opacity .2s ease,transform .2s ease!important}
    ${ROOT} ${CARD}[data-active="true"] .py-gallery-zoom,${ROOT} ${CARD}:focus-within .py-gallery-zoom{opacity:1;transform:scale(1)}
    .py-gallery-dialog{position:fixed!important;inset:0!important;z-index:2147482999!important;width:100vw!important;max-width:none!important;height:100dvh!important;max-height:none!important;margin:0!important;padding:clamp(1rem,4vw,4rem)!important;overflow:hidden!important;border:0!important;background:rgb(5 10 18 / 96%)!important}
    .py-gallery-dialog[open]{display:grid!important;place-items:center!important}
    .py-gallery-dialog::backdrop{background:rgb(5 10 18 / 96%)!important}
    .py-gallery-dialog__image{display:block!important;width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important}
    .py-gallery-dialog__close,.py-gallery-dialog__nav{position:fixed!important;z-index:2147483000!important;border:0!important}
    .py-gallery-dialog__close{--py-icon-size:2.75rem;--py-icon-inner-size:.9rem;top:max(1rem,env(safe-area-inset-top));right:max(1rem,env(safe-area-inset-right))}
    .py-gallery-dialog__nav{--py-icon-size:2.75rem;--py-icon-inner-size:1.7rem;top:50%;transform:translateY(-50%)}
    .py-gallery-dialog__nav--prev{left:max(1rem,env(safe-area-inset-left))}.py-gallery-dialog__nav--next{right:max(1rem,env(safe-area-inset-right))}
    .py-gallery-dialog__nav--prev .py-icon-svg,.py-gallery-dialog__nav--next .py-icon-svg{transform:none!important}
    @media screen and (max-width:767px){${ROOT} ${LIST},${ROOT} .py-gallery-row{gap:.5rem!important}${ROOT} .py-gallery-row{height:auto!important;min-height:0!important;grid-template-columns:1fr!important;transition:grid-template-rows .45s cubic-bezier(.22,1,.36,1)!important}${ROOT} ${CARD}{min-height:54px!important;border-radius:.55rem!important}${ROOT} ${IMAGE}{border-radius:.55rem!important}.py-gallery-dialog__nav{top:auto!important;bottom:max(1rem,env(safe-area-inset-bottom));transform:none!important}}
    @media(prefers-reduced-motion:reduce){${ROOT} .py-gallery-row,${ROOT} ${IMAGE}{transition:none!important}}
  `;
  if (!style.isConnected) document.head.appendChild(style);

  const icon = (name) => `<span data-py-icon="${name}"></span>`;
  let dialog;
  let dialogCards = [];
  let dialogIndex = 0;
  let returnFocus;

  const setControlIcon = (control, name) => {
    if (!control) return;
    const expected = control.querySelector(`:scope > [data-py-icon="${name}"]`);
    if (!expected) control.innerHTML = icon(name);
    window.PYIcons?.render(control);
  };

  const syncDialogIcons = () => {
    if (!dialog) return;
    setControlIcon(dialog.querySelector(".py-gallery-dialog__close"), "cross");
    setControlIcon(dialog.querySelector(".py-gallery-dialog__nav--prev"), "chevron-left");
    setControlIcon(dialog.querySelector(".py-gallery-dialog__nav--next"), "chevron-right");
  };

  const showDialogImage = (index) => {
    if (!dialogCards.length) return;
    dialogIndex = (index + dialogCards.length) % dialogCards.length;
    const source = dialogCards[dialogIndex].querySelector(IMAGE);
    const target = ensureDialog().querySelector(".py-gallery-dialog__image");
    if (!source || !target) return;
    target.src = source.currentSrc || source.src;
    target.alt = source.alt || "Yacht gallery photo";
  };

  const ensureDialog = () => {
    if (dialog?.isConnected) return dialog;
    dialog = document.querySelector(".py-gallery-dialog") || document.createElement("dialog");
    dialog.className = "py-gallery-dialog";
    dialog.setAttribute("aria-label", "Yacht photo viewer");
    dialog.innerHTML = `<button class="py-gallery-dialog__close py-icon-wrap is-glass" type="button" aria-label="Close photo viewer">${icon("cross")}</button><button class="py-gallery-dialog__nav py-gallery-dialog__nav--prev py-icon-wrap is-glass" type="button" aria-label="Previous photo">${icon("chevron-left")}</button><img class="py-gallery-dialog__image" alt=""><button class="py-gallery-dialog__nav py-gallery-dialog__nav--next py-icon-wrap is-glass" type="button" aria-label="Next photo">${icon("chevron-right")}</button>`;
    if (!dialog.isConnected) document.body.appendChild(dialog);
    dialog.querySelector(".py-gallery-dialog__close").addEventListener("click", () => dialog.close());
    dialog.querySelector(".py-gallery-dialog__nav--prev").addEventListener("click", () => showDialogImage(dialogIndex - 1));
    dialog.querySelector(".py-gallery-dialog__nav--next").addEventListener("click", () => showDialogImage(dialogIndex + 1));
    dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener("close", () => { dialog.querySelector(".py-gallery-dialog__image").removeAttribute("src"); returnFocus?.focus?.({ preventScroll: true }); });
    dialog.addEventListener("keydown", (event) => { if (event.key === "ArrowLeft") showDialogImage(dialogIndex - 1); if (event.key === "ArrowRight") showDialogImage(dialogIndex + 1); });
    syncDialogIcons();
    const iconGuard = new MutationObserver(syncDialogIcons);
    iconGuard.observe(dialog, { childList: true, subtree: true });
    setTimeout(() => iconGuard.disconnect(), 2500);
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

  const initialize = (root) => {
    if (root.dataset.pyGalleryReady === "true") return true;
    const outer = root.querySelector(OUTER);
    const list = root.querySelector(LIST) || outer;
    const cards = [...root.querySelectorAll(CARD)].filter((card) => card.querySelector(IMAGE));
    if (!outer || !list || !cards.length) return false;

    root.dataset.pyGalleryReady = "true";
    root.hidden = false;
    const rows = [];
    for (let start = 0; start < cards.length; start += 5) {
      const row = document.createElement("div");
      row.className = "py-gallery-row";
      row.setAttribute("role", "group");
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
      image.draggable = false;
      card.setAttribute("aria-label", image.alt ? `Expand image: ${image.alt}` : `Expand yacht gallery image ${cards.indexOf(card) + 1}`);
      let zoom = card.querySelector(".py-gallery-zoom");
      if (!zoom) {
        zoom = document.createElement("button");
        zoom.type = "button";
        zoom.className = "py-gallery-zoom py-icon-wrap is-glass";
        zoom.setAttribute("aria-label", image.alt ? `Enlarge image: ${image.alt}` : "Enlarge gallery image");
        zoom.innerHTML = icon("plus");
        card.appendChild(zoom);
      }
      setControlIcon(zoom, "plus");
      const activate = () => { activeByRow.set(row, index); render(); };
      card.addEventListener("pointerenter", (event) => { if (event.pointerType === "mouse") activate(); }, { passive: true });
      card.addEventListener("focus", activate);
      card.addEventListener("click", (event) => { if (!event.target.closest("button,a")) activate(); });
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
    const attempt = () => [...document.querySelectorAll(ROOT)].forEach(initialize);
    attempt();
    const observer = new MutationObserver(attempt);
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 10000);
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
