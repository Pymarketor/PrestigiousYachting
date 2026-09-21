/* Prestigious Yachting — shared agentic navigation for every Webflow CMS template. */
(() => {
  "use strict";

  if (window.PYAgenticNavigation) return;

  const interactiveSelector = [
    "a[href]",
    "button",
    "input:not([type='hidden'])",
    "select",
    "textarea",
    "summary",
    "[role='button']",
    "[role='link']",
    "[role='option']",
    "[role='tab']",
    "[data-slider-prev]",
    "[data-slider-next]",
    ".w-dropdown-toggle",
    "[open-favorite-modal]",
    "[favorite-modal='trigger']",
    "[favorite-close]"
  ].join(",");

  const humanize = (value = "") => value
    .replace(/^#/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .trim();

  const queryWithin = (root, selector) => {
    const matches = root instanceof Element && root.matches(selector) ? [root] : [];
    return matches.concat([...root.querySelectorAll(selector)]);
  };

  const referencedText = (element) => {
    const ids = (element.getAttribute("aria-labelledby") || "").trim().split(/\s+/).filter(Boolean);
    return ids.map((id) => document.getElementById(id)?.textContent?.trim() || "").filter(Boolean).join(" ");
  };

  const visibleName = (element) => {
    const explicit = element.getAttribute("aria-label")?.trim() || referencedText(element);
    if (explicit) return explicit;
    if (element instanceof HTMLInputElement && ["button", "submit", "reset"].includes(element.type)) {
      return element.value.trim();
    }
    const text = element.textContent?.replace(/\s+/g, " ").trim();
    if (text) return text;
    return element.querySelector('img[alt]:not([alt=""])')?.getAttribute("alt")?.trim() || "";
  };

  const inferActionName = (element) => {
    if (element.matches("[data-slider-prev], [class*='prev'], [class*='previous']")) return "Previous item";
    if (element.matches("[data-slider-next], [class*='next']")) return "Next item";
    if (element.matches("[favorite-close], [class*='close'], [class*='exit'], [data-py-icon='cross']")) return "Close";
    if (element.matches("[open-favorite-modal], [favorite-modal='trigger'], [class*='favorite']")) return "Open favorites";
    if (element.matches(".w-dropdown-toggle, [class*='menu']")) return "Open navigation menu";
    if (element.matches("[class*='share']")) return "Share";
    if (element.matches("[class*='search']")) return "Search";
    if (element.matches("[class*='zoom']")) return "Enlarge image";
    if (element.matches("[class*='expand'], [data-py-icon='expand'], [data-py-icon='plus']")) return "Expand";
    return "Activate control";
  };

  const labelFormControl = (control) => {
    if (visibleName(control)) return;
    const wrappingLabel = control.closest("label")?.textContent?.replace(/\s+/g, " ").trim();
    const externalLabel = control.id
      ? document.querySelector(`label[for="${CSS.escape(control.id)}"]`)?.textContent?.replace(/\s+/g, " ").trim()
      : "";
    const fallback = wrappingLabel || externalLabel || control.getAttribute("placeholder") ||
      humanize(control.getAttribute("name") || control.id || control.type || "form field");
    control.setAttribute("aria-label", fallback);
  };

  const labelLink = (link) => {
    if (!visibleName(link)) {
      const href = link.getAttribute("href") || "";
      let fallback = "Open link";
      if (href === "/" || href === location.origin || href === `${location.origin}/`) fallback = "Prestigious Yachting home";
      else if (href.startsWith("#") && href.length > 1) fallback = `Go to ${humanize(href)}`;
      else {
        try {
          const url = new URL(href, location.href);
          const lastPart = url.pathname.split("/").filter(Boolean).pop();
          if (lastPart) fallback = `Open ${humanize(lastPart)}`;
        } catch {}
      }
      link.setAttribute("aria-label", fallback);
    }
    if (link.target === "_blank") {
      link.rel = "noopener noreferrer";
      const label = link.getAttribute("aria-label") || visibleName(link);
      if (label && !/new (tab|window)/i.test(label)) link.setAttribute("aria-label", `${label} (opens in a new tab)`);
    }
  };

  const normalizeInteractive = (element) => {
    if (element instanceof HTMLAnchorElement) labelLink(element);
    else if (element.matches("input,select,textarea")) labelFormControl(element);
    else if (!visibleName(element)) element.setAttribute("aria-label", inferActionName(element));

    if (!element.matches("a,button,input,select,textarea,summary") &&
        element.matches("[data-slider-prev],[data-slider-next],.w-dropdown-toggle,[open-favorite-modal],[favorite-modal='trigger'],[favorite-close]")) {
      if (!element.hasAttribute("role")) element.setAttribute("role", "button");
      if (!element.hasAttribute("tabindex")) element.setAttribute("tabindex", "0");
    }

    element.querySelectorAll("svg").forEach((svg) => {
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");
    });
  };

  const normalizeLandmarks = (root) => {
    queryWithin(root, "nav").forEach((nav, index) => {
      if (nav.getAttribute("aria-label") || nav.getAttribute("aria-labelledby")) return;
      if (nav.matches(".breadcrumb, [class*='breadcrumb']")) nav.setAttribute("aria-label", "Breadcrumb");
      else if (nav.matches(".dropdown-list-nav-bar, [class*='navbar'], [class*='main-nav']")) nav.setAttribute("aria-label", "Primary navigation");
      else nav.setAttribute("aria-label", `Navigation ${index + 1}`);
    });
    queryWithin(root, "dialog, [role='dialog']").forEach((dialog) => {
      if (!dialog.getAttribute("aria-label") && !dialog.getAttribute("aria-labelledby")) {
        dialog.setAttribute("aria-label", "Dialog");
      }
    });
    queryWithin(root, '[role="list"]').forEach((list) => {
      [...list.children].forEach((child) => {
        if (!(child instanceof Element) || child.matches("script,style,template")) return;
        if (!child.matches('[role="listitem"], [role="presentation"], [role="none"]')) {
          child.setAttribute("role", "listitem");
        }
      });
    });
  };

  const normalize = (root = document) => {
    normalizeLandmarks(root);
    queryWithin(root, interactiveSelector).forEach(normalizeInteractive);
  };

  let queuedRoots = new Set();
  let scheduled = false;
  const flush = () => {
    scheduled = false;
    queuedRoots.forEach(normalize);
    queuedRoots.clear();
  };
  const schedule = (root) => {
    queuedRoots.add(root);
    if (scheduled) return;
    scheduled = true;
    if ("requestIdleCallback" in window) requestIdleCallback(flush, { timeout: 400 });
    else setTimeout(flush, 32);
  };

  const observer = new MutationObserver((records) => {
    records.forEach((record) => record.addedNodes.forEach((node) => {
      if (node instanceof Element) schedule(node);
    }));
  });

  const boot = () => {
    normalize();
    observer.observe(document.body, { childList: true, subtree: true });
  };

  window.PYAgenticNavigation = { normalize };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
