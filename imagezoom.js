document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[image="trigger"], [Image="trigger"]').forEach(trigger => {
    trigger.addEventListener("click", () => {
      const sourceImg = trigger.querySelector('[image="source"], [Image="source"]');
      const targetImg = document.querySelector('[image="target"], [Image="target"]');

      if (!sourceImg || !targetImg) return;

      const src = sourceImg.getAttribute("src");
      const alt = sourceImg.getAttribute("alt") || "";

      targetImg.setAttribute("src", src);
      targetImg.setAttribute("alt", alt);
    });
  });
});
