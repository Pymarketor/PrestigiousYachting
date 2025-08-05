  document.addEventListener("DOMContentLoaded", () => {
    const updateFavoriteCounts = () => {
      const stored = localStorage.getItem("favorites");
      let favorites = {};

      try {
        favorites = stored ? JSON.parse(stored) : {};
      } catch (e) {}

      const currentListKey = document.body.getAttribute('data-favorite-list');

      document.querySelectorAll('[favorite-count]').forEach(el => {
        const targetKey = el.getAttribute('favorite-count');
        const activeKey = targetKey || currentListKey;
        const items = favorites[activeKey] || [];
        const count = items.length;

        el.textContent = count;

        // Affiche ou cache l'élément selon le nombre
        el.style.display = count > 0 ? 'flex' : 'none';
      });
    };

    updateFavoriteCounts();
    document.addEventListener("favorite", updateFavoriteCounts);
  });
