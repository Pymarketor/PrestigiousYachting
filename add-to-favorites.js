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

  // 1) Mettre à jour la liste spécifique (celle de la page courante)
  const list = favorites[pageList] || [];
  if (checked) {
    if (!list.includes(record_id)) list.push(record_id);
  } else {
    const index = list.indexOf(record_id);
    if (index !== -1) list.splice(index, 1);
  }
  favorites[pageList] = list;

  // 2) Mettre à jour la liste "default" intelligemment
  const defaultList = favorites["default"] || [];

  if (checked) {
    // Si on coche -> on s'assure que l'id est dans "default"
    if (!defaultList.includes(record_id)) {
      defaultList.push(record_id);
    }
  } else {
    // Si on décoche -> on vérifie s'il reste dans une autre liste
    const otherListsKeys = Object.keys(favorites).filter(
      (key) => key !== "default"
    );

    const stillExistsSomewhere = otherListsKeys.some((key) => {
      const arr = favorites[key];
      return Array.isArray(arr) && arr.includes(record_id);
    });

    // S'il n'existe plus dans aucune liste spécifique -> on le retire de "default"
    if (!stillExistsSomewhere) {
      const index = defaultList.indexOf(record_id);
      if (index !== -1) {
        defaultList.splice(index, 1);
      }
    }
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
