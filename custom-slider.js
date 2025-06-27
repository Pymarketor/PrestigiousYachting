document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[data-slider="true"]').forEach(slider => {
    const instance = slider.getAttribute("slider-instance") || "default";
    const track = slider.querySelector(`[data-slider-track][instance="${instance}"]`);
    const slides = slider.querySelectorAll(`[data-slider-slide][instance="${instance}"]`);
    const prevBtn = slider.querySelector(`[data-slider-prev][instance="${instance}"]`);
    const nextBtn = slider.querySelector(`[data-slider-next][instance="${instance}"]`);
    let index = 0;
    const goToSlide = (i) => {
      if (!slides[i]) return;
      track.scrollTo({ left: slides[i].offsetLeft, behavior: 'smooth' });
      index = i;
    };
    if (nextBtn) nextBtn.addEventListener('click', () => {
      index = (index + 1) % slides.length;
      goToSlide(index);
    });
    if (prevBtn) prevBtn.addEventListener('click', () => {
      index = (index - 1 + slides.length) % slides.length;
      goToSlide(index);
    });
    let scrollTimeout;
    track.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const closest = Array.from(slides).reduce((prev, curr) =>
          Math.abs(curr.offsetLeft - track.scrollLeft) < Math.abs(prev.offsetLeft - track.scrollLeft) ? curr : prev);
        track.scrollTo({ left: closest.offsetLeft, behavior: 'smooth' });
        index = [...slides].indexOf(closest);
      }, 150);
    });
  });
});