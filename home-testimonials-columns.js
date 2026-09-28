/* Uses server-rendered Webflow CMS cards. No React, API calls or animation loop. */
(() => {
  const init = () => {
    const section = document.getElementById('Testimonials');
    const list = section?.querySelector('[testimonial-track]');
    if (!list || section.dataset.pyReviewsReady) return;
    const cards = [...list.children].filter(card => card.hasAttribute('testimonial-card'));
    // Keep the CMS empty state and the no-JS grid untouched.
    if (!cards.length) return;
    section.dataset.pyReviewsReady = 'true';
    const viewport = list.parentElement;
    viewport.classList.add('py-reviews-viewport');
    viewport.setAttribute('aria-label', 'Google reviews');
    list.removeAttribute('testimonial-track');
    list.setAttribute('testimonial-track', 'columns');
    list.setAttribute('role', 'presentation');
    list.style.removeProperty('transform');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = matchMedia('(min-width: 1024px)');
    const tablet = matchMedia('(min-width: 768px)');
    let visible = false;
    let paused = false;
    let focused = false;
    const controls = document.createElement('div');
    controls.className = 'py-reviews-controls';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'py-reviews-toggle';
    controls.append(button);
    viewport.after(controls);
    const sync = () => {
      const staticMode = reduced.matches || paused;
      viewport.classList.toggle('py-reviews-static', staticMode);
      viewport.classList.toggle('py-reviews-running', !staticMode && visible && !document.hidden && !focused);
      button.textContent = paused ? 'Resume scrolling' : 'Pause scrolling';
      button.setAttribute('aria-pressed', String(paused));
      controls.hidden = reduced.matches || cards.length < 2;
    };
    const rebuild = () => {
      // Repartition ALL reviews at each breakpoint, rather than hiding two thirds on mobile.
      const count = Math.min(cards.length, desktop.matches ? 3 : tablet.matches ? 2 : 1);
      const columns = Array.from({ length: count }, (_, index) => {
        const column = document.createElement('div');
        column.className = 'py-reviews-column';
        const track = document.createElement('div');
        track.className = 'py-reviews-track';
        const group = document.createElement('div');
        group.className = 'py-reviews-group';
        group.setAttribute('role', 'list');
        track.style.setProperty('--py-review-duration', `${[45, 57, 51][index] * 3 / count}s`);
        track.append(group);
        column.append(track);
        return { column, track, group };
      });
      cards.forEach((card, index) => {
        card.setAttribute('role', 'listitem');
        columns[index % count].group.append(card);
      });
      columns.forEach(({ track, group }) => {
        if (cards.length < 2) return;
        const copy = group.cloneNode(true);
        copy.dataset.pyReviewCopy = '';
        copy.setAttribute('aria-hidden', 'true');
        copy.setAttribute('inert', '');
        copy.removeAttribute('role');
        copy.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
        copy.querySelectorAll('script').forEach(node => node.remove());
        track.append(copy);
      });
      list.replaceChildren(...columns.map(({ column }) => column));
      sync();
    };
    button.addEventListener('click', () => { paused = !paused; sync(); });
    viewport.addEventListener('focusin', () => { focused = true; sync(); });
    viewport.addEventListener('focusout', event => {
      focused = viewport.contains(event.relatedTarget);
      sync();
    });
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', sync);
    desktop.addEventListener('change', rebuild);
    tablet.addEventListener('change', rebuild);
    rebuild();
    if (cards.length < 2) { paused = true; sync(); }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }).observe(viewport);
    } else { visible = true; sync(); }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
