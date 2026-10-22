/* Accessible navigation, scroll reveals and progressive page transitions. */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('.links');
  if (menu && nav) {
    const navId = 'primary-navigation';
    nav.id = navId;
    menu.setAttribute('aria-controls', navId);
    menu.setAttribute('aria-label', 'Toggle navigation');
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
      menu.textContent = open ? 'CLOSE' : 'MENU';
    });
    nav.querySelectorAll('a').forEach(link => {
      const current = new URL(link.href, location.href);
      if (current.pathname === location.pathname && current.hash === location.hash) link.setAttribute('aria-current','page');
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menu.setAttribute('aria-expanded','false');
        menu.textContent = 'MENU';
      });
    });
  }
  document.querySelectorAll('.year').forEach(el => { el.textContent = new Date().getFullYear(); });
  const revealTargets = document.querySelectorAll('main .section, main .content .item, main .card, main .step, main .project-row, main .cta, main .form, main .heading');
  revealTargets.forEach((el,i) => {
    if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal','');
    if (el.classList.contains('project-row') && i % 2) el.setAttribute('data-reveal','right');
  });
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { event.preventDefault(); target.scrollIntoView({behavior:reduceMotion?'auto':'smooth',block:'start'}); }
  }));
})();
