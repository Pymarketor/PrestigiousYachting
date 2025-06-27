document.addEventListener("DOMContentLoaded", () => {
  const lightsection = document.getElementById("SectionAboutUs");
  if (!lightsection) return;
  lightsection.addEventListener("mousemove", (e) => {
    const rect = lightsection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lightsection.style.setProperty("--x", `${x}px`);
    lightsection.style.setProperty("--y", `${y}px`);
    lightsection.style.setProperty("background", `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.10), transparent 40px)`);
  });
  lightsection.addEventListener("mouseleave", () => {
    lightsection.style.removeProperty("background");
  });
});
