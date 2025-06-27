document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("SectionAboutUs");
  if (!section) return;
  section.addEventListener("mousemove", (e) => {
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    section.style.setProperty("--x", `${x}px`);
    section.style.setProperty("--y", `${y}px`);
    section.style.setProperty("background", `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.10), transparent 40px)`);
  });
  section.addEventListener("mouseleave", () => {
    section.style.removeProperty("background");
  });
});