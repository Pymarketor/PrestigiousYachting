document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('.video-container');
  const content = container?.querySelector('.video-content');
  const video = content?.querySelector('.video-element');
  const fallback = content?.querySelector('.video-fallback');
  const playToggleBtn = document.querySelector('.video-play-toggle');
  const controlsWrapper = document.querySelector('.video-controls');

  if (!container) return;

  const initialWidth = 100;
  const finalWidth = 87.5;
  const finalRadius = 44;

  let videoUsable = false;
  let hasEnteredViewport = false; // ✅ ne “sort” qu’après être entré au moins une fois
  let hasExitedOnce = false;

  const useSVW = typeof CSS !== "undefined" && CSS.supports?.('width','1svw');
  const setWidth = (v) => { container.style.width = useSVW ? `${v}svw` : `${v}vw`; };

  function applyFinalStyles() {
    container.style.clipPath = `inset(0 round ${finalRadius}px)`;
    setWidth(finalWidth);
  }

  function clamp(n, min, max) { return Math.min(Math.max(n, min), max); }

  function updateStyles() {
    if (hasExitedOnce) return;

    const rect = container.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;

    // ✅ Basé sur le TOP du container : 0 quand le top est en bas du viewport, 1 à 25% du viewport
    const start = vh;
    const end = vh * 0.25;
    const progress = clamp((start - rect.top) / (start - end), 0, 1);

    const radius = 2 + ((finalRadius - 2) * progress);
    const width = initialWidth - ((initialWidth - finalWidth) * progress);

    container.style.clipPath = `inset(0 round ${radius}px)`;
    setWidth(width);

    // Affichage des contrôles seulement quand la zone est bien dans l’écran
    if (controlsWrapper) {
      if (videoUsable && rect.top < vh && rect.bottom > end) {
        controlsWrapper.style.opacity = 1;
      } else {
        controlsWrapper.style.opacity = 0;
      }
    }

    // ✅ Marque “vu” si la section est dans le viewport
    if (rect.bottom > 0 && rect.top < vh) {
      hasEnteredViewport = true;
    }

    // ✅ Ne fige qu’après être entré au moins une fois
    if (hasEnteredViewport && (rect.bottom < 0 || rect.top > vh)) {
      hasExitedOnce = true;
      applyFinalStyles();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    }
  }

  function onScroll() { updateStyles(); }
  function onResize() { updateStyles(); }

  function markVideoAsInvalid() {
    videoUsable = false;
    if (controlsWrapper) controlsWrapper.style.display = 'none';
    if (playToggleBtn) playToggleBtn.style.display = 'none';
    if (video) video.style.display = 'none';
    if (fallback) {
      fallback.style.zIndex = 3;
      fallback.style.opacity = 1;
      fallback.style.display = 'block';
    }
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

  function initializeVideoLogic() {
    if (!isValidVideo(video)) {
      markVideoAsInvalid();
      return;
    }

    videoUsable = true;
    if (video) video.style.display = 'block';
    if (fallback) { fallback.style.zIndex = 0; fallback.style.opacity = 0; }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!videoUsable) return;
          if (entry.isIntersecting) {
            if (!hasExitedOnce && playToggleBtn?.getAttribute("aria-label") === "Pause animation") {
              video?.play().catch(() => {});
            }
          } else {
            video?.pause();
          }
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(container);

    playToggleBtn?.addEventListener('click', () => {
      if (!videoUsable) return;
      const isPlaying = playToggleBtn?.getAttribute("aria-label") === "Pause animation";
      if (isPlaying) {
        video?.pause();
        playToggleBtn?.setAttribute("aria-label", "Play animation");
        playToggleBtn?.setAttribute("aria-pressed", "false");
      } else {
        video?.play().catch(() => {});
        playToggleBtn?.setAttribute("aria-label", "Pause animation");
        playToggleBtn?.setAttribute("aria-pressed", "true");
      }
    });

    video?.addEventListener("error", markVideoAsInvalid);
  }

  // Init propre
  initializeVideoLogic();
  requestAnimationFrame(updateStyles);

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
});
