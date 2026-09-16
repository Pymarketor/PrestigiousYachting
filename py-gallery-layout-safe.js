/* Safe CMS yacht gallery layout. CSS-only: no DOM moves, observers, or event loops. */
(() => {
  const style = document.createElement("style");
  style.dataset.pyGalleryLayoutSafe = "1";
  style.textContent = `
    [data-py-expanding-track] {
      display: grid !important;
      grid-template-columns: 1fr !important;
      grid-template-rows: repeat(2, minmax(0, 1fr)) !important;
      width: 100% !important;
      height: 100% !important;
      min-height: 0 !important;
    }
    .py-gallery-row {
      display: grid !important;
      width: 100% !important;
      height: 100% !important;
      min-height: 0 !important;
      gap: .675rem !important;
    }
    [data-py-expanding-card] {
      min-width: 0 !important;
      min-height: 0 !important;
      height: auto !important;
      overflow: hidden !important;
    }
    [data-py-expanding-card] img,
    [data-py-gallery-image] {
      display: block !important;
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
    }
    @media screen and (max-width: 767px) {
      [data-py-expanding-track] {
        grid-template-rows: auto auto !important;
      }
      .py-gallery-row {
        grid-template-columns: 1fr !important;
        grid-auto-rows: minmax(118px, 1fr) !important;
      }
    }
  `;
  document.head.appendChild(style);
})();
