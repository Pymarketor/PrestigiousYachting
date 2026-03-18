document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll('[data-slider="true"]');

  sliders.forEach(slider => {
    const instance = slider.getAttribute("slider-instance") || "default";
    const track = slider.querySelector(`[data-slider-track][instance="${instance}"]`);
    if (!track) return;

    const slides = [
      ...slider.querySelectorAll(`[data-slider-slide][instance="${instance}"]`)
    ];

    const prevBtn = slider.querySelector(`[data-slider-prev][instance="${instance}"]`);
    const nextBtn = slider.querySelector(`[data-slider-next][instance="${instance}"]`);

    const allowLoop = slider.getAttribute("slider-loop") === "true";
    const allowScrollManual = slider.getAttribute("slider-scroll-manual") !== "false";
    const scrollDuration = parseInt(slider.getAttribute("slider-duration"), 10) || 300;

    const alignAttr = slider.getAttribute("slider-align");
    const alignMode = alignAttr === "center" ? "center" : "start";

    if (!allowScrollManual) {
      track.style.overflowX = "hidden";
    }

    let index = 0;
    let scrollTimeout = null;

    const getMaxScrollLeft = () => Math.max(0, track.scrollWidth - track.clientWidth);

    const getTargetScroll = (slide) => {
      if (!slide) return 0;

      if (alignMode === "center") {
        const centered =
          slide.offsetLeft - (track.clientWidth / 2) + (slide.offsetWidth / 2);

        return Math.max(0, Math.min(centered, getMaxScrollLeft()));
      }

      return Math.max(0, Math.min(slide.offsetLeft, getMaxScrollLeft()));
    };

    const getClosestSlideIndex = () => {
      let closestIndex = 0;
      let minDistance = Infinity;

      if (alignMode === "center") {
        const currentCenter = track.scrollLeft + (track.clientWidth / 2);

        slides.forEach((slide, i) => {
          const slideCenter = slide.offsetLeft + (slide.offsetWidth / 2);
          const distance = Math.abs(slideCenter - currentCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = i;
          }
        });
      } else {
        const scrollLeft = track.scrollLeft;

        slides.forEach((slide, i) => {
          const distance = Math.abs(slide.offsetLeft - scrollLeft);

          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = i;
          }
        });
      }

      return closestIndex;
    };

    const goToSlide = (i, behavior = "smooth") => {
      if (!slides[i]) return;

      track.scrollTo({
        left: getTargetScroll(slides[i]),
        behavior
      });
    };

    const updateArrowVisibility = () => {
      if (!prevBtn || !nextBtn) return;

      const scrollLeft = track.scrollLeft;
      const maxScrollLeft = getMaxScrollLeft();
      const tolerance = 4;

      const canScrollPrev = scrollLeft > tolerance;
      const canScrollNext = scrollLeft < maxScrollLeft - tolerance;

      prevBtn.style.opacity = canScrollPrev ? "1" : "0";
      prevBtn.style.pointerEvents = canScrollPrev ? "auto" : "none";

      nextBtn.style.opacity = canScrollNext ? "1" : "0";
      nextBtn.style.pointerEvents = canScrollNext ? "auto" : "none";
    };

    const snapToClosestSlide = () => {
      index = getClosestSlideIndex();
      goToSlide(index);
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
      updateArrowVisibility();

      if (!allowScrollManual) return;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        snapToClosestSlide();
      }, scrollDuration);
    });

    window.addEventListener("resize", () => {
      clearTimeout(scrollTimeout);
      index = getClosestSlideIndex();
      goToSlide(index, "auto");
      updateArrowVisibility();
    });

    requestAnimationFrame(() => {
      const activeSlide = slider.querySelector(
        `[data-slider-slide][instance="${instance}"].is-active`
      );

      if (activeSlide) {
        const activeIndex = slides.indexOf(activeSlide);
        index = activeIndex >= 0 ? activeIndex : 0;
      } else {
        index = 0;
      }

      goToSlide(index, "auto");
      updateArrowVisibility();
    });
  });
});
