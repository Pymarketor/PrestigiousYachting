document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("[scroll-animate]");
  elements.forEach((el) => el.classList.add("will-animate"));
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add("in-view");
        observer.unobserve(el);
        setTimeout(() => {
          el.classList.remove("in-view");
          el.classList.remove("will-animate");
        }, 700);
      }
    });
  }, { threshold: 0.4 });
  elements.forEach((el) => observer.observe(el));
});