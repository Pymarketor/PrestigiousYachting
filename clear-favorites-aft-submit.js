document.addEventListener("DOMContentLoaded", function () {
    const successBlock = document.getElementById("Success-Message");
    const currentFormula = document.body.getAttribute("data-favorite-list");

    if (!successBlock || !currentFormula) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cleanFavorites();
          observer.disconnect();
        }
      });
    }, {
      threshold: 0.5
    });

    observer.observe(successBlock);

    function cleanFavorites() {
      const stored = localStorage.getItem('favorites');
      if (!stored) return;

      let favorites;
      try {
        favorites = JSON.parse(stored);
      } catch (e) {
        console.error("Invalid JSON in localStorage 'favorites'");
        return;
      }

      const idsToRemove = favorites[currentFormula] || [];

      favorites[currentFormula] = [];

      if (Array.isArray(favorites.default)) {
        favorites.default = favorites.default.filter(id => !idsToRemove.includes(id));
      }

      localStorage.setItem('favorites', JSON.stringify(favorites));
      console.log(`[✓] Favorites cleared for "${currentFormula}" and removed from default`);
    }
  });
