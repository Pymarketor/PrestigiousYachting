document.addEventListener('DOMContentLoaded', function () {

  // À appeler quand tu considères que les favoris sont "à jour"
  function notifyParentFavoritesUpdated() {
    try {
      window.parent.postMessage(
        { type: 'favorites-updated' },
        window.location.origin // même origine = plus safe
      );
    } catch (e) {
      console.warn('Impossible d’envoyer le message au parent', e);
    }
  }

  // Exemple : bouton pour fermer la modale / iframe
  const closeButtons = document.querySelectorAll('[favorite-close]');

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1) Tu as déjà modifié localStorage.favorites dans l’iframe
      // 2) Tu préviens le parent :
      notifyParentFavoritesUpdated();

      // 3) Tu gères la fermeture de l'iframe selon ton système
      // (masquer overlay, changer src, etc.)
    });
  });

  // Si tu veux notifier aussi dès qu’un favori change dans l’iframe :
  document.addEventListener('favorite', () => {
    notifyParentFavoritesUpdated();
  });
});
