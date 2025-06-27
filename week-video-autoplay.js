const Weekvideo = document.getElementById('weekCharterVideo');
const Weeksection = document.getElementById('Week');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) Weekvideo.play();
    else Weekvideo.pause();
  });
}, { threshold: 0.1 });
observer.observe(Weeksection);
