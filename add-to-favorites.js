document.addEventListener("DOMContentLoaded", () => {
    const pageList = document.querySelector("[data-favorite-list]")?.getAttribute("data-favorite-list") || "default";

    const initFavorites = () => {
      const structure = {
        sunset: [],
        day: [],
        week: [],
        "half-day": [],
        default: []
      };
      try {
        const stored = localStorage.getItem("favorites");
        if (!stored) {
          localStorage.setItem("favorites", JSON.stringify(structure));
        } else {
          const parsed = JSON.parse(stored);
          localStorage.setItem("favorites", JSON.stringify({ ...structure, ...parsed }));
        }
      } catch {
        localStorage.setItem("favorites", JSON.stringify(structure));
      }
    };

    const getFavorites = () => JSON.parse(localStorage.getItem("favorites"));
    const saveFavorites = (favorites) => localStorage.setItem("favorites", JSON.stringify(favorites));

    const updateStorage = (record_id, checked) => {
      const favorites = getFavorites();

      // Mettre à jour la liste spécifique
      const list = favorites[pageList] || [];
      if (checked) {
        if (!list.includes(record_id)) list.push(record_id);
      } else {
        const index = list.indexOf(record_id);
        if (index !== -1) list.splice(index, 1);
      }
      favorites[pageList] = list;

      // Mettre à jour la liste "default" aussi
      const defaultList = favorites["default"] || [];
      if (checked) {
        if (!defaultList.includes(record_id)) defaultList.push(record_id);
      } else {
        const index = defaultList.indexOf(record_id);
        if (index !== -1) defaultList.splice(index, 1);
      }
      favorites["default"] = defaultList;

      saveFavorites(favorites);
    };

    initFavorites();

    // Écoute des événements "favorite"
    document.addEventListener("favorite", (e) => {
      const { record_id, checked } = e.detail;
      if (!record_id) return;
      updateStorage(record_id, checked);
    });

    // Restauration des favoris cochés
    const checkboxes = document.querySelectorAll('[checkbox="checkbox"]');
    const currentList = getFavorites()[pageList] || [];

    checkboxes.forEach(checkbox => {
      const record_id = checkbox.getAttribute("record_id");
      if (currentList.includes(record_id)) {
        checkbox.checked = true;
        checkbox.dispatchEvent(new CustomEvent("favorite", {
          bubbles: true,
          detail: {
            checked: true,
            checkbox: checkbox,
            record_id: record_id
          }
        }));
      }
    });
  });
