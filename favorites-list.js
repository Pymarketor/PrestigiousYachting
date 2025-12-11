document.addEventListener('DOMContentLoaded', function () {
  const STORAGE_KEY = 'favorites';

  const BASE_STRUCTURE = {
    sunset: [],
    day: [],
    week: [],
    'half-day': [],
    default: []
  };

  // 1. Lecture du localStorage (lecture seule, PAS de setItem ici)
  function loadFavorites() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return { ...BASE_STRUCTURE };
      }
      const parsed = JSON.parse(raw);
      return { ...BASE_STRUCTURE, ...parsed };
    } catch (e) {
      return { ...BASE_STRUCTURE };
    }
  }

  let favorites = loadFavorites();

  function saveFavorites() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Impossible d’enregistrer les favoris dans localStorage', e);
    }
  }

  function ensureArray(key) {
    if (!Array.isArray(favorites[key])) {
      favorites[key] = [];
    }
  }

  // 2. "default" = union de toutes les listes spécifiques
  function rebuildDefault() {
    const union = new Set();

    Object.keys(favorites).forEach(key => {
      if (key === 'default') return;
      const list = favorites[key];
      if (Array.isArray(list)) {
        list.forEach(id => union.add(String(id)));
      }
    });

    favorites.default = Array.from(union);
  }

  // 3. Sélection de TOUTES les checkboxes de favoris
  const checkboxes = document.querySelectorAll('input[checkbox="checkbox"]');

  // Helper UI : reset + applique l'état
  function updateVisual(checkbox) {
    const parent = checkbox.closest('[checkbox="parent"]');
    if (!parent) return;

    const mark = parent.querySelector('[checkbox="mark"]');
    const remove = parent.querySelector('[checkbox="remove"]');
    const isChecked = checkbox.checked;

    if (mark) {
      mark.classList.remove('is-active-check');
    }
    if (remove) {
      remove.classList.remove('is-active-check');
    }

    if (isChecked) {
      if (remove) remove.classList.add('is-active-check');
    } else {
      if (mark) mark.classList.add('is-active-check');
    }
  }

  // 4. Restauration depuis favorites → met à jour TOUTES les checkbox (services + default)
  function restoreFromStorage() {
    checkboxes.forEach(cb => {
      const id =
        cb.getAttribute('data-favorite-id') ||
        cb.getAttribute('record_id');

      if (!id) return;

      const parentList = cb.closest('[data-favorite-list]');
      if (!parentList) return;

      const listKey = parentList.getAttribute('data-favorite-list');
      if (!listKey) return;

      ensureArray(listKey);

      const shouldBeChecked = favorites[listKey].includes(String(id));
      cb.checked = shouldBeChecked;
      updateVisual(cb);
    });
  }

  // 🧷 Fonction globale appelée quand on veut resynchroniser depuis localStorage
  function syncFavoritesUIFromStorage() {
    favorites = loadFavorites();   // on relit le LS
    rebuildDefault();              // on recalcule default
    restoreFromStorage();          // on remet toutes les cases + visuels à jour
  }

  // On la rend accessible globalement
  window.syncFavoritesUIFromStorage = syncFavoritesUIFromStorage;

  // 👉 Au chargement : on recalcule default & on synchronise l'UI
  setTimeout(syncFavoritesUIFromStorage, 100);

  // 5. Gestion des changements (clic utilisateur)
  checkboxes.forEach(cb => {
    cb.addEventListener('change', function (e) {
      // Si tu dois bloquer Finsweet :
      e.stopImmediatePropagation();

      const id =
        cb.getAttribute('data-favorite-id') ||
        cb.getAttribute('record_id');
      if (!id) return;

      const parentList = cb.closest('[data-favorite-list]');
      if (!parentList) return;

      const listKey = parentList.getAttribute('data-favorite-list');
      if (!listKey) return;

      const value = String(id);
      ensureArray(listKey);

      if (cb.checked) {
        // Ajout dans la liste spécifique
        if (!favorites[listKey].includes(value)) {
          favorites[listKey].push(value);
        }
      } else {
        // Suppression de la liste spécifique
        favorites[listKey] = favorites[listKey].filter(x => x !== value);
      }

      // Recalcule default à partir des listes spécifiques
      rebuildDefault();
      saveFavorites();

      // Met à jour visuellement TOUTES les checkbox, y compris "default"
      restoreFromStorage();

      // Event custom optionnel
      const event = new CustomEvent('favorite', {
        bubbles: true,
        detail: {
          checked: cb.checked,
          checkbox: cb,
          record_id: value,
          listKey
        }
      });
      cb.dispatchEvent(event);
    });
  });
});
