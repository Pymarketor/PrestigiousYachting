/* Prestigious Yachting — deferred CMS yacht template bundle
 * Generated from the modular source files listed below.
 * Edit the source modules, then rebuild this bundle.
 */

/* ===== array-cms.js ===== */
function processArrayFields() {
  document.querySelectorAll("[Array]:not([data-array-processed='true'])").forEach(arrayField => {
    const arrayKey = arrayField.getAttribute("Array");
    const rawValue = arrayField.textContent || "";

    const items = rawValue.split(",").map(item => item.trim()).filter(item => item);

    const parent = document.querySelector(`[ArrayParent="${arrayKey}"]`);
    const template = parent?.querySelector(`[ArrayTemplate="${arrayKey}"]`);

    if (!template || !parent || items.length === 0) return;

    items.forEach((value) => {
      const clone = template.cloneNode(true);
      clone.removeAttribute("ArrayTemplate");
      clone.style.display = "block";

      const textTarget = clone.querySelector("[data-array-text]");
      if (textTarget) {
        textTarget.textContent = value;

        // ➕ Si besoin, on peut aussi ajouter fs-list-field + fs-list-value ici
        // textTarget.setAttribute("fs-list-field", "subtopic");
        // textTarget.setAttribute("fs-list-value", value);
      }

      parent.appendChild(clone);
    });

    template.style.display = "none";
    arrayField.setAttribute("data-array-processed", "true");
  });

  // ✅ Recharge Finsweet list-filter à chaque appel
  if (window.fsAttributes && window.fsAttributes.push) {
    window.fsAttributes.push(["list-filter"]);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  processArrayFields();

  document.querySelectorAll('[load="more"]').forEach(link => {
    link.addEventListener("click", () => {
      setTimeout(() => {
        processArrayFields();
      }, 200);
    });
  });
});

;

/* ===== cascade-ready-inputs.js ===== */
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const allBlocks = Array.from(document.querySelectorAll('[input-order]'));

    const groupsMap = {};
    allBlocks.forEach(block => {
      const order = block.getAttribute("input-order");
      if (!groupsMap[order]) groupsMap[order] = [];
      groupsMap[order].push(block);
    });

    const sortedOrders = Object.keys(groupsMap).sort((a, b) => {
      if (a === "last") return 1;
      if (b === "last") return -1;
      return parseFloat(a) - parseFloat(b);
    });

    function isBlockValid(block) {
      const role = block.getAttribute("role");

      if (role === "radiogroup") {
        return !!block.querySelector('input[type="radio"]:checked');
      }

      const inputs = block.querySelectorAll('[input-key]');
      if (inputs.length === 0) return false;

      return Array.from(inputs).every(input => input.value.trim() !== "");
    }

    function isGroupTouched(group) {
      return group.some(b => b.dataset.touched === "true");
    }

    function isGroupValid(group) {
      return group.some(isBlockValid); // ✅ un seul bloc completement rempli suffit
    }

    function markGroupTouched(group) {
      group.forEach(b => b.dataset.touched = "true");
    }

    function checkAndToggleNextGroup(currentIndex) {
      const currentGroup = groupsMap[sortedOrders[currentIndex]];
      const nextGroup = groupsMap[sortedOrders[currentIndex + 1]];
      if (!nextGroup || !currentGroup) return;

      const isTouched = isGroupTouched(currentGroup);
      const isValid = isGroupValid(currentGroup);
      const shouldUnlock = isTouched && isValid;

      nextGroup.forEach(block => {
        block.classList.toggle("not-ready", !shouldUnlock);
      });
    }

    // Initialisation
    sortedOrders.forEach((orderKey, index) => {
      const group = groupsMap[orderKey];

      group.forEach(block => {
        const role = block.getAttribute("role");
        const hasInputKey = !!block.querySelector('[input-key]');

        const trigger = () => {
          markGroupTouched(group);
          checkAndToggleNextGroup(index);
        };

        if (role === "radiogroup") {
          const radios = block.querySelectorAll('input[type="radio"]');
          radios.forEach(radio => radio.addEventListener("change", trigger));
        }

        if (hasInputKey) {
          const inputs = block.querySelectorAll('[input-key]');
          inputs.forEach(input => input.addEventListener("input", trigger));
          block.addEventListener("click", trigger);
        } else {
          block.addEventListener("click", () => {
            block.dataset.touched = "true";
          });
        }
      });
    });
  }, 100);
});

;

/* ===== yacht-template-footer.js ===== */
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

;

