// SODEPAL SA — interactions du site, communes à toutes les pages
(function () {
  'use strict';

  var $ = function (s, root) { return (root || document).querySelector(s); };
  var $$ = function (s, root) { return Array.prototype.slice.call((root || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  var now = new Date();

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
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      root.dataset.theme = isDark() ? 'light' : 'dark';
      try { localStorage.setItem('sodepal-theme', root.dataset.theme); } catch (e) {}
      syncThemeBtn();
    });
    syncThemeBtn();
  }

  // ---------- En-tête, progression, retour en haut ----------
  var header = $('.site-header');
  var bar = $('.progress span');
  var toTop = $('.to-top');
  function onScroll() {
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle('scrolled', y > 8);
    if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    if (toTop) toTop.classList.toggle('show', y > 900);
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

  // ---------- Carrousel d'accueil ----------
  var hero = $('.hero');
  if (hero) {
    var slides = $$('.slide', hero);
    var dots = $$('.dots button', hero);
    var counter = $('.counter strong', hero);
    var progress = $('.counter .bar i', hero);
    var pauseBtn = $('.pause', hero);
    var DELAY = 6500;
    var index = 0;
    var timer = null;
    var paused = reduceMotion;
    var hovered = false;

    var restart = function () {
      clearTimeout(timer);
      progress.classList.remove('run');
      void progress.offsetWidth; // relance l'animation de la barre
      if (paused || hovered) return;
      progress.style.setProperty('--slide-ms', DELAY + 'ms');
      progress.classList.add('run');
      timer = setTimeout(function () { show(index + 1); }, DELAY);
    };
    var show = function (i) {
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
    };
    var setPaused = function (p) {
      paused = p;
      pauseBtn.classList.toggle('paused', p);
      pauseBtn.setAttribute('aria-label', p ? 'Relancer le carrousel' : 'Mettre le carrousel en pause');
      restart();
    };
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
  }

  // ---------- Filtres du catalogue (page Produits) ----------
  // produits.html#farines ouvre directement le filtre « farines »
  var filterBtns = $$('.filters button');
  if (filterBtns.length) {
    var products = $$('.product');
    var cats = filterBtns.map(function (b) { return b.dataset.f; });
    var applyFilter = function (f) {
      if (cats.indexOf(f) < 0) f = 'tout';
      filterBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.f === f)); });
      products.forEach(function (p) { p.hidden = f !== 'tout' && p.dataset.cat !== f; });
    };
    filterBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        applyFilter(b.dataset.f);
        history.replaceState(null, '', b.dataset.f === 'tout' ? location.pathname : '#' + b.dataset.f);
      });
    });
    var fromHash = function () {
      var f = location.hash.slice(1);
      if (cats.indexOf(f) < 0) return;
      applyFilter(f);
      var cat = $('#catalogue');
      if (cat) cat.scrollIntoView();
    };
    window.addEventListener('hashchange', fromHash);
    fromHash();
  }

  // ---------- Visionneuse ----------
  var lb = $('#lightbox');
  if (lb) {
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
  }

  // ---------- Formulaire de contact (page Contact) ----------
  // contact.html?sujet=Devenir%20revendeur pré-remplit l'objet
  var form = $('#form-contact');
  if (form) {
    var sujet = form.sujet;
    var setSujet = function (v) {
      var opt = Array.prototype.slice.call(sujet.options).filter(function (o) { return o.value === v || o.text === v; })[0];
      if (opt) sujet.value = opt.value;
    };
    var q = new URLSearchParams(location.search).get('sujet');
    if (q) setSujet(q);
    $$('[data-sujet]').forEach(function (a) {
      a.addEventListener('click', function () { setSujet(a.dataset.sujet); });
    });
    var err = $('.form-error', form);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nom = form.nom.value.trim();
      var msg = form.message.value.trim();
      if (!nom || !msg) { err.hidden = false; (nom ? form.message : form.nom).focus(); return; }
      err.hidden = true;
      var tel = form.tel.value.trim();
      var body = msg + '\n\n— ' + nom + (tel ? '\nTél. : ' + tel : '');
      // Les demandes adressées à la direction vont directement à Mme Zoundi
      var dest = sujet.value === 'Direction générale / presse' ? 'y.zoundi@sodepal.com' : 'contact@sodepal.com';
      window.location.href = 'mailto:' + dest + '?subject=' + encodeURIComponent(sujet.value) + '&body=' + encodeURIComponent(body);
    });
  }

  // ---------- Ouvert / fermé (Ouagadougou = UTC) ----------
  var mins = now.getUTCHours() * 60 + now.getUTCMinutes();
  var closeAt = now.getUTCDay() === 0 ? 14 * 60 : 18 * 60;
  var isOpen = mins >= 6 * 60 + 30 && mins < closeAt;
  $$('.open-now').forEach(function (badge) {
    badge.textContent = isOpen ? '● Ouvert maintenant' : '● Fermé · ouvre à 6h30';
    badge.classList.add(isOpen ? 'is-open' : 'is-closed');
    badge.hidden = false;
  });

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
    $$('.section-head, .range, .about-visual, .about-text, .segment, .steps li, .q-list li, .faq-list, .contact-side, .contact-form, .timeline li, .mvv article, .chain li, .member, .partner, .join, .lab-visual, .lab-text, .press-card, .family-steps li, .leader').forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 4) * 80 + 'ms';
      io.observe(el);
    });
  }

  $$('.annee').forEach(function (el) { el.textContent = now.getFullYear(); });
})();
