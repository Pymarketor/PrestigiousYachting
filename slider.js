document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll('[data-slider="true"]');

  sliders.forEach((slider) => {
    const instance = slider.getAttribute("slider-instance") || "default";
    const track = slider.querySelector(`[instance="${instance}"][data-slider-track]`);
    const slides = slider.querySelectorAll(`[instance="${instance}"][data-slider-slide]`);
    const prevBtn = slider.querySelector(`[instance="${instance}"][data-slider-prev]`);
    const nextBtn = slider.querySelector(`[instance="${instance}"][data-slider-next]`);

    const autoplay = slider.getAttribute("slider-autoplay") === "true";
    const loop = slider.getAttribute("slider-loop") === "true";
    const delay = parseInt(slider.getAttribute("slider-delay")) || 5000;
    const duration = parseInt(slider.getAttribute("slider-duration")) || 300;
    const animation = slider.getAttribute("slider-animation") || "ease-in-out";
    const snapThreshold = parseFloat(slider.getAttribute("slider-snap-threshold")) || 0.1;
    const showArrowsOnHover = slider.getAttribute("slider-hover-arrows") === "true";

    let index = 0;
    const total = slides.length;

    const updateArrows = () => {
      if (!loop) {
        if (prevBtn) prevBtn.style.display = index === 0 ? "none" : "flex";
        if (nextBtn) nextBtn.style.display = index >= total - 1 ? "none" : "flex";
      }
    };

    const scrollToSlide = (i) => {
      const slide = slides[i];
      if (slide && track) {
        track.scrollTo({
          left: slide.offsetLeft,
          behavior: "smooth",
        });
        index = i;
        updateArrows();
      }
    };

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (index < total - 1) scrollToSlide(index + 1);
        else if (loop) scrollToSlide(0);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (index > 0) scrollToSlide(index - 1);
        else if (loop) scrollToSlide(total - 1);
      });
    }

    if (showArrowsOnHover) {
      [prevBtn, nextBtn].forEach((arrow) => {
        if (arrow) arrow.style.opacity = "0";
      });

      slider.addEventListener("mouseenter", () => {
        [prevBtn, nextBtn].forEach((arrow) => {
          if (arrow) arrow.style.opacity = "1";
        });
      });

      slider.addEventListener("mouseleave", () => {
        [prevBtn, nextBtn].forEach((arrow) => {
          if (arrow) arrow.style.opacity = "0";
        });
      });
    }

    if (autoplay) {
      setInterval(() => {
        if (index < total - 1) scrollToSlide(index + 1);
        else if (loop) scrollToSlide(0);
      }, delay);
    }

    // --- Scroll Snap Handling
    if (track) {
      let isScrolling;
      track.addEventListener("scroll", () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
          const trackScrollLeft = track.scrollLeft;
          let closest = 0;
          let closestDiff = Infinity;

          slides.forEach((slide, i) => {
            const diff = Math.abs(slide.offsetLeft - trackScrollLeft);
            if (diff < closestDiff) {
              closestDiff = diff;
              closest = i;
            }
          });

          // Snap if we've scrolled more than threshold
          const slideWidth = slides[0]?.offsetWidth || 1;
          const scrollDiff = trackScrollLeft - slides[index].offsetLeft;
          const scrollPercent = Math.abs(scrollDiff) / slideWidth;

          if (scrollPercent >= snapThreshold) {
            scrollToSlide(closest);
          } else {
            scrollToSlide(index);
          }
        }, 100);
      });
    }

    // Initial
    track.style.scrollBehavior = "smooth";
    track.style.scrollSnapType = "x mandatory";
    track.style.transition = `scroll-left ${duration}ms ${animation}`;
    updateArrows();
  });
});
