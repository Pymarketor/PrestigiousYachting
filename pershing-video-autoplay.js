const video = document.getElementById('PershingCharterVideo');
const section = document.getElementById('Testimonials');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) video.play();
    else video.pause();
  });
}, { threshold: 0.5 });
observer.observe(section);