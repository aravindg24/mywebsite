(() => {
  const menu = document.querySelector('.mobile-nav');
  if (!menu) return;
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => menu.removeAttribute('open'));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') menu.removeAttribute('open');
  });
  document.addEventListener('click', (event) => {
    if (menu.open && !menu.contains(event.target)) menu.removeAttribute('open');
  });
})();

(() => {
  const comparison = document.querySelector('[data-road-compare]');
  if (!comparison) return;

  const views = comparison.querySelectorAll('[data-compare-view]');
  const buttons = comparison.querySelectorAll('[data-compare-target]');
  const label = comparison.querySelector('.road-compare-label');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.compareTarget;
      views.forEach((view) => view.classList.toggle('is-active', view.dataset.compareView === target));
      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      if (label) label.textContent = target === 'after' ? 'Detected vehicles' : 'Input scene';
    });
  });
})();
