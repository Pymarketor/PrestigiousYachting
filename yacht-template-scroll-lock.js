/* Prestigious Yachting — Finsweet v2 scroll-lock compatibility bridge.
 * Keeps the viewport visually stable while Finsweet owns the actual page lock.
 */
(() => {
  "use strict";

  const lockTargets = [
    ".f-modal-centre",
    ".f-modal-centre-other",
    ".modal-one-click-request",
    ".modal-favorite-list"
  ];
  const preservedTargets = [
    ".zoom-image-wrapper",
    ".container-one-click",
    ".div-block-223",
    ".datepicker-scroll-wrapper",
    "#new-datepicker-inline",
    ".container-favorite-list"
  ];

  let locked = false;
  let savedScrollY = window.scrollY;
  let lastUnlockedScrollY = window.scrollY;
  let savedBodyStyles = null;

  const isVisible = (element) => {
    const style = getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden";
  };

  const hasVisibleModal = () =>
    lockTargets.some((selector) =>
      [...document.querySelectorAll(selector)].some(isVisible)
    );

  const rememberBodyStyles = () => {
    const style = document.body.style;
    return ["position", "top", "left", "right", "width"].map((property) => ({
      property,
      value: style.getPropertyValue(property),
      priority: style.getPropertyPriority(property)
    }));
  };

  const restoreBodyStyles = () => {
    const style = document.body.style;
    savedBodyStyles.forEach(({ property, value, priority }) => {
      if (value) style.setProperty(property, value, priority);
      else style.removeProperty(property);
    });
  };

  const lockVisualPosition = () => {
    if (locked) return;
    locked = true;
    savedScrollY = lastUnlockedScrollY;
    savedBodyStyles = rememberBodyStyles();

    Object.assign(document.body.style, {
      position: "fixed",
      top: `-${savedScrollY}px`,
      left: "0",
      right: "0",
      width: "100%"
    });
  };

  const unlockVisualPosition = () => {
    if (!locked) return;
    locked = false;
    restoreBodyStyles();

    const restore = () => window.scrollTo(0, savedScrollY);
    restore();
    requestAnimationFrame(restore);
    window.setTimeout(restore, 0);
    lastUnlockedScrollY = savedScrollY;
  };

  const syncLock = () => {
    if (hasVisibleModal()) lockVisualPosition();
    else unlockVisualPosition();
  };

  const restoreFinsweetAttributes = () => {
    document.querySelectorAll(lockTargets.join(",")).forEach((element) => {
      element.setAttribute("fs-scrolldisable-element", "when-visible");
    });

    document.querySelectorAll(preservedTargets.join(",")).forEach((element) => {
      element.setAttribute("fs-scrolldisable-element", "preserve");
    });
  };

  const init = () => {
    document.addEventListener("scroll", () => {
      if (!locked && !hasVisibleModal()) lastUnlockedScrollY = window.scrollY;
    }, { passive: true });

    document.addEventListener("click", (event) => {
      if (!locked && !hasVisibleModal()) lastUnlockedScrollY = window.scrollY;
      if (event.target.closest(
        '[open-favorite-modal][href="#"], [favorite-modal="trigger"][href="#"]'
      )) {
        event.preventDefault();
      }
    }, true);

    // Run after every DOMContentLoaded listener from older critical bundles.
    window.setTimeout(() => {
      restoreFinsweetAttributes();

      const observer = new MutationObserver(syncLock);
      document.querySelectorAll(lockTargets.join(",")).forEach((element) => {
        observer.observe(element, {
          attributes: true,
          attributeFilter: ["class", "style", "hidden"]
        });
      });

      syncLock();
      requestAnimationFrame(() => {
        restoreFinsweetAttributes();
        syncLock();
      });
    }, 0);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
