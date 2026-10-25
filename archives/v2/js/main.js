// SODEPAL SA — interactions du site (v2)
(function () {
  'use strict';

  var $ = function (s, root) { return (root || document).querySelector(s); };
  var $$ = function (s, root) { return Array.prototype.slice.call((root || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  // ---------- Thème clair / sombre ----------
  var themeBtn = $('.theme-toggle');
  function isDark() {
    return root.dataset.theme ? root.dataset.theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function syncThemeBtn() {
    var dark = isDark();
    root.dataset.theme = dark ? 'dark' : 'light';
    themeBtn.setAttribute('aria-label', dark ? 'Passer en mode clair' : 'Passer en mode sombre');
  }
  themeBtn.addEventListener('click', function () {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    try { localStorage.setItem('sodepal-theme', root.dataset.theme); } catch (e) {}
    syncThemeBtn();
  });
  syncThemeBtn();

  // ---------- En-tête, progression, retour en haut ----------
  var header = $('.site-header');
  var bar = $('.progress span');
  var toTop = $('.to-top');
  function onScroll() {
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle('scrolled', y > 8);
    bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    toTop.classList.toggle('show', y > 900);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Menu mobile ----------
  var toggle = $('.nav-toggle');
  var nav = $('#menu');
  function closeMenu() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Ouvrir le menu');
  }
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  // ---------- Lien actif selon la section visible ----------
  var links = $$('a[href^="#"]', nav).filter(function (a) { return !a.classList.contains('btn'); });
  if ('IntersectionObserver' in window) {
    var visibles = {};
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visibles[en.target.id] = en.isIntersecting; });
      var current = links.map(function (a) { return a.getAttribute('href').slice(1); })
        .filter(function (id) { return visibles[id]; }).pop();
      links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + current); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (a) {
      var s = $(a.getAttribute('href'));
      if (s) spy.observe(s);
    });
  }

  // ---------- Carrousel d'accueil ----------
  var slides = $$('.slide');
  var dots = $$('.dots button');
  var counter = $('.counter strong');
  var progress = $('.counter .bar i');
  var pauseBtn = $('.pause');
  var hero = $('.hero');
  var DELAY = 6500;
  var index = 0;
  var timer = null;
  var paused = reduceMotion;
  var hovered = false;

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach(function (s, k) {
      var on = k === index;
      s.classList.toggle('is-active', on);
      s.setAttribute('aria-hidden', String(!on));
      $$('a, button', s).forEach(function (el) { el.tabIndex = on ? 0 : -1; });
    });
    dots.forEach(function (d, k) {
      if (k === index) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
    });
    counter.textContent = String(index + 1).padStart(2, '0');
    restart();
  }
  function restart() {
    clearTimeout(timer);
    progress.classList.remove('run');
    void progress.offsetWidth; // relance l'animation de la barre
    if (paused || hovered) return;
    progress.style.setProperty('--slide-ms', DELAY + 'ms');
    progress.classList.add('run');
    timer = setTimeout(function () { show(index + 1); }, DELAY);
  }
  function setPaused(p) {
    paused = p;
    pauseBtn.classList.toggle('paused', p);
    pauseBtn.setAttribute('aria-label', p ? 'Relancer le carrousel' : 'Mettre le carrousel en pause');
    restart();
  }
  dots.forEach(function (d, k) { d.addEventListener('click', function () { show(k); }); });
  pauseBtn.addEventListener('click', function () { setPaused(!paused); });
  hero.addEventListener('mouseenter', function () { hovered = true; restart(); });
  hero.addEventListener('mouseleave', function () { hovered = false; restart(); });
  hero.addEventListener('focusin', function () { hovered = true; restart(); });
  hero.addEventListener('focusout', function () { hovered = false; restart(); });
  hero.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') show(index + 1);
    if (e.key === 'ArrowLeft') show(index - 1);
  });
  var touchX = null;
  hero.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    touchX = null;
  });
  document.addEventListener('visibilitychange', function () { if (document.hidden) clearTimeout(timer); else restart(); });
  pauseBtn.classList.toggle('paused', paused);
  show(0);

  // ---------- Filtres du catalogue ----------
  var filterBtns = $$('.filters button');
  var products = $$('.product');
  function applyFilter(f) {
    filterBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.f === f)); });
    products.forEach(function (p) { p.hidden = f !== 'tout' && p.dataset.cat !== f; });
  }
  filterBtns.forEach(function (b) { b.addEventListener('click', function () { applyFilter(b.dataset.f); }); });
  $$('[data-filtre]').forEach(function (a) {
    a.addEventListener('click', function () { applyFilter(a.dataset.filtre); });
  });

  // ---------- Visionneuse ----------
  var lb = $('#lightbox');
  var lbImg = $('img', lb);
  $$('.zoom').forEach(function (btn) {
    btn.addEventListener('click', function () {
      lbImg.src = btn.dataset.full;
      lbImg.alt = $('img', btn).alt;
      if (lb.showModal) lb.showModal();
    });
  });
  $('.lb-close', lb).addEventListener('click', function () { lb.close(); });
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });

  // ---------- Formulaire de contact ----------
  var sujet = $('#f-sujet');
  $$('[data-sujet]').forEach(function (a) {
    a.addEventListener('click', function () { sujet.value = a.dataset.sujet; });
  });
  var form = $('#form-contact');
  var err = $('.form-error', form);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nom = form.nom.value.trim();
    var msg = form.message.value.trim();
    if (!nom || !msg) { err.hidden = false; (nom ? form.message : form.nom).focus(); return; }
    err.hidden = true;
    var tel = form.tel.value.trim();
    var body = msg + '\n\n— ' + nom + (tel ? '\nTél. : ' + tel : '');
    window.location.href = 'mailto:sodepal3@yahoo.fr?subject=' + encodeURIComponent(form.sujet.value) + '&body=' + encodeURIComponent(body);
  });

  // ---------- Ouvert / fermé (Ouagadougou = UTC) ----------
  var badge = $('.open-now');
  var now = new Date();
  var mins = now.getUTCHours() * 60 + now.getUTCMinutes();
  var closeAt = now.getUTCDay() === 0 ? 14 * 60 : 18 * 60;
  var isOpen = mins >= 6 * 60 + 30 && mins < closeAt;
  badge.textContent = isOpen ? '● Ouvert maintenant' : '● Fermé — ouverture à 6h30';
  badge.classList.add(isOpen ? 'is-open' : 'is-closed');
  badge.hidden = false;

  // ---------- Années d'expérience (création le 23/12/1991) ----------
  var years = now.getUTCFullYear() - 1991 - (now < new Date(Date.UTC(now.getUTCFullYear(), 11, 23)) ? 1 : 0);
  $$('[data-years]').forEach(function (el) { el.textContent = years; el.dataset.count = years; });

  // ---------- Compteurs animés et apparitions ----------
  function countUp(el) {
    var target = parseInt(el.dataset.count, 10);
    if (isNaN(target) || el.hasAttribute('data-plain')) return;
    var start = performance.now();
    var dur = 1400;
    (function tick(t) {
      var k = Math.min(1, (t - start) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(tick);
    })(start);
  }
  if ('IntersectionObserver' in window && !reduceMotion) {
    var counters = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { countUp(en.target); counters.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    $$('[data-count]').forEach(function (el) { counters.observe(el); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    $$('.section-head, .range, .about-visual, .about-text, .segment, .steps li, .q-list li, .faq-list, .contact-side, .contact-form').forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 4) * 80 + 'ms';
      io.observe(el);
    });
  }

  $('#annee').textContent = now.getFullYear();
})();