/* ===== yacht-spec-icons-svg.js ===== */
(() => {
  "use strict";

  const STYLE_ID = "py-yacht-spec-svg-icons-style";
  const ICON_CLASS = "py-spec-icon";

  const icons = {
    guests: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M16 20v-1.2a4.8 4.8 0 0 0-9.6 0V20"></path>
        <path d="M20.5 20v-1a3.7 3.7 0 0 0-2.7-3.55"></path>
        <path d="M3.5 20v-1a3.7 3.7 0 0 1 2.7-3.55"></path>
        <circle cx="11.2" cy="8.2" r="3.2"></circle>
        <path d="M17.7 11.4a2.75 2.75 0 0 0 .05-5.3"></path>
        <path d="M4.95 11.4a2.75 2.75 0 0 1-.05-5.3"></path>
      </svg>
    `,
    length: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 12h16"></path>
        <path d="m8 8-4 4 4 4"></path>
        <path d="m16 8 4 4-4 4"></path>
      </svg>
    `,
    sleeping: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 11V6.8A1.8 1.8 0 0 1 5.8 5h12.4A1.8 1.8 0 0 1 20 6.8V11"></path>
        <path d="M4 19v-5.2A1.8 1.8 0 0 1 5.8 12h12.4a1.8 1.8 0 0 1 1.8 1.8V19"></path>
        <path d="M4 16h16"></path>
        <path d="M7 12V9.7A1.7 1.7 0 0 1 8.7 8h2.1a1.7 1.7 0 0 1 1.7 1.7V12"></path>
      </svg>
    `,
    cabin: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6 20V5.8A1.8 1.8 0 0 1 7.8 4h8.4A1.8 1.8 0 0 1 18 5.8V20"></path>
        <path d="M4.5 20h15"></path>
        <path d="M14.5 12h.01"></path>
      </svg>
    `,
    crew: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M7.5 9.2a4.5 4.5 0 0 1 9 0"></path>
        <path d="M5.8 9.2h12.4"></path>
        <circle cx="12" cy="12.4" r="3.6"></circle>
        <path d="M6.5 20a5.8 5.8 0 0 1 11 0"></path>
      </svg>
    `,
    builder: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M14.7 5.3 18.7 9"></path>
        <path d="M15.6 4.4a2.5 2.5 0 0 0-3.55 0l-7.2 7.2a2 2 0 0 0-.55 1.05l-.8 4.85 4.85-.8a2 2 0 0 0 1.05-.55l7.2-7.2a2.5 2.5 0 0 0 0-3.55z"></path>
        <path d="M13 7 17 11"></path>
      </svg>
    `,
    engine: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M8 8h7.2l2.8 3v5.2A1.8 1.8 0 0 1 16.2 18H8.8A1.8 1.8 0 0 1 7 16.2V10a2 2 0 0 1 1-2z"></path>
        <path d="M10 8V5.5"></path>
        <path d="M8.5 5.5h5"></path>
        <path d="M4 13h3"></path>
        <path d="M18 13h2"></path>
        <path d="M10 12h4"></path>
      </svg>
    `,
    speed: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5.2 18a8 8 0 1 1 13.6 0"></path>
        <path d="M12 18l3.4-6"></path>
        <path d="M8.2 13.2h.01"></path>
        <path d="M12 10.5h.01"></path>
        <path d="M16 13.2h.01"></path>
      </svg>
    `,
    fuel: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M13.5 3.8s4.5 4.7 4.5 9a6 6 0 0 1-12 0c0-4.3 4.5-9 4.5-9a2 2 0 0 1 3 0z"></path>
        <path d="M9.5 15.2a2.8 2.8 0 0 0 3.8 1.5"></path>
      </svg>
    `
  };

  const installStyles = () => {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .${ICON_CLASS} {
        box-sizing: border-box;
        display: inline-flex;
        width: 1.35rem;
        min-width: 1.35rem;
        height: 1.35rem;
        min-height: 1.35rem;
        align-items: center;
        justify-content: center;
        color: currentColor;
        opacity: .72;
        flex: none;
      }

      .${ICON_CLASS} svg {
        display: block;
        width: 100%;
        height: 100%;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.75;
        stroke-linecap: round;
        stroke-linejoin: round;
        vector-effect: non-scaling-stroke;
      }

      .wrapper-specs-yacht .${ICON_CLASS} {
        width: 1.55rem;
        min-width: 1.55rem;
        height: 1.55rem;
        min-height: 1.55rem;
        opacity: .68;
      }
    `;
    document.head.appendChild(style);
  };

  const iconFromImage = (image) => {
    const src = image.getAttribute("src") || "";
    if (src.includes("icon-yacht-guests-avatars")) return "guests";
    if (src.includes("lenght-picto")) return "length";
    if (src.includes("sleeping-picto")) return "sleeping";
    if (src.includes("cabin-picto")) return "cabin";
    if (src.includes("crew-picto")) return "crew";
    if (src.includes("builder-picto")) return "builder";
    if (src.includes("engine-picto")) return "engine";
    if (src.includes("speed-picto")) return "speed";
    if (src.includes("fuel-picto")) return "fuel";
    return "";
  };

  const replaceImage = (image) => {
    if (!(image instanceof HTMLImageElement) || image.dataset.pySvgIcon === "true") return;
    const name = iconFromImage(image);
    if (!name || !icons[name]) return;

    const wrapper = document.createElement("span");
    wrapper.className = `${ICON_CLASS} ${image.className || ""}`.trim();
    wrapper.dataset.pyIcon = name;
    wrapper.setAttribute("aria-hidden", "true");
    wrapper.innerHTML = icons[name];
    image.dataset.pySvgIcon = "true";
    image.replaceWith(wrapper);
  };

  const boot = () => {
    installStyles();
    document
      .querySelectorAll("img.picto-yacht, img.guests-picto-filter-bar, img[src*='-picto.avif'], img[src*='icon-yacht-guests-avatars.avif']")
      .forEach(replaceImage);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

  window.addEventListener("load", boot, { once: true });
  setTimeout(boot, 800);
  setTimeout(boot, 1800);
})();

;

/* ===== yacht-feature-icons.js ===== */
(() => {
  "use strict";

  const STYLE_ID = "py-yacht-feature-icons-style";
  const ROOT_SELECTOR = ".fs_accordion-1_item";
  const FEATURE_SELECTOR = ".wrapper-features .features";
  const ICON_CLASS = "py-feature-icon";

  const icons = {
    check: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="m5 12.5 4.2 4.2L19 7"></path>
      </svg>
    `,
    wave: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M3 15.5c2.2-1.7 4.3-1.7 6.5 0s4.3 1.7 6.5 0 4.3-1.7 6.5 0"></path>
        <path d="M3 19c2.2-1.7 4.3-1.7 6.5 0s4.3 1.7 6.5 0 4.3-1.7 6.5 0"></path>
      </svg>
    `,
    platform: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 14h11.5a3.5 3.5 0 0 0 3.2-2.1L20 9"></path>
        <path d="M5.5 14 7 9h8"></path>
        <path d="M5 18h14"></path>
        <path d="M8 14v4"></path>
        <path d="M16 14v4"></path>
      </svg>
    `,
    stabilizer: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 14c2.2-1.6 4.4-1.6 6.5 0 2.2 1.6 4.4 1.6 6.5 0 1-.75 2-1.15 3-1.2"></path>
        <path d="M7.5 9.5 12 5l4.5 4.5"></path>
        <path d="M12 5v13"></path>
        <path d="m8.5 16.5 3.5 2 3.5-2"></path>
      </svg>
    `,
    seabob: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 15.5c2.1-1.45 4.1-1.45 6.2 0 2 1.4 4 1.4 6 0 1.25-.85 2.5-1.18 3.8-1"></path>
        <path d="M8 11.8h6.9a2.8 2.8 0 0 0 2.25-1.12L19 8.2H9.4A3.4 3.4 0 0 0 6 11.6v.2z"></path>
        <path d="m11.7 7.2-1.2 2.4"></path>
      </svg>
    `,
    snorkel: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4.5 13.5h6.2a2.8 2.8 0 0 0 2.6-1.75l.4-.95a1.8 1.8 0 0 1 1.65-1.1H19"></path>
        <path d="M5.4 13.5a3.2 3.2 0 0 0 6.15 0"></path>
        <path d="M19 9.7V5.4a1.4 1.4 0 0 1 1.4-1.4h.8"></path>
        <path d="M4 17.8c2.2-1.25 4.3-1.25 6.5 0s4.3 1.25 6.5 0"></path>
      </svg>
    `,
    paddle: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M6 18 18 6"></path>
        <path d="M16.8 4.2a2.4 2.4 0 0 1 3.4 3.4l-2.2 2.2-3.4-3.4z"></path>
        <path d="M7.2 19.8a2.4 2.4 0 0 1-3.4-3.4L6 14.2l3.4 3.4z"></path>
      </svg>
    `,
    wifi: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4.8 9.3a10.4 10.4 0 0 1 14.4 0"></path>
        <path d="M7.8 12.4a6 6 0 0 1 8.4 0"></path>
        <path d="M10.5 15.5a2.2 2.2 0 0 1 3 0"></path>
        <path d="M12 18.5h.01"></path>
      </svg>
    `,
    sound: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5 10v4h3.2L13 18.2V5.8L8.2 10z"></path>
        <path d="M16 9.4a4 4 0 0 1 0 5.2"></path>
        <path d="M18.7 7a7.6 7.6 0 0 1 0 10"></path>
      </svg>
    `,
    wind: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 8h10.5a2.5 2.5 0 1 0-2.2-3.7"></path>
        <path d="M4 12h15.5a2.5 2.5 0 1 1-2.2 3.7"></path>
        <path d="M4 16h7"></path>
      </svg>
    `,
    roof: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 8h16"></path>
        <path d="M6.5 8v7.5A2.5 2.5 0 0 0 9 18h6a2.5 2.5 0 0 0 2.5-2.5V8"></path>
        <path d="M8.5 11h7"></path>
        <path d="M10 14h4"></path>
        <path d="m18 4 2 2-2 2"></path>
      </svg>
    `,
    tender: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 13.2h16l-1.8 3.2a3.1 3.1 0 0 1-2.7 1.6h-7a3.1 3.1 0 0 1-2.7-1.6z"></path>
        <path d="M7.2 13.2 9 8h6l1.8 5.2"></path>
        <path d="M4 20c2-1.2 4-1.2 6 0s4 1.2 6 0 4-1.2 6 0"></path>
      </svg>
    `,
    sun: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="3.6"></circle>
        <path d="M12 3.5v2"></path>
        <path d="M12 18.5v2"></path>
        <path d="M3.5 12h2"></path>
        <path d="M18.5 12h2"></path>
        <path d="m6 6 1.4 1.4"></path>
        <path d="m16.6 16.6 1.4 1.4"></path>
        <path d="m18 6-1.4 1.4"></path>
        <path d="m7.4 16.6-1.4 1.4"></path>
      </svg>
    `,
    shade: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 11.5c2.4-4.6 13.6-4.6 16 0"></path>
        <path d="M5.3 11.4h13.4"></path>
        <path d="M12 11.5V20"></path>
        <path d="M12 20h3.2"></path>
        <path d="M7.8 11.5c.5-2.2 1.9-3.4 4.2-3.4s3.7 1.2 4.2 3.4"></path>
      </svg>
    `,
    light: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M9 18h6"></path>
        <path d="M10 21h4"></path>
        <path d="M8.5 14.5a5 5 0 1 1 7 0c-.8.8-1.2 1.5-1.35 2.5h-4.3c-.15-1-.55-1.7-1.35-2.5z"></path>
        <path d="M4 11h1.2"></path>
        <path d="M18.8 11H20"></path>
        <path d="m5.8 5.8.85.85"></path>
        <path d="m17.35 6.65.85-.85"></path>
      </svg>
    `,
    generator: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5.5 8.5h13A1.5 1.5 0 0 1 20 10v6.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5V10a1.5 1.5 0 0 1 1.5-1.5z"></path>
        <path d="M8 8.5V6h8v2.5"></path>
        <path d="m12.6 11-2.1 3h3l-2.1 3"></path>
        <path d="M17 12.5h.01"></path>
      </svg>
    `,
    design: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 3.5 14.65 9l5.85.85-4.25 4.15 1 5.8L12 17l-5.25 2.8 1-5.8L3.5 9.85 9.35 9z"></path>
      </svg>
    `,
    ice: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 3v18"></path>
        <path d="m7 5.5 5 3 5-3"></path>
        <path d="m7 18.5 5-3 5 3"></path>
        <path d="m4.5 8.5 15 7"></path>
        <path d="m19.5 8.5-15 7"></path>
      </svg>
    `
  };

  const featureIcons = new Map([
    ["forward sunpad", "sun"],
    ["hydraulic platform", "platform"],
    ["air conditioning", "wind"],
    ["stabilizers", "stabilizer"],
    ["audio system", "sound"],
    ["wi fi", "wifi"],
    ["wifi", "wifi"],
    ["electric roof", "roof"],
    ["courtesy lighting", "light"],
    ["t top", "shade"],
    ["bimini", "shade"],
    ["generator", "generator"],
    ["unique design", "design"]
  ]);

  const installStyles = () => {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      ${FEATURE_SELECTOR}.has-py-feature-icon {
        display: inline-flex !important;
        flex-direction: row !important;
        flex-wrap: nowrap !important;
        gap: .425rem !important;
        align-items: center !important;
        justify-content: center !important;
        width: auto !important;
        min-width: 0 !important;
        height: auto !important;
        min-height: 0 !important;
        white-space: nowrap;
        line-height: 1.2 !important;
        padding-top: .58rem !important;
        padding-bottom: .58rem !important;
      }

      .${ICON_CLASS} {
        display: inline-flex;
        width: .95rem;
        min-width: .95rem;
        height: .95rem;
        min-height: .95rem;
        align-items: center;
        justify-content: center;
        color: currentColor;
        opacity: .62;
        flex: none;
      }

      ${FEATURE_SELECTOR}.has-py-feature-icon [data-array-text] {
        display: inline !important;
        width: auto !important;
        min-width: 0 !important;
        margin: 0 !important;
        white-space: nowrap;
        line-height: inherit !important;
      }

      .${ICON_CLASS} svg {
        display: block;
        width: 100%;
        height: 100%;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.7;
        stroke-linecap: round;
        stroke-linejoin: round;
        vector-effect: non-scaling-stroke;
      }
    `;
    document.head.appendChild(style);
  };

  const normalizeLabel = (label) => label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[-_/]+/g, " ")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const getIcon = (label) => featureIcons.get(normalizeLabel(label)) || "";

  const decorateFeature = (feature) => {
    if (!(feature instanceof HTMLElement)) return;
    const textNode = feature.querySelector("[data-array-text]") || feature;
    const label = (textNode.textContent || "").replace(/\s+/g, " ").trim();
    if (!label || label === "*" || feature.dataset.pyFeatureIconReady === "true") return;

    const iconName = getIcon(label);
    if (!iconName || !icons[iconName]) return;

    const icon = document.createElement("span");
    icon.className = ICON_CLASS;
    icon.dataset.pyFeatureIcon = iconName;
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = icons[iconName];
    feature.prepend(icon);
    feature.classList.add("has-py-feature-icon");
    feature.dataset.pyFeatureIconReady = "true";
  };

  const getFeatureItems = () => {
    const items = Array.from(document.querySelectorAll(ROOT_SELECTOR)).filter((item) => {
      const label = item.querySelector(".fs_accordion-1_label");
      return /\bfeatures\b/i.test(label?.textContent || "");
    });
    return items.flatMap((item) => Array.from(item.querySelectorAll(FEATURE_SELECTOR)));
  };

  const boot = () => {
    installStyles();
    getFeatureItems().forEach(decorateFeature);
  };

  const observe = (wrapper) => {
    const observer = new MutationObserver(boot);
    observer.observe(wrapper, { childList: true, subtree: true, characterData: true });
  };

  const bootWhenNearViewport = () => {
    const wrappers = Array.from(document.querySelectorAll(".wrapper-features"));
    if (!wrappers.length) return;

    if (!("IntersectionObserver" in window)) {
      boot();
      wrappers.forEach(observe);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        installStyles();
        Array.from(entry.target.querySelectorAll(FEATURE_SELECTOR)).forEach(decorateFeature);
        observe(entry.target);
      });
    }, { rootMargin: "500px 0px" });

    wrappers.forEach((wrapper) => observer.observe(wrapper));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootWhenNearViewport, { once: true });
  } else {
    bootWhenNearViewport();
  }
})();

;

/* ===== yacht-mobile-info-fix.js ===== */
(() => {
  const style = document.createElement("style");
  style.dataset.uxFix = "mobile-info-v2";
  style.textContent =
    "@media(max-width:767px){html body .div-block-79{width:44px!important;max-width:44px!important;height:44px!important;padding:0!important;overflow:visible!important}html body .div-block-79 .code-embed-28{inset:0!important;width:44px!important;height:44px!important;z-index:20!important}html body .div-block-79 .code-embed-28 svg{width:18px!important;height:18px!important}html body .div-block-79.show{width:auto!important;max-width:none!important;height:auto!important;padding:12px 52px 12px 12px!important;z-index:30!important}html body .div-block-79.show .code-embed-28{inset:0 0 auto auto!important}}";
  document.head.append(style);

  const mobile = matchMedia("(max-width:767px)");
  const cards = () => [...document.querySelectorAll(".div-block-79")];

  const setOpen = (card, open) => {
    const trigger = card.querySelector(".code-embed-28");
    const content = card.querySelector(".microcopie");
    card.classList.toggle("show", open);
    trigger?.setAttribute("aria-expanded", String(open));
    trigger?.setAttribute(
      "aria-label",
      open ? "Hide helpful information" : "Show helpful information"
    );
    content?.setAttribute("aria-hidden", String(!open));
  };

  const sync = () => {
    cards().forEach((card, index) => {
      const trigger = card.querySelector(".code-embed-28");
      const content = card.querySelector(".microcopie");
      if (!trigger || !content) return;

      content.id = content.id || `form-information-${index + 1}`;
      trigger.setAttribute("role", "button");
      trigger.setAttribute("tabindex", "0");
      trigger.setAttribute("aria-controls", content.id);

      if (mobile.matches) {
        setOpen(card, false);
      } else {
        card.classList.remove("show");
        trigger.removeAttribute("aria-expanded");
        content.removeAttribute("aria-hidden");
      }
    });
  };

  document.addEventListener(
    "click",
    (event) => {
      const trigger =
        event.target instanceof Element &&
        event.target.closest(".div-block-79 .code-embed-28");
      if (!trigger || !mobile.matches) return;

      event.stopImmediatePropagation();
      const card = trigger.closest(".div-block-79");
      const shouldOpen = !card.classList.contains("show");
      cards().forEach((item) => setOpen(item, false));
      if (shouldOpen) setOpen(card, true);
    },
    true
  );

  mobile.addEventListener?.("change", sync);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", sync, { once: true });
  } else {
    sync();
  }
})();

;

/* ===== yacht-info-stack-fix.js ===== */
(()=>{if(document.querySelector('style[data-info-stack-fix]'))return;const s=document.createElement('style');s.dataset.infoStackFix='1';s.textContent=`@media screen and (max-width:767px){.div-block-78:has(>.div-block-79.show){height:108px!important;min-height:108px!important;overflow:visible!important;position:relative!important}.wrapper-time-request:has(.div-block-79.show),.wrapper-datepicker-request:has(.div-block-79.show){height:auto!important;min-height:0!important;overflow:visible!important}.time-request-global:has(.div-block-79.show),.dates-request-global:has(.div-block-79.show){height:auto!important;min-height:0!important;overflow:visible!important;position:relative!important;z-index:2!important}.boarding-request-global{position:relative;z-index:1}`;document.head.append(s)})();

;

/* ===== yacht-expanding-gallery.js ===== */
(()=>{const root=document.querySelector("[data-py-expanding-gallery]");if(!root)return;const styleId="py-expanding-gallery-css";if(!document.getElementById(styleId)){const style=document.createElement("style");style.id=styleId;style.textContent='[data-py-expanding-gallery]{box-sizing:border-box;width:100%;padding:1.125rem 6.25svw 0}[data-py-expanding-track]{display:grid;gap:.75rem;width:100%;height:clamp(28rem,42vw,34rem);margin:0;padding:0;list-style:none;transition:grid-template-columns .45s cubic-bezier(.22,1,.36,1),grid-template-rows .45s cubic-bezier(.22,1,.36,1)}[data-py-expanding-card]{position:relative;min-width:0;min-height:0;overflow:hidden;border-radius:2rem;cursor:pointer;isolation:isolate;box-shadow:2px 4px 12px #00000024;outline:none;background:#e8e8e8}[data-py-expanding-card]::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(180deg,transparent 55%,rgba(0,0,0,.2));opacity:.55;transition:opacity .3s ease}[data-py-expanding-card][data-active="true"]::after{opacity:.15}[data-py-expanding-card]:focus-visible{outline:3px solid #3493ff;outline-offset:3px}[data-py-gallery-image]{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scale(1.045);filter:saturate(.78);transition:transform .45s cubic-bezier(.22,1,.36,1),filter .35s ease}[data-py-expanding-card][data-active="true"] [data-py-gallery-image]{transform:scale(1);filter:saturate(1)}.py-gallery-legacy-hidden{display:none!important}@media screen and (max-width:767px){[data-py-expanding-gallery]{padding-left:1.125rem;padding-right:1.125rem}[data-py-expanding-track]{height:clamp(34rem,75svh,42rem);grid-template-columns:1fr!important}[data-py-expanding-card]{border-radius:1.25rem}}@media(prefers-reduced-motion:reduce){[data-py-expanding-track],[data-py-gallery-image]{transition:none!important}}';document.head.appendChild(style)}const setup=()=>{const track=root.querySelector("[data-py-expanding-track]"),cards=[...root.querySelectorAll("[data-py-expanding-card]")];if(!track||!cards.length){root.hidden=true;return false}root.hidden=false;root.dataset.ready="true";const legacy=[...root.parentElement.children].find(el=>el!==root&&el.classList&&el.classList.contains("slider-gallery"));legacy?.classList.add("py-gallery-legacy-hidden");let active=0;const desktop=matchMedia("(min-width:768px)");const render=()=>{cards.forEach((card,index)=>{const isActive=index===active;card.dataset.active=String(isActive);card.setAttribute("aria-pressed",String(isActive))});if(desktop.matches){track.style.gridTemplateColumns=cards.map((_,index)=>index===active?"5fr":"1fr").join(" ");track.style.gridTemplateRows="1fr"}else{track.style.gridTemplateColumns="1fr";track.style.gridTemplateRows=cards.map((_,index)=>index===active?"5fr":"1fr").join(" ")}};const activate=index=>{active=Math.max(0,Math.min(index,cards.length-1));render()};cards.forEach((card,index)=>{card.addEventListener("pointerenter",event=>{if(event.pointerType==="mouse")activate(index)},{passive:true});card.addEventListener("click",()=>activate(index));card.addEventListener("focus",()=>activate(index));card.addEventListener("keydown",event=>{let next=null;if(event.key==="ArrowRight"||event.key==="ArrowDown")next=(index+1)%cards.length;if(event.key==="ArrowLeft"||event.key==="ArrowUp")next=(index-1+cards.length)%cards.length;if(event.key==="Home")next=0;if(event.key==="End")next=cards.length-1;if(event.key==="Enter"||event.key===" "){event.preventDefault();activate(index);return}if(next!==null){event.preventDefault();activate(next);cards[next].focus({preventScroll:true})}})});desktop.addEventListener?.("change",render);render();return true};if(!setup()){const observer=new MutationObserver(()=>{if(setup())observer.disconnect()});observer.observe(root,{childList:true,subtree:true});setTimeout(()=>observer.disconnect(),5000)}})();

;

/* ===== py-gallery-design-override.js ===== */
(()=>{const css=`[data-py-expanding-gallery]{box-sizing:border-box!important;width:100vw!important;padding-left:.675rem!important;padding-right:.675rem!important;overflow:hidden!important;border-radius:0!important}[data-py-expanding-track],.py-gallery-row{gap:.675rem!important}[data-py-expanding-card]{position:relative!important;overflow:hidden!important;border-radius:.675rem!important;isolation:isolate!important}[data-py-expanding-card] img,[data-py-gallery-image]{border-radius:.675rem!important;clip-path:inset(0 round .675rem)!important}.py-gallery-zoom{position:absolute!important;right:.875rem!important;bottom:.875rem!important;z-index:10!important;display:flex!important;align-items:center!important;justify-content:center!important;width:40px!important;height:40px!important;min-width:40px!important;min-height:40px!important;padding:0!important;border:0!important;border-radius:1600px!important;color:#333!important;background:rgba(255,255,255,.5)!important;box-shadow:rgba(0,0,0,.07) 2px 4px 12px 0,rgba(0,0,0,.11) 0 0 1px 0 inset!important;backdrop-filter:blur(10px)!important;-webkit-backdrop-filter:blur(10px)!important;opacity:0!important;transform:scale(.96)!important;cursor:pointer!important;transition:opacity .18s ease,transform .18s ease,background-color .18s ease!important}.py-gallery-zoom svg{display:block!important;width:20px!important;height:20px!important;margin:auto!important;pointer-events:none!important}[data-py-expanding-card]:hover .py-gallery-zoom,[data-py-expanding-card]:focus-within .py-gallery-zoom{opacity:1!important;transform:scale(1)!important}.py-gallery-zoom:hover,.py-gallery-zoom:focus-visible{background:rgba(255,255,255,.65)!important;outline:0!important}.py-gallery-dialog__close,.py-gallery-dialog__nav{position:fixed!important;z-index:2147483000!important;display:flex!important;align-items:center!important;justify-content:center!important;width:44px!important;height:44px!important;min-width:44px!important;min-height:44px!important;padding:0!important;border:0!important;border-radius:1600px!important;color:#333!important;background:rgba(255,255,255,.5)!important;box-shadow:rgba(0,0,0,.07) 2px 4px 12px 0,rgba(0,0,0,.11) 0 0 1px 0 inset!important;backdrop-filter:blur(10px)!important;-webkit-backdrop-filter:blur(10px)!important;font-size:0!important;line-height:1!important;transition:background-color .18s ease!important}.py-gallery-dialog__close svg{display:block!important;width:18px!important;height:18px!important;margin:auto!important;pointer-events:none!important}.py-gallery-dialog__nav svg{display:block!important;width:21px!important;height:21px!important;margin:auto!important;pointer-events:none!important}.py-gallery-dialog__close::before,.py-gallery-dialog__close::after,.py-gallery-dialog__nav::before{content:none!important}.py-gallery-dialog__close{top:max(1rem,env(safe-area-inset-top))!important;right:max(1rem,env(safe-area-inset-right))!important}.py-gallery-dialog__nav{top:50%!important;transform:translateY(-50%)!important}.py-gallery-dialog__nav--prev{left:max(1rem,env(safe-area-inset-left))!important}.py-gallery-dialog__nav--next{right:max(1rem,env(safe-area-inset-right))!important}.py-gallery-dialog__nav--next svg{transform:rotate(180deg)!important}.py-gallery-dialog__close:hover,.py-gallery-dialog__close:focus-visible,.py-gallery-dialog__nav:hover,.py-gallery-dialog__nav:focus-visible{background:rgba(255,255,255,.65)!important;outline:0!important}@media screen and (max-width:767px){[data-py-expanding-gallery]{padding-left:.5rem!important;padding-right:.5rem!important}[data-py-expanding-track],.py-gallery-row{gap:.5rem!important}[data-py-expanding-card],[data-py-expanding-card] img,[data-py-gallery-image]{border-radius:.55rem!important;clip-path:inset(0 round .55rem)!important}.py-gallery-zoom{right:.75rem!important;bottom:.75rem!important;width:38px!important;height:38px!important;min-width:38px!important;min-height:38px!important}.py-gallery-zoom svg{width:18px!important;height:18px!important}.py-gallery-dialog__close,.py-gallery-dialog__nav{width:40px!important;height:40px!important;min-width:40px!important;min-height:40px!important}.py-gallery-dialog__nav svg{width:19px!important;height:19px!important}.py-gallery-dialog__close svg{width:17px!important;height:17px!important}.py-gallery-dialog__nav{top:auto!important;bottom:max(1rem,env(safe-area-inset-bottom))!important;transform:none!important}}`;let s=document.querySelector('style[data-py-gallery-design-override]');if(!s){s=document.createElement('style');s.setAttribute('data-py-gallery-design-override','v5');document.head.appendChild(s)}s.textContent=css;const plus='<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h7m7 0h-7m0 0V5m0 7v7"/></svg>';const chevron='<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1024 1024" aria-hidden="true" focusable="false"><path fill="currentColor" d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0"/></svg>';const close='<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m11.25 4.75-6.5 6.5m0-6.5 6.5 6.5"/></svg>';const apply=()=>{document.querySelectorAll('[data-py-expanding-card]').forEach(c=>{c.style.setProperty('border-radius','.675rem','important');c.style.setProperty('overflow','hidden','important')});document.querySelectorAll('[data-py-expanding-card] img,[data-py-gallery-image]').forEach(i=>{i.style.setProperty('border-radius','.675rem','important');i.style.setProperty('clip-path','inset(0 round .675rem)','important')});document.querySelectorAll('.py-gallery-zoom').forEach(b=>{b.innerHTML=plus});document.querySelectorAll('.py-gallery-dialog__nav').forEach(b=>{b.innerHTML=chevron});document.querySelectorAll('.py-gallery-dialog__close').forEach(b=>{b.innerHTML=close})};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();setTimeout(apply,600);setTimeout(apply,1600)})();

;

/* ===== py-apple-reveal.js ===== */
(()=>{const a="data-apple-reveal",c="py-reveal-ready",v="is-visible",m=matchMedia("(prefers-reduced-motion: reduce)");if(m.matches||!("IntersectionObserver"in window))return;const s=document.createElement("style");s.dataset.pyAppleReveal="v1";s.textContent=`html.${c} [${a}]{opacity:0;transform:translate3d(0,50px,0);transition:opacity 1000ms ease,transform 1000ms ease;will-change:opacity,transform}html.${c} [${a}].${v}{opacity:1;transform:translate3d(0,0,0);will-change:auto}@media(prefers-reduced-motion:reduce){html.${c} [${a}]{opacity:1;transform:none;transition:none}}`;document.head.appendChild(s);const init=()=>{const e=[...document.querySelectorAll(`[${a}]`)];if(!e.length)return;e.forEach(x=>{const r=x.getBoundingClientRect();if(r.top<innerHeight*.9&&r.bottom>0)x.classList.add(v)});document.documentElement.classList.add(c);const o=new IntersectionObserver(n=>n.forEach(i=>{if(!i.isIntersecting)return;i.target.classList.add(v);o.unobserve(i.target)}),{threshold:.01,rootMargin:"0px 0px -10% 0px"});e.forEach(x=>{if(!x.classList.contains(v))o.observe(x)})};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",init,{once:true}):init()})();

;

/* ===== py-included-cards-css.js ===== */
(()=>{let s=document.createElement('style');s.dataset.pyInc='1';s.textContent=".grid-price-included:not(.py-incs),.py-grid-scrollbar{display:none!important}.grid-price-included.py-incs{display:block}.py-inc-track{display:flex;gap:1.25rem;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;scrollbar-width:none}.py-inc-track::-webkit-scrollbar{display:none}.py-inc-card{position:relative;flex:0 0 min(23.25rem,calc(100vw - 3rem));padding:2rem;border-radius:1.75rem;background:#f5f5f7;color:#0f2844;scroll-snap-align:start}.py-inc-card.is-unavailable{opacity:.34;filter:saturate(.25);pointer-events:none}.py-inc-card.is-unavailable:after{content:\"\";position:absolute;inset:0;border-radius:inherit;background:linear-gradient(135deg,rgba(255,255,255,.44),rgba(255,255,255,.78));pointer-events:none}.py-inc-card>*{position:relative;z-index:1}.py-inc-head{padding-bottom:1.35rem;border-bottom:1px solid #0f28441f}.py-inc-k{font-size:.78rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#6e7e91}.py-inc-title{font-size:1.65rem;line-height:1.08;margin:.35rem 0 .7rem;font-weight:650}.py-inc-price{font-size:2rem;line-height:1;font-weight:700}.py-inc-rate{margin-top:.4rem;font-size:.9rem;color:#6e7e91}.py-inc-list{display:grid;gap:.85rem;margin-top:1.3rem}.py-inc-row{display:grid;grid-template-columns:1fr auto;gap:1rem;align-items:center}.py-inc-label{font-size:.95rem;line-height:1.25;color:#34485f}.py-inc-val{width:1.8rem;min-width:1.8rem;height:1.8rem;padding:0;border-radius:50%;display:grid;place-items:center;background:#fff;color:#1e5b96;box-shadow:0 1px 5px #0f28441f;font-weight:700;line-height:1}.py-inc-val svg{display:block;width:1.05rem!important;height:1.05rem!important}.py-inc-val.no{color:#7a8694}.py-inc-val.is-hours{font-size:.95rem}.py-inc-nav{display:flex;justify-content:flex-end;align-items:center;gap:.875rem;margin-top:1.25rem}.py-inc-btn{width:3rem;height:3rem;border:0;border-radius:50%;display:grid;place-items:center;background:#f5f5f7;color:#0f2844;box-shadow:0 10px 28px rgba(15,40,68,.08);cursor:pointer;font-size:1.75rem;line-height:1}.py-inc-btn:disabled{opacity:.35;cursor:default}@media(max-width:767px){.py-inc-track{gap:.75rem;scroll-padding-left:0}.py-inc-card{flex-basis:min(21.5rem,calc(100vw - 4rem));padding:1.35rem 1.45rem;border-radius:1.45rem}.py-inc-k{font-size:.68rem}.py-inc-title{font-size:1.45rem}.py-inc-price{font-size:1.85rem}.py-inc-rate{font-size:.86rem}.py-inc-list{gap:.72rem;margin-top:1.05rem}.py-inc-row{grid-template-columns:minmax(0,1fr) auto}.py-inc-label{font-size:.9rem}.py-inc-val{width:1.65rem;min-width:1.65rem;height:1.65rem}.py-inc-val svg{width:.95rem!important;height:.95rem!important}.py-inc-nav{display:none}.py-incs.has-multiple-active .py-inc-nav{display:flex;justify-content:flex-end;margin-top:1rem;padding-right:.125rem}.py-incs.has-multiple-active .py-inc-btn{width:2.75rem;height:2.75rem;font-size:1.55rem}}@media(prefers-reduced-motion:reduce){.py-inc-track{scroll-behavior:auto}}";document.head.append(s)})()

;

/* ===== py-included-cards.js ===== */
document.addEventListener("DOMContentLoaded",()=>{let g=document.querySelector(".grid-price-included");if(!g||document.querySelector(".py-incs"))return;let c=[...g.children],clean=x=>x.textContent.trim().replace(/\s+/g," ").replace("VATValue","VAT Value"),l=c.slice(2,9),a=(document.querySelector("#available-services-1")?.textContent||"").toLowerCase(),w=document.createElement("div"),ck='<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z"/></svg>';w.className=(g.className+" py-incs").replace(/\s+/g," ").trim();w.innerHTML='<div class="py-inc-track" role="list" aria-label="Charter options and inclusions"></div><div class="py-inc-nav"><button class="py-inc-btn" type="button" aria-label="Previous charter option">‹</button><button class="py-inc-btn" type="button" aria-label="Next charter option">›</button></div>';let t=w.firstChild,items=[["sunset",9],["half-day",18],["day",27]].map(x=>({k:x[0],i:x[1],on:!a||a.includes(x[0])})).sort((x,y)=>y.on-x.on);if(items.filter(x=>x.on).length>1)w.classList.add("has-multiple-active");items.forEach(({i,on})=>{let v=c.slice(i+1,i+9),r=l.map((x,j)=>{let e=v[j+1],z=e.textContent.trim(),n=!!e.querySelector('path[fill="none"]'),h=/^\d+$/.test(z),val=h?z:n?"×":ck;return '<div class="py-inc-row"><span class="py-inc-label">'+clean(x)+'</span><span class="py-inc-val '+(n?"no":"")+(h?" is-hours":"")+'" role="img" aria-label="'+(h?z+" hours":n?"Not included":"Included")+'">'+val+"</span></div>"}).join(""),d=document.createElement("div");d.className="py-inc-card"+(on?"":" is-unavailable");d.setAttribute("role","listitem");if(!on)d.setAttribute("aria-disabled","true");d.innerHTML='<div class="py-inc-head"><div class="py-inc-k">Charter option</div><h3 class="py-inc-title">'+clean(c[i])+'</h3><div class="py-inc-price">'+v[0].textContent.trim()+'</div><div class="py-inc-rate">'+(on?"Charter rates (from)":"Unavailable for this yacht")+'</div></div><div class="py-inc-list">'+r+"</div>";t.append(d)});g.after(w);let b=[...w.querySelectorAll("button")],u=()=>{let m=t.scrollWidth-t.clientWidth;b[0].disabled=t.scrollLeft<3;b[1].disabled=t.scrollLeft>m-3},q=()=>t.firstChild?.offsetWidth+20||392;b[0].onclick=()=>t.scrollBy({left:-q(),behavior:"smooth"});b[1].onclick=()=>t.scrollBy({left:q(),behavior:"smooth"});t.addEventListener("scroll",u,{passive:true});new ResizeObserver(u).observe(t);u()},{once:true});

;

/* ===== yacht-mobile-input-fix.js ===== */
(()=>{const a=()=>{const n={Service:'Charter service',Adults:'Number of adults',Children:'Number of children',Boarding_Location:'Boarding location','Drop-Off_Location':'Drop-off location'};for(const[k,v]of Object.entries(n))document.querySelectorAll(`[name="${k}"],#${CSS.escape(k)}`).forEach(e=>{if(!e.getAttribute('aria-label'))e.setAttribute('aria-label',v)})};document.readyState==='loading'?document.addEventListener('DOMContentLoaded',a,{once:true}):a()})();

;

/* ===== similarsectionv1.js ===== */
(() => {
  "use strict";

  const ROOT_SELECTOR = ":is(.similar-yacht-section, .section-similar-yachts)";
  const CARD_SELECTOR = ".cms_list-item.similar, [data-slider-slide][instance='similar']";
  const STYLE_ID = "py-similar-coverflow-v3-style";
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

  const installStyles = () => {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] {
        --py-cf-card: clamp(280px, 45vw, 720px);
        --py-cf-control: 2.875rem;
        position: relative;
        width: 100%;
        max-width: none !important;
        background: transparent !important;
        overflow: clip;
        isolation: isolate;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] :is(.similar-yacht-container, .container-similar-yachts) {
        box-sizing: border-box;
        width: 100%;
        max-width: none;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .similar-yacht-global {
        width: 100%;
        max-width: none;
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .slider-gallery {
        position: relative;
        display: block;
        box-sizing: border-box;
        width: 100%;
        max-width: none;
        height: auto !important;
        min-height: 0 !important;
        margin: 0 !important;
        padding: 3rem 0 2.5rem;
        gap: 0 !important;
        background: transparent !important;
        overflow: visible;
        outline: none;
        cursor: grab;
        touch-action: pan-y;
        perspective-origin: center center;
        user-select: none;
        -webkit-user-select: none;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .slider-gallery:active {
        cursor: grabbing;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .slider-gallery:focus-visible {
        outline: 2px solid rgba(25, 45, 70, .72);
        outline-offset: -4px;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .collection-list-wrapper-5 {
        display: block !important;
        width: 100%;
        max-width: none !important;
        height: auto !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: visible;
        transform: none !important;
        transform-style: preserve-3d !important;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .track-slider-similar-yacht {
        position: relative;
        display: block;
        box-sizing: border-box;
        width: 100%;
        min-height: 1px;
        margin: 0;
        padding: 0;
        gap: 0 !important;
        scroll-snap-type: none !important;
        scroll-behavior: auto !important;
        scroll-padding: 0 !important;
        transition: none !important;
        overflow: visible;
        transform-style: preserve-3d !important;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .cms_list-item.similar,
      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] [data-slider-slide][instance="similar"] {
        position: absolute !important;
        top: 0 !important;
        left: 50% !important;
        display: block !important;
        flex: none !important;
        box-sizing: border-box !important;
        width: var(--py-cf-card) !important;
        min-width: 0 !important;
        max-width: none !important;
        height: calc(var(--py-cf-card) * .6666667) !important;
        min-height: 0 !important;
        margin: 0 !important;
        scroll-snap-align: none !important;
        overflow: hidden !important;
        border: 0 !important;
        border-radius: 2rem !important;
        background: #f1f2f4 !important;
        box-shadow: 0 18px 42px rgba(18, 32, 50, .18) !important;
        opacity: 0;
        transform-origin: center center;
        transform-style: preserve-3d;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transition: none !important;
        animation: none !important;
        will-change: transform, opacity;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .cms_list-item.similar > .yacht-card-favorite,
      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] [data-slider-slide][instance="similar"] > .yacht-card-favorite,
      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .card-favorite-yacht-image {
        position: relative !important;
        display: block !important;
        flex: none !important;
        width: 100% !important;
        min-width: 100% !important;
        max-width: none !important;
        height: 100% !important;
        min-height: 100% !important;
        max-height: none !important;
        margin: 0 !important;
        overflow: hidden !important;
        border-radius: 1rem !important;
        box-shadow: none !important;
        aspect-ratio: 3 / 2 !important;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .image-yacht-card {
        position: absolute !important;
        inset: 0 !important;
        display: block !important;
        width: 100% !important;
        min-width: 100% !important;
        max-width: none !important;
        height: 100% !important;
        min-height: 100% !important;
        max-height: none !important;
        margin: 0 !important;
        border-radius: 1rem !important;
        object-fit: cover !important;
        object-position: center !important;
        aspect-ratio: 3 / 2 !important;
        transform: none !important;
        pointer-events: none;
        user-select: none;
        -webkit-user-drag: none;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .card-favorite-yacht-image > .forrward-link {
        position: absolute !important;
        inset: 0 !important;
        z-index: 5 !important;
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        opacity: 0 !important;
        cursor: grab !important;
        pointer-events: none !important;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .cms_list-item.similar > .description-yacht-card,
      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] [data-slider-slide][instance="similar"] > .description-yacht-card {
        display: none !important;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .card-favorite-yacht-image > .open-arrow {
        z-index: 12 !important;
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        cursor: pointer !important;
        pointer-events: auto !important;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .slider-padding-start,
      ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .slider-padding-end {
        display: none !important;
      }

      ${ROOT_SELECTOR} .arrow-scroll-left-card-other,
      ${ROOT_SELECTOR} .arrow-scroll-right-card-other {
        position: absolute !important;
        top: 50% !important;
        z-index: 220 !important;
        display: grid !important;
        width: var(--py-cf-control, 2.875rem) !important;
        min-width: var(--py-cf-control, 2.875rem) !important;
        height: var(--py-cf-control, 2.875rem) !important;
        min-height: var(--py-cf-control, 2.875rem) !important;
        padding: .8125rem !important;
        place-items: center !important;
        border: 1px solid rgba(255, 255, 255, .72) !important;
        border-radius: 50% !important;
        color: #1d2938 !important;
        background: rgba(255, 255, 255, .76) !important;
        box-shadow: 0 10px 30px rgba(13, 27, 46, .14) !important;
        backdrop-filter: blur(14px) saturate(125%);
        -webkit-backdrop-filter: blur(14px) saturate(125%);
        transform: translateY(-50%) !important;
        transition: background-color 180ms ease, opacity 180ms ease !important;
        cursor: pointer;
      }

      ${ROOT_SELECTOR} .arrow-scroll-left-card-other {
        left: clamp(.75rem, 3vw, 2.5rem) !important;
      }

      ${ROOT_SELECTOR} .arrow-scroll-right-card-other {
        right: clamp(.75rem, 3vw, 2.5rem) !important;
      }

      ${ROOT_SELECTOR} .arrow-scroll-left-card-other svg {
        transform: none !important;
        transform-origin: center !important;
      }

      ${ROOT_SELECTOR} .arrow-scroll-right-card-other svg {
        transform: rotate(180deg) !important;
        transform-origin: center !important;
      }

      ${ROOT_SELECTOR} .arrow-scroll-left-card-other:hover,
      ${ROOT_SELECTOR} .arrow-scroll-right-card-other:hover {
        background: rgba(255, 255, 255, .96) !important;
      }

      ${ROOT_SELECTOR} .arrow-scroll-left-card-other:focus-visible,
      ${ROOT_SELECTOR} .arrow-scroll-right-card-other:focus-visible {
        outline: 2px solid rgba(25, 45, 70, .78) !important;
        outline-offset: 3px !important;
      }

      ${ROOT_SELECTOR} .arrow-scroll-left-card-other.is-unavailable,
      ${ROOT_SELECTOR} .arrow-scroll-right-card-other.is-unavailable {
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }

      ${ROOT_SELECTOR}[data-py-coverflow-count="0"] .arrow-scroll-left-card-other,
      ${ROOT_SELECTOR}[data-py-coverflow-count="0"] .arrow-scroll-right-card-other,
      ${ROOT_SELECTOR}[data-py-coverflow-count="1"] .arrow-scroll-left-card-other,
      ${ROOT_SELECTOR}[data-py-coverflow-count="1"] .arrow-scroll-right-card-other {
        display: none !important;
      }

      .py-cf-caption {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        min-height: 10rem;
        padding: .125rem 1.5rem 0;
        text-align: center;
        opacity: 0;
        transform: translateY(5px);
        transition: opacity 300ms ease, transform 300ms ease;
      }

      .py-cf-caption.is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      .py-cf-caption__title {
        margin: 0;
        color: #24282f;
        font-size: .9375rem;
        font-weight: 600;
        line-height: 1.2;
      }

      .py-cf-caption__subtitle {
        margin: .35rem 0 0;
        color: rgba(36, 40, 47, .58);
        font-size: .8125rem;
        line-height: 1.3;
      }

      .py-cf-caption__meta {
        display: grid;
        width: 100%;
        max-width: 14.375rem;
        margin: 1.25rem 0 0;
        padding: 0;
        color: #24282f;
        font-size: .75rem;
      }

      .py-cf-caption__row {
        display: flex;
        justify-content: space-between;
        gap: 1.25rem;
        padding: .3125rem 0;
      }

      .py-cf-caption__label {
        display: inline-flex;
        align-items: center;
        gap: .4375rem;
        color: rgba(36, 40, 47, .52);
      }

      .py-cf-caption__icon {
        display: inline-flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        width: 1rem;
        height: 1rem;
        color: rgba(36, 40, 47, .68);
      }

      .py-cf-caption__icon svg {
        display: block;
        width: 100%;
        height: 100%;
        overflow: visible;
      }

      .py-cf-caption__value {
        margin: 0;
        font-weight: 500;
        text-align: right;
      }

      @media screen and (max-width: 767px) {
        ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] {
          --py-cf-card: min(78vw, 390px);
          --py-cf-control: 2.75rem;
        }

        ${ROOT_SELECTOR}[data-py-coverflow-ready="true"] .slider-gallery {
          padding: 2.25rem 0 2rem;
        }

        ${ROOT_SELECTOR} .arrow-scroll-left-card-other {
          left: .625rem !important;
        }

        ${ROOT_SELECTOR} .arrow-scroll-right-card-other {
          right: .625rem !important;
        }

        .py-cf-caption {
          min-height: 9.5rem;
          padding-right: 1rem;
          padding-left: 1rem;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .py-cf-caption,
        ${ROOT_SELECTOR} .arrow-scroll-left-card-other,
        ${ROOT_SELECTOR} .arrow-scroll-right-card-other {
          transition: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  };

  const cleanText = (value) => (value || "")
    .replace(/\s+/g, " ")
    .replace(/From(?=\d)/i, "From ")
    .replace(/(?<=\d)Guests?/i, (match) => " " + match)
    .replace(/\s*\/\s*/g, " / ")
    .trim();

  const initialize = (root) => {
    if (!(root instanceof HTMLElement) || root.dataset.pyCoverflowMounted === "true") return;
    const frame = root.querySelector(".slider-gallery, [slider-instance='similar']");
    const track = root.querySelector(".track-slider-similar-yacht, [data-slider-track][instance='similar']");
    const global = root.querySelector(".similar-yacht-global") || frame?.parentElement;
    const previousControl = root.querySelector(".arrow-scroll-left-card-other");
    const nextControl = root.querySelector(".arrow-scroll-right-card-other");
    if (!(frame instanceof HTMLElement) || !(track instanceof HTMLElement) || !(global instanceof HTMLElement)) return;

    root.dataset.pyCoverflowMounted = "true";
    frame.removeAttribute("data-slider");
    frame.removeAttribute("slider-instance");
    root.querySelectorAll("[data-slider-prev], [data-slider-next]").forEach((control) => {
      control.removeAttribute("data-slider-prev");
      control.removeAttribute("data-slider-next");
    });
    frame.setAttribute("role", "region");
    frame.setAttribute("aria-roledescription", "carousel");
    frame.setAttribute("aria-label", "Similar yacht carousel");
    if (!frame.hasAttribute("tabindex")) frame.tabIndex = 0;

    const caption = document.createElement("div");
    caption.className = "py-cf-caption";
    caption.setAttribute("aria-live", "polite");
    global.appendChild(caption);

    let cards = [];
    let position = 0;
    let target = 0;
    let cardWidth = 0;
    let selected = -1;
    let animationFrame = null;
    let syncFrame = null;
    let drag = null;
    let suppressClick = false;
    let resizeObserver = null;
    let initializedCardCount = 0;

    const rotate = 44;
    const depth = .6;
    const perspective = 3;
    const falloff = .56;
    const fade = .1;
    const gap = -.18;
    const loop = false;

    const indexAt = (value) => cards.length
      ? Math.max(0, Math.min(cards.length - 1, Math.round(value)))
      : 0;

    const normalizePosition = (value) => cards.length
      ? Math.max(0, Math.min(cards.length - 1, value))
      : 0;

    const updateControls = () => {
      const atStart = !cards.length || position <= .001;
      const atEnd = !cards.length || position >= cards.length - 1 - .001;
      [[previousControl, atStart], [nextControl, atEnd]].forEach(([control, unavailable]) => {
        if (!(control instanceof HTMLElement)) return;
        control.classList.toggle("is-unavailable", unavailable);
        control.setAttribute("aria-disabled", String(unavailable));
        control.setAttribute("aria-hidden", String(unavailable));
        control.tabIndex = unavailable ? -1 : 0;
      });
    };

    const createText = (tag, className, text) => {
      const element = document.createElement(tag);
      element.className = className;
      element.textContent = text;
      return element;
    };

    const createSpecificationIcon = (type) => {
      const icon = document.createElement("span");
      icon.className = "py-cf-caption__icon";
      icon.setAttribute("aria-hidden", "true");
      icon.innerHTML = type === "guests"
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m18 8 4 4-4 4M6 8l-4 4 4 4M2 12h20"/></svg>';
      return icon;
    };

    const renderCaption = (index) => {
      const card = cards[index];
      if (!card) return;
      const title = cleanText(
        card.querySelector(".model-yacht-card.similar > [fs-list-field='Model']")?.textContent ||
        card.querySelector(".model-yacht-card.similar")?.firstElementChild?.textContent
      ) || "Yacht charter";
      const price = cleanText(card.querySelector(".wrapper-price-yacht-card")?.textContent);
      const specifications = Array.from(card.querySelectorAll(".wrapper-specifications-yacht-card .specifications-yacht-card"))
        .map((element) => cleanText(element.textContent))
        .filter(Boolean);

      caption.classList.remove("is-visible");
      caption.replaceChildren();
      caption.appendChild(createText("p", "py-cf-caption__title", title));
      if (price) caption.appendChild(createText("p", "py-cf-caption__subtitle", price));

      if (specifications.length) {
        const list = document.createElement("dl");
        list.className = "py-cf-caption__meta";
        specifications.forEach((value, specificationIndex) => {
          const isGuests = /guests?/i.test(value);
          const row = document.createElement("div");
          row.className = "py-cf-caption__row";
          const label = createText("dt", "py-cf-caption__label", isGuests ? "Guests" : specificationIndex === 1 ? "Length" : "Details");
          label.prepend(createSpecificationIcon(isGuests ? "guests" : "length"));
          const normalizedValue = isGuests ? cleanText(value.replace(/guests?/i, "")) : value;
          const detail = createText("dd", "py-cf-caption__value", normalizedValue);
          row.append(label, detail);
          list.appendChild(row);
        });
        caption.appendChild(list);
      }

      requestAnimationFrame(() => caption.classList.add("is-visible"));
    };

    const updateSelection = () => {
      const current = indexAt(position);
      cards.forEach((card, index) => {
        card.setAttribute("aria-current", String(index === current));
        card.setAttribute("aria-label", (index + 1) + " of " + cards.length);
        const imageLink = card.querySelector(".forrward-link[href]");
        const arrowLink = card.querySelector(".open-arrow[href]");
        if (imageLink instanceof HTMLElement) imageLink.tabIndex = -1;
        if (arrowLink instanceof HTMLElement) arrowLink.tabIndex = index === current ? 0 : -1;
      });
      root.dataset.pyCoverflowIndex = String(current);
      if (current !== selected) {
        selected = current;
        renderCaption(current);
      }
      updateControls();
    };

    const paint = () => {
      if (!cards.length || !cardWidth) return;
      const pitch = cardWidth * (1 + gap);

      cards.forEach((card, index) => {
        let offset = index - position;
        if (loop && cards.length > 1) {
          offset = ((offset % cards.length) + cards.length) % cards.length;
          if (offset > cards.length / 2) offset -= cards.length;
        }

        const distance = Math.abs(offset);
        const ramp = Math.pow(distance, falloff);
        const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);
        const edge = !loop || cards.length <= 2
          ? 1
          : Math.min(1, Math.max(0, cards.length / 2 - distance));
        const opacity = Math.max(0, 1 - fade * distance) * edge;

        card.style.transform =
          "translateX(calc(-50% + " + (offset * pitch) + "px)) " +
          "translateZ(" + (-depth * cardWidth * ramp) + "px) " +
          "rotateY(" + (-tilt) + "deg)";
        card.style.opacity = String(opacity);
        card.style.zIndex = String(100 - Math.round(distance));
        card.style.visibility = opacity <= 0 ? "hidden" : "visible";
        card.style.pointerEvents = opacity <= 0 ? "none" : "auto";
      });
      updateSelection();
    };

    const measure = () => {
      if (!cards.length) return;
      cardWidth = cards[0].offsetWidth;
      if (!cardWidth) return;
      track.style.height = Math.ceil(cards[0].offsetHeight) + "px";
      frame.style.perspective = Math.ceil(cardWidth * perspective) + "px";
      paint();
    };

    const settle = (destination) => {
      if (!cards.length) return;
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      target = normalizePosition(destination);

      if (reducedMotion.matches) {
        position = target;
        paint();
        animationFrame = null;
        return;
      }

      const step = () => {
        const remaining = target - position;
        if (Math.abs(remaining) < .0004) {
          position = target;
          paint();
          animationFrame = null;
          return;
        }
        position += remaining * .16;
        paint();
        animationFrame = requestAnimationFrame(step);
      };
      animationFrame = requestAnimationFrame(step);
    };

    const nudge = (amount) => settle(Math.round(target) + amount);

    const goTo = (index) => {
      const destination = loop && cards.length > 1
        ? index + Math.round((target - index) / cards.length) * cards.length
        : index;
      settle(destination);
    };

    const controlAction = (event) => {
      const control = event.target instanceof Element
        ? event.target.closest(".arrow-scroll-left-card-other, .arrow-scroll-right-card-other")
        : null;
      if (!(control instanceof HTMLElement) || !root.contains(control)) return false;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (control.matches(".arrow-scroll-left-card-other")) nudge(-1);
      else nudge(1);
      return true;
    };

    root.addEventListener("click", controlAction, true);
    root.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") controlAction(event);
    }, true);

    frame.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        nudge(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        nudge(1);
      }
    });

    frame.addEventListener("pointerdown", (event) => {
      if (!cards.length || event.button > 0) return;
      if (event.target instanceof Element && event.target.closest(".arrow-scroll-left-card-other, .arrow-scroll-right-card-other, .open-arrow")) return;
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      animationFrame = null;
      target = position;
      frame.setPointerCapture?.(event.pointerId);
      drag = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        position,
        velocity: 0,
        time: performance.now(),
        moved: false
      };
    });

    frame.addEventListener("pointermove", (event) => {
      if (!drag || drag.id !== event.pointerId || !cardWidth) return;
      const deltaX = event.clientX - drag.x;
      const deltaY = event.clientY - drag.y;
      if (Math.abs(deltaX) > 6) drag.moved = true;
      if (Math.abs(deltaX) <= Math.abs(deltaY) && !drag.moved) return;
      event.preventDefault();
      const pitch = cardWidth * (1 + gap);
      const now = performance.now();
      const previousPosition = position;
      position = normalizePosition(drag.position - deltaX / pitch);
      drag.velocity = ((position - previousPosition) / Math.max(now - drag.time, 1)) * 1000;
      drag.time = now;
      paint();
    }, { passive: false });

    const finishDrag = (event) => {
      if (!drag || drag.id !== event.pointerId) return;
      const moved = drag.moved;
      const carried = Math.max(-2, Math.min(2, drag.velocity * .18));
      drag = null;
      if (moved) {
        suppressClick = true;
        setTimeout(() => { suppressClick = false; }, 0);
      }
      settle(Math.round(position + carried));
    };

    frame.addEventListener("pointerup", finishDrag);
    frame.addEventListener("pointercancel", finishDrag);

    frame.addEventListener("click", (event) => {
      const card = event.target instanceof Element ? event.target.closest(CARD_SELECTOR) : null;
      if (!(card instanceof HTMLElement)) return;
      if (suppressClick) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
      const itemLink = event.target instanceof Element
        ? event.target.closest(".card-favorite-yacht-image > .forrward-link[href], .card-favorite-yacht-image > .open-arrow[href]")
        : null;
      if (itemLink instanceof HTMLAnchorElement) return;
      const index = cards.indexOf(card);
      if (index >= 0 && index !== indexAt(position)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        goTo(index);
      }
    }, true);

    const scheduleSync = () => {
      if (syncFrame !== null) cancelAnimationFrame(syncFrame);
      syncFrame = requestAnimationFrame(() => {
        syncFrame = null;
        cards = Array.from(track.children).filter((element) => element.matches?.(CARD_SELECTOR));
        root.dataset.pyCoverflowCount = String(cards.length);

        if (cards.length && cards.length !== initializedCardCount) {
          position = Math.floor(cards.length / 2);
          target = position;
          initializedCardCount = cards.length;
        } else {
          position = normalizePosition(position);
          target = normalizePosition(target);
        }

        if (!cards.length) {
          initializedCardCount = 0;
          root.removeAttribute("data-py-coverflow-ready");
          track.style.removeProperty("height");
          caption.replaceChildren();
          return;
        }

        root.dataset.pyCoverflowReady = "true";
        cards.forEach((card) => {
          card.setAttribute("role", "group");
          card.setAttribute("aria-roledescription", "slide");
          const image = card.querySelector("img");
          if (image) {
            image.setAttribute("draggable", "false");
            image.setAttribute("loading", "lazy");
            image.setAttribute("decoding", "async");
          }
        });

        resizeObserver?.disconnect();
        resizeObserver = new ResizeObserver(measure);
        resizeObserver.observe(frame);
        cards.forEach((card) => resizeObserver.observe(card));
        selected = -1;
        requestAnimationFrame(measure);
      });
    };

    const listObserver = new MutationObserver(scheduleSync);
    listObserver.observe(track, { childList: true });
    scheduleSync();
  };

  const boot = (root) => {
    installStyles();
    if (root) initialize(root);
    else document.querySelectorAll(ROOT_SELECTOR).forEach(initialize);
  };

  const bootWhenNearViewport = () => {
    const roots = Array.from(document.querySelectorAll(ROOT_SELECTOR));
    if (!roots.length) return;

    if (!("IntersectionObserver" in window)) {
      boot();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        boot(entry.target);
      });
    }, { rootMargin: "600px 0px" });

    roots.forEach((root) => observer.observe(root));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootWhenNearViewport, { once: true });
  } else {
    bootWhenNearViewport();
  }
})();
