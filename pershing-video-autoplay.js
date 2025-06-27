const Pershingvideo = document.getElementById('PershingCharterVideo');
const Pershingsection = document.getElementById('Testimonials');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) Pershingvideo.play();
    else Pershingvideo.pause();
  });
}, { threshold: 0.5 });
observer.observe(Perhsingsection);
