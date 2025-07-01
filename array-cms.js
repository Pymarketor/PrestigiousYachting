  document.addEventListener("DOMContentLoaded", () => {
    // Pour chaque groupe CMS dynamique
    document.querySelectorAll("[Array]").forEach(arrayField => {
      const arrayKey = arrayField.getAttribute("Array");
      const rawValue = arrayField.textContent || "";

      // Transforme "item1, item2, item3" → ["item1", "item2", "item3"]
      const items = rawValue.split(",").map(item => item.trim()).filter(item => item);

      const template = document.querySelector(`[ArrayTemplate="${arrayKey}"]`);
      const parent = document.querySelector(`[ArrayParent="${arrayKey}"]`);

      if (!template || !parent || items.length === 0) return;

      items.forEach((value) => {
        const clone = template.cloneNode(true);
        clone.removeAttribute(`ArrayTemplate`);
        clone.style.display = "block"; // au cas où le modèle est masqué

        // Si tu veux injecter le texte dans un sous-élément :
        const textTarget = clone.querySelector("[data-array-text]");
        if (textTarget) textTarget.textContent = value;

        parent.appendChild(clone);
      });

      template.remove(); // retire le template de base
    });
  });
