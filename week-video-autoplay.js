const video = document.getElementById('weekCharterVideo');
const section = document.getElementById('Week');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) video.play();
    else video.pause();
  });
}, { threshold: 0.1 });
observer.observe(section);