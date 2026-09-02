(() => {
  const LITEPICKER_JS = "https://cdn.jsdelivr.net/npm/litepicker/dist/litepicker.js";
  const LITEPICKER_CSS = "https://cdn.jsdelivr.net/npm/litepicker/dist/css/litepicker.css";

  let loadingPromise = null;

  const loadStylesheet = () => {
    if (document.querySelector(`link[href="${LITEPICKER_CSS}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = LITEPICKER_CSS;
    document.head.appendChild(link);
  };

  const loadScript = () => {
    if (window.Litepicker) return Promise.resolve();
    if (loadingPromise) return loadingPromise;

    loadingPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${LITEPICKER_JS}"]`);
      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = LITEPICKER_JS;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });

    return loadingPromise;
  };

  const shouldPrepareCalendar = (target) => {
    if (!(target instanceof Element)) return false;
    return Boolean(
      target.closest(".btn-make-a-request-yacht") ||
      target.closest("[open-favorite-modal]") ||
      target.closest(".date-input") ||
      target.closest(".wrapper-datepicker-request") ||
      target.closest("#StartDate") ||
      target.closest("#EndDate")
    );
  };

  const isVisible = (element) => {
    if (!element) return false;
    const style = window.getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden" &&
      Number.parseFloat(style.opacity || "1") > 0;
  };

  const watchRequestModal = () => {
    const modal = document.querySelector(".modal-one-click-request");
    if (!modal) return;

    const prepareWhenOpen = () => {
      if (isVisible(modal)) prepareLitepicker();
    };

    const observer = new MutationObserver(prepareWhenOpen);
    observer.observe(modal, {
      attributes: true,
      attributeFilter: ["class", "style", "hidden", "aria-hidden"]
    });

    prepareWhenOpen();
  };

  const prepareLitepicker = () => {
    loadStylesheet();
    return loadScript().then(() => {
      window.dispatchEvent(new CustomEvent("py:litepicker-ready"));
    });
  };

  document.addEventListener("pointerdown", (event) => {
    if (shouldPrepareCalendar(event.target)) prepareLitepicker();
  }, { passive: true, capture: true });

  document.addEventListener("focusin", (event) => {
    if (shouldPrepareCalendar(event.target)) prepareLitepicker();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", watchRequestModal, { once: true });
  } else {
    watchRequestModal();
  }
})();
