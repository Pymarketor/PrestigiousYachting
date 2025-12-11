document.addEventListener("DOMContentLoaded", () => {

  const updateFavoriteCounts = () => {
    setTimeout(() => {

      // Lecture du localStorage
      let favorites = {};
      try {
        const stored = localStorage.getItem("favorites");
        favorites = stored ? JSON.parse(stored) : {};
      } catch (e) {}

      // Sélection de TOUTES les zones avec favorite-count
      document.querySelectorAll('[favorite-count]').forEach(el => {

        // Trouver le premier parent ayant data-favorite-list
        const parentList = el.closest('[data-favorite-list]');
        if (!parentList) return;

        const listKey = parentList.getAttribute('data-favorite-list');
        if (!listKey) return;

        const list = favorites[listKey] || [];
        const count = list.length;

        // Mise à jour du texte
        el.textContent = count;

        // Affichage conditionnel
        el.style.display = count > 0 ? 'flex' : 'none';
      });

    }, 100); // Laisse au localStorage le temps de se mettre à jour
  };

  // Mise à jour initiale
  updateFavoriteCounts();

  // Mise à jour en cas d'événements "favorite"
  document.addEventListener("favorite", updateFavoriteCounts);
});
