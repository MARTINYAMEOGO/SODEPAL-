// SODEPAL SA — interactions du site
(function () {
  'use strict';

  // En-tête : ombre au défilement
  var header = document.querySelector('.site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menu mobile
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu');
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

  // Lien actif selon la section visible
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  if ('IntersectionObserver' in window) {
    var visibles = {};
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visibles[en.target.id] = en.isIntersecting; });
      var current = links.map(function (a) { return a.getAttribute('href').slice(1); })
        .filter(function (id) { return visibles[id]; }).pop();
      links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + current); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (a) {
      var s = document.querySelector(a.getAttribute('href'));
      if (s) spy.observe(s);
    });
  }

  // Onglets produits (clavier : flèches gauche/droite)
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function selectTab(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab); });
    tab.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      var next = tabs[(i + d + tabs.length) % tabs.length];
      selectTab(next);
      next.focus();
    });
  });

  // Visionneuse de la galerie pâtisserie
  var lb = document.getElementById('lightbox');
  var lbImg = lb.querySelector('img');
  document.querySelectorAll('.g-item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      lbImg.src = btn.dataset.full;
      lbImg.alt = btn.querySelector('img').alt;
      if (lb.showModal) lb.showModal();
    });
  });
  lb.querySelector('.lb-close').addEventListener('click', function () { lb.close(); });
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });

  // Boutons qui pré-remplissent l'objet du formulaire
  var sujet = document.getElementById('f-sujet');
  document.querySelectorAll('[data-sujet]').forEach(function (a) {
    a.addEventListener('click', function () { sujet.value = a.dataset.sujet; });
  });

  // Formulaire : ouvre le client e-mail avec le message pré-rempli
  var form = document.getElementById('form-contact');
  var err = form.querySelector('.form-error');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nom = form.nom.value.trim();
    var msg = form.message.value.trim();
    if (!nom || !msg) { err.hidden = false; (nom ? form.message : form.nom).focus(); return; }
    err.hidden = true;
    var body = msg + '\n\n— ' + nom + (form.tel.value.trim() ? '\nTél. : ' + form.tel.value.trim() : '');
    window.location.href = 'mailto:sodepal3@yahoo.fr?subject=' + encodeURIComponent(form.sujet.value) + '&body=' + encodeURIComponent(body);
  });

  // Indicateur « ouvert / fermé » (heure de Ouagadougou = UTC)
  var badge = document.querySelector('.open-now');
  if (badge) {
    var now = new Date();
    var mins = now.getUTCHours() * 60 + now.getUTCMinutes();
    var close = now.getUTCDay() === 0 ? 14 * 60 : 18 * 60;
    var open = mins >= 6 * 60 + 30 && mins < close;
    badge.textContent = open ? 'Ouvert en ce moment' : 'Fermé en ce moment';
    badge.classList.add(open ? 'is-open' : 'is-closed');
    badge.hidden = false;
  }

  // Apparition douce des blocs au défilement
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var items = document.querySelectorAll('.section-head, .about-card, .quality-list li, .ci, .contact-form');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }

  document.getElementById('annee').textContent = new Date().getFullYear();
})();
