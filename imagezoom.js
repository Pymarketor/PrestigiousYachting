document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[Image="trigger"]').forEach(trigger => {
    trigger.addEventListener("click", () => {
      const sourceImg = trigger.querySelector('[Image="source"]');
      const targetImg = document.querySelector('[Image="target"]');

      if (!sourceImg || !targetImg) return;

      const src = sourceImg.getAttribute("src");
      const alt = sourceImg.getAttribute("alt") || "";

      targetImg.setAttribute("src", src);
      targetImg.setAttribute("alt", alt);
    });
  });
});
