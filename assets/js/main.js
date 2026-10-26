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

  // Mobile Navigation: Vollbild-Menü mit Fokusführung
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.getElementById('site-nav');
  if (toggle && nav) {
    const label = toggle.querySelector('[data-nav-label]');
    const outside = [document.querySelector('main'), document.querySelector('footer'), document.querySelector('.topbar')].filter(Boolean);
    const mq = window.matchMedia('(max-width: 959px)');
    const setOpen = (open, returnFocus) => {
      root.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
      if (label) label.textContent = open ? 'Schließen' : 'Menü';
      outside.forEach((el) => { el.inert = open; });
      if (open) {
        const first = nav.querySelector('.nav-list a');
        if (first) setTimeout(() => first.focus({ preventScroll: true }), 80);
      } else if (returnFocus) {
        toggle.focus();
      }
    };
    toggle.setAttribute('aria-label', 'Menü öffnen');
    toggle.addEventListener('click', () => setOpen(!root.classList.contains('nav-open')));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && root.classList.contains('nav-open')) setOpen(false, true);
      // Tab-Fokus im offenen Menü halten (Menü + Schließen-Button)
      if (e.key === 'Tab' && root.classList.contains('nav-open') && mq.matches) {
        const items = [toggle, ...nav.querySelectorAll('a')];
        const i = items.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
        else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
      }
    });
    mq.addEventListener('change', (e) => { if (!e.matches) setOpen(false); });
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

  // Kontaktformular: Validierung (Prototyp, Versand übernimmt später das Elementor-Formular)
  const form = document.querySelector('[data-form]');
  if (form) {
    const rules = [
      ['f-name', (f) => f.elements.name.value.trim().length > 1],
      ['f-mail', (f) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value.trim())],
      ['f-phone', (f) => f.telefon.value.replace(/[^0-9]/g, '').length >= 6],
      ['f-art', (f) => !!f.querySelector('input[name="art"]:checked')],
      ['f-msg', (f) => f.nachricht.value.trim().length > 4],
      ['f-dsgvo', (f) => f.datenschutz.checked],
    ];
    const check = (id) => {
      const [, test] = rules.find(([r]) => r === id);
      const ok = test(form);
      const err = document.getElementById(id + '-err');
      const input = document.getElementById(id);
      if (err) err.hidden = ok;
      if (input) {
        input.setAttribute('aria-invalid', String(!ok));
        if (err) input.setAttribute('aria-describedby', err.id);
      }
      return ok;
    };
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const results = rules.map(([id]) => check(id));
      const firstBad = rules[results.indexOf(false)];
      if (firstBad) {
        const el = document.getElementById(firstBad[0]) || form.querySelector(firstBad[0] === 'f-art' ? 'input[name="art"]' : 'input[name="datenschutz"]');
        if (el) el.focus();
        return;
      }
      form.querySelector('[data-form-success]').hidden = false;
      form.querySelector('.form-grid').hidden = true;
      form.querySelector('.form-submit').hidden = true;
      form.querySelector('[data-form-success]').focus?.();
    });
    // Fehler verschwinden schon beim Tippen, damit sich das Layout nicht erst beim nächsten Klick verschiebt
    const revalidate = (e) => {
      const id = e.target.name === 'art' ? 'f-art' : e.target.name === 'datenschutz' ? 'f-dsgvo' : e.target.id;
      if (rules.some(([r]) => r === id) && form.dataset.touched) check(id);
    };
    form.addEventListener('input', revalidate);
    form.addEventListener('change', revalidate);
    form.addEventListener('submit', () => { form.dataset.touched = '1'; }, { capture: true });
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
