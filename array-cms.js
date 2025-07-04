function processArrayFields() {
  document.querySelectorAll("[Array]:not([data-array-processed='true'])").forEach(arrayField => {
    const arrayKey = arrayField.getAttribute("Array");
    const rawValue = arrayField.textContent || "";

    const items = rawValue.split(",").map(item => item.trim()).filter(item => item);

    const parent = document.querySelector(`[ArrayParent="${arrayKey}"]`);
    const template = parent?.querySelector(`[ArrayTemplate="${arrayKey}"]`);

    if (!template || !parent || items.length === 0) return;

    items.forEach((value) => {
      const clone = template.cloneNode(true);
      clone.removeAttribute("ArrayTemplate");
      clone.style.display = "block";

      const textTarget = clone.querySelector("[data-array-text]");
      if (textTarget) {
        textTarget.textContent = value;

        // ➕ Si besoin, on peut aussi ajouter fs-list-field + fs-list-value ici
        // textTarget.setAttribute("fs-list-field", "subtopic");
        // textTarget.setAttribute("fs-list-value", value);
      }

      parent.appendChild(clone);
    });

    template.style.display = "none";
    arrayField.setAttribute("data-array-processed", "true");
  });

  // ✅ Recharge Finsweet list-filter à chaque appel
  if (window.fsAttributes && window.fsAttributes.push) {
    window.fsAttributes.push(["list-filter"]);
  }
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
