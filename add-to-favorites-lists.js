document.addEventListener('DOMContentLoaded', function () {
  const STORAGE_KEY = 'favorites'; // même nom que ton ancien script, à adapter si besoin

  // 🔹 1. Récupération du localStorage (sans créer la clé si elle n'existe pas)
  let favoritesByList = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    favoritesByList = raw ? JSON.parse(raw) : null;
  } catch (e) {
    favoritesByList = null;
  }

  // Helpers pour gérer les listes
  function ensureList(obj, key) {
    if (!obj[key] || !Array.isArray(obj[key])) {
      obj[key] = [];
    }
  }

  function addToList(obj, key, id) {
    ensureList(obj, key);
    if (!obj[key].includes(id)) {
      obj[key].push(id);
    }
  }

  function removeFromList(obj, key, id) {
    if (!obj[key] || !Array.isArray(obj[key])) return;
    obj[key] = obj[key].filter(function (item) {
      return item !== id;
    });
  }

  function saveFavorites() {
    if (!favoritesByList) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritesByList));
    } catch (e) {
      console.warn('Impossible d’enregistrer les favoris dans localStorage', e);
    }
  }

  // 🔹 2. Sélection des checkboxes
  // 👉 Adapte le sélecteur à ta structure exacte si besoin
  const checkboxes = document.querySelectorAll('input[type="checkbox"][data-favorite-id]');

  // 🔹 3. Restauration de l’état visuel au chargement
  if (favoritesByList) {
    checkboxes.forEach(function (checkbox) {
      const id = checkbox.getAttribute('data-favorite-id');
      if (!id) return;

      // On remonte au parent qui porte data-favorite-list
      const listParent = checkbox.closest('[data-favorite-list]');
      if (!listParent) return;

      const listKey = listParent.getAttribute('data-favorite-list') || 'default';
      const list = favoritesByList[listKey];

      if (Array.isArray(list) && list.includes(id)) {
        // On coche la checkbox en logique
        checkbox.checked = true;

        // Gestion de l’animation Webflow : clic sur le div .w-checkbox-input
        const customInput = checkbox.previousElementSibling;
        if (customInput && customInput.classList.contains('w-checkbox-input')) {
          // Important : on fait ça AVANT d’ajouter les listeners "change"
          customInput.click();
        }
      }
    });
  }

  // 🔹 4. Gestion des clics / changements sur les checkboxes
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      const id = checkbox.getAttribute('data-favorite-id');
      if (!id) return;

      // On retrouve la liste à laquelle appartient cette checkbox
      const listParent = checkbox.closest('[data-favorite-list]');
      const listKey = listParent
        ? listParent.getAttribute('data-favorite-list') || 'default'
        : 'default';

      // Première interaction → on initialise la structure
      if (!favoritesByList) {
        favoritesByList = {};
      }

      if (checkbox.checked) {
        // ✅ Ajout dans la liste spécifique
        addToList(favoritesByList, listKey, id);
        // ✅ Ajout dans la liste "default" (union de tous les favoris)
        addToList(favoritesByList, 'default', id);
      } else {
        // ❌ Retrait de la liste spécifique
        removeFromList(favoritesByList, listKey, id);
        // ❌ Retrait de la liste "default"
        removeFromList(favoritesByList, 'default', id);
      }

      saveFavorites();
      // Ici tu peux éventuellement appeler une fonction de compteur, etc.
    });
  });
});
