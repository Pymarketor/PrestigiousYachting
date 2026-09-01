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
