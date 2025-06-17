// == Scroll Slider - Full Attribute Driven with Instance == //

// On DOM Ready
window.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll('[data-slider="true"]');

  sliders.forEach((sliderEl) => {
    const instance = sliderEl.getAttribute("instance");
    const track = document.querySelector(`[data-slider-track][instance="${instance}"]`);
    const slides = track?.querySelectorAll(`[data-slider-slide][instance="${instance}"]`) || [];
    const prevBtn = document.querySelector(`[data-slider-prev][instance="${instance}"]`);
    const nextBtn = document.querySelector(`[data-slider-next][instance="${instance}"]`);

    // Configs
    const autoplay = sliderEl.getAttribute("slider-autoplay") === "true";
    const delay = parseInt(sliderEl.getAttribute("slider-delay") || "4000", 10);
    const loop = sliderEl.getAttribute("slider-loop") === "true";
    const scrollAmount = track?.clientWidth || 300;

    let autoplayInterval;

    // Scroll functions
    const scrollNext = () => {
      if (!track) return;
      track.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    const scrollPrev = () => {
      if (!track) return;
      track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    };

    // Button events
    if (nextBtn) nextBtn.addEventListener("click", scrollNext);
    if (prevBtn) prevBtn.addEventListener("click", scrollPrev);

    // Autoplay
    if (autoplay) {
      autoplayInterval = setInterval(() => {
        if (!document.hidden) scrollNext();
      }, delay);

      // Pause on hover
      sliderEl.addEventListener("mouseenter", () => clearInterval(autoplayInterval));
      sliderEl.addEventListener("mouseleave", () => {
        autoplayInterval = setInterval(scrollNext, delay);
      });
    }

    // Optional: snap to slide
    track?.setAttribute("style", `scroll-snap-type: x mandatory; overflow-x: auto; display: flex; gap: 1rem; scroll-behavior: smooth;`);
    slides.forEach((slide) => {
      slide.setAttribute("style", "scroll-snap-align: start; flex-shrink: 0; width: 100%;");
    });
  });
});
