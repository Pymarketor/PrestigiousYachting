document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('.video-container');
  const content = container?.querySelector('.video-content');
  const video = content?.querySelector('.video-element');
  const fallback = content?.querySelector('.video-fallback');
  const playToggleBtn = document.querySelector('.video-play-toggle');
  const controlsWrapper = document.querySelector('.video-controls');

  const initialWidth = 100;
  const finalWidth = 87.5;
  const finalRadius = 44;
  let videoUsable = false;
  let hasExitedOnce = false;

  function applyFinalStyles() {
    container.style.clipPath = `inset(0 round ${finalRadius}px)`;
    container.style.width = `${finalWidth}svw`;
  }

  function updateStyles() {
    if (!container || hasExitedOnce) return;

    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // 🎯 Progression basée sur le TOP du container
    const start = viewportHeight;          // début = container entre dans l’écran
    const end = viewportHeight * 0.25;     // fin = son top atteint 25% du viewport

    const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);

    const radius = 2 + ((finalRadius - 2) * progress);
    const width = initialWidth - ((initialWidth - finalWidth) * progress);

    container.style.clipPath = `inset(0 round ${radius}px)`;
    container.style.width = `${width}svw`;

    if (videoUsable && rect.top < viewportHeight && rect.bottom > end) {
      controlsWrapper.style.opacity = 1;
    } else {
      controlsWrapper.style.opacity = 0;
    }

    // 🎯 Détection sortie totale haut ou bas
    if (rect.bottom < 0 || rect.top > viewportHeight) {
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
    if (fallback) fallback.style.zIndex = 3;
  }

  function isValidVideo(videoElement) {
    if (!videoElement) return false;
    const sources = videoElement.querySelectorAll('source');
    for (let source of sources) {
      const src = source.getAttribute('src');
      if (src && src.trim() !== '') {
        return true;
      }
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
    if (fallback) fallback.style.zIndex = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!videoUsable) return;

          if (entry.isIntersecting) {
            if (!hasExitedOnce && playToggleBtn?.getAttribute("aria-label") === "Pause animation") {
              video.play().catch(() => {});
            }
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    if (container) observer.observe(container);

    playToggleBtn?.addEventListener('click', () => {
      if (!videoUsable) return;
      const isPlaying = playToggleBtn?.getAttribute("aria-label") === "Pause animation";
      if (isPlaying) {
        video.pause();
        playToggleBtn?.setAttribute("aria-label", "Play animation");
      } else {
        video.play().catch(() => {});
        playToggleBtn?.setAttribute("aria-label", "Pause animation");
      }
    });

    video.addEventListener("error", markVideoAsInvalid);
  }

  setTimeout(() => {
    initializeVideoLogic();
    updateStyles();
  }, 100);

  window.addEventListener('scroll', updateStyles);
  window.addEventListener('resize', updateStyles);
});
