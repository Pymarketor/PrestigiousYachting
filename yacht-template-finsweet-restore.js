/* Prestigious Yachting — restore Finsweet v2 attributes only.
 * No scroll positioning, locking, unlocking, or scroll restoration is performed here.
 */
(() => {
  "use strict";

  const restore = () => {
    document.querySelectorAll([
      ".f-modal-centre",
      ".f-modal-centre-other",
      ".modal-one-click-request",
      ".modal-favorite-list"
    ].join(",")).forEach((element) => {
      element.setAttribute("fs-scrolldisable-element", "when-visible");
    });
  };

  const runAfterLegacyBundle = () => {
    window.setTimeout(restore, 0);
    requestAnimationFrame(() => requestAnimationFrame(restore));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runAfterLegacyBundle, { once: true });
  } else {
    runAfterLegacyBundle();
  }
})();
