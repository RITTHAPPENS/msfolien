(() => {
  const root = document.documentElement;

  // Header wird nach dem Hero-Anfang deckend (IntersectionObserver statt Scroll-Listener)
  const header = document.querySelector('[data-header]');
  const sentinel = document.querySelector('[data-header-sentinel]');
  if (header && sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      header.classList.toggle('is-solid', !entry.isIntersecting);
    }).observe(sentinel);
  } else if (header) {
    header.classList.add('is-solid');
  }

  // Mobile Navigation
  const toggle = document.querySelector('[data-nav-toggle]');
  if (toggle) {
    const close = () => {
      root.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
      const open = root.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.nav-list a').forEach((a) => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    window.matchMedia('(min-width: 960px)').addEventListener('change', close);
  }

  // Folie aufziehen: Bilder werden beim Einscrollen diagonal freigelegt
  const wipes = document.querySelectorAll('[data-wipe]');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supportsProp = window.CSS && CSS.registerProperty !== undefined;
  if (reduce || !supportsProp || !('IntersectionObserver' in window)) {
    wipes.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25, rootMargin: '0px 0px -8% 0px' });
    wipes.forEach((el) => io.observe(el));
  }

  // Projekt-Schiene: Pfeile
  const rail = document.querySelector('[data-rail]');
  const prev = document.querySelector('[data-rail-prev]');
  const next = document.querySelector('[data-rail-next]');
  if (rail && prev && next) {
    const step = () => {
      const item = rail.querySelector('.rail-item');
      return item ? item.getBoundingClientRect().width + 20 : rail.clientWidth * 0.8;
    };
    const update = () => {
      prev.disabled = rail.scrollLeft <= 4;
      next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
    };
    prev.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' }));
    next.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' }));
    rail.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
