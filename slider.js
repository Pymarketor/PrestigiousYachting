document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll("[data-slider='true']");

  sliders.forEach((slider) => {
    const instance = slider.getAttribute("slider-instance");
    const track = slider.querySelector(`[data-slider-track][instance="${instance}"]`);
    const slides = slider.querySelectorAll(`[data-slider-slide][instance="${instance}"]`);
    const btnPrev = slider.querySelector(`[data-slider-prev][instance="${instance}"]`);
    const btnNext = slider.querySelector(`[data-slider-next][instance="${instance}"]`);

    const autoplay = slider.getAttribute("slider-autoplay") === "true";
    const loop = slider.getAttribute("slider-loop") === "true";
    const delay = parseInt(slider.getAttribute("slider-delay") || 5000);
    const animation = slider.getAttribute("slider-animation") || "smooth";
    const duration = parseInt(slider.getAttribute("slider-duration") || 300);
    const snapThreshold = parseFloat(slider.getAttribute("slider-snap-threshold") || 0.5);
    const showArrowsOnHover = slider.getAttribute("slider-hover-arrows") === "true";

    let index = 0;
    let interval;

    // Style: hide scrollbars
    track.style.scrollBehavior = animation;
    track.style.scrollSnapType = "x mandatory";
    track.style.overflowX = "scroll";
    track.style.scrollbarWidth = "none";
    track.style.msOverflowStyle = "none";
    track.style.overscrollBehaviorX = "contain";
    track.style.transition = `scroll-left ${duration}ms ease-in-out`;
    track.classList.add("no-scrollbar");

    // Hide native scrollbar for all browsers
    const css = document.createElement("style");
    css.innerHTML = `
      [data-slider-track]::-webkit-scrollbar {
        display: none !important;
      }
    `;
    document.head.appendChild(css);

    // Show/hide arrows based on scroll position
    function updateArrowVisibility() {
      if (!btnPrev || !btnNext) return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      const currentScroll = track.scrollLeft;

      btnPrev.style.display = currentScroll > 0 ? "flex" : "none";
      btnNext.style.display = currentScroll < maxScroll - 1 ? "flex" : "none";
    }

    // Scroll to slide by index
    function goToSlide(i) {
      index = (loop ? (i + slides.length) % slides.length : Math.max(0, Math.min(i, slides.length - 1)));
      const offset = slides[index].offsetLeft;
      track.scrollTo({ left: offset, behavior: animation });
    }

    // Autoplay
    if (autoplay) {
      interval = setInterval(() => goToSlide(index + 1), delay);
    }

    // Arrows
    if (btnPrev) {
      btnPrev.addEventListener("click", () => goToSlide(index - 1));
    }
    if (btnNext) {
      btnNext.addEventListener("click", () => goToSlide(index + 1));
    }

    // Scroll-end snap threshold behavior
    let isScrolling;
    track.addEventListener("scroll", () => {
      updateArrowVisibility();

      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        const scrollLeft = track.scrollLeft;
        const slideWidth = track.offsetWidth;
        const exactRatio = (scrollLeft % slideWidth) / slideWidth;
        let targetIndex = Math.round(scrollLeft / slideWidth);

        if (exactRatio > snapThreshold) targetIndex += 1;
        if (exactRatio < -snapThreshold) targetIndex -= 1;

        targetIndex = Math.max(0, Math.min(targetIndex, slides.length - 1));

        track.scrollTo({
          left: slides[targetIndex].offsetLeft,
          behavior: animation,
        });

        index = targetIndex;
      }, 100);
    });

    // Hover arrows
    if (showArrowsOnHover && (btnPrev || btnNext)) {
      [btnPrev, btnNext].forEach((el) => {
        if (el) el.style.opacity = "0";
      });

      slider.addEventListener("mouseenter", () => {
        [btnPrev, btnNext].forEach((el) => {
          if (el) el.style.opacity = "1";
        });
      });
      slider.addEventListener("mouseleave", () => {
        [btnPrev, btnNext].forEach((el) => {
          if (el) el.style.opacity = "0";
        });
      });
    }

    updateArrowVisibility();
  });
});
