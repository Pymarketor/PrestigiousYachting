document.querySelectorAll('[data-slider="true"]').forEach((slider) => {
  const id = slider.getAttribute('slider-id') || `slider-${Math.random().toString(36).substr(2, 5)}`;
  const track = slider.querySelector('[data-slider-track]');
  const slides = slider.querySelectorAll('[data-slider-slide]');
  const prevBtn = slider.querySelector('[data-slider-prev]');
  const nextBtn = slider.querySelector('[data-slider-next]');
  const loop = slider.getAttribute('slider-loop') === 'true';
  const autoplay = slider.getAttribute('slider-autoplay') === 'true';
  const delay = parseInt(slider.getAttribute('slider-delay')) || 5000;
  const animation = slider.getAttribute('slider-animation') || 'slide';

  let index = 0;
  let interval;

  // Setup track style
  track.style.display = 'flex';
  track.style.transition = 'transform 0.5s ease-in-out';
  track.style.willChange = 'transform';

  const update = () => {
    if (animation === 'slide') {
      track.style.transform = `translateX(-${index * 100}%)`;
    } else if (animation === 'fade') {
      slides.forEach((s, i) => {
        s.style.opacity = i === index ? '1' : '0';
        s.style.position = 'absolute';
        s.style.transition = 'opacity 0.5s ease-in-out';
        s.style.top = 0;
        s.style.left = 0;
        s.style.width = '100%';
      });
    }

    // Show/hide arrows based on index
    if (!loop) {
      prevBtn?.classList.toggle('is-disabled', index === 0);
      nextBtn?.classList.toggle('is-disabled', index === slides.length - 1);
    }
  };

  const next = () => {
    index = (index + 1) % slides.length;
    if (!loop && index === 0) index = slides.length - 1;
    update();
  };

  const prev = () => {
    index = (index - 1 + slides.length) % slides.length;
    if (!loop && index === slides.length - 1) index = 0;
    update();
  };

  nextBtn?.addEventListener('click', next);
  prevBtn?.addEventListener('click', prev);

  if (autoplay) {
    interval = setInterval(next, delay);
    slider.addEventListener('mouseenter', () => clearInterval(interval));
    slider.addEventListener('mouseleave', () => interval = setInterval(next, delay));
  }

  update();
});
