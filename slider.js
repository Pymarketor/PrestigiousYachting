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

    const scrollToSlide = (i) => {
      if (!track || !slides[i]) return;
      track.scrollTo({
        left: slides[i].offsetLeft,
        behavior: "smooth",
      });
      index = i;
      updateArrows();
    };

    const updateArrows = () => {
      if (!loop) {
        if (prevBtn) prevBtn.style.display = index === 0 ? "none" : "flex";
        if (nextBtn) nextBtn.style.display = index >= total - 1 ? "none" : "flex";
      }
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (index > 0) scrollToSlide(index - 1);
        else if (loop) scrollToSlide(total - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (index < total - 1) scrollToSlide(index + 1);
        else if (loop) scrollToSlide(0);
      });
    }

    if (showArrowsOnHover) {
      [prevBtn, nextBtn].forEach((btn) => {
        if (btn) btn.style.opacity = "0";
      });
      slider.addEventListener("mouseenter", () => {
        [prevBtn, nextBtn].forEach((btn) => {
          if (btn) btn.style.opacity = "1";
        });
      });
      slider.addEventListener("mouseleave", () => {
        [prevBtn, nextBtn].forEach((btn) => {
          if (btn) btn.style.opacity = "0";
        });
      });
    }

    if (autoplay) {
      setInterval(() => {
        if (index < total - 1) scrollToSlide(index + 1);
        else if (loop) scrollToSlide(0);
      }, delay);
    }

    if (track) {
      let isMouseDown = false;
      let startX = 0;
      let scrollLeft = 0;

      track.addEventListener("mousedown", (e) => {
        isMouseDown = true;
        startX = e.pageX;
        scrollLeft = track.scrollLeft;
      });

      track.addEventListener("mouseup", () => {
        if (!isMouseDown) return;
        isMouseDown = false;
        const slideWidth = slides[0].offsetWidth;
        const scrolled = track.scrollLeft;
        const targetIndex = Math.round(scrolled / slideWidth);

        const visibleSlideIndex = Math.max(0, Math.min(targetIndex, total - 1));
        scrollToSlide(visibleSlideIndex);
      });

      track.addEventListener("mouseleave", () => {
        if (!isMouseDown) return;
        isMouseDown = false;
        const slideWidth = slides[0].offsetWidth;
        const scrolled = track.scrollLeft;
        const targetIndex = Math.round(scrolled / slideWidth);

        const visibleSlideIndex = Math.max(0, Math.min(targetIndex, total - 1));
        scrollToSlide(visibleSlideIndex);
      });

      track.addEventListener("touchend", () => {
        const slideWidth = slides[0].offsetWidth;
        const scrolled = track.scrollLeft;
        const targetIndex = Math.round(scrolled / slideWidth);

        const visibleSlideIndex = Math.max(0, Math.min(targetIndex, total - 1));
        scrollToSlide(visibleSlideIndex);
      });

      track.style.scrollBehavior = "smooth";
      track.style.scrollSnapType = "x mandatory";
    }

    updateArrows();
  });
});
