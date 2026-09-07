(() => {
  const initYachtVideo = () => {
    document.querySelectorAll(".video-container.yacht, .video-container").forEach((container) => {
      if (container.dataset.pyVideoSafeReady === "true") return;

      const content = container.querySelector(".video-content");
      const video = content?.querySelector(".video-element");
      const fallback = content?.querySelector(".video-fallback");
      const fallbackImage = fallback?.querySelector("img");
      const controls = container.querySelector(".video-controls.w-embed, .video-controls");
      const button = container.querySelector(".video-play-toggle");

      if (!content || !video) return;
      container.dataset.pyVideoSafeReady = "true";

      const sourceNodes = Array.from(video.querySelectorAll("source"));
      const source = sourceNodes
        .map((item) => item.getAttribute("src") || "")
        .find((src) => src.trim());

      /*
       * The CMS embed contains autoplay. Browsers may therefore ignore preload="none"
       * and start the full 15–20 MB media request while the LCP poster is still loading.
       * Capture the CMS URL, abort that speculative request, and restore it only after
       * the poster and window load have completed (or immediately after a user click).
       */
      video.pause();
      video.autoplay = false;
      video.removeAttribute("autoplay");
      sourceNodes.forEach((item) => {
        const src = item.getAttribute("src");
        if (!src) return;
        item.dataset.pyVideoSrc = src;
        item.removeAttribute("src");
      });
      video.removeAttribute("src");
      video.setAttribute("preload", "none");
      video.load();

      const showPosterOnly = () => {
        video.pause();
        video.setAttribute("preload", "none");
        video.style.display = "none";
        content.classList.remove("is-video-ready");
        if (fallback) {
          fallback.style.display = "block";
          fallback.style.opacity = "1";
          fallback.style.visibility = "visible";
        }
        if (controls) controls.style.display = "none";
      };

      if (!source) {
        showPosterOnly();
        return;
      }

      const canAutoplay =
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        !navigator.connection?.saveData;

      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");

      const poster = fallbackImage?.currentSrc || fallbackImage?.src;
      if (poster) video.setAttribute("poster", poster);

      if (fallbackImage) {
        fallbackImage.loading = "eager";
        fallbackImage.fetchPriority = "high";
        fallbackImage.decoding = "async";
      }

      if (controls) controls.style.removeProperty("display");
      if (button) {
        button.style.removeProperty("display");
        button.setAttribute("type", "button");
      }

      let inView = false;
      let userPaused = !canAutoplay;
      let mediaPrepared = false;
      let mediaAllowed = false;
      let allowTimer = 0;

      const restoreSources = () => {
        sourceNodes.forEach((item) => {
          const src = item.dataset.pyVideoSrc;
          if (src) item.setAttribute("src", src);
        });
      };

      const prepareMedia = (force = false) => {
        if (mediaPrepared) return true;
        if (!mediaAllowed && !force) return false;
        mediaPrepared = true;
        restoreSources();
        video.setAttribute("preload", "metadata");
        video.load();
        return true;
      };

      const setButtonState = (playing) => {
        if (!button) return;
        button.setAttribute("aria-label", playing ? "Pause yacht video" : "Play yacht video");
        button.setAttribute("aria-pressed", String(playing));
      };

      const revealVideo = () => {
        content.classList.add("is-video-ready");
        if (fallback) {
          fallback.style.opacity = "0";
          fallback.style.pointerEvents = "none";
        }
      };

      const showFallback = () => {
        content.classList.remove("is-video-ready");
        if (fallback) {
          fallback.style.display = "block";
          fallback.style.opacity = "1";
          fallback.style.visibility = "visible";
          fallback.style.pointerEvents = "auto";
        }
        setButtonState(false);
      };

      const play = (force = false) => {
        if ((!mediaAllowed && !force) || userPaused || !inView || document.hidden) return;
        if (!prepareMedia(force)) return;
        video.play()
          .then(() => {
            revealVideo();
            setButtonState(true);
          })
          .catch(showFallback);
      };

      const pause = (manual = false) => {
        if (manual) userPaused = true;
        video.pause();
        setButtonState(false);
      };

      const allowMedia = () => {
        if (mediaAllowed) return;
        mediaAllowed = true;
        if (inView && !userPaused) play();
      };

      const posterReady = () => {
        if (!fallbackImage) return Promise.resolve();
        const loaded = fallbackImage.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              fallbackImage.addEventListener("load", resolve, { once: true });
              fallbackImage.addEventListener("error", resolve, { once: true });
            });
        return loaded.then(() => fallbackImage.decode?.().catch(() => {}) || undefined);
      };

      posterReady().then(() => {
        const afterWindowLoad = () => {
          clearTimeout(allowTimer);
          allowTimer = window.setTimeout(allowMedia, 500);
        };
        if (document.readyState === "complete") afterWindowLoad();
        else window.addEventListener("load", afterWindowLoad, { once: true });
      });
      allowTimer = window.setTimeout(allowMedia, 5000);

      // Capture phase keeps embedded/Webflow interactions from cancelling controls.
      button?.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        if (video.paused || video.ended) {
          userPaused = false;
          mediaAllowed = true;
          prepareMedia(true);
          play(true);
        } else {
          pause(true);
        }
      }, true);

      video.addEventListener("playing", () => {
        revealVideo();
        setButtonState(true);
      });
      video.addEventListener("pause", () => setButtonState(false));
      video.addEventListener("error", showPosterOnly);

      const observer = new IntersectionObserver(([entry]) => {
        inView = Boolean(entry?.isIntersecting);
        if (inView) play();
        else pause(false);
      }, { threshold: 0.25, rootMargin: "100px 0px" });

      observer.observe(container);

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) pause(false);
        else play();
      });

      showFallback();
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initYachtVideo, { once: true });
  } else {
    initYachtVideo();
  }
})();