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

      const source = Array.from(video.querySelectorAll("source"))
        .map((item) => item.getAttribute("src") || "")
        .find((src) => src.trim());

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
      video.removeAttribute("autoplay");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.setAttribute("preload", "none");

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

      const prepareMedia = () => {
        if (mediaPrepared) return;
        mediaPrepared = true;
        video.setAttribute("preload", "metadata");
        video.load();
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

      const play = () => {
        if (userPaused || !inView || document.hidden) return;
        prepareMedia();
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

      // Capture phase is intentional: it keeps Webflow interactions or embedded
      // controls from cancelling the play/pause action after this handler runs.
      button?.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        prepareMedia();
        if (video.paused || video.ended) {
          userPaused = false;
          play();
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
        if (inView) {
          prepareMedia();
          play();
        } else {
          pause(false);
        }
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