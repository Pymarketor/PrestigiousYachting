function processArrayFields() {
  document.querySelectorAll("[Array]").forEach(arrayField => {
    const arrayKey = arrayField.getAttribute("Array");
    const rawValue = arrayField.textContent || "";

    const items = rawValue.split(",").map(item => item.trim()).filter(item => item);

    const template = document.querySelector(`[ArrayTemplate="${arrayKey}"]`);
    const parent = document.querySelector(`[ArrayParent="${arrayKey}"]`);

    if (!template || !parent || items.length === 0) return;

    items.forEach((value) => {
      const clone = template.cloneNode(true);
      clone.removeAttribute(`ArrayTemplate`);
      clone.style.display = "block";

      const textTarget = clone.querySelector("[data-array-text]");
      if (textTarget) textTarget.textContent = value;

      parent.appendChild(clone);
    });

    template.remove();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  processArrayFields();

  document.querySelectorAll('[load="more"]').forEach(link => {
    link.addEventListener("click", () => {
      setTimeout(() => {
        processArrayFields();
      }, 200);
    });
  });
});
