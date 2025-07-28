document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("firstVisit")) {
      const now = new Date().toISOString();
      localStorage.setItem("firstVisit", now);
    }
  });
