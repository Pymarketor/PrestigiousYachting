/* Prestigious Yachting — Finsweet v2 scroll-lock compatibility bridge.
 * Temporary page-level bridge for legacy pinned yacht-template bundles.
 */
(() => {
  "use strict";

  const lockTargets = [
    ".f-modal-centre",
    ".f-modal-centre-other",
    ".modal-one-click-request",
    ".modal-favorite-list"
  ];

  const restoreFinsweetAttributes = () => {
    document.querySelectorAll(lockTargets.join(",")).forEach((element) => {
      element.setAttribute("fs-scrolldisable-element", "when-visible");
    });

    document.querySelectorAll(
      ".zoom-image-wrapper, .container-one-click, .div-block-223, .datepicker-scroll-wrapper, #new-datepicker-inline, .container-favorite-list"
    ).forEach((element) => {
      element.setAttribute("fs-scrolldisable-element", "preserve");
    });
  };

  const preventEmptyAnchorJump = (event) => {
    const trigger = event.target.closest(
      '[open-favorite-modal][href="#"], [favorite-modal="trigger"][href="#"]'
    );
    if (trigger) event.preventDefault();
  };

  const init = () => {
    document.addEventListener("click", preventEmptyAnchorJump, true);

    // Run after every DOMContentLoaded listener from older critical bundles.
    window.setTimeout(restoreFinsweetAttributes, 0);
    requestAnimationFrame(() => requestAnimationFrame(restoreFinsweetAttributes));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
