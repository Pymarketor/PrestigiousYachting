/* CMS yacht gallery viewer recovery — scoped to the generated gallery dialog. */
(() => {
  const init = () => {
    const dialog = document.querySelector(".py-gallery-dialog");
    if (!dialog || dialog.dataset.pyViewerRecovery === "true") return;
    dialog.dataset.pyViewerRecovery = "true";

    const style = document.createElement("style");
    style.dataset.pyGalleryViewerRecovery = "1";
    style.textContent = `
      .py-gallery-dialog[open] {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        position: fixed !important;
        inset: 0 !important;
        width: 100vw !important;
        max-width: none !important;
        height: 100vh !important;
        max-height: none !important;
        margin: 0 !important;
        padding: 2rem !important;
        border: 0 !important;
        background: rgb(0 0 0 / 82%) !important;
        z-index: 2147482999 !important;
      }
      .py-gallery-dialog::backdrop { background: rgb(0 0 0 / 82%); }
      .py-gallery-dialog__image {
        display: block !important;
        width: auto !important;
        height: auto !important;
        max-width: 90vw !important;
        max-height: 88vh !important;
        object-fit: contain !important;
      }
    `;
    document.head.appendChild(style);

    document.addEventListener("click", (event) => {
      const trigger = event.target instanceof Element
        ? event.target.closest(".py-gallery-zoom")
        : null;
      if (!trigger) return;
      window.setTimeout(() => {
        if (dialog.open) return;
        try {
          const image = trigger.closest("[data-py-expanding-card]")?.querySelector("img");
          const target = dialog.querySelector(".py-gallery-dialog__image");
          if (image && target) {
            target.src = image.currentSrc || image.src;
            target.alt = image.alt || "Yacht gallery photo";
          }
          if (typeof dialog.showModal === "function") dialog.showModal();
          else dialog.setAttribute("open", "");
        } catch (error) {
          dialog.setAttribute("open", "");
        }
      }, 0);
    }, true);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
