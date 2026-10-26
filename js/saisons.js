// SODEPAL SA — temps forts de l'année : Noël, Ramadan, Tabaski, Pâques…
// Pendant une période, un ruban s'affiche en haut de toutes les pages et une diapositive
// à ses couleurs passe en tête du carrousel d'accueil.
//
// Pour activer, couper ou modifier une période : éditer la liste SAISONS ci-dessous.
//   actif   : false pour ne jamais l'afficher
//   debut / fin : 'MM-JJ', repris chaque année (la période peut passer le 31 décembre)
//   paques  : [début, fin] en jours par rapport au dimanche de Pâques, calculé chaque année
//   dates   : { année: ['MM-JJ', 'MM-JJ'] } pour les fêtes du calendrier lunaire. Ces dates
//             sont indicatives : les ajuster dès l'annonce officielle (observation de la lune).
// L'ordre de la liste fixe la priorité quand plusieurs périodes se chevauchent (3 au plus).
//
// Aperçu à tout moment : ajouter ?saison=noel à l'adresse (ou ?saison=aucune pour tout couper).
(function () {
  'use strict';

  var SAISONS = [
    {
      id: 'korite', actif: true,
      dates: { 2027: ['03-08', '03-11'], 2028: ['02-25', '02-28'] },
      ruban: 'Bonne fête de Ramadan ! Aïd Moubarak à toutes les familles',
      eyebrow: 'Korité · Aïd el-Fitr',
      titre: 'Bonne <em>fête</em> de Ramadan', accent: 'Aïd Moubarak',
      texte: 'Gâteaux, biscuits et pièces cocktail pour recevoir parents et amis : nos pâtissiers préparent vos commandes de fête.',
      bouton: 'Commander pour la fête', lien: 'contact.html?sujet=Commande%20de%20p%C3%A2tisserie'
    },
    {
      id: 'tabaski', actif: true,
      dates: { 2027: ['05-10', '05-18'], 2028: ['04-28', '05-06'] },
      ruban: 'Bonne fête de Tabaski ! Gâteaux et biscuits pour recevoir vos proches',
      eyebrow: 'Tabaski · Aïd el-Kébir',
      titre: 'Bonne <em>fête</em> de Tabaski', accent: 'à toutes les familles',
      texte: 'Pour accueillir vos proches, pensez à nos gâteaux, biscuits et bonbons Toedo. Passez commande quelques jours avant la fête.',
      bouton: 'Commander pour la fête', lien: 'contact.html?sujet=Commande%20de%20p%C3%A2tisserie'
    },
    {
      id: 'noel', actif: true, debut: '11-20', fin: '12-26',
      ruban: 'Noël approche : commandez vos gâteaux et douceurs de fête',
      eyebrow: 'Noël · Commandes ouvertes',
      titre: 'Un Noël <em>plein</em> de douceurs', accent: 'fait au Burkina',
      texte: 'Gâteaux de fête, biscuits et bonbons Toedo pour toute la famille. Passez commande à l’avance pour être servi à temps.',
      bouton: 'Commander pour Noël', lien: 'contact.html?sujet=Commande%20de%20p%C3%A2tisserie'
    },
    {
      id: 'nouvel-an', actif: true, debut: '12-27', fin: '01-05',
      ruban: 'Bonne année {annee} ! Pièces cocktail et biscuits pour vos réceptions',
      eyebrow: 'Nouvel An',
      titre: 'Bonne <em>et</em> heureuse année', accent: '{annee}',
      texte: 'Toute l’équipe de SODEPAL vous présente ses meilleurs vœux. Pour vos réceptions, pensez à nos pièces cocktail et à nos biscuits.',
      bouton: 'Demander un devis', lien: 'contact.html?sujet=Commande%20de%20p%C3%A2tisserie'
    },
    {
      id: 'paques', actif: true, paques: [-7, 1],
      ruban: 'Joyeuses Pâques ! Gâteaux et douceurs pour vos repas de fête',
      eyebrow: 'Pâques',
      titre: 'Joyeuses <em>Pâques</em>', accent: 'en famille',
      texte: 'Gâteaux de fête, biscuits et bonbons Toedo pour le repas de Pâques et pour les enfants. Pensez à commander à l’avance.',
      bouton: 'Commander pour Pâques', lien: 'contact.html?sujet=Commande%20de%20p%C3%A2tisserie'
    },
    {
      id: 'maouloud', actif: true,
      dates: { 2027: ['08-12', '08-16'], 2028: ['08-01', '08-05'] },
      ruban: 'Bonne fête du Maouloud à toute la communauté musulmane',
      eyebrow: 'Maouloud',
      titre: 'Bonne <em>fête</em> du Maouloud', accent: 'paix et partage',
      texte: 'SODEPAL souhaite une bonne fête du Maouloud à toutes les familles. Pour vos veillées et vos invités : biscuits, bonbons et pâtisseries.',
      bouton: 'Voir les biscuits', lien: 'produits.html#biscuits'
    },
    {
      id: 'ramadan', actif: true,
      dates: { 2027: ['02-08', '03-07'], 2028: ['01-28', '02-24'] },
      ruban: 'Ramadan Moubarak : biscuits et douceurs pour la rupture du jeûne',
      eyebrow: 'Mois de Ramadan',
      titre: 'Ramadan <em>Moubarak</em>', accent: 'à toutes les familles',
      texte: 'Pour la rupture du jeûne, retrouvez nos biscuits, nos bonbons Toedo et nos pâtisseries. Commandez à l’avance pour vos repas en famille.',
      bouton: 'Voir les biscuits', lien: 'produits.html#biscuits'
    },
    {
      id: 'careme', actif: true, paques: [-46, -8],
      ruban: 'Bon carême à toutes et à tous',
      eyebrow: 'Temps du carême',
      titre: 'Partager <em>l’essentiel</em>', accent: 'en famille',
      texte: 'Pendant le carême, nos farines et nos biscuits accompagnent des repas simples et nourrissants pour toute la famille.',
      bouton: 'Voir nos produits', lien: 'produits.html'
    },
    {
      id: 'femmes', actif: true, debut: '03-01', fin: '03-08',
      ruban: '8 mars : bonne Journée internationale des femmes',
      eyebrow: '8 mars · Journée internationale des femmes',
      titre: 'Une entreprise <em>créée</em> par une femme', accent: 'depuis 1991',
      texte: 'Fondée par Simone Zoundi et dirigée aujourd’hui par Yolande Alexise Zoundi, SODEPAL salue toutes les femmes qui font vivre l’agroalimentaire burkinabè.',
      bouton: 'Découvrir la fondatrice', lien: 'fondatrice.html'
    },
    {
      id: 'saint-valentin', actif: true, debut: '02-07', fin: '02-14',
      ruban: 'Saint-Valentin : offrez un gâteau préparé par nos pâtissiers',
      eyebrow: '14 février · Saint-Valentin',
      titre: 'Dites-le <em>avec</em> un gâteau', accent: 'fait avec amour',
      texte: 'Gâteaux personnalisés et douceurs à offrir : commandez quelques jours à l’avance pour le 14 février.',
      bouton: 'Commander un gâteau', lien: 'contact.html?sujet=Commande%20de%20p%C3%A2tisserie'
    },
    {
      id: 'rentree', actif: true, debut: '09-15', fin: '10-10',
      ruban: 'C’est la rentrée : des goûters nourrissants pour les écoliers',
      eyebrow: 'Rentrée scolaire',
      titre: 'Bien <em>nourris</em> pour bien apprendre', accent: 'bonne rentrée !',
      texte: 'Bisdelice au moringa, biscuits vanille et sésame : des goûters à glisser dans le cartable. Revendeurs et cantines : contactez-nous pour les grandes quantités.',
      bouton: 'Voir les biscuits', lien: 'produits.html#biscuits'
    }
  ];

  // Textes des pages anglaises (dossier en/), mêmes clés que ci-dessus
  var ANGLAIS = {
    korite: {
      ruban: 'Happy Eid al-Fitr! Eid Mubarak to every family', eyebrow: 'Korité · Eid al-Fitr',
      titre: 'Eid <em>Mubarak</em>', accent: 'to every family',
      texte: 'Cakes, biscuits and party bites to welcome family and friends: our pastry chefs are preparing your celebration orders.',
      bouton: 'Order for the celebration'
    },
    tabaski: {
      ruban: 'Happy Tabaski! Cakes and biscuits to welcome your loved ones', eyebrow: 'Tabaski · Eid al-Adha',
      titre: 'Happy <em>Tabaski</em>', accent: 'to every family',
      texte: 'To welcome your loved ones, try our cakes, biscuits and Toedo sweets. Order a few days before the celebration.',
      bouton: 'Order for the celebration'
    },
    noel: {
      ruban: 'Christmas is coming: order your cakes and festive treats', eyebrow: 'Christmas · Orders open',
      titre: 'A Christmas <em>full</em> of treats', accent: 'made in Burkina',
      texte: 'Festive cakes, biscuits and Toedo sweets for the whole family. Order early to be sure of getting yours in time.',
      bouton: 'Order for Christmas'
    },
    'nouvel-an': {
      ruban: 'Happy New Year {annee}! Party bites and biscuits for your receptions', eyebrow: 'New Year',
      titre: 'Happy <em>New</em> Year', accent: '{annee}',
      texte: 'Everyone at SODEPAL sends you their best wishes. For your receptions, think of our party bites and biscuits.',
      bouton: 'Request a quote'
    },
    paques: {
      ruban: 'Happy Easter! Cakes and treats for your festive meals', eyebrow: 'Easter',
      titre: 'Happy <em>Easter</em>', accent: 'with family',
      texte: 'Festive cakes, biscuits and Toedo sweets for Easter lunch and for the children. Remember to order in advance.',
      bouton: 'Order for Easter'
    },
    maouloud: {
      ruban: 'Happy Mawlid to the whole Muslim community', eyebrow: 'Maouloud · Mawlid',
      titre: 'Happy <em>Mawlid</em>', accent: 'peace and sharing',
      texte: 'SODEPAL wishes every family a happy Mawlid. For your evening gatherings and guests: biscuits, sweets and pastries.',
      bouton: 'See our biscuits'
    },
    ramadan: {
      ruban: 'Ramadan Mubarak: biscuits and treats for breaking the fast', eyebrow: 'Month of Ramadan',
      titre: 'Ramadan <em>Mubarak</em>', accent: 'to every family',
      texte: 'To break the fast, enjoy our biscuits, Toedo sweets and pastries. Order ahead for your family meals.',
      bouton: 'See our biscuits'
    },
    careme: {
      ruban: 'Wishing everyone a blessed Lent', eyebrow: 'Lent',
      titre: 'Sharing <em>what</em> matters', accent: 'as a family',
      texte: 'During Lent, our flours and biscuits go with simple, nourishing meals for the whole family.',
      bouton: 'See our products'
    },
    femmes: {
      ruban: '8 March: happy International Women’s Day', eyebrow: '8 March · International Women’s Day',
      titre: 'A company <em>founded</em> by a woman', accent: 'since 1991',
      texte: 'Founded by Simone Zoundi and now led by Yolande Alexise Zoundi, SODEPAL salutes all the women who drive Burkina Faso’s food industry.',
      bouton: 'Meet our founder'
    },
    'saint-valentin': {
      ruban: 'Valentine’s Day: give a cake made by our pastry chefs', eyebrow: '14 February · Valentine’s Day',
      titre: 'Say it <em>with</em> a cake', accent: 'made with love',
      texte: 'Personalised cakes and treats to give: order a few days ahead for 14 February.',
      bouton: 'Order a cake'
    },
    rentree: {
      ruban: 'Back to school: nourishing snacks for pupils', eyebrow: 'Back to school',
      titre: 'Well <em>fed</em> to learn well', accent: 'have a great year!',
      texte: 'Bisdelice with moringa, vanilla and sesame biscuits: snacks to slip into the school bag. Retailers and school canteens: contact us for large quantities.',
      bouton: 'See our biscuits'
    }
  };

  var EN = document.documentElement.lang === 'en';
  function textes(s) { return EN && ANGLAIS[s.id] ? ANGLAIS[s.id] : s; }

  var MAX = 3;
  var JOUR = 864e5;

  // ---------- Calendrier (heure de Ouagadougou = UTC) ----------
  var now = new Date();
  var today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  var year = now.getUTCFullYear();
  var anneeVoeux = now.getUTCMonth() === 11 ? year + 1 : year;

  function md(y, s) {
    var p = s.split('-');
    return Date.UTC(y, +p[0] - 1, +p[1]);
  }
  // Dimanche de Pâques (calendrier grégorien, algorithme de Meeus)
  function paques(y) {
    var a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4;
    var f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
    var n = h + l - 7 * m + 114;
    return Date.UTC(y, Math.floor(n / 31) - 1, (n % 31) + 1);
  }
  function periode(s, y) {
    var span = s.debut ? [s.debut, s.fin] : s.dates ? s.dates[y] : null;
    if (s.paques) return [paques(y) + s.paques[0] * JOUR, paques(y) + s.paques[1] * JOUR];
    if (!span) return null;
    var start = md(y, span[0]), end = md(y, span[1]);
    if (end < start) end = md(y + 1, span[1]);
    return [start, end];
  }
  function enCours(s) {
    return [year - 1, year].some(function (y) {
      var p = periode(s, y);
      return p && today >= p[0] && today <= p[1];
    });
  }

  var force = new URLSearchParams(location.search).get('saison');
  var actives = force
    ? SAISONS.filter(function (s) { return s.id === force; })
    : SAISONS.filter(function (s) { return s.actif && enCours(s); }).slice(0, MAX);
  if (!actives.length) return;

  function txt(v) { return v.replace(/\{annee\}/g, anneeVoeux); }

  // ---------- Motifs décoratifs, un par période ----------
  function hasard(seed) {
    return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  }
  function delai(r) { return ' style="animation-delay:-' + (r() * 3).toFixed(2) + 's"'; }
  function eclat(x, y, r, couleur, rnd) {
    return '<path class="tw"' + delai(rnd) + ' fill="' + couleur + '" d="M' + x + ' ' + (y - r) + 'Q' + x + ' ' + y + ' ' + (x + r) + ' ' + y +
      'Q' + x + ' ' + y + ' ' + x + ' ' + (y + r) + 'Q' + x + ' ' + y + ' ' + (x - r) + ' ' + y + 'Q' + x + ' ' + y + ' ' + x + ' ' + (y - r) + 'Z"/>';
  }
  function eclats(n, seed, couleurs) {
    var r = hasard(seed), out = '';
    for (var i = 0; i < n; i++) out += eclat(Math.round(40 + r() * 520), Math.round(30 + r() * 540), Math.round(5 + r() * 12), couleurs[i % couleurs.length], r);
    return out;
  }
  function etoile(cx, cy, R, r) {
    var d = '';
    for (var i = 0; i < 10; i++) {
      var a = Math.PI / 5 * i - Math.PI / 2, k = i % 2 ? r : R;
      d += (i ? 'L' : 'M') + (cx + k * Math.cos(a)).toFixed(1) + ' ' + (cy + k * Math.sin(a)).toFixed(1);
    }
    return d + 'Z';
  }
  function croissant(cx, cy, r) {
    var x = cx + r * 0.5, y1 = cy - r * 0.866, y2 = cy + r * 0.866;
    return 'M' + x + ' ' + y1 + 'A' + r + ' ' + r + ' 0 1 0 ' + x + ' ' + y2 + 'A' + r * 0.9 + ' ' + r * 0.9 + ' 0 1 1 ' + x + ' ' + y1 + 'Z';
  }
  function lanterne(x, fil, s, d) {
    return '<g transform="translate(' + x + ' 0)"><g class="sway" style="animation-delay:-' + d + 's">' +
      '<line x1="0" y1="0" x2="0" y2="' + fil + '" stroke="currentColor" stroke-width="1.5" opacity=".7"/>' +
      '<g transform="translate(0 ' + fil + ') scale(' + s + ')" fill="currentColor">' +
      '<path d="M-6 0h12l2 6h-16z"/><path d="M-18 6h36l-6 14h-24z"/>' +
      '<path d="M-14 20h28v44h-28z" fill-opacity=".22" stroke="currentColor" stroke-width="2.5"/>' +
      '<path d="M-14 20L0 42 14 20M-14 64L0 42 14 64" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".6"/>' +
      '<circle class="tw" cx="0" cy="42" r="7" fill="#FFF1C2"/>' +
      '<path d="M-18 64h36l-8 10h-20z"/><path d="M-2 74h4v10h-4z"/></g></g></g>';
  }
  function coeur(x, y, s, couleur, rnd) {
    return '<path class="tw"' + delai(rnd) + ' fill="' + couleur + '" transform="translate(' + x + ' ' + y + ') scale(' + s + ')" d="M0 8C-12-6-28 4 0 26 28 4 12-6 0 8Z"/>';
  }
  function fleur(x, y, s, couleur, coeurFleur) {
    var out = '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')" fill="' + couleur + '">';
    for (var i = 0; i < 5; i++) {
      var a = Math.PI * 2 / 5 * i;
      out += '<circle cx="' + (10 * Math.cos(a)).toFixed(1) + '" cy="' + (10 * Math.sin(a)).toFixed(1) + '" r="8"/>';
    }
    return out + '<circle r="6" fill="' + coeurFleur + '"/></g>';
  }
  function oeuf(x, y, s, rot, fond, trait) {
    return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ') scale(' + s + ')">' +
      '<path d="M0-40C24-40 34 8 30 20 25 38-25 38-30 20-34 8-24-40 0-40Z" fill="' + fond + '"/>' +
      '<path d="M-26 0l8.7-8 8.7 8 8.7-8 8.7 8 8.7-8 8.7 8" fill="none" stroke="' + trait + '" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="M-24 18h48" stroke="' + trait + '" stroke-width="3" stroke-dasharray="2 6" stroke-linecap="round"/></g>';
  }
  function rosace(x, y, a, opacite) {
    return '<g transform="translate(' + x + ' ' + y + ')" fill="none" stroke="currentColor" stroke-width="2" opacity="' + opacite + '">' +
      '<rect x="' + -a / 2 + '" y="' + -a / 2 + '" width="' + a + '" height="' + a + '"/>' +
      '<rect x="' + -a / 2 + '" y="' + -a / 2 + '" width="' + a + '" height="' + a + '" transform="rotate(45)"/>' +
      '<circle r="' + a * 0.18 + '"/></g>';
  }

  var MOTIFS = {
    noel: function () {
      var out = '<path d="M30 330Q300 480 590 290" fill="none" stroke="#fff" stroke-width="2" opacity=".45"/>';
      for (var i = 1; i < 12; i++) {
        var t = i / 12, x = (1 - t) * (1 - t) * 30 + 2 * (1 - t) * t * 300 + t * t * 590, y = (1 - t) * (1 - t) * 330 + 2 * (1 - t) * t * 480 + t * t * 290;
        out += '<circle class="tw" style="animation-delay:-' + (i * 0.4).toFixed(1) + 's" cx="' + x.toFixed(1) + '" cy="' + (y + 12).toFixed(1) + '" r="9" fill="' + (i % 2 ? 'currentColor' : '#fff') + '"/>';
      }
      return out + '<path d="' + etoile(360, 170, 86, 36) + '" fill="currentColor"/>' +
        '<path d="' + etoile(360, 170, 120, 50) + '" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".45"/>' +
        eclats(16, 7, ['currentColor', '#fff']);
    },
    'nouvel-an': function () {
      var r = hasard(11), out = '', couleurs = ['currentColor', '#fff', '#7DB343', '#F28B82'];
      for (var i = 0; i < 46; i++) {
        out += '<rect class="tw"' + delai(r) + ' x="' + Math.round(r() * 580) + '" y="' + Math.round(r() * 580) + '" width="' + Math.round(6 + r() * 8) + '" height="' + Math.round(14 + r() * 10) +
          '" rx="2" fill="' + couleurs[i % 4] + '" transform="rotate(' + Math.round(r() * 180) + ' 300 300)" opacity=".85"/>';
      }
      return out + '<text x="300" y="370" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-weight="800" font-size="200" fill="none" stroke="currentColor" stroke-width="2.5">' + anneeVoeux + '</text>';
    },
    'saint-valentin': function () {
      var r = hasard(5), out = '<path transform="translate(330 170) scale(9)" d="M0 8C-12-6-28 4 0 26 28 4 12-6 0 8Z" fill="none" stroke="currentColor" stroke-width=".35"/>';
      for (var i = 0; i < 16; i++) out += coeur(Math.round(40 + r() * 520), Math.round(40 + r() * 500), (0.6 + r() * 1.4).toFixed(2), i % 3 ? 'currentColor' : '#fff', r);
      return out;
    },
    femmes: function () {
      var r = hasard(8), out = '<text x="330" y="470" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-weight="800" font-size="460" fill="none" stroke="currentColor" stroke-width="3">8</text>';
      for (var i = 0; i < 9; i++) out += fleur(Math.round(60 + r() * 480), Math.round(60 + r() * 480), (0.7 + r() * 1.2).toFixed(2), i % 2 ? 'currentColor' : '#fff', i % 2 ? '#fff' : '#F2B632');
      return out + eclats(8, 3, ['#fff']);
    },
    careme: function () {
      var out = '<circle cx="330" cy="260" r="170" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".5"/>' +
        '<circle cx="330" cy="260" r="120" fill="currentColor" opacity=".12"/>' +
        '<path d="M150 470C260 400 360 300 470 140" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>';
      for (var i = 1; i < 9; i++) {
        var t = i / 9, x = 150 + 320 * t, y = 470 - 330 * t + Math.sin(t * Math.PI) * -20, side = i % 2 ? 1 : -1;
        out += '<ellipse cx="' + (x + side * 22).toFixed(0) + '" cy="' + (y + side * 6).toFixed(0) + '" rx="26" ry="10" fill="currentColor" opacity=".85" transform="rotate(' + (side > 0 ? -60 : 30) + ' ' + (x + side * 22).toFixed(0) + ' ' + (y + side * 6).toFixed(0) + ')"/>';
      }
      return out;
    },
    ramadan: function () {
      return '<path d="' + croissant(330, 250, 150) + '" fill="currentColor"/>' +
        lanterne(110, 130, 1.4, 0.5) + lanterne(500, 70, 1.1, 1.6) + lanterne(570, 190, 0.9, 2.4) +
        eclats(18, 4, ['#fff', 'currentColor']);
    },
    korite: function () {
      return '<path d="' + croissant(300, 280, 170) + '" fill="currentColor"/>' +
        '<path class="tw" d="' + etoile(390, 230, 46, 19) + '" fill="#fff"/>' +
        '<circle cx="300" cy="280" r="235" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 14" stroke-linecap="round"/>' +
        eclats(14, 9, ['#fff', 'currentColor']);
    },
    tabaski: function () {
      var out = '';
      for (var x = 0; x <= 600; x += 150) for (var y = 0; y <= 600; y += 150) out += rosace(x, y, 70, ((x + y) / 150) % 2 ? 0.35 : 0.7);
      return out + rosace(330, 300, 200, 1) + '<circle cx="330" cy="300" r="40" fill="currentColor"/>';
    },
    paques: function () {
      return fleur(90, 110, 1.6, '#fff', '#F2B632') + fleur(520, 80, 1.2, 'currentColor', '#fff') + fleur(560, 470, 1.4, '#fff', '#7DB343') +
        oeuf(250, 330, 2.6, -12, 'currentColor', '#fff') + oeuf(420, 250, 2.1, 14, '#fff', '#7DB343') + oeuf(430, 450, 1.7, -4, '#7DB343', '#fff') +
        eclats(8, 6, ['#fff']);
    },
    maouloud: function () {
      var out = '';
      for (var i = 0; i < 24; i++) {
        var a = Math.PI * 2 / 24 * i;
        out += '<line x1="' + (330 + 130 * Math.cos(a)).toFixed(0) + '" y1="' + (270 + 130 * Math.sin(a)).toFixed(0) + '" x2="' + (330 + (i % 2 ? 210 : 260) * Math.cos(a)).toFixed(0) +
          '" y2="' + (270 + (i % 2 ? 210 : 260) * Math.sin(a)).toFixed(0) + '" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".4"/>';
      }
      return out + '<path d="' + croissant(320, 270, 100) + '" fill="currentColor"/><path class="tw" d="' + etoile(380, 250, 30, 12) + '" fill="#fff"/>' + eclats(10, 2, ['#fff']);
    },
    rentree: function () {
      var lignes = '';
      for (var i = 0; i < 9; i++) lignes += '<path d="M20 ' + (70 + i * 32) + 'h260" stroke="#9DC0EA" stroke-width="2"/>';
      return '<g transform="translate(130 120) rotate(-8)"><rect width="300" height="380" rx="10" fill="#fff" opacity=".95"/>' + lignes +
        '<path d="M56 20v350" stroke="#F28B82" stroke-width="2"/>' +
        '<text x="74" y="126" font-family="Fraunces, Georgia, serif" font-style="italic" font-size="58" fill="#173D6E">Abc</text>' +
        '<text x="74" y="222" font-family="Fraunces, Georgia, serif" font-style="italic" font-size="42" fill="#173D6E">1 + 2 = 3</text></g>' +
        '<g transform="translate(520 70) rotate(28)"><rect width="36" height="300" rx="4" fill="currentColor"/><rect width="36" height="28" rx="4" fill="#F28B82"/>' +
        '<rect y="28" width="36" height="10" fill="#D8DDE3"/><path d="M0 300L18 352 36 300Z" fill="#F5D7A8"/><path d="M12 335L18 352 24 335Z" fill="#333"/></g>' +
        eclats(8, 12, ['currentColor', '#fff']);
    }
  };
  var ICONES = {
    lune: '<path d="M15 3a9 9 0 100 18 7 7 0 010-18z"/>',
    coeur: '<path d="M12 20s-8-5-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 9c0 6-8 11-8 11z"/>',
    etoile: '<path d="M12 2l2.6 6.9L22 9.3l-5.7 4.6L18.2 21 12 17l-6.2 4 1.9-7.1L2 9.3l7.4-.4z"/>'
  };
  function icone(id) {
    var nom = /ramadan|korite|tabaski|maouloud/.test(id) ? 'lune' : id === 'saint-valentin' ? 'coeur' : 'etoile';
    return '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">' + ICONES[nom] + '</svg>';
  }

  // ---------- Ruban en haut de page ----------
  var s0 = actives[0];
  var cle = 'sodepal-ruban-' + s0.id;
  var masque = false;
  try { masque = !force && sessionStorage.getItem(cle) === '1'; } catch (e) {}
  var topbar = document.querySelector('.topbar');
  if (topbar && !masque) {
    var ruban = document.createElement('div');
    ruban.className = 'ruban saison-' + s0.id;
    ruban.setAttribute('role', 'region');
    ruban.setAttribute('aria-label', EN ? 'Seasonal news' : 'Temps fort du moment');
    ruban.innerHTML = '<div class="wrap ruban-inner"><span class="ruban-ico">' + icone(s0.id) + '</span>' +
      '<a href="' + s0.lien + '">' + txt(textes(s0).ruban) + '</a>' +
      '<button class="ruban-close" type="button" aria-label="' + (EN ? 'Hide this message' : 'Masquer ce message') + '">×</button></div>';
    ruban.querySelector('.ruban-close').addEventListener('click', function () {
      ruban.remove();
      try { sessionStorage.setItem(cle, '1'); } catch (e) {}
    });
    topbar.parentNode.insertBefore(ruban, topbar);
  }

  // ---------- Diapositives du carrousel d'accueil ----------
  var hero = document.querySelector('.hero');
  if (!hero) return;
  var conteneur = hero.querySelector('.slides');
  var points = hero.querySelector('.dots');
  actives.slice().reverse().forEach(function (s) {
    var L = textes(s);
    var slide = document.createElement('article');
    slide.className = 'slide slide-saison saison-' + s.id;
    slide.setAttribute('aria-roledescription', 'diapositive');
    slide.innerHTML =
      '<div class="slide-bg slide-bg-saison" aria-hidden="true"><svg class="saison-motif" viewBox="0 0 600 600" aria-hidden="true">' + MOTIFS[s.id]() + '</svg></div>' +
      '<div class="wrap slide-content">' +
        '<p class="eyebrow eyebrow-light">' + L.eyebrow + '</p>' +
        '<p class="display">' + txt(L.titre) + ' <span class="accent">' + txt(L.accent) + '</span></p>' +
        '<p class="slide-lead">' + L.texte + '</p>' +
        '<div class="slide-cta"><a class="btn btn-corn" href="' + s.lien + '">' + L.bouton +
          ' <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></div>' +
      '</div>';
    conteneur.insertBefore(slide, conteneur.firstChild);
    points.appendChild(document.createElement('button'));
  });
  var slides = conteneur.querySelectorAll('.slide');
  var total = slides.length;
  Array.prototype.forEach.call(slides, function (sl, i) {
    sl.classList.toggle('is-active', i === 0);
    sl.setAttribute('aria-hidden', String(i !== 0));
    sl.setAttribute('aria-label', (i + 1) + (EN ? ' of ' : ' sur ') + total);
  });
  Array.prototype.forEach.call(points.querySelectorAll('button'), function (b, i) {
    b.setAttribute('aria-label', (EN ? 'Slide ' : 'Diapositive ') + (i + 1));
  });
  var compteur = hero.querySelector('.counter > span:last-child');
  if (compteur) compteur.textContent = String(total).padStart(2, '0');
})();
