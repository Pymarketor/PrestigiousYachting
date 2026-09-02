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
