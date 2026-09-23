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

/* Desktop floating request CTA — compact continuation of .div-block-217. */
(() => {
  if (window.PYDesktopFloatingCTA) return;
  window.PYDesktopFloatingCTA = true;

  const desktopQuery = window.matchMedia("(min-width: 992px)");

  const init = () => {
    const card = document.querySelector(".form-card-request");
    const source = card?.querySelector(":scope > .div-block-217");
    if (!card || !source || document.querySelector(".py-desktop-floating-cta")) return;

    const style = document.createElement("style");
    style.textContent = `
      .py-desktop-floating-cta { display: none; }
      @media (min-width: 992px) {
        .py-desktop-floating-cta {
          --py-cta-ease: cubic-bezier(.22, 1, .36, 1);
          --py-cta-expanded-width: 20.5rem;
          position: fixed;
          z-index: 7990;
          left: 50%;
          bottom: max(1.5rem, env(safe-area-inset-bottom));
          display: block;
          opacity: 0;
          pointer-events: none;
          transform: translate3d(-50%, calc(100% + 1.5rem), 0) scale(.86);
          transform-origin: 50% 100%;
          filter: blur(7px);
          transition: opacity .22s ease-out, transform .28s var(--py-cta-ease), filter .2s ease-out;
          will-change: transform, opacity, filter;
        }
        .py-desktop-floating-cta.is-mounted {
          opacity: 1;
          transform: translate3d(-50%, 0, 0) scale(1);
          filter: blur(0);
        }
        .py-desktop-floating-cta.is-expanded { pointer-events: auto; }
        .py-desktop-floating-cta .div-block-217 {
          min-width: 0;
          width: 4rem;
          max-width: min(92vw, var(--py-cta-expanded-width));
          min-height: 4rem;
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          justify-content: flex-start;
          gap: 1rem;
          padding: .5rem;
          overflow: hidden;
          border: 1px solid rgb(255 255 255 / 58%);
          border-radius: 100rem;
          background: rgb(247 247 247 / 62%);
          -webkit-backdrop-filter: saturate(210%) blur(38px);
          backdrop-filter: saturate(210%) blur(38px);
          box-shadow: 0 10px 36px rgb(0 0 0 / 14%), inset 0 0 1px rgb(255 255 255 / 90%);
          transform: scale(.92);
          transition: width .3s var(--py-cta-ease), padding .3s var(--py-cta-ease), transform .24s var(--py-cta-ease);
          will-change: width, transform;
        }
        .py-desktop-floating-cta .div-block-217.is-measuring {
          position: absolute;
          width: max-content;
          max-width: none;
          padding: .5rem .5rem .5rem 1.25rem;
          visibility: hidden;
          transition: none;
        }
        .py-desktop-floating-cta.is-mounted .div-block-217 { transform: scale(1); }
        .py-desktop-floating-cta.is-expanded .div-block-217 {
          width: var(--py-cta-expanded-width);
          padding: .5rem .5rem .5rem 1.25rem;
          transition-delay: 0s;
        }
        .py-desktop-floating-cta .div-block-228 { display: none !important; }
        .py-desktop-floating-cta .wrapper-price-yacht-card-request {
          margin: 0;
          flex: 0 1 auto;
          white-space: nowrap;
        }
        .py-desktop-floating-cta .wrapper-price-yacht-card-request,
        .py-desktop-floating-cta .btn-make-a-request-yacht {
          opacity: 0;
          transform: translateY(5px) scale(.94);
          transition: opacity .1s ease, transform .17s var(--py-cta-ease);
        }
        .py-desktop-floating-cta.is-expanded .wrapper-price-yacht-card-request,
        .py-desktop-floating-cta.is-expanded .btn-make-a-request-yacht {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition-delay: .08s;
        }
        .py-desktop-floating-cta .btn-make-a-request-yacht {
          width: auto;
          min-width: 10.5rem;
          height: 3rem;
          margin: 0;
          padding-inline: 1.5rem;
          flex: 0 0 auto;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .py-desktop-floating-cta,
        .py-desktop-floating-cta .div-block-217,
        .py-desktop-floating-cta .wrapper-price-yacht-card-request,
        .py-desktop-floating-cta .btn-make-a-request-yacht { transition: none; filter: none; }
      }
    `;
    document.head.appendChild(style);

    const floating = document.createElement("aside");
    floating.className = "py-desktop-floating-cta";
    floating.setAttribute("aria-label", "Yacht request shortcut");

    const clone = source.cloneNode(true);
    clone.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
    clone.querySelectorAll("[data-w-id]").forEach((element) => element.removeAttribute("data-w-id"));
    floating.appendChild(clone);
    document.body.appendChild(floating);

    const sourceButton = source.querySelector(":scope > .btn-make-a-request-yacht");
    const floatingButton = clone.querySelector(":scope > .btn-make-a-request-yacht");
    if (floatingButton && sourceButton) {
      floatingButton.setAttribute("role", "button");
      floatingButton.setAttribute("tabindex", "0");
      floatingButton.setAttribute("aria-label", "Open yacht charter request");
      const activate = (event) => {
        event?.preventDefault();
        event?.stopPropagation();
        sourceButton.click();
      };
      floatingButton.addEventListener("click", activate);
      floatingButton.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      });
    }

    let measureFrame = 0;
    const measureExpandedWidth = () => {
      cancelAnimationFrame(measureFrame);
      measureFrame = requestAnimationFrame(() => {
        clone.classList.add("is-measuring");
        const expandedWidth = Math.ceil(clone.getBoundingClientRect().width);
        clone.classList.remove("is-measuring");
        if (expandedWidth > 0) {
          floating.style.setProperty("--py-cta-expanded-width", `${Math.max(64, expandedWidth)}px`);
        }
      });
    };

    const syncContent = () => {
      const sourcePrice = source.querySelector(".price-1");
      const clonedPrice = clone.querySelector(".price-1");
      const sourceModal = source.querySelector('[select-display="modal-1"]');
      const clonedModal = clone.querySelector('[select-display="modal-1"]');
      if (sourcePrice && clonedPrice && clonedPrice.textContent !== sourcePrice.textContent) {
        clonedPrice.textContent = sourcePrice.textContent;
      }
      if (sourceModal && clonedModal && clonedModal.textContent !== sourceModal.textContent) {
        clonedModal.textContent = sourceModal.textContent;
      }
      if (sourceButton && floatingButton && floatingButton.textContent !== sourceButton.textContent) {
        floatingButton.textContent = sourceButton.textContent;
      }
      measureExpandedWidth();
    };
    new MutationObserver(syncContent).observe(source, {
      subtree: true,
      childList: true,
      characterData: true
    });
    syncContent();

    const footer = document.querySelector(".section-footer, footer");
    let enterTimer = 0;
    let exitTimer = 0;
    let hiding = false;

    const showFloating = () => {
      clearTimeout(exitTimer);
      hiding = false;
      floating.inert = false;
      floating.setAttribute("aria-hidden", "false");
      if (!floating.classList.contains("is-mounted")) {
        floating.classList.add("is-mounted");
        clearTimeout(enterTimer);
        enterTimer = setTimeout(() => floating.classList.add("is-expanded"), 145);
      } else {
        floating.classList.add("is-expanded");
      }
    };

    const hideFloating = () => {
      clearTimeout(enterTimer);
      if (hiding || !floating.classList.contains("is-mounted")) return;
      hiding = true;
      floating.classList.remove("is-expanded");
      floating.inert = true;
      floating.setAttribute("aria-hidden", "true");
      clearTimeout(exitTimer);
      // Start the downward fade while the pill is still becoming a circle.
      // Repeated scroll events must not restart this short exit sequence.
      exitTimer = setTimeout(() => {
        floating.classList.remove("is-mounted");
        hiding = false;
      }, 135);
    };

    const syncVisibility = () => {
      if (!desktopQuery.matches) {
        hideFloating();
        return;
      }
      const rect = card.getBoundingClientRect();
      const beforeFooter = !footer || footer.getBoundingClientRect().top > window.innerHeight;
      if (rect.bottom <= 0 && beforeFooter) showFloating();
      else hideFloating();
    };

    window.addEventListener("scroll", syncVisibility, { passive: true });
    window.addEventListener("resize", syncVisibility, { passive: true });
    if (typeof desktopQuery.addEventListener === "function") desktopQuery.addEventListener("change", syncVisibility);
    syncVisibility();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();

/* Migrated Webflow footer block 4. */
(() => {
  if (window.PYAgenticNavigation) return;

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
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      link.setAttribute("rel", "noopener noreferrer");
      const currentLabel = (link.getAttribute("aria-label") || link.textContent || "Open link").trim();
      if (!/new (tab|window)/i.test(currentLabel)) {
        link.setAttribute("aria-label", `${currentLabel} (opens in a new tab)`);
      }
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
    document.querySelector("nav.dropdown-list-nav-bar")?.setAttribute("aria-label", "Primary navigation");
    normalizeFalseLinks();
    normalizeComboboxes();
    normalizeActions();
    labelEmptyLinks();
  };

  window.PYAgenticNavigation = { normalize: applyAgenticNavigation };

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
  const scheduleAgenticRefresh = (() => {
    let queued = false;
    return () => {
      if (queued) return;
      queued = true;
      const run = () => {
        queued = false;
        applyAgenticNavigation();
      };
      if ("requestIdleCallback" in window) requestIdleCallback(run, { timeout: 500 });
      else setTimeout(run, 50);
    };
  })();
  const agenticObserver = new MutationObserver(scheduleAgenticRefresh);
  agenticObserver.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(() => agenticObserver.disconnect(), 5000);
})();

