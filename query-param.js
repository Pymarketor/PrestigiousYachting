document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  document.querySelectorAll("[Query]").forEach(el => {
    const queryKey = el.getAttribute("Query");
    if (params.has(queryKey)) {
      let value = params.get(queryKey);

      // Cas input texte / textarea
      if (["INPUT", "TEXTAREA"].includes(el.tagName) && el.type !== "checkbox" && el.type !== "radio") {
        el.value = value;
        el.dispatchEvent(new Event("input", { bubbles: true }));
        setTimeout(() => el.parentElement?.click(), 200);
      }

      // Cas select
      else if (el.tagName === "SELECT") {
        Array.from(el.options).forEach(option => {
          if (option.value === value || option.text === value) {
            option.selected = true;
          }
        });
        el.dispatchEvent(new Event("change", { bubbles: true }));
        setTimeout(() => el.parentElement?.click(), 200);
      }

      // Cas checkbox
      else if (el.type === "checkbox") {
        if (value.toLowerCase() === "true" || value === el.value) {
          setTimeout(() => el.click(), 200); // vrai clic utilisateur
        }
      }

      // Cas radio
      else if (el.type === "radio") {
        if (el.value === value) {
          setTimeout(() => el.click(), 200); // vrai clic utilisateur
        }
      }
    }
  });
});
