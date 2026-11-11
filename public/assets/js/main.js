/* Hello Mendoza — interacción
   Sin dependencias. Los textos vienen de <script id="hm-data"> generado por tools/build.mjs */
(function () {
  'use strict';
  var D = window.HM_DATA;
  if (!D) return;
  var T = D.t;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var fmt = function (s, o) { return String(s).replace(/\{(\w+)\}/g, function (_, k) { return o[k] != null ? o[k] : ''; }); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var ph = function (s) { return esc(s).replace(/\[([^\]]+)\]/g, '<span class="ph">[$1]</span>'); };
  var waUrl = function (msg) { return 'https://wa.me/' + D.whatsapp + '?text=' + encodeURIComponent(msg); };
  var icon = function (n, c) { return '<svg class="' + (c || 'ic') + '" aria-hidden="true" focusable="false"><use href="#i-' + n + '"/></svg>'; };

  /* ---------- analítica (GA4 + Meta Pixel, solo si hay IDs) ---------- */
  function loadAnalytics() {
    if (D.gaId) {
      var s = document.createElement('script');
      s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + D.gaId;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', D.gaId);
    }
    if (D.pixelId) {
      /* eslint-disable */
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      /* eslint-enable */
      window.fbq('init', D.pixelId);
      window.fbq('track', 'PageView');
    }
  }
  function track(event, params) {
    params = params || {};
    if (window.gtag) window.gtag('event', event, params);
    if (window.fbq) window.fbq(event === 'generate_lead' ? 'track' : 'trackCustom', event === 'generate_lead' ? 'Lead' : event, params);
    if (window.fbq && event === 'whatsapp_click') window.fbq('track', 'Contact', params);
  }
  loadAnalytics();
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-wa]');
    if (a) track('whatsapp_click', { placement: a.getAttribute('data-wa'), language: D.lang });
  });

  /* ---------- año ---------- */
  var y = $('[data-year]'); if (y) y.textContent = new Date().getFullYear();

  /* ---------- barra superior ---------- */
  var bar = $('[data-bar]');
  var burger = $('.burger');
  var hero = $('.hero');
  function setSolid() { bar.classList.toggle('is-solid', window.scrollY > (hero ? hero.offsetHeight - 90 : 40)); }
  setSolid();
  window.addEventListener('scroll', setSolid, { passive: true });
  window.addEventListener('resize', setSolid, { passive: true });

  function setMenu(open) {
    bar.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', burger.getAttribute(open ? 'data-close' : 'data-open'));
  }
  burger.addEventListener('click', function () { setMenu(!bar.classList.contains('is-open')); });
  $$('.nav__list a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && bar.classList.contains('is-open')) { setMenu(false); burger.focus(); } });

  /* sección activa en el menú */
  var navMap = {};
  $$('.nav__list a[href^="#"]').forEach(function (a) { navMap[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var secIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var a = navMap[en.target.id]; if (!a) return;
        if (en.isIntersecting) { $$('.nav__list a[aria-current]').forEach(function (x) { x.removeAttribute('aria-current'); }); a.setAttribute('aria-current', 'location'); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(navMap).forEach(function (id) { var s = document.getElementById(id); if (s) secIO.observe(s); });
  }

  /* ---------- idioma: recordar elección + sugerencia ---------- */
  $$('.lang a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var code = a.getAttribute('data-lang');
      store.set('hm-lang', code);
      var h = location.hash && location.hash.indexOf('#tour-') !== 0 ? location.hash : '';
      if (h) { e.preventDefault(); location.href = a.getAttribute('href') + h; }
    });
  });
  (function suggest() {
    if (store.get('hm-lang') || store.get('hm-suggest-off')) return;
    var langs = (navigator.languages || [navigator.language || '']).map(function (l) { return String(l).slice(0, 2).toLowerCase(); });
    var want = null;
    for (var i = 0; i < langs.length; i++) { if (D.suggest[langs[i]]) { want = langs[i]; break; } }
    if (!want || want === D.lang) return;
    var box = $('[data-suggest]'); var s = D.suggest[want];
    $('[data-suggest-text]', box).textContent = s.text;
    var go = $('[data-suggest-go]', box);
    go.textContent = s.go; go.href = s.href; go.setAttribute('hreflang', want); box.setAttribute('lang', want);
    var x = $('[data-suggest-x]', box); x.setAttribute('aria-label', s.dismiss);
    go.addEventListener('click', function () { store.set('hm-lang', want); });
    x.addEventListener('click', function () { box.hidden = true; store.set('hm-suggest-off', '1'); });
    setTimeout(function () { box.hidden = false; }, 1600);
  })();

  /* ---------- aparición al hacer scroll ---------- */
  if (document.documentElement.classList.contains('anim') && 'IntersectionObserver' in window) {
    var revIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, sibs = $$(':scope > .reveal', el.parentElement), i = sibs.indexOf(el);
        el.style.setProperty('--d', Math.min(Math.max(i, 0), 5) * 0.08 + 's');
        el.classList.add('in'); revIO.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    $$('.reveal').forEach(function (el) { revIO.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- filtros de tours ---------- */
  var filters = { type: 'all', zone: 'all' };
  var cards = $$('.tour');
  var countEl = $('[data-count]');
  var empty = $('[data-empty]');
  function applyFilters() {
    var n = 0;
    cards.forEach(function (c) {
      var ok = (filters.type === 'all' || c.dataset.type === filters.type) && (filters.zone === 'all' || c.dataset.zone === filters.zone);
      c.hidden = !ok; if (ok) { n++; c.classList.add('in'); }
    });
    empty.hidden = n > 0;
    countEl.textContent = fmt(T.tours.count, { n: n });
  }
  $$('[data-filter]').forEach(function (group) {
    group.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (!b) return;
      $$('.chip', group).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      filters[group.dataset.filter] = b.dataset.value;
      applyFilters();
    });
  });
  $('[data-reset]').addEventListener('click', function () {
    filters = { type: 'all', zone: 'all' };
    $$('[data-filter] .chip').forEach(function (x) { x.setAttribute('aria-pressed', String(x.dataset.value === 'all')); });
    applyFilters();
  });

  /* ---------- detalle de tour ---------- */
  var dlg = $('#tour-dialog');
  var sheet = $('[data-sheet]');
  var lastFocus = null;
  var gallery = [];
  var tourById = {};
  D.tours.forEach(function (t) { tourById[t.id] = t; });

  function renderTour(t) {
    var d = T.detail;
    var slides = t.photos.map(function (f, i) {
      return '<button type="button" class="car__slide" data-zoom="' + i + '" aria-label="' + esc(d.enlarge + ': ' + f.alt) + '">' +
        '<img src="' + D.photo(f.archivo) + '" width="1600" height="1067" alt="' + esc(f.alt) + '"' + (i ? ' loading="lazy"' : '') + ' onerror="this.classList.add(\'is-missing\')"></button>';
    }).join('');
    var dots = t.photos.map(function (_, i) { return '<span' + (i ? '' : ' class="on"') + '></span>'; }).join('');
    var itin = t.itinerary.map(function (r) { return '<li><time>' + esc(r[0]) + '</time><span>' + ph(r[1]) + '</span></li>'; }).join('');
    var inc = t.includes.map(function (x) { return '<li>' + icon('check') + '<span>' + ph(x) + '</span></li>'; }).join('');
    var exc = t.excludes.map(function (x) { return '<li>' + icon('minus') + '<span>' + ph(x) + '</span></li>'; }).join('');
    var waMsg = fmt(T.wa.tour, { tour: t.name });
    sheet.innerHTML =
      '<button type="button" class="sheet__close" data-close aria-label="' + esc(d.close) + '">' + icon('x') + '</button>' +
      (t.photos.length ? '<div class="car" data-car>' +
        '<div class="car__track" data-track tabindex="0" aria-label="' + esc(t.name) + '">' + slides + '</div>' +
        '<button type="button" class="car__btn car__prev" data-prev aria-label="' + esc(d.prev) + '" disabled>' + icon('left') + '</button>' +
        '<button type="button" class="car__btn car__next" data-next aria-label="' + esc(d.next) + '">' + icon('right') + '</button>' +
        '<div class="car__dots" aria-hidden="true">' + dots + '</div>' +
        '<span class="car__zoom" aria-hidden="true">' + icon('expand', 'ic ic--sm') + '</span>' +
        '<p class="sr-only" aria-live="polite" data-car-status></p>' +
      '</div>' : '') +
      '<div class="td">' +
        '<div class="td__head">' +
          '<p class="td__meta"><span>' + icon('pin', 'ic ic--sm') + esc(T.tours.zones[t.zone] || t.zone) + '</span><span>' + icon('clock', 'ic ic--sm') + t.hours + ' ' + esc(T.tours.hours) + '</span><span>' + ph(t.stops) + '</span></p>' +
          '<h2 class="td__title" id="td-title">' + ph(t.name) + '</h2>' +
          '<p class="td__summary">' + ph(t.line) + (t.summary && t.summary !== t.line ? ' ' + ph(t.summary) : '') + '</p>' +
          '<p class="td__price">' + esc(T.tours.from) + ' <strong>USD ' + ph(t.price) + '</strong> ' + esc(T.tours.perPerson) + '</p>' +
        '</div>' +
        '<div class="td__cols">' +
          '<div><h3>' + esc(d.itinerary) + '</h3><ol class="itin">' + itin + '</ol><p class="td__note">' + ph(d.itineraryNote) + '</p></div>' +
          '<div><h3>' + esc(d.includes) + '</h3><ul class="inc" role="list">' + inc + '</ul><h3>' + esc(d.excludes) + '</h3><ul class="inc inc--no" role="list">' + exc + '</ul></div>' +
        '</div>' +
        '<div class="td__facts">' +
          '<div class="fact"><h3>' + icon('pin', 'ic ic--sm') + esc(d.meeting) + '</h3><p>' + ph(d.meetingText) + '</p></div>' +
          (t.wineries ? '<div class="fact"><h3>' + icon('glass', 'ic ic--sm') + esc(d.wineries) + '</h3><p>' + ph(t.wineries) + '</p></div>' : '') +
          '<div class="fact"><h3>' + icon('baby', 'ic ic--sm') + esc(d.kids) + '</h3><p>' + ph(d.kidsText) + '</p></div>' +
        '</div>' +
      '</div>' +
      '<div class="td__ctas">' +
        '<a class="btn btn--wa" href="' + waUrl(waMsg) + '" target="_blank" rel="noopener" data-wa="tour-' + t.id + '">' + icon('chat') + esc(d.consult) + '</a>' +
        '<button type="button" class="btn btn--primary" data-book="' + t.id + '">' + esc(d.book) + icon('arrow') + '</button>' +
      '</div>';
    gallery = t.photos.map(function (f) { return { src: D.photo(f.archivo), alt: f.alt }; });
    if (t.photos.length) initCarousel($('[data-car]', sheet));
  }

  function openTour(id, push) {
    var t = tourById[id]; if (!t) return;
    lastFocus = document.activeElement;
    renderTour(t);
    sheet.scrollTop = 0;
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    document.body.classList.add('is-locked');
    if (push !== false) history.replaceState(null, '', '#tour-' + id);
    track('view_item', { item_id: id, item_name: t.name, language: D.lang });
    var c = $('[data-close]', sheet); if (c) c.focus({ preventScroll: true });
  }
  function closeTour() { if (dlg.open) dlg.close(); }
  dlg.addEventListener('close', function () {
    document.body.classList.remove('is-locked');
    if (location.hash.indexOf('#tour-') === 0) history.replaceState(null, '', '#tours');
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  });
  dlg.addEventListener('click', function (e) {
    if (e.target === dlg) return closeTour(); // clic en el fondo
    if (e.target.closest('[data-close]')) return closeTour();
    var z = e.target.closest('[data-zoom]'); if (z) return openLightbox(+z.getAttribute('data-zoom'));
    var b = e.target.closest('[data-book]'); if (b) { closeTour(); prefillTour(b.getAttribute('data-book')); }
  });
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-tour]'); if (!a) return;
    e.preventDefault(); openTour(a.getAttribute('data-tour'));
  });
  function fromHash() { var m = location.hash.match(/^#tour-([a-z0-9-]+)$/); if (m && tourById[m[1]]) openTour(m[1], false); }
  window.addEventListener('hashchange', fromHash);
  fromHash();

  function initCarousel(root) {
    var track = $('[data-track]', root), prev = $('[data-prev]', root), next = $('[data-next]', root);
    var dots = $$('.car__dots span', root), status = $('[data-car-status]', root), n = dots.length, cur = 0;
    function go(i) { track.scrollTo({ left: track.clientWidth * i, behavior: reduce ? 'auto' : 'smooth' }); }
    function sync() {
      var i = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
      if (i === cur && status.textContent) return;
      cur = i;
      dots.forEach(function (d, k) { d.classList.toggle('on', k === i); });
      prev.disabled = i <= 0; next.disabled = i >= n - 1;
      status.textContent = fmt(T.detail.photoOf, { i: i + 1, n: n });
    }
    prev.addEventListener('click', function () { go(Math.max(cur - 1, 0)); });
    next.addEventListener('click', function () { go(Math.min(cur + 1, n - 1)); });
    track.addEventListener('scroll', function () { window.requestAnimationFrame(sync); }, { passive: true });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(Math.min(cur + 1, n - 1)); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(Math.max(cur - 1, 0)); }
    });
    sync();
  }

  /* ---------- lightbox ---------- */
  var lb = $('#lightbox'), lbImg = $('[data-lb-img]'), lbCap = $('[data-lb-cap]'), lbI = 0;
  function showLb(i) {
    lbI = (i + gallery.length) % gallery.length;
    lbImg.src = gallery[lbI].src; lbImg.alt = gallery[lbI].alt;
    lbCap.textContent = gallery[lbI].alt + ' · ' + fmt(T.detail.photoOf, { i: lbI + 1, n: gallery.length });
  }
  function openLightbox(i) { showLb(i); if (lb.showModal) lb.showModal(); else lb.setAttribute('open', ''); $('[data-lb-close]').focus(); }
  $('[data-lb-close]').addEventListener('click', function () { lb.close(); });
  $('[data-lb-prev]').addEventListener('click', function () { showLb(lbI - 1); });
  $('[data-lb-next]').addEventListener('click', function () { showLb(lbI + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb__fig')) lb.close(); });
  lb.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') showLb(lbI + 1);
    if (e.key === 'ArrowLeft') showLb(lbI - 1);
  });
  var tx = null;
  lb.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (tx == null) return; var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 40) showLb(lbI + (dx < 0 ? 1 : -1));
  });

  /* ---------- formulario ---------- */
  var form = $('#booking-form');
  var tourSel = $('#f-tour'), dateIn = $('#f-date'), status = $('[data-status]'), btn = $('[data-submit]'), label = $('[data-label]');
  var B = T.book;
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var now = new Date(), today = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
  dateIn.min = today;

  function prefillTour(id) {
    var opt = $$('option', tourSel).filter(function (o) { return o.getAttribute('data-id') === id; })[0];
    if (opt) { tourSel.value = opt.value; setErr(tourSel, ''); }
    var target = document.getElementById('book');
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    setTimeout(function () { $('#f-name').focus({ preventScroll: true }); }, reduce ? 0 : 650);
  }

  function setErr(el, msg) {
    var e = document.getElementById(el.id + '-err');
    if (e) e.textContent = msg;
    if (msg) { el.setAttribute('aria-invalid', 'true'); el.setAttribute('aria-errormessage', el.id + '-err'); }
    else { el.removeAttribute('aria-invalid'); }
  }
  function check(el) {
    var v = el.value.trim();
    if (el.required && !v) return setErr(el, B.required), false;
    if (el.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return setErr(el, B.invalidEmail), false;
    if (el.type === 'date' && v && v < today) return setErr(el, B.invalidDate), false;
    if (el.type === 'number' && v && (+v < 1)) return setErr(el, B.required), false;
    setErr(el, ''); return true;
  }
  $$('input, select', form).forEach(function (el) {
    if (el.name === 'website') return;
    el.addEventListener('blur', function () { if (el.value) check(el); });
    el.addEventListener('input', function () { if (el.getAttribute('aria-invalid')) check(el); });
    el.addEventListener('change', function () { if (el.getAttribute('aria-invalid')) check(el); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.website.value) return; // bot
    var fields = $$('[required]', form), firstBad = null;
    fields.forEach(function (el) { if (!check(el) && !firstBad) firstBad = el; });
    if (firstBad) { firstBad.focus(); return; }

    var payload = {
      nombre: form.nombre.value.trim(),
      email: form.email.value.trim(),
      telefono: form.telefono.value.trim(),
      mensaje: form.mensaje.value.trim(),
      tour: form.tour.value,
      fecha: form.fecha.value,
      personas: parseInt(form.personas.value, 10) || 1,
      idioma: form.idioma.value,
      idioma_web: D.lang
    };
    status.className = 'form__status'; status.textContent = '';
    btn.disabled = true; btn.classList.add('is-loading'); label.textContent = B.sending;

    var ctrl = 'AbortController' in window ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 15000);
    fetch(D.webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: ctrl ? ctrl.signal : undefined
    })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, body: j }; }); })
      .then(function (res) {
        if (!(res.ok && res.body && res.body.ok === true)) throw new Error('bad response');
        status.classList.add('is-ok'); status.textContent = B.success;
        track('generate_lead', { tour: payload.tour, language: D.lang });
        form.reset(); dateIn.min = today; form.idioma.value = payload.idioma;
      })
      .catch(function () {
        status.classList.add('is-err');
        var msg = fmt(T.wa.tour, { tour: payload.tour }) + (payload.fecha ? ' · ' + payload.fecha : '') + ' · ' + payload.personas;
        status.innerHTML = esc(B.error) + ' <a href="' + waUrl(msg) + '" target="_blank" rel="noopener" data-wa="form-error">WhatsApp</a>';
      })
      .then(function () {
        clearTimeout(timer);
        btn.disabled = false; btn.classList.remove('is-loading'); label.textContent = B.submit;
        status.focus && status.setAttribute('tabindex', '-1');
      });
  });
})();