/* Migrated Webflow footer block 5. */
(() => {
  const init = () => {
    if (document.querySelector('script[src*="yacht-expanding-gallery.js"]')) return;
    const root = document.querySelector("[data-py-expanding-gallery], [data-py-gallery-source=\"cms\"]");
    if (!root || root.dataset.pyZoomReady === "true") return;
    const cards = Array.from(root.querySelectorAll("[data-py-expanding-card]"));
    const track = root.querySelector("[data-py-expanding-track], .flex-v-gallery") || root;
    if (!cards.length) return;
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
      '<button class="py-gallery-dialog__close" type="button" aria-label="Close photo viewer">×</button>' +
      '<button class="py-gallery-dialog__nav py-gallery-dialog__nav--prev" type="button" aria-label="Previous photo">‹</button>' +
      '<img class="py-gallery-dialog__image" alt="">' +
      '<button class="py-gallery-dialog__nav py-gallery-dialog__nav--next" type="button" aria-label="Next photo">›</button>';
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
      zoom.innerHTML =
        '<svg width="21" height="21" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
        '<path d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
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
      const track = gallery.querySelector("[data-py-expanding-track], .flex-v-gallery");
      const list = gallery.querySelector("[data-py-gallery-list]") || track;
      if (track && list && track !== list) {
        track.removeAttribute("role");
        track.removeAttribute("aria-label");
      }
      if (list) {
        list.setAttribute("role", "list");
        list.setAttribute("aria-label", "Yacht gallery images");
      }
      gallery.querySelectorAll(".py-gallery-row").forEach((row) => {
        row.setAttribute("role", "listitem");
      });
      gallery.querySelectorAll("[data-py-expanding-card]").forEach((card, index) => {
        const image = card.querySelector("[data-py-gallery-image], img");
        const description = image?.getAttribute("alt")?.trim();
        if (gallery.dataset.pyGalleryRuntime === "expanding") {
          card.setAttribute("role", "button");
          card.setAttribute("tabindex", "0");
          card.setAttribute("aria-label", description ? `Expand image: ${description}` : `Expand yacht gallery image ${index + 1}`);
        } else {
          card.setAttribute("role", "listitem");
          card.removeAttribute("tabindex");
          card.setAttribute("aria-label", description || `Yacht gallery image ${index + 1}`);
        }
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
