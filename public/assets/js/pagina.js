/* Hello Mendoza — arma la página a partir de contenido.js
   No hace falta editar este archivo: todo el contenido está en contenido.js */
(function () {
  'use strict';
  var root = document.documentElement;
  var LANG = root.getAttribute('data-lang') || 'es';
  var BASE = LANG === 'es' ? '' : '../';
  var app = document.getElementById('app');

  function fail(msg) {
    app.innerHTML = '<div class="oops"><h1>Hello Mendoza</h1><p>' + msg + '</p></div>';
    throw new Error(msg);
  }
  var C = window.HM_CONTENIDO;
  if (!C) {
    var e = window.HM_ERROR;
    if (!e) fail('No se pudo leer <strong>contenido.js</strong>. Revisá que el archivo esté en la carpeta public_html con ese nombre exacto.');
    fail('Hay un error de escritura en <strong>contenido.js</strong>' + (e && e.line ? ', cerca de la <strong>línea ' + e.line + '</strong>' : '') +
      '. Revisá que el texto esté entre comillas simples y que cada línea termine en coma.' + (e && e.msg ? '<br><small>Detalle: ' + esc(e.msg) + '</small>' : ''));
  }

  /* ---------- utilidades ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function mark(s) { return s.replace(/\[([^\]]+)\]/g, '<span class="ph">[$1]</span>'); }
  function t(s) { return mark(esc(s)); }
  function tHtml(s) { return mark(String(s == null ? '' : s)); } // permite <em>
  function isPh(s) { return /^\s*\[.*\]\s*$/.test(String(s || '')) || !String(s || '').trim(); }
  function isTri(o) { return o && typeof o === 'object' && !Array.isArray(o) && 'es' in o; }
  // Elige el idioma activo; si falta la traducción usa el español.
  function pick(o) {
    if (isTri(o)) return o[LANG] != null && o[LANG] !== '' ? o[LANG] : o.es;
    if (Array.isArray(o)) return o.map(pick);
    if (o && typeof o === 'object') { var r = {}; for (var k in o) r[k] = pick(o[k]); return r; }
    return o;
  }
  function slug(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'tour'; }
  function foto(f) { return BASE + 'fotos/' + encodeURI(String(f || '').trim()); }
  function img(file, alt, opts) {
    opts = opts || {};
    return '<img src="' + foto(file) + '" alt="' + esc(alt) + '"' + (opts.eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"') +
      (opts.w ? ' width="' + opts.w + '" height="' + opts.h + '"' : '') + ' onerror="this.classList.add(\'is-missing\')">';
  }
  function ic(n, c) { return '<svg class="' + (c || 'ic') + '" aria-hidden="true" focusable="false"><use href="#i-' + n + '"/></svg>'; }

  var A = C.ajustes || {};
  var L = pick(C.textos || {});
  var wa = function (msg) { return 'https://wa.me/' + String(A.whatsapp || '').replace(/\D/g, '') + '?text=' + encodeURIComponent(msg); };
  var priceTxt = { es: '[precio]', en: '[price]', pt: '[preço]' }[LANG];

  /* ---------- tours ---------- */
  var used = {};
  var tours = (C.tours || []).map(function (raw) {
    var x = pick(raw);
    var id = slug(raw.nombre && raw.nombre.es ? raw.nombre.es : x.nombre);
    while (used[id]) id += '-2';
    used[id] = 1;
    var fotos = (raw.fotos || []).map(function (f) { return { archivo: f.archivo, alt: pick(f) }; });
    return {
      id: id, type: x.tipo, zone: x.zona, hours: x.horas,
      price: isPh(x.precio) ? priceTxt : String(x.precio).replace(/^\s*USD\s*/i, ''),
      name: x.nombre || '', stops: x.paradas || '', line: x.resumen || '', summary: x.descripcion || '',
      photos: fotos,
      itinerary: (raw.itinerario || []).map(function (r) { return [r.hora || '', pick({ es: r.es, en: r.en, pt: r.pt })]; }),
      includes: x.incluye || [], excludes: x.noIncluye || [], wineries: x.bodegas || null
    };
  });
  var cardPhoto = function (x) { return x.photos[0] || { archivo: '', alt: x.name }; };

  /* ---------- meta (título y descripción en Google) ---------- */
  if (L.meta) {
    document.title = L.meta.title;
    var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute('content', L.meta.description);
  }
  var site = location.origin;
  var trip = A.tripadvisorUrl || '';
  var tripHref = isPh(trip) ? '#' : trip;
  var tripAttr = isPh(trip) ? '' : ' target="_blank" rel="noopener"';
  var igUser = String(A.instagram || '').replace(/^@/, '');
  var ig = 'https://www.instagram.com/' + igUser + '/';

  /* datos estructurados TravelAgency */
  var ld = {
    '@context': 'https://schema.org', '@type': 'TravelAgency', name: 'Hello Mendoza', slogan: L.slogan,
    description: L.meta && L.meta.description, url: site + '/' + (LANG === 'es' ? '' : LANG + '/'),
    telephone: '+' + String(A.whatsapp || '').replace(/\D/g, ''),
    address: { '@type': 'PostalAddress', addressLocality: 'Mendoza', addressRegion: 'Mendoza', addressCountry: 'AR' },
    areaServed: ['Luján de Cuyo', 'Maipú', 'Valle de Uco', 'Mendoza'].map(function (n) { return { '@type': 'Place', name: n }; }),
    knowsLanguage: ['es', 'en', 'pt'], sameAs: [ig].concat(isPh(trip) ? [] : [trip]),
    makesOffer: tours.map(function (x) {
      var o = { '@type': 'Offer', itemOffered: { '@type': 'TouristTrip', name: x.name, description: x.line } };
      if (!isPh(x.price) && x.price !== priceTxt) { o.price = x.price; o.priceCurrency = 'USD'; }
      return o;
    })
  };
  if (!isPh(A.email)) ld.email = A.email;
  if (!isPh(A.direccion)) ld.address.streetAddress = A.direccion;
  var s = document.createElement('script'); s.type = 'application/ld+json'; s.textContent = JSON.stringify(ld); document.head.appendChild(s);

  /* ---------- piezas ---------- */
  var LANGS = [['es', '', 'Español'], ['en', 'en/', 'English'], ['pt', 'pt/', 'Português']];
  function langSwitch(extra) {
    return '<nav class="lang ' + (extra || '') + '" aria-label="' + esc(L.nav.lang) + '">' + LANGS.map(function (o) {
      return '<a href="' + BASE + o[1] + '" hreflang="' + o[0] + '" lang="' + o[0] + '" data-lang="' + o[0] + '"' + (o[0] === LANG ? ' aria-current="true"' : '') + ' title="' + o[2] + '">' + o[0].toUpperCase() + '</a>';
    }).join('') + '</nav>';
  }
  var navLinks = [['#tours', L.nav.tours], ['#how', L.nav.how], ['#about', L.nav.about], ['#reviews', L.nav.reviews], ['#faq', L.nav.faq]];
  var waGeneral = wa(L.wa.general);
  var waLink = function (cls, label, place, icon) { return '<a class="' + cls + '" href="' + waGeneral + '" target="_blank" rel="noopener" data-wa="' + place + '">' + (icon === false ? '' : ic('chat')) + label + '</a>'; };
  var uniq = function (arr) { return arr.filter(function (v, i) { return v && arr.indexOf(v) === i; }); };
  var typeKeys = uniq(tours.map(function (x) { return x.type; }));
  var zoneKeys = uniq(tours.map(function (x) { return x.zone; }));
  var label = function (map, k) { return (map && map[k]) || k; };
  var chips = function (keys, map) { return keys.map(function (k) { return '<button type="button" class="chip" aria-pressed="false" data-value="' + esc(k) + '">' + esc(label(map, k)) + '</button>'; }).join(''); };
  var P = C.portada || {};
  var reviews = C.opiniones || [];
  var stars = function (n) {
    var v = parseFloat(n);
    if (isNaN(v)) return ic('star', 'ic ic--star') + ' ' + t(n || '[puntaje]');
    var out = ''; for (var i = 1; i <= 5; i++) out += ic('star', 'ic ic--star' + (i <= Math.round(v) ? '' : ' ic--off'));
    return '<span class="sr-only">' + v + '/5</span>' + out;
  };
  var scoreTxt = isPh(A.tripadvisorPuntaje) ? (L.reviews && L.reviews.score) || '[puntaje]' : A.tripadvisorPuntaje;

  /* ---------- página ---------- */
  var html =
'<a class="skip" href="#main">' + esc(L.skip) + '</a>' +
'<header class="bar" data-bar><div class="bar__in wrap">' +
  '<a class="brand" href="#top" aria-label="' + esc(L.nav.home) + '">' +
    '<img class="brand__img" src="' + BASE + 'assets/img/logo.png" alt="Hello Mendoza" width="96" height="96"></a>' +
  '<nav class="nav" aria-label="' + esc(L.nav.menu) + '"><ul class="nav__list" id="nav-list">' +
    navLinks.map(function (n) { return '<li><a href="' + n[0] + '">' + esc(n[1]) + '</a></li>'; }).join('') +
    '<li class="nav__cta-m">' + waLink('btn btn--primary btn--block', esc(L.nav.book), 'menu') + '</li></ul></nav>' +
  langSwitch() +
  '<a class="btn btn--primary btn--sm bar__cta" href="' + waGeneral + '" target="_blank" rel="noopener" data-wa="header">' + ic('chat') + '<span>' + esc(L.nav.book) + '</span></a>' +
  '<button class="burger" type="button" aria-expanded="false" aria-controls="nav-list" data-open="' + esc(L.nav.menu) + '" data-close="' + esc(L.nav.close) + '" aria-label="' + esc(L.nav.menu) + '">' + ic('menu', 'ic burger__open') + ic('x', 'ic burger__close') + '</button>' +
'</div></header>' +

'<main id="main">' +
'<section class="hero" id="top" aria-labelledby="hero-title">' +
  '<picture class="hero__media"><source media="(max-width: 699px)" srcset="' + foto(P.celular || P.escritorio) + '">' + img(P.escritorio, L.hero.imgAlt, { eager: true, w: 1920, h: 1080 }) + '</picture>' +
  '<div class="hero__in wrap">' +
    '<h1 class="hero__title" id="hero-title">' + tHtml(L.hero.title) + '</h1>' +
    '<p class="hero__sub">' + t(L.hero.sub) + '</p>' +
    '<div class="hero__ctas"><a class="btn btn--light" href="#tours">' + esc(L.hero.ctaTours) + ic('arrow') + '</a>' + waLink('btn btn--primary', esc(L.hero.ctaWa), 'hero') + '</div>' +
    '<ul class="trust" role="list"><li><a href="' + esc(tripHref) + '"' + tripAttr + ' class="trust__score">' + t(scoreTxt) + ' ' + ic('star', 'ic ic--star') + ' ' + esc(L.hero.trustScore) + '</a></li>' +
      (L.hero.trust || []).map(function (x) { return '<li>' + t(x) + '</li>'; }).join('') + '</ul>' +
  '</div></section>' +

'<section class="diffs section" aria-labelledby="diffs-title"><div class="wrap diffs__grid">' +
  '<h2 class="h2 diffs__title reveal" id="diffs-title">' + t(L.diffs.title) + '</h2><ul class="diffs__list" role="list">' +
  (L.diffs.items || []).map(function (d) { return '<li class="diff reveal"><span class="diff__icon">' + ic(d.icon || 'glass') + '</span><h3 class="diff__title">' + t(d.title) + '</h3><p>' + t(d.text) + '</p></li>'; }).join('') +
'</ul></div></section>' +

'<section class="tours section" id="tours" aria-labelledby="tours-title"><div class="wrap">' +
  '<div class="sec-head"><h2 class="h2 reveal" id="tours-title">' + t(L.tours.title) + '</h2><p class="lede reveal">' + t(L.tours.intro) + '</p></div>' +
  '<div class="filters">' +
    '<div class="filters__row"><span class="filters__label" id="f-type">' + esc(L.tours.filterType) + '</span><div class="chips" role="group" aria-labelledby="f-type" data-filter="type">' +
      '<button type="button" class="chip" aria-pressed="true" data-value="all">' + esc(L.tours.all) + '</button>' + chips(typeKeys, L.tours.types) + '</div></div>' +
    '<div class="filters__row"><span class="filters__label" id="f-zone">' + esc(L.tours.filterZone) + '</span><div class="chips" role="group" aria-labelledby="f-zone" data-filter="zone">' +
      '<button type="button" class="chip" aria-pressed="true" data-value="all">' + esc(L.tours.allZones) + '</button>' + chips(zoneKeys, L.tours.zones) + '</div></div>' +
  '</div><p class="sr-only" aria-live="polite" data-count></p>' +
  '<ul class="grid-tours" role="list">' + tours.map(function (x) {
    var p = cardPhoto(x);
    return '<li class="tour reveal" data-type="' + esc(x.type) + '" data-zone="' + esc(x.zone) + '" data-id="' + x.id + '">' +
      '<div class="tour__media">' + img(p.archivo, p.alt, { w: 1600, h: 1067 }) + '</div>' +
      '<div class="tour__body"><p class="tour__meta"><span>' + esc(label(L.tours.zones, x.zone)) + '</span><span aria-hidden="true">·</span><span>' + ic('clock', 'ic ic--sm') + esc(x.hours) + ' ' + esc(L.tours.hours) + '</span></p>' +
      '<h3 class="tour__name"><a href="#tour-' + x.id + '" data-tour="' + x.id + '" aria-haspopup="dialog">' + t(x.name) + '</a></h3>' +
      (x.stops ? '<p class="tour__stops">' + t(x.stops) + '</p>' : '') + '<p class="tour__line">' + t(x.line) + '</p>' +
      '<div class="tour__foot"><p class="tour__price"><span>' + esc(L.tours.from) + '</span> <strong>USD ' + t(x.price) + '</strong> <span>' + esc(L.tours.perPerson) + '</span></p>' +
      '<span class="tour__more" aria-hidden="true">' + esc(L.tours.details) + ic('arrow', 'ic ic--sm') + '</span></div></div></li>';
  }).join('') + '</ul>' +
  '<div class="tours__empty" hidden data-empty><p>' + esc(L.tours.empty) + '</p><button type="button" class="btn btn--outline btn--sm" data-reset>' + esc(L.tours.reset) + '</button></div>' +
'</div></section>' +

'<section class="custom" aria-labelledby="custom-title"><div class="wrap custom__grid">' +
  '<div class="custom__media reveal">' + img(P.aMedida, L.custom.imgAlt, { w: 1600, h: 1067 }) + '</div>' +
  '<div class="custom__body"><h2 class="h2 reveal" id="custom-title">' + t(L.custom.title) + '</h2><p class="reveal">' + t(L.custom.text) + '</p>' +
  '<a class="btn btn--light reveal" href="' + wa(L.wa.custom) + '" target="_blank" rel="noopener" data-wa="custom">' + ic('chat') + esc(L.custom.cta) + '</a></div>' +
'</div></section>' +

'<section class="how section" id="how" aria-labelledby="how-title"><div class="wrap">' +
  '<div class="sec-head"><h2 class="h2 reveal" id="how-title">' + t(L.how.title) + '</h2><p class="lede reveal">' + t(L.how.intro) + '</p></div>' +
  '<ol class="steps">' + (L.how.steps || []).map(function (st, i) { return '<li class="step reveal"><span class="step__n" aria-hidden="true">' + (i + 1) + '</span><h3 class="step__title">' + t(st.title) + '</h3><p>' + t(st.text) + '</p></li>'; }).join('') + '</ol>' +
'</div></section>' +

'<section class="about section" id="about" aria-labelledby="about-title"><div class="wrap about__grid">' +
  '<div class="about__text"><h2 class="h2 reveal" id="about-title">' + t(L.about.title) + '</h2><p class="about__lead reveal">' + t(L.about.lead) + '</p><p class="reveal">' + t(L.about.story) + '</p>' +
  '<h3 class="about__langs-title reveal">' + t(L.about.langsTitle) + '</h3><ul class="pills reveal" role="list"><li lang="es">Español</li><li lang="en">English</li><li lang="pt">Português</li></ul></div>' +
  '<ul class="guides" role="list">' + (C.guias || []).map(function (g) {
    var role = pick(g.idiomas);
    return '<li class="guide reveal"><div class="guide__photo">' + img(g.archivo, isPh(g.nombre) ? 'Hello Mendoza' : g.nombre + ' · Hello Mendoza', { w: 800, h: 1000 }) + '</div><p class="guide__name">' + t(g.nombre) + '</p><p class="guide__role">' + t(role) + '</p></li>';
  }).join('') + '</ul>' +
'</div></section>' +

'<section class="reviews section" id="reviews" aria-labelledby="reviews-title"><div class="wrap">' +
  '<div class="sec-head"><h2 class="h2 reveal" id="reviews-title">' + t(L.reviews.title) + '</h2><p class="lede reveal">' + t(L.reviews.intro) + '</p></div>' +
  '<ul class="review-list" role="list">' + reviews.map(function (r) {
    return '<li class="review reveal"><figure><p class="review__score"><span class="review__stars">' + stars(r.puntaje) + '</span> <span class="review__src">' + esc(L.tripadvisor || 'Tripadvisor') + '</span></p>' +
      '<blockquote><p>' + t(r.texto) + '</p></blockquote><figcaption><strong>' + t(r.nombre) + '</strong> <span>' + t(r.pais) + '</span></figcaption></figure></li>';
  }).join('') + '</ul>' +
  '<p class="reviews__cta reveal"><a class="link" href="' + esc(tripHref) + '"' + tripAttr + '>' + esc(L.reviews.cta) + ic('external', 'ic ic--sm') + '</a> ' + (isPh(trip) ? t(trip) : '') + '</p>' +
'</div></section>' +

'<section class="gallery section" aria-labelledby="gallery-title"><div class="wrap">' +
  '<div class="sec-head sec-head--row"><div><h2 class="h2 reveal" id="gallery-title">' + t(L.gallery.title) + '</h2><p class="lede reveal">' + t(L.gallery.text) + '</p></div>' +
  '<a class="btn btn--outline reveal" href="' + ig + '" target="_blank" rel="noopener">' + ic('instagram') + '@' + esc(igUser) + '</a></div>' +
  '<ul class="gal" role="list">' + (C.galeria || []).map(function (g) {
    return '<li class="gal__item' + (g.vertical ? ' gal__item--tall' : '') + ' reveal">' + img(g.archivo, pick(g), g.vertical ? { w: 1200, h: 1500 } : { w: 1200, h: 800 }) + '</li>';
  }).join('') + '</ul>' +
'</div></section>' +

'<section class="faq section" id="faq" aria-labelledby="faq-title"><div class="wrap faq__grid">' +
  '<h2 class="h2 reveal" id="faq-title">' + t(L.faq.title) + '</h2><div class="faq__list">' +
  (C.preguntas || []).map(function (f) { return '<details class="qa reveal"><summary><span>' + t(pick(f.pregunta)) + '</span>' + ic('plus', 'ic qa__icon') + '</summary><div class="qa__a"><p>' + t(pick(f.respuesta)) + '</p></div></details>'; }).join('') +
'</div></div></section>' +

'<section class="book section" id="book" aria-labelledby="book-title"><div class="wrap book__grid">' +
  '<div class="book__intro"><h2 class="h2 reveal" id="book-title">' + t(L.book.title) + '</h2><p class="lede reveal">' + t(L.book.intro) + '</p>' +
    '<div class="book__wa reveal"><p class="book__wa-title">' + t(L.book.waTitle) + '</p><p>' + t(L.book.waText) + '</p>' + waLink('btn btn--primary', esc(L.book.waCta), 'booking') + '</div>' +
    '<dl class="book__facts reveal"><div><dt>' + ic('card') + t(L.book.payTitle) + '</dt><dd>' + t(L.book.payText) + '</dd></div><div><dt>' + ic('shield') + t(L.book.cancelTitle) + '</dt><dd>' + t(L.book.cancelText) + '</dd></div></dl></div>' +
  '<form class="form reveal" id="booking-form" novalidate>' +
    field('f-name', 'nombre', L.book.name, '<input id="f-name" name="nombre" type="text" autocomplete="name" required>') +
    '<div class="field-row">' +
      field('f-email', 'email', L.book.email, '<input id="f-email" name="email" type="email" autocomplete="email" inputmode="email" required>') +
      field('f-phone', 'telefono', L.book.phone, '<input id="f-phone" name="telefono" type="tel" autocomplete="tel" inputmode="tel" required aria-describedby="f-phone-hint"><p class="field__hint" id="f-phone-hint">' + esc(L.book.phoneHint) + '</p>') +
    '</div>' +
    field('f-tour', 'tour', L.book.tour, '<div class="select"><select id="f-tour" name="tour" required><option value="">' + esc(L.book.tourPlaceholder) + '</option>' +
      tours.map(function (x) { return '<option value="' + esc(x.name) + '" data-id="' + x.id + '">' + esc(x.name) + '</option>'; }).join('') +
      '<option value="' + esc(L.book.tourCustom) + '" data-id="custom">' + esc(L.book.tourCustom) + '</option></select>' + ic('down', 'ic select__ic') + '</div>') +
    '<div class="field-row field-row--3">' +
      field('f-date', 'fecha', L.book.date, '<input id="f-date" name="fecha" type="date" required>') +
      field('f-people', 'personas', L.book.people, '<input id="f-people" name="personas" type="number" inputmode="numeric" min="1" max="60" value="2" required>') +
      '<div class="field"><label for="f-lang">' + esc(L.book.language) + '</label><div class="select"><select id="f-lang" name="idioma">' +
        LANGS.map(function (o) { return '<option value="' + o[2] + '"' + (o[0] === LANG ? ' selected' : '') + '>' + o[2] + '</option>'; }).join('') + '</select>' + ic('down', 'ic select__ic') + '</div></div>' +
    '</div>' +
    '<div class="field"><label for="f-msg">' + esc(L.book.message) + ' <span class="field__opt">(' + esc(L.book.optional) + ')</span></label><textarea id="f-msg" name="mensaje" rows="4" placeholder="' + esc(L.book.messagePlaceholder) + '"></textarea></div>' +
    '<div class="hp" aria-hidden="true"><label for="f-web">Website</label><input id="f-web" name="website" type="text" tabindex="-1" autocomplete="off"></div>' +
    '<button class="btn btn--primary btn--block" type="submit" data-submit><span data-label>' + esc(L.book.submit) + '</span></button>' +
    '<p class="form__status" role="status" aria-live="polite" data-status></p>' +
  '</form>' +
'</div></section>' +
'</main>' +

'<footer class="foot"><div class="wrap"><div class="foot__top">' +
  '<div class="foot__brand"><img src="' + BASE + 'assets/img/logo.png" alt="Hello Mendoza" width="96" height="96" loading="lazy"><p class="foot__slogan">' + esc(L.slogan) + '</p>' + langSwitch('lang--foot') + '</div>' +
  '<ul class="foot__contact" role="list">' +
    '<li><span class="foot__k">WhatsApp</span>' + waLink('', esc(A.whatsappVisible || A.whatsapp), 'footer', false) + '</li>' +
    '<li><span class="foot__k">' + esc(L.footer.email) + '</span>' + (isPh(A.email) ? t(A.email || '[email]') : '<a href="mailto:' + esc(A.email) + '">' + esc(A.email) + '</a>') + '</li>' +
    '<li><span class="foot__k">' + esc(L.footer.address) + '</span>' + t(A.direccion) + '</li>' +
    '<li><span class="foot__k">Instagram</span><a href="' + ig + '" target="_blank" rel="noopener">@' + esc(igUser) + '</a></li>' +
    '<li><span class="foot__k">Tripadvisor</span>' + (isPh(trip) ? t(trip || '[URL]') : '<a href="' + esc(trip) + '" target="_blank" rel="noopener">Hello Mendoza</a>') + '</li>' +
    '<li><span class="foot__k">' + esc(L.footer.license) + '</span>' + t(A.habilitacion) + '</li>' +
  '</ul></div>' +
  '<p class="foot__thanks">' + esc(L.footer.thanks) + '</p>' +
  '<div class="foot__bottom"><p>© ' + new Date().getFullYear() + ' Hello Mendoza. ' + esc(L.footer.rights) + '</p>' +
  '<p><a href="#" data-legal="terms">' + esc(L.footer.terms) + '</a> · <a href="#" data-legal="privacy">' + esc(L.footer.privacy) + '</a> <span class="ph">[enlaces a completar]</span></p></div>' +
'</div></footer>' +

'<a class="fab" href="' + waGeneral + '" target="_blank" rel="noopener" data-wa="float" aria-label="' + esc(L.wa.float) + '">' + ic('chat') + '</a>' +
'<dialog class="sheet" id="tour-dialog" aria-labelledby="td-title"><div class="sheet__in" data-sheet></div></dialog>' +
'<dialog class="lightbox" id="lightbox" aria-label="' + esc(L.detail.enlarge) + '">' +
  '<button class="lb__btn lb__close" type="button" data-lb-close aria-label="' + esc(L.detail.close) + '">' + ic('x') + '</button>' +
  '<button class="lb__btn lb__prev" type="button" data-lb-prev aria-label="' + esc(L.detail.prev) + '">' + ic('left') + '</button>' +
  '<figure class="lb__fig"><img alt="" data-lb-img><figcaption data-lb-cap></figcaption></figure>' +
  '<button class="lb__btn lb__next" type="button" data-lb-next aria-label="' + esc(L.detail.next) + '">' + ic('right') + '</button></dialog>' +
'<div class="suggest" hidden data-suggest><p data-suggest-text></p><a class="btn btn--light btn--sm" data-suggest-go></a><button type="button" class="suggest__x" data-suggest-x>' + ic('x') + '</button></div>';

  function field(id, name, lab, control) {
    return '<div class="field"><label for="' + id + '">' + esc(lab) + '</label>' + control + '<p class="field__err" id="' + id + '-err" aria-live="polite"></p></div>';
  }

  app.innerHTML = html;
  app.removeAttribute('aria-busy');

  /* datos para main.js (interacción) */
  var allText = function (code) { var keep = LANG; LANG = code; var r = pick(C.textos.suggest); LANG = keep; return r; };
  window.HM_DATA = {
    lang: LANG, base: BASE,
    whatsapp: String(A.whatsapp || '').replace(/\D/g, ''),
    webhook: A.formulario, gaId: A.googleAnalytics, pixelId: A.metaPixel,
    photo: foto,
    tours: tours,
    t: { detail: L.detail, tours: L.tours, book: L.book, wa: L.wa },
    suggest: {
      es: Object.assign(allText('es'), { href: BASE }),
      en: Object.assign(allText('en'), { href: BASE + 'en/' }),
      pt: Object.assign(allText('pt'), { href: BASE + 'pt/' })
    }
  };
})();
