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

  // Calcule la position réelle du container par rapport au haut du document
  const containerOffsetTop = container.getBoundingClientRect().top + window.scrollY;
  const animationStart = containerOffsetTop + 50; // décale légèrement l'animation
  const animationEnd = animationStart + 400;

  let videoUsable = false;
  let hasExitedOnce = false;

  const useSVW = typeof CSS !== "undefined" && CSS.supports?.('width', '1svw');
  const setWidth = (v) => {
    container.style.width = useSVW ? `${v}svw` : `${v}vw`;
  };

  function clamp(n, min, max) {
    return Math.min(Math.max(n, min), max);
  }

  function applyFinalStyles() {
    container.style.clipPath = `inset(0 round ${finalRadius}px)`;
    setWidth(finalWidth);
  }

  function updateStyles() {
    if (hasExitedOnce) return;

    const scrollY = window.scrollY || window.pageYOffset;
    const progress = clamp((scrollY - animationStart) / (animationEnd - animationStart), 0, 1);

    const radius = 2 + (finalRadius - 2) * progress;
    const width = initialWidth - (initialWidth - finalWidth) * progress;

    container.style.clipPath = `inset(0 round ${radius}px)`;
    setWidth(width);

    if (progress >= 1) {
      hasExitedOnce = true;
      applyFinalStyles();
      window.removeEventListener('scroll', updateStyles);
      window.removeEventListener('resize', updateStyles);
    }
  }

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
    if (isPlaying) {
      playToggleBtn.setAttribute("aria-label", "Pause animation");
      playToggleBtn.setAttribute("aria-pressed", "true");
    } else {
      playToggleBtn.setAttribute("aria-label", "Play animation");
      playToggleBtn.setAttribute("aria-pressed", "false");
    }
  }

  function initializeVideoLogic() {
    if (!isValidVideo(video)) {
      markVideoAsInvalid();
      return;
    }

    videoUsable = true;
    if (video) video.style.display = 'block';
    if (fallback) {
      fallback.style.zIndex = 0;
      fallback.style.opacity = 0;
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!videoUsable) return;
        if (entry.isIntersecting) {
          if (!hasExitedOnce && playToggleBtn?.getAttribute("aria-label") === "Pause animation") {
            video?.play().then(() => {
              updateToggleBtnState(true);
            }).catch(() => {
              updateToggleBtnState(false);
            });
          }
        } else {
          video?.pause();
          updateToggleBtnState(false);
        }
      }
    }, { threshold: 0.25 });

    observer.observe(container);

    playToggleBtn?.addEventListener('click', () => {
      if (!videoUsable) return;
      const isPlaying = playToggleBtn.getAttribute("aria-label") === "Pause animation";
      if (isPlaying) {
        video?.pause();
        updateToggleBtnState(false);
      } else {
        video?.play().then(() => {
          updateToggleBtnState(true);
        }).catch(() => {
          updateToggleBtnState(false);
        });
      }
    });

    video?.addEventListener("error", markVideoAsInvalid);
  }

  // Init
  initializeVideoLogic();
  requestAnimationFrame(updateStyles);
  window.addEventListener('scroll', updateStyles, { passive: true });
  window.addEventListener('resize', updateStyles);
});
