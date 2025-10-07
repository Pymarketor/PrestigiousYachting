document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.video-container');
    const content = container?.querySelector('.video-content');
    const video = content?.querySelector('.video-element');
    const fallback = content?.querySelector('.video-fallback');
    const playToggleBtn = document.querySelector('.video-play-toggle');
    const controlsWrapper = document.querySelector('.video-controls');

    if (!container || !video) return;

    const initialWidth = 100;
    const finalWidth = 87.5;
    const finalRadius = 44;

    const useSVW = typeof CSS !== "undefined" && CSS.supports?.('width', '1svw');
    const setWidth = (v) => {
      container.style.width = useSVW ? `${v}svw` : `${v}vw`;
    };

    function clamp(n, min, max) {
      return Math.min(Math.max(n, min), max);
    }

    function getAnimationOffsets() {
      const rect = container.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const offsetTop = rect.top + scrollY;
      return {
        start: offsetTop - window.innerHeight / 2,
        end: offsetTop + 300 // 300px de scroll d'animation
      };
    }

    function applyFinalStyles() {
      container.style.clipPath = `inset(0 round ${finalRadius}px)`;
      setWidth(finalWidth);
    }

    function updateStyles() {
      const scrollY = window.scrollY || window.pageYOffset;
      const { start, end } = getAnimationOffsets();
      const progress = clamp((scrollY - start) / (end - start), 0, 1);

      const radius = 2 + (finalRadius - 2) * progress;
      const width = initialWidth - (initialWidth - finalWidth) * progress;

      container.style.clipPath = `inset(0 round ${radius}px)`;
      setWidth(width);
    }

    function markVideoAsInvalid() {
      if (controlsWrapper) controlsWrapper.style.display = 'none';
      if (playToggleBtn) playToggleBtn.style.display = 'none';
      if (video) video.style.display = 'none';
      if (fallback) {
        fallback.style.zIndex = 3;
        fallback.style.opacity = 1;
        fallback.style.display = 'block';
      }
      updateToggleBtnState(false);
    }

    function isValidVideo(el) {
      if (!el) return false;
      const sources = el.querySelectorAll('source');
      for (const s of sources) {
        const src = s.getAttribute('src');
        if (src && src.trim() !== '') return true;
      }
      return false;
    }

    function updateToggleBtnState(isPlaying) {
      if (!playToggleBtn) return;
      playToggleBtn.setAttribute("aria-label", isPlaying ? "Pause animation" : "Play animation");
      playToggleBtn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
    }

    function initializeVideoLogic() {
      if (!isValidVideo(video)) {
        markVideoAsInvalid();
        return;
      }

      if (video) video.style.display = 'block';
      if (fallback) {
        fallback.style.zIndex = 0;
        fallback.style.opacity = 0;
      }

      // Gestion lecture/pause en fonction de la visibilité réelle
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const isVisible = entry.isIntersecting && entry.intersectionRatio > 0;
          if (isVisible) {
            const isPlaying = playToggleBtn?.getAttribute("aria-label") === "Pause animation";
            if (isPlaying || !playToggleBtn) {
              video.play().then(() => updateToggleBtnState(true)).catch(() => updateToggleBtnState(false));
            }
          } else {
            video.pause();
            updateToggleBtnState(false);
          }
        }
      }, { threshold: 0 });

      observer.observe(container);

      playToggleBtn?.addEventListener('click', () => {
        const isPlaying = playToggleBtn.getAttribute("aria-label") === "Pause animation";
        if (isPlaying) {
          video.pause();
          updateToggleBtnState(false);
        } else {
          video.play().then(() => updateToggleBtnState(true)).catch(() => updateToggleBtnState(false));
        }
      });

      video?.addEventListener("error", markVideoAsInvalid);
    }

    // Initialisation
    initializeVideoLogic();
    requestAnimationFrame(updateStyles);
    window.addEventListener('scroll', updateStyles, { passive: true });
    window.addEventListener('resize', updateStyles);
  });
