// === SLIDER SCRIPT (Instance + Attribut Driven) ===
document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll('[data-slider="true"]');

  sliders.forEach((slider) => {
    const instance = slider.getAttribute("slider-instance");
    const track = document.querySelector(`[instance="${instance}"][data-slider-track]`);
    const slides = document.querySelectorAll(`[instance="${instance}"][data-slider-slide]`);
    const prevBtn = document.querySelector(`[instance="${instance}"][data-slider-prev]`);
    const nextBtn = document.querySelector(`[instance="${instance}"][data-slider-next]`);

    const autoplay = slider.getAttribute("slider-autoplay") === "true";
    const delay = parseInt(slider.getAttribute("slider-delay")) || 5000;
    const loop = slider.getAttribute("slider-loop") === "true";
    const hoverArrows = slider.getAttribute("slider-hover-arrows") === "true";

    let autoplayInterval;

    function scrollToNext() {
      if (!track) return;
      const scrollAmount = track.clientWidth;
      track.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    function scrollToPrev() {
      if (!track) return;
      const scrollAmount = track.clientWidth;
      track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }

    function updateArrowVisibility() {
      if (!track) return;

      const maxScrollLeft = track.scrollWidth - track.clientWidth;
      const currentScroll = track.scrollLeft;
      const showLeft = currentScroll > 10;
      const showRight = currentScroll < maxScrollLeft - 10;
      const displayLeft = showLeft ? "flex" : "none";
      const displayRight = showRight ? "flex" : "none";

      if (hoverArrows) {
        slider.addEventListener("mouseenter", () => {
          if (prevBtn) prevBtn.style.display = displayLeft;
          if (nextBtn) nextBtn.style.display = displayRight;
        });
        slider.addEventListener("mouseleave", () => {
          if (prevBtn) prevBtn.style.display = "none";
          if (nextBtn) nextBtn.style.display = "none";
        });
        if (prevBtn) prevBtn.style.display = "none";
        if (nextBtn) nextBtn.style.display = "none";
      } else {
        if (prevBtn) prevBtn.style.display = displayLeft;
        if (nextBtn) nextBtn.style.display = displayRight;
      }
    }

    if (prevBtn) prevBtn.addEventListener("click", scrollToPrev);
    if (nextBtn) nextBtn.addEventListener("click", scrollToNext);
    if (track) track.addEventListener("scroll", updateArrowVisibility);

    updateArrowVisibility();

    if (autoplay) {
      autoplayInterval = setInterval(() => {
        scrollToNext();
        const maxScrollLeft = track.scrollWidth - track.clientWidth;
        if (loop && track.scrollLeft >= maxScrollLeft - 10) {
          track.scrollTo({ left: 0, behavior: "smooth" });
        }
      }, delay);

      slider.addEventListener("mouseenter", () => clearInterval(autoplayInterval));
      slider.addEventListener("mouseleave", () => {
        autoplayInterval = setInterval(() => {
          scrollToNext();
          const maxScrollLeft = track.scrollWidth - track.clientWidth;
          if (loop && track.scrollLeft >= maxScrollLeft - 10) {
            track.scrollTo({ left: 0, behavior: "smooth" });
          }
        }, delay);
      });
    }
  });
});

// Masquer les barres de scroll globalement
document.documentElement.style.scrollbarWidth = "none";
document.documentElement.style.msOverflowStyle = "none";
document.documentElement.style.overflowX = "hidden";
