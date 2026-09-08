/* Prestigious Yachting — CMS yacht template head utilities.
 * Source of truth: GitHub. Loaded with defer before Finsweet.
 */

/* Finsweet Attributes v2 owns scroll locking for modal elements.
 * Keep fs-scrolldisable-element="when-visible" intact on Webflow elements.
 */

/* Migrated Webflow head block 2. */
document.documentElement.classList.add("cls-lock-accordions");
  (() => {
    let unlocked = false;
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      document.documentElement.classList.remove("cls-lock-accordions");
    };
    const ready = () => {
      const panels = [...document.querySelectorAll(".fs_accordion-1_content")];
      return panels.length > 0 && panels.every((panel) =>
        panel.style.display === "none" || parseFloat(panel.style.height) === 0
      );
    };
    const check = () => {
      if (unlocked) return;
      if (ready()) unlock();
      else requestAnimationFrame(check);
    };
    document.addEventListener("DOMContentLoaded", check, { once: true });
    window.addEventListener("load", () => setTimeout(() => {
      if (ready()) unlock();
    }, 250), { once: true });
    setTimeout(unlock, 3000);
  })();

/* Migrated Webflow head block 3. */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a.link-block-logo-py").forEach((link) => {
    link.setAttribute("aria-label", "Prestigious Yachting home");
  });
}, { once: true });

/* Migrated Webflow head block 4. */
(() => {
  const mobile = matchMedia("(max-width: 767px)");

  const initializeInformationCards = () => {
    document.querySelectorAll(".div-block-79").forEach((card, index) => {
      const trigger = card.querySelector(".code-embed-28");
      const content = card.querySelector(".microcopie");
      if (!trigger || !content || trigger.dataset.infoReady === "true") return;

      const contentId = content.id || `form-information-${index + 1}`;
      content.id = contentId;
      content.setAttribute("role", "tooltip");
      trigger.dataset.infoReady = "true";
      trigger.setAttribute("role", "button");
      trigger.setAttribute("tabindex", "0");
      trigger.setAttribute("aria-controls", contentId);

      const setOpen = (open) => {
        card.classList.toggle("show", open);
        trigger.setAttribute("aria-expanded", String(open));
        trigger.setAttribute("aria-label", open ? "Hide helpful information" : "Show helpful information");
        content.setAttribute("aria-hidden", String(!open));
      };

      const closeOthers = () => {
        document.querySelectorAll(".div-block-79.show").forEach((other) => {
          if (other === card) return;
          other.classList.remove("show");
          const otherTrigger = other.querySelector(".code-embed-28");
          const otherContent = other.querySelector(".microcopie");
          otherTrigger?.setAttribute("aria-expanded", "false");
          otherTrigger?.setAttribute("aria-label", "Show helpful information");
          otherContent?.setAttribute("aria-hidden", "true");
        });
      };

      if (mobile.matches) {
        setOpen(false);
      } else {
        trigger.removeAttribute("aria-expanded");
        content.removeAttribute("aria-hidden");
      }

      const toggle = (event) => {
        if (!mobile.matches) return;
        event.preventDefault();
        event.stopPropagation();
        const shouldOpen = !card.classList.contains("show");
        closeOthers();
        setOpen(shouldOpen);
      };

      trigger.addEventListener("click", toggle);
      trigger.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") toggle(event);
        if (event.key === "Escape") setOpen(false);
      });
    });
  };

  document.addEventListener("click", (event) => {
    if (!mobile.matches || event.target.closest(".div-block-79")) return;
    document.querySelectorAll(".div-block-79.show").forEach((card) => {
      card.classList.remove("show");
      card.querySelector(".code-embed-28")?.setAttribute("aria-expanded", "false");
      card.querySelector(".code-embed-28")?.setAttribute("aria-label", "Show helpful information");
      card.querySelector(".microcopie")?.setAttribute("aria-hidden", "true");
    });
  });

  mobile.addEventListener?.("change", () => {
    if (mobile.matches) return;
    document.querySelectorAll(".div-block-79").forEach((card) => {
      card.classList.remove("show");
      card.querySelector(".code-embed-28")?.removeAttribute("aria-expanded");
      card.querySelector(".microcopie")?.removeAttribute("aria-hidden");
    });
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeInformationCards, { once: true });
  } else {
    initializeInformationCards();
  }
})();
