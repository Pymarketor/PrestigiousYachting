/* Prestigious Yachting — resilient yacht video resume bridge. */
(() => {
  "use strict";

  const SELECTOR = ".video-play-toggle";

  const restoreSources = (video) => {
    let restored = false;

    video.querySelectorAll("source").forEach((source) => {
      if (!source.getAttribute("src") && source.dataset.pyVideoSrc) {
        source.setAttribute("src", source.dataset.pyVideoSrc);
        restored = true;
      }
    });

    if (restored) {
      video.preload = "metadata";
      video.load();
    }
  };

  const syncPlayingState = (container) => {
    const button = container.querySelector(SELECTOR);
    const content = container.querySelector(".video-content");
    const fallback = container.querySelector(".video-fallback");

    button?.setAttribute("aria-label", "Pause yacht video");
    button?.setAttribute("aria-pressed", "true");
    content?.classList.add("is-video-ready");

    if (fallback) {
      fallback.style.opacity = "0";
      fallback.style.pointerEvents = "none";
    }
  };

  document.addEventListener(
    "click",
    (event) => {
      const button = event.target.closest(SELECTOR);
      if (!button) return;

      const container = button.closest(".video-container.yacht, .video-container");
      const video = container?.querySelector(".video-element");
      if (!container || !video || (!video.paused && !video.ended)) return;

      /*
       * Let the main controller process the click first so it keeps its
       * userPaused and viewport state. Resume only if that controller failed.
       */
      window.setTimeout(async () => {
        if (!video.paused || video.ended) return;

        restoreSources(video);
        video.muted = true;
        video.playsInline = true;

        try {
          await video.play();
          syncPlayingState(container);
        } catch {
          // Keep native controls usable when playback is blocked by the browser.
        }
      }, 0);
    },
    true
  );
})();
