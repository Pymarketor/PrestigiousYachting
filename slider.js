document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll("[data-slider='true']");

  sliders.forEach((slider) => {
    const instanceName = slider.getAttribute("slider-instance");
    const track = document.querySelector(`[data-slider-track][instance="${instanceName}"]`);
    const slides = document.querySelectorAll(`[data-slider-slide][instance="${instanceName}"]`);
    const prevBtn = document.querySelector(`[data-slider-prev][instance="${instanceName}"]`);
    const nextBtn = document.querySelector(`[data-slider-next][instance="${instanceName}"]`);

    const autoplay = slider.getAttribute("slider-autoplay") === "true";
    const loop = slider.getAttribute("slider-loop") === "true";
    const delay = parseInt(slider.getAttribute("slider-delay")) || 5000;
    const duration = parseInt(slider.getAttribute("slider-duration")) || 500;
    const animation = slider.getAttribute("slider-animation") || "ease-in-out";
    const hoverOnly = slider.getAttribute("slider-hover") === "true";
    const snapThreshold = parseFloat(slider.getAttribute("slider-snap-threshold")) || 0.1;

    let index = 0;
    let interval;

    const scrollToIndex = (i) => {
      const slide = slides[i];
      if (slide) {
        track.scrollTo({
          left: slide.offsetLeft,
          behavior: "smooth"
        });
      }
    };

    const updateArrows = () => {
      const scrollLeft = track.scrollLeft;
      const maxScroll = track.scrollWidth - track.clientWidth;

      if (prevBtn) {
        prevBtn.style.display = scrollLeft <= 0 ? "none" : "flex";
      }

      if (nextBtn) {
        nextBtn.style.display = scrollLeft >= maxScroll - 1 ? "none" : "flex";
      }
    };

    const scrollNext = () => {
      if (index < slides.length - 1) {
        index++;
      } else if (loop) {
        index = 0;
      } else {
        return;
      }
      scrollToIndex(index);
    };

    const scrollPrev = () => {
      if (index > 0) {
        index--;
      } else if (loop) {
        index = slides.length - 1;
      } else {
        return;
      }
      scrollToIndex(index);
    };

    const startAutoplay = () => {
      if (autoplay) {
        interval = setInterval(scrollNext, delay);
      }
    };

    const stopAutoplay = () => {
      if (autoplay && interval) {
        clearInterval(interval);
        interval = null;
      }
    };

    if (prevBtn) prevBtn.addEventListener("click", () => {
      scrollPrev();
    });

    if (nextBtn) nextBtn.addEventListener("click", () => {
      scrollNext();
    });

    track.addEventListener("scroll", () => {
      updateArrows();

      let newIndex = index;
      slides.forEach((slide, i) => {
        const slideLeft = slide.offsetLeft;
        const slideRight = slideLeft + slide.offsetWidth;
        const trackLeft = track.scrollLeft;
        const trackRight = trackLeft + track.offsetWidth;

        const visibleWidth = Math.min(slideRight, trackRight) - Math.max(slideLeft, trackLeft);
        const visibility = visibleWidth / slide.offsetWidth;

        if (visibility >= 1 - snapThreshold) {
          newIndex = i;
        }
      });

      index = newIndex;
    });

    if (hoverOnly) {
      slider.addEventListener("mouseenter", () => {
        if (prevBtn) prevBtn.style.opacity = "1";
        if (nextBtn) nextBtn.style.opacity = "1";
      });
      slider.addEventListener("mouseleave", () => {
        if (prevBtn) prevBtn.style.opacity = "0";
        if (nextBtn) nextBtn.style.opacity = "0";
      });

      if (prevBtn) prevBtn.style.transition = "opacity 0.3s";
      if (nextBtn) nextBtn.style.transition = "opacity 0.3s";

      if (prevBtn) prevBtn.style.opacity = "0";
      if (nextBtn) nextBtn.style.opacity = "0";
    }

    startAutoplay();
    updateArrows();

    // Masquer les barres de scroll
    track.style.scrollbarWidth = "none";
    track.style.msOverflowStyle = "none";
    track.style.overflow = "auto";
    track.style.scrollBehavior = "smooth";
    track.style.transition = `scroll-left ${duration}ms ${animation}`;
    track.style.overflowX = "scroll";
    track.style.overflowY = "hidden";
    track.style.webkitOverflowScrolling = "touch";

    // Supprimer les scrollbars visuelles
    const style = document.createElement("style");
    style.textContent = `
      [data-slider-track]::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(style);
  });
});
