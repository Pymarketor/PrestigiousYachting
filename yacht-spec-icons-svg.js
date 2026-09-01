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
