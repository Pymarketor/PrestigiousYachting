/* Prestigious Yachting — CMS yacht template footer utilities.
 * The obsolete inline video controller is intentionally excluded; py-yacht-video-safe-v2.js is authoritative.
 */

/* Migrated Webflow footer block 2. */
(() => {
  const setImageDimensions = () => {
    const landscapeSelectors = [
      ".video-container.yacht .video-fallback img",
      ".image-gallery",
      ".image-card-yacht",
      ".image-yacht-card",
      ".image-boat-one-click",
      ".zoom-image"
    ];
    document.querySelectorAll(landscapeSelectors.join(",")).forEach((img) => {
      if (!img.hasAttribute("width")) img.setAttribute("width", "1200");
      if (!img.hasAttribute("height")) img.setAttribute("height", "800");
      if (!img.closest(".video-container.yacht")) {
        img.loading = "lazy";
        img.decoding = "async";
      }
    });
    document.querySelectorAll(
      ".picto-yacht, .shake-on-hover, .guests-picto-filter-bar, .image-11, .picto-menu-navbar.image"
    ).forEach((img) => {
      if (!img.hasAttribute("width")) img.setAttribute("width", "30");
      if (!img.hasAttribute("height")) img.setAttribute("height", "30");
      img.loading = "lazy";
      img.decoding = "async";
    });
  };

  const ensureMainLandmark = () => {
    if (document.querySelector("[role='main']")) return;
    const hero = document.querySelector(".hero-yacht-section");
    if (!hero) return;
    hero.setAttribute("role", "main");
    hero.setAttribute("aria-label", "Yacht charter overview");
  };

  const setLabel = (selector, label) => {
    document.querySelectorAll(selector).forEach((element) => {
      if (!element.getAttribute("aria-label")) element.setAttribute("aria-label", label);
    });
  };

  const applyAccessibility = () => {
    const labels = {
      "#Name": "Yacht name",
      "#Record_ID_Salesforce": "Internal yacht reference",
      "#Guests": "Number of guests",
      "#Adults-b": "Number of adults",
      "#Children-b": "Number of children",
      "#StartDate": "Charter start date",
      "#EndDate": "Charter end date",
      "#StartTime": "Charter start time",
      "#EndTime": "Charter end time",
      "#BoardingLocation": "Boarding location",
      "#Drop-OffLocation": "Drop-off location",
      "#Title": "Title",
      "#FirstName": "First name",
      "#LastName": "Last name",
      "#EmailAdress": "Email address",
      "#PhoneNumber": "Phone number",
      "#AdditionnalNotes": "Additional notes"
    };
    Object.entries(labels).forEach(([selector, label]) => setLabel(selector, label));
    setLabel(".button-previous-month", "Previous month");
    setLabel(".button-next-month", "Next month");
    setLabel(".link-footer[href='/']", "Prestigious Yachting home");
    setLabel(".dropdown-toggle-nav-bar", "Open navigation menu");

    document.querySelectorAll(".fs-combobox_dropdown-toggle").forEach((toggle) => {
      const input = toggle.querySelector("input");
      const label = input?.getAttribute("placeholder") || "Choose a location";
      if (!toggle.getAttribute("aria-label")) toggle.setAttribute("aria-label", label);
    });
    document.querySelectorAll(".fs-combobox_reset").forEach((button) => {
      if (!button.getAttribute("aria-label")) button.setAttribute("aria-label", "Clear selected location");
    });
  };

  const applyAll = () => {
    ensureMainLandmark();
    applyAccessibility();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyAll, { once: true });
  } else {
    applyAll();
  }
  setTimeout(applyAll, 500);
  setTimeout(applyAll, 1500);
})();

