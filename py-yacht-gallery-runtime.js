/* Prestigious Yachting — CMS yacht gallery runtime.
 * Standalone: no Slider JS, no river-gallery dependency.
 */
(() => {
  "use strict";

  // yacht-expanding-gallery.js is the authoritative runtime when present.
  if (document.querySelector('script[src*="yacht-expanding-gallery.js"]')) return;

  const ROOT = "[data-py-expanding-gallery], [data-py-gallery-source=\"cms\"]";
  const TRACK = "[data-py-expanding-track], .flex-v-gallery";
  const CARD = "[data-py-expanding-card], .flex-v-gallery > *";
  const IMAGE = "[data-py-gallery-image], img";

  const galleries = new WeakMap();

  const getCards = (root) => [...root.querySelectorAll(CARD)].filter((card) => {
    const image = card.querySelector(IMAGE);
    return image || Boolean(card.style.backgroundImage);
  });

  const getImageSource = (card) => {
    const image = card.querySelector(IMAGE);
    if (image) return { src: image.currentSrc || image.src, alt: image.alt || "Yacht gallery photo" };
    const match = card.style.backgroundImage.match(/url\(["']?(.+?)["']?\)/);
    return match ? { src: match[1], alt: card.getAttribute("aria-label") || "Yacht gallery photo" } : null;
  };

  const ensureDialog = () => {
    let dialog = document.querySelector(".py-gallery-dialog");
    if (dialog) return dialog;

    dialog = document.createElement("dialog");
    dialog.className = "py-gallery-dialog";
    dialog.setAttribute("aria-label", "Yacht photo viewer");
    dialog.innerHTML = `
      <button class="py-gallery-dialog__close" type="button" aria-label="Close photo viewer">×</button>
      <button class="py-gallery-dialog__nav py-gallery-dialog__nav--prev" type="button" aria-label="Previous photo">‹</button>
      <img class="py-gallery-dialog__image" alt="">
      <button class="py-gallery-dialog__nav py-gallery-dialog__nav--next" type="button" aria-label="Next photo">›</button>`;
    document.body.appendChild(dialog);
    return dialog;
  };

  const init = (root) => {
    const track = root.querySelector(TRACK) || root;
    if (!track) return false;
    let cards = getCards(root);

    // The template has a compact hero gallery and a full CMS gallery.
    // If the compact list is empty, reuse the rendered CMS cards instead
    // of depending on the removed Slider JS structure.
    if (!cards.length && root.closest(".wrapper-main-gallery")) {
      const donor = [...document.querySelectorAll(ROOT)]
        .find((candidate) => candidate !== root && getCards(candidate).length);
      if (donor && !root.dataset.pyGalleryHydrated) {
        getCards(donor).slice(0, 4).forEach((card) => track.appendChild(card.cloneNode(true)));
        root.dataset.pyGalleryHydrated = "true";
        cards = getCards(root);
      }
    }
    if (!cards.length) return false;

    let state = galleries.get(root);
    if (!state) {
      state = { active: 0, cards: [], dialog: null };
      galleries.set(root, state);
    }

    if (state.cards.length !== cards.length) {
      state.cards = cards;
      cards.forEach((card, index) => {
        if (card.dataset.pyGalleryBound === "true") return;
        card.dataset.pyGalleryBound = "true";
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");

        const image = getImageSource(card);
        if (image) card.setAttribute("aria-label", image.alt ? `Expand image: ${image.alt}` : `Expand yacht gallery image ${index + 1}`);

        card.addEventListener("pointerenter", (event) => {
          if (event.pointerType === "mouse") activate(root, index);
        }, { passive: true });
        card.addEventListener("focus", () => activate(root, index));
        card.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            activate(root, index);
          }
          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            event.preventDefault();
            cards[(index + 1) % cards.length].focus({ preventScroll: true });
          }
          if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            event.preventDefault();
            cards[(index - 1 + cards.length) % cards.length].focus({ preventScroll: true });
          }
        });
      });
    }

    root.hidden = false;
    render(root);
    return true;
  };

  const activate = (root, index) => {
    const state = galleries.get(root);
    if (!state || !state.cards.length) return;
    state.active = Math.max(0, Math.min(index, state.cards.length - 1));
    render(root);
  };

  const render = (root) => {
    const state = galleries.get(root);
    if (!state) return;
    state.cards.forEach((card, index) => {
      card.dataset.active = String(index === state.active);
      card.classList.toggle("is-active", index === state.active);
    });
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    if (desktop) {
      state.cards.forEach((_, index) => {});
    }
  };

  const openViewer = (root, index) => {
    const state = galleries.get(root);
    if (!state) return;
    const dialog = state.dialog || (state.dialog = ensureDialog());
    const image = state.cards[index] && getImageSource(state.cards[index]);
    const target = dialog.querySelector(".py-gallery-dialog__image");
    if (!image || !target) return;
    state.active = index;
    target.src = image.src;
    target.alt = image.alt;
    dialog.setAttribute("data-py-gallery-root", "");
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  };

  document.addEventListener("click", (event) => {
    const zoom = event.target.closest?.(".py-gallery-zoom");
    if (zoom) {
      const root = zoom.closest(ROOT);
      const card = zoom.closest(CARD);
      const state = root && galleries.get(root);
      const index = state && card ? state.cards.indexOf(card) : -1;
      if (root && index >= 0) {
        event.preventDefault();
        event.stopPropagation();
        openViewer(root, index);
      }
      return;
    }
    const card = event.target.closest?.(CARD);
    if (!card) return;
    const root = card.closest(ROOT);
    if (!root) return;
    const state = galleries.get(root);
    const index = state?.cards.indexOf(card) ?? -1;
    if (index < 0) return;
    if (event.target.closest("a,button")) return;
    activate(root, index);
  }, true);

  document.addEventListener("click", (event) => {
    const dialog = event.target.closest?.(".py-gallery-dialog");
    if (!dialog) return;
    const root = document.querySelector(`${ROOT}[data-py-gallery-source="cms"]`) || document.querySelector(ROOT);
    const state = root && galleries.get(root);
    if (!state) return;
    if (event.target.closest(".py-gallery-dialog__close")) {
      dialog.close?.();
      dialog.removeAttribute("open");
    } else if (event.target.closest(".py-gallery-dialog__nav--prev")) {
      openViewer(root, (state.active - 1 + state.cards.length) % state.cards.length);
    } else if (event.target.closest(".py-gallery-dialog__nav--next")) {
      openViewer(root, (state.active + 1) % state.cards.length);
    }
  });

  const boot = () => {
    document.querySelectorAll(ROOT).forEach(init);
    if (document.body && !document.body.dataset.pyGalleryObserver) {
      document.body.dataset.pyGalleryObserver = "true";
      new MutationObserver(() => document.querySelectorAll(ROOT).forEach(init))
        .observe(document.body, { childList: true, subtree: true });
    }
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
