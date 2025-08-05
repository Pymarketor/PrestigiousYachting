  document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll('[checkbox="checkbox"]');

    checkboxes.forEach(checkbox => {
      const parent = checkbox.closest('[checkbox="parent"]');
      const mark = parent.querySelector('[checkbox="mark"]');
      const remove = parent.querySelector('[checkbox="remove"]');

      const updateVisual = () => {
        const isChecked = checkbox.checked;
        mark.classList.toggle('is-active-check', !isChecked);
        remove.classList.toggle('is-active-check', isChecked);

        // CustomEvent unique
        const event = new CustomEvent("favorite", {
          bubbles: true,
          detail: {
            checked: isChecked,
            checkbox: checkbox,
            record_id: checkbox.getAttribute("record_id") || null
          }
        });
        checkbox.dispatchEvent(event);
      };

      // Empêche le trigger du filtre Finsweet sur load si coché par défaut
      requestAnimationFrame(() => updateVisual());

      // Blocage du "change" vers Finsweet
      checkbox.addEventListener("change", (e) => {
        e.stopImmediatePropagation(); // ⛔ Empêche que Finsweet réagisse
        updateVisual();
      });
    });
  });