/* Migrated Webflow footer block 3. */
(() => {
  const modalSelector = [
    ".f-modal-centre",
    ".f-modal-centre-other",
    ".modal-one-click-request",
    ".modal-favorite-list"
  ].join(",");

  const openerSelector = [
    ".btn-make-a-request-yacht",
    ".all-photos-cta",
    ".open-pop",
    '[open-favorite-modal]',
    '[favorite-modal="trigger"]'
  ].join(",");

  const closeSelector = [
    ".f-modal-close",
    ".wrapper-exit-one-click",
    ".wrapper-exit-favorite-list",
    "[favorite-close]",
    ".background-modal"
  ].join(",");

  let pendingScrollY = null;
  let modalScrollY = null;
  let modalWasOpen = false;
  let restoreToken = 0;

  const isVisible = (element) => {
    if (!element) return false;
    const style = getComputedStyle(element);
    return style.display !== "none" &&
      style.visibility !== "hidden" &&
      Number.parseFloat(style.opacity || "1") > 0;
  };

  const hasOpenModal = () =>
    Array.from(document.querySelectorAll(modalSelector)).some(isVisible);

  const clearForeignScrollLock = () => {
    const html = document.documentElement;
    const body = document.body;

    ["overflow", "box-sizing", "padding-right"].forEach((property) => {
      html.style.removeProperty(property);
    });

    if (body) {
      ["overflow", "position", "top", "left", "right", "width", "padding-right"].forEach((property) => {
        body.style.removeProperty(property);
      });
    }
  };

  const restoreScroll = (targetY, token) => {
    if (token !== restoreToken || hasOpenModal()) return;
    clearForeignScrollLock();
    window.scrollTo({ top: targetY, left: 0, behavior: "auto" });
  };

  const scheduleRestore = () => {
    const targetY = modalScrollY ?? pendingScrollY ?? window.scrollY;
    const token = ++restoreToken;

    [0, 80, 250, 600, 1000].forEach((delay) => {
      setTimeout(() => restoreScroll(targetY, token), delay);
    });

    setTimeout(() => {
      if (token !== restoreToken || hasOpenModal()) return;
      modalScrollY = null;
      pendingScrollY = null;
    }, 1100);
  };

  const syncModalState = () => {
    const isOpen = hasOpenModal();

    if (isOpen && !modalWasOpen) {
      modalWasOpen = true;
      modalScrollY = pendingScrollY ?? window.scrollY;
      pendingScrollY = null;

      clearForeignScrollLock();
      window.scrollTo({ top: modalScrollY, left: 0, behavior: "auto" });
      return;
    }

    if (!isOpen && modalWasOpen) {
      modalWasOpen = false;
      scheduleRestore();
    }
  };

  const captureOpenerScroll = (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target?.closest(openerSelector) || hasOpenModal()) return;
    pendingScrollY = window.scrollY;
  };

  document.addEventListener("pointerdown", captureOpenerScroll, true);
  document.addEventListener("click", (event) => {
    captureOpenerScroll(event);

    const target = event.target instanceof Element ? event.target : null;
    const closeControl = target?.closest(closeSelector);
    if (!closeControl) return;

    if (closeControl.matches('a[href="#"]')) event.preventDefault();
    setTimeout(syncModalState, 0);
    setTimeout(syncModalState, 300);
    setTimeout(syncModalState, 900);
  }, true);

  const modalObserver = new MutationObserver(syncModalState);
  document.querySelectorAll(modalSelector).forEach((modal) => {
    modalObserver.observe(modal, {
      attributes: true,
      attributeFilter: ["class", "style", "hidden", "aria-hidden"]
    });
  });

  modalWasOpen = hasOpenModal();
  syncModalState();
})();

