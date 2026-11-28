/* Mesure d'audience Google Analytics 4, chargée seulement après accord du visiteur. */
(function () {
  'use strict';
  var GA_ID = 'G-XXXXXXXXXX'; // À remplacer par l'identifiant de mesure du flux GA4
  if (!/^G-[A-Z0-9]{6,}$/.test(GA_ID) || GA_ID === 'G-XXXXXXXXXX') return; // inactif tant que l'identifiant manque

  var KEY = 'sodepal-consent';
  var en = (document.documentElement.lang || 'fr').indexOf('en') === 0;
  var T = en ? {
    msg: 'We use cookies to measure audience and improve our communication. No data is used for advertising.',
    yes: 'Accept', no: 'Decline', manage: 'Cookie settings', label: 'Cookies'
  } : {
    msg: 'Nous utilisons des cookies pour mesurer l’audience et améliorer notre communication. Aucune donnée n’est utilisée pour de la publicité.',
    yes: 'Accepter', no: 'Refuser', manage: 'Gérer les cookies', label: 'Cookies'
  };

  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  var loaded = false;
  function load() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      var h = a.getAttribute('href') || '';
      if (h.indexOf('tel:') === 0) window.gtag('event', 'clic_appel');
      else if (h.indexOf('mailto:') === 0) window.gtag('event', 'clic_email');
      else if (/wa\.me|whatsapp/i.test(h)) window.gtag('event', 'clic_whatsapp');
    });
  }

  function stop() {
    window['ga-disable-' + GA_ID] = true;
    document.cookie.split(';').forEach(function (c) {
      var n = c.split('=')[0].trim();
      if (n.indexOf('_ga') === 0) {
        document.cookie = n + '=; Max-Age=0; path=/';
        document.cookie = n + '=; Max-Age=0; path=/; domain=' + location.hostname;
      }
    });
  }

  function banner() {
    var old = document.getElementById('cookie-banner');
    if (old) old.remove();
    var b = document.createElement('div');
    b.id = 'cookie-banner';
    b.className = 'cookie-banner';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', T.label);
    var p = document.createElement('p');
    p.textContent = T.msg;
    var yes = document.createElement('button');
    yes.type = 'button'; yes.className = 'btn btn-primary'; yes.textContent = T.yes;
    var no = document.createElement('button');
    no.type = 'button'; no.className = 'btn btn-ghost'; no.textContent = T.no;
    yes.addEventListener('click', function () { set('yes'); b.remove(); load(); });
    no.addEventListener('click', function () { set('no'); b.remove(); stop(); });
    b.appendChild(p); b.appendChild(yes); b.appendChild(no);
    document.body.appendChild(b);
  }

  function init() {
    var host = document.querySelector('.footer-bottom');
    if (host) {
      var l = document.createElement('p');
      var btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'cookie-link'; btn.textContent = T.manage;
      btn.addEventListener('click', banner);
      l.appendChild(btn); host.appendChild(l);
    }
    var c = get();
    if (c === 'yes') load();
    else if (c !== 'no') banner();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
