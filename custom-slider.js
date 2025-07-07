document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll('[data-slider="true"]');

  sliders.forEach(slider => {
    const instance = slider.getAttribute("slider-instance") || "default";
    const track = slider.querySelector(`[data-slider-track][instance="${instance}"]`);

    // Exclut le .slider-padding-start des slides à naviguer
    const slides = [...slider.querySelectorAll(`[data-slider-slide][instance="${instance}"]:not(.slider-padding-start)`)];
    
    const prevBtn = slider.querySelector(`[data-slider-prev][instance="${instance}"]`);
    const nextBtn = slider.querySelector(`[data-slider-next][instance="${instance}"]`);

    const allowLoop = slider.getAttribute("slider-loop") === "true";
    const allowScrollManual = slider.getAttribute("slider-scroll-manual") !== "false";
    const scrollDuration = parseInt(slider.getAttribute("slider-duration")) || 300;
    const alwaysShowArrows = slider.getAttribute("slider-end-arrows") === "true";

    if (!allowScrollManual && track) {
      track.style.overflowX = "hidden";
    }

    let index = 0;
    let scrollTimeout;

    const getClosestSlideIndex = () => {
      const scrollLeft = track.scrollLeft;
      let closestIndex = 0;
      let minDistance = Infinity;
      slides.forEach((slide, i) => {
        const distance = Math.abs(slide.offsetLeft - scrollLeft);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      });
      return closestIndex;
    };

    const goToSlide = (i) => {
      if (!slides[i]) return;
      track.scrollTo({
        left: slides[i].offsetLeft,
        behavior: 'smooth'
      });
    };

const updateArrowVisibility = () => {
  if (!prevBtn || !nextBtn) return;

  const scrollLeft = track.scrollLeft;
  const maxScrollLeft = track.scrollWidth - track.clientWidth;
  const tolerance = 5;

  const paddingStart = track.querySelector(".slider-padding-start");
  const paddingOffset = paddingStart?.offsetWidth || 0;

  const canScrollPrev = scrollLeft > paddingOffset + tolerance;
  const canScrollNext = scrollLeft < maxScrollLeft - tolerance;

  prevBtn.style.opacity = canScrollPrev ? "1" : "0";
  nextBtn.style.opacity = canScrollNext ? "1" : "0";

  prevBtn.style.pointerEvents = canScrollPrev ? "auto" : "none";
  nextBtn.style.pointerEvents = canScrollNext ? "auto" : "none";
};

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        index = getClosestSlideIndex();
        const nextIndex = index + 1;
        if (nextIndex < slides.length) {
          goToSlide(nextIndex);
        } else if (allowLoop) {
          goToSlide(0);
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        index = getClosestSlideIndex();
        const prevIndex = index - 1;
        if (prevIndex >= 0) {
          goToSlide(prevIndex);
        } else if (allowLoop) {
          goToSlide(slides.length - 1);
        }
      });
    }

    track.addEventListener("scroll", () => {
      if (!allowScrollManual) return;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        index = getClosestSlideIndex();
        updateArrowVisibility();
      }, scrollDuration);
    });

    // Initialisation
    updateArrowVisibility();
  });
});