/* Migrated Webflow footer block 4. */
(() => {
  const falseLinkSelectors = [
    'a.fs_selectcustom-1_link-2[href="#"]',
    'a.fs_selectcustom-4_link[href="#"]',
    'a.fs-combobox_option[href="#"]',
    'a[favorite-modal="trigger"][href="#"]',
    'a[open-favorite-modal][href="#"]',
    'a.socialshare__link[href="#"]'
  ].join(",");

  const actionSelectors = [
    ".btn-make-a-request-yacht",
    ".f-modal-close",
    ".wrapper-exit-one-click",
    "[favorite-close]",
    ".open-pop",
    ".forrward-link"
  ].join(",");

  const labelEmptyLinks = () => {
    document.querySelectorAll(".all-photos-cta").forEach((link) => {
      link.setAttribute("aria-label", "Show all yacht photos");
    });
    document.querySelectorAll(".socialshare__link").forEach((control) => {
      control.setAttribute("aria-label", "Copy yacht link");
    });
    document.querySelectorAll(".open-arrow").forEach((link) => {
      if (!link.getAttribute("aria-label")) link.setAttribute("aria-label", "Open yacht details");
    });
    document.querySelectorAll("a").forEach((link) => {
      if ((link.getAttribute("aria-label") || link.textContent || "").trim()) return;
      const imageAlt = link.querySelector('img[alt]:not([alt=""])')?.getAttribute("alt");
      if (imageAlt) {
        link.setAttribute("aria-label", imageAlt);
      } else if (link.getAttribute("href") === "#Gallery") {
        link.setAttribute("aria-label", "Open yacht image gallery");
      } else {
        const href = link.getAttribute("href");
        if (href === "/") {
          link.setAttribute("aria-label", "Prestigious Yachting home");
        } else if (href && href !== "#") {
          const destination = href.split("#")[0].split("?")[0].split("/").filter(Boolean).pop();
          link.setAttribute("aria-label", destination ? `Open ${destination.replace(/-/g, " ")}` : "Open link");
        }
      }
    });
  };

  const normalizeFalseLinks = () => {
    document.querySelectorAll(falseLinkSelectors).forEach((element) => {
      element.removeAttribute("href");
      if (element.matches(".fs_selectcustom-1_link-2, .fs_selectcustom-4_link, .fs-combobox_option")) {
        element.setAttribute("role", "option");
      } else if (element.matches('[favorite-modal="trigger"]')) {
        element.setAttribute("role", "tab");
      } else {
        element.setAttribute("role", "button");
      }
      if (!element.hasAttribute("tabindex")) element.setAttribute("tabindex", "0");
    });

    document.querySelectorAll('a.dropdown-link-nav-bar.is-comming[href="#"]').forEach((element) => {
      element.removeAttribute("href");
      element.setAttribute("aria-disabled", "true");
      element.setAttribute("tabindex", "-1");
    });
  };

  const normalizeComboboxes = () => {
    document.querySelectorAll(".fs-combobox_dropdown-toggle").forEach((toggle) => {
      toggle.removeAttribute("role");
      toggle.removeAttribute("aria-label");
      const root = toggle.closest(".w-dropdown");
      const input = toggle.querySelector('input[role="combobox"]');
      const list = root?.querySelector('[role="listbox"]');
      if (input && list?.id) input.setAttribute("aria-controls", list.id);
    });
  };

  const normalizeActions = () => {
    document.querySelectorAll('[checkbox="checkbox"]').forEach((input) => {
      const service = input.closest("[data-favorite-list]")?.getAttribute("data-favorite-list") || "charter";
      input.setAttribute("aria-label", `Add this yacht to ${service} favorites`);
    });

    document.querySelectorAll(actionSelectors).forEach((element) => {
      if (!element.matches("a,button,input,select,textarea")) {
        element.setAttribute("role", "button");
        if (!element.hasAttribute("tabindex")) element.setAttribute("tabindex", "0");
      }
    });

    document.querySelectorAll(".forrward-link").forEach((element) => {
      if (!element.getAttribute("aria-label")) {
        element.setAttribute("aria-label", "Continue yacht charter request");
      }
    });

    document.querySelectorAll(".card-yacht-gallery").forEach((card) => {
      card.removeAttribute("role");
      card.removeAttribute("tabindex");
      card.removeAttribute("aria-label");
      const control = card.querySelector(".open-pop");
      if (!control) return;
      const alt = card.querySelector("img[alt]")?.getAttribute("alt");
      control.setAttribute("role", "button");
      control.setAttribute("tabindex", "0");
      control.setAttribute("aria-label", alt ? `Open image: ${alt}` : "Open yacht image");
    });
  };

  const applyAgenticNavigation = () => {
    normalizeFalseLinks();
    normalizeComboboxes();
    normalizeActions();
    labelEmptyLinks();
  };

  document.addEventListener("keydown", (event) => {
    if (!["Enter", " "].includes(event.key)) return;
    const control = event.target instanceof Element ? event.target.closest(actionSelectors) : null;
    if (!control || control.matches("a,button,input,select,textarea")) return;
    event.preventDefault();
    control.click();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyAgenticNavigation, { once: true });
  } else {
    applyAgenticNavigation();
  }
  setTimeout(applyAgenticNavigation, 500);
  setTimeout(applyAgenticNavigation, 1500);
})();

