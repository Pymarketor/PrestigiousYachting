document.addEventListener("DOMContentLoaded", () => {
  const updateFavoriteCounts = () => {
    setTimeout(() => {
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
        el.style.display = count > 0 ? 'flex' : 'none';
      });
    }, 100); // petit délai pour laisser le temps au localStorage d’être à jour
  };

  updateFavoriteCounts();
  document.addEventListener("favorite", updateFavoriteCounts);
});
