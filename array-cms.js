function processArrayFields() {
  // Tous les éléments [Array] non encore traités
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
      if (textTarget) textTarget.textContent = value;

      parent.appendChild(clone);
    });

    // Cache le template pour le réutiliser plus tard
    template.style.display = "none";

    // ✅ Marque comme traité
    arrayField.setAttribute("data-array-processed", "true");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  processArrayFields(); // 🔁 au chargement

  // Réécoute des clics sur tous les [load="more"]
  document.querySelectorAll('[load="more"]').forEach(link => {
    link.addEventListener("click", () => {
      setTimeout(() => {
        processArrayFields(); // 🔁 traite seulement les nouveaux
      }, 200);
    });
  });
});