/* Migrated Webflow footer block 5. */
(() => {
  const init = () => {
    const root = document.querySelector("[data-py-expanding-gallery]");
    if (!root || root.dataset.pyZoomReady === "true") return;
    const cards = Array.from(root.querySelectorAll("[data-py-expanding-card]"));
    const track = root.querySelector("[data-py-expanding-track]");
    if (!cards.length || !track) return;
    root.dataset.pyZoomReady = "true";

    const rowSize = 5;
    const galleryRows = [];
    for (let start = 0; start < cards.length; start += rowSize) {
      const row = document.createElement("div");
      row.className = "py-gallery-row";
      row.setAttribute("role", "group");
      row.setAttribute("aria-label", "Gallery row " + (galleryRows.length + 1));
      cards.slice(start, start + rowSize).forEach((card) => row.appendChild(card));
      track.appendChild(row);
      galleryRows.push(row);
    }

    const mobileQuery = matchMedia("(max-width: 767px)");
    const syncExpansionLayout = () => {
      galleryRows.forEach((row) => {
        const rowCards = Array.from(row.querySelectorAll("[data-py-expanding-card]"));
        if (mobileQuery.matches) {
          const rows = rowCards.map((card) =>
            card.dataset.active === "true" ? "minmax(0, 66.666vw)" : "54px"
          ).join(" ");
          if (row.style.gridTemplateColumns !== "1fr") row.style.gridTemplateColumns = "1fr";
          if (row.style.gridTemplateRows !== rows) row.style.gridTemplateRows = rows;
        } else {
          const columns = rowCards.map((card) =>
            card.dataset.active === "true" ? "5fr" : "1fr"
          ).join(" ");
          if (row.style.gridTemplateColumns !== columns) row.style.gridTemplateColumns = columns;
          if (row.style.gridTemplateRows !== "1fr") row.style.gridTemplateRows = "1fr";
        }
      });
    };

    const activeObserver = new MutationObserver(syncExpansionLayout);
    cards.forEach((card) => activeObserver.observe(card, {
      attributes: true,
      attributeFilter: ["data-active"]
    }));
    if (typeof mobileQuery.addEventListener === "function") {
      mobileQuery.addEventListener("change", syncExpansionLayout);
    }
    syncExpansionLayout();

    const dialog = document.createElement("dialog");
    dialog.className = "py-gallery-dialog";
    dialog.setAttribute("aria-label", "Yacht photo viewer");
    dialog.innerHTML =
      '<button class="py-gallery-dialog__close py-icon-wrap is-glass" type="button" aria-label="Close photo viewer"><span class="py-icon" data-py-icon="cross"></span></button>' +
      '<button class="py-gallery-dialog__nav py-gallery-dialog__nav--prev py-icon-wrap is-glass" type="button" aria-label="Previous photo"><span class="py-icon" data-py-icon="chevron-left"></span></button>' +
      '<img class="py-gallery-dialog__image" alt="">' +
      '<button class="py-gallery-dialog__nav py-gallery-dialog__nav--next py-icon-wrap is-glass" type="button" aria-label="Next photo"><span class="py-icon" data-py-icon="chevron-right"></span></button>';
    document.body.appendChild(dialog);

    const dialogImage = dialog.querySelector(".py-gallery-dialog__image");
    const closeButton = dialog.querySelector(".py-gallery-dialog__close");
    const previousButton = dialog.querySelector(".py-gallery-dialog__nav--prev");
    const nextButton = dialog.querySelector(".py-gallery-dialog__nav--next");
    let activeIndex = 0;
    let returnFocus = null;

    const setDialogImage = (index) => {
      activeIndex = (index + cards.length) % cards.length;
      const sourceImage = cards[activeIndex].querySelector("[data-py-gallery-image], img");
      if (!sourceImage) return;
      dialogImage.src = sourceImage.currentSrc || sourceImage.src;
      dialogImage.alt = sourceImage.alt || "Yacht gallery photo";
    };

    const openViewer = (index, trigger) => {
      returnFocus = trigger;
      setDialogImage(index);
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
      closeButton.focus({ preventScroll: true });
    };

    const closeViewer = () => {
      if (dialog.open && typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    };

    cards.forEach((card, index) => {
      const image = card.querySelector("[data-py-gallery-image], img");
      if (image) {
        image.style.borderRadius = "0";
        image.setAttribute("draggable", "false");
      }
      const zoom = document.createElement("button");
      zoom.type = "button";
      zoom.className = "py-gallery-zoom";
      zoom.setAttribute("aria-label", image && image.alt ? "Enlarge image: " + image.alt : "Enlarge gallery image");
      zoom.classList.add("py-icon-wrap", "is-glass");
      zoom.innerHTML = '<span class="py-icon" data-py-icon="expand" aria-hidden="true"></span>';
      zoom.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openViewer(index, zoom);
      });
      card.appendChild(zoom);
    });

    closeButton.addEventListener("click", closeViewer);
    previousButton.addEventListener("click", () => setDialogImage(activeIndex - 1));
    nextButton.addEventListener("click", () => setDialogImage(activeIndex + 1));
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeViewer();
    });
    dialog.addEventListener("close", () => {
      dialogImage.removeAttribute("src");
      if (returnFocus && document.contains(returnFocus)) returnFocus.focus({ preventScroll: true });
    });
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setDialogImage(activeIndex - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setDialogImage(activeIndex + 1);
      }
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
  setTimeout(init, 600);
  setTimeout(init, 1600);
})();

/* Migrated Webflow footer block 6. */
(() => {
  const applyMediaAndSemantics = () => {
    document.querySelectorAll(".image-gallery, .image-card-yacht, .image-yacht-card").forEach((image) => {
      image.setAttribute("decoding", "async");
      if (!image.closest(".video-fallback")) {
        image.setAttribute("loading", "lazy");
        image.setAttribute("fetchpriority", "low");
      }
    });

    document.querySelectorAll("a.wrapper-image-gallery").forEach((link, index) => {
      const image = link.querySelector("img");
      const description = image?.getAttribute("alt")?.trim();
      link.setAttribute("aria-label", "Open yacht gallery");
    });

    document.querySelectorAll("[data-py-expanding-gallery]").forEach((gallery) => {
      gallery.setAttribute("role", "region");
      gallery.setAttribute("aria-label", "Yacht photo gallery");
      const track = gallery.querySelector("[data-py-expanding-track]");
      if (track) {
        track.setAttribute("role", "presentation");
        track.removeAttribute("aria-label");
      }
      gallery.querySelectorAll(".py-gallery-row").forEach((row) => {
        row.setAttribute("role", "group");
      });
      gallery.querySelectorAll("[data-py-expanding-card]").forEach((card, index) => {
        const image = card.querySelector("[data-py-gallery-image], img");
        const description = image?.getAttribute("alt")?.trim();
        card.setAttribute("role", "group");
        card.removeAttribute("aria-pressed");
        card.removeAttribute("tabindex");
        card.setAttribute("aria-label", description ? `Expand image: ${description}` : `Expand yacht gallery image ${index + 1}`);
      });
    });

    document.querySelectorAll('[data-slider-track][instance="similar"], .track-slider-similar-yacht').forEach((track) => {
      track.setAttribute("role", "region");
      track.setAttribute("aria-roledescription", "carousel");
      track.setAttribute("aria-label", "Similar yachts");
      track.querySelectorAll('[data-slider-slide][instance="similar"], .cms_list-item.similar').forEach((slide) => {
        slide.setAttribute("role", "group");
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyMediaAndSemantics, { once: true });
  } else {
    applyMediaAndSemantics();
  }
  setTimeout(applyMediaAndSemantics, 700);
  setTimeout(applyMediaAndSemantics, 1800);
})();

/* Migrated Webflow footer block 7. */
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const formula = new URLSearchParams(window.location.search).get('formula');
    const select = document.querySelector('[data-formula-select]');

    if (!formula || !select) return;

    const matchingOption = [...select.options].find(
      option => option.value.toLowerCase() === formula.toLowerCase()
    );

    if (!matchingOption) return;

    select.dispatchEvent(new MouseEvent('mousedown', {
      bubbles: true
    }));

    select.value = matchingOption.value;

    select.dispatchEvent(new Event('input', {
      bubbles: true
    }));

    select.dispatchEvent(new Event('change', {
      bubbles: true
    }));

    select.dispatchEvent(new MouseEvent('mouseup', {
      bubbles: true
    }));

    select.dispatchEvent(new MouseEvent('click', {
      bubbles: true
    }));

  }, 100);
});
