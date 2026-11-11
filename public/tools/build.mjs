// Genera index.html (ES), en/index.html y pt/index.html + sitemap.xml a partir de src/.
// Uso: node tools/build.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { config } from '../src/config.mjs';
import es from '../src/i18n/es.mjs';
import en from '../src/i18n/en.mjs';
import pt from '../src/i18n/pt.mjs';
import { sprite, ic } from '../src/icons.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const LANGS = [es, en, pt];
const VERSION = Date.now().toString(36);

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Texto visible: escapa y marca los [datos pendientes] para que se vean y sean fáciles de encontrar.
const t = (s = '') => esc(s).replace(/\[([^\]]+)\]/g, '<span class="ph">[$1]</span>');
const tHtml = (s = '') => s.replace(/\[([^\]]+)\]/g, '<span class="ph">[$1]</span>'); // permite <em>
const wa = (msg) => `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(msg)}`;
const isPh = (s) => /^\[.*\]$/.test(s);
const url = (L) => `${config.siteUrl}/${L.path}`;

function img(name, alt, { sizes = '(min-width: 1100px) 33vw, (min-width: 700px) 50vw, 100vw', cls = '', w = 1600, h = 1067, base, eager = false } = {}) {
  return `<img class="${cls}" src="${base}assets/img/${name}-sm.webp" srcset="${base}assets/img/${name}-sm.webp 800w, ${base}assets/img/${name}.webp ${w}w" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}>`;
}

function page(L) {
  const base = L.path ? '../' : '';
  const others = LANGS;
  const tours = L.tourList;
  const price = (id) => (isPh(config.prices[id]) ? L.tours.pricePh : config.prices[id]);
  const trip = config.tripadvisorUrl;
  const tripHref = isPh(trip) ? '#' : trip;
  const ig = `https://www.instagram.com/${config.instagram}/`;

  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Hello Mendoza',
    slogan: L.slogan,
    description: L.meta.description,
    url: url(L),
    image: `${config.siteUrl}/assets/img/og-image.jpg`,
    logo: `${config.siteUrl}/assets/img/logo.png`,
    telephone: '+5492614603906',
    ...(isPh(config.email) ? {} : { email: config.email }),
    address: {
      '@type': 'PostalAddress',
      ...(isPh(config.address) ? {} : { streetAddress: config.address }),
      addressLocality: 'Mendoza',
      addressRegion: 'Mendoza',
      addressCountry: 'AR',
    },
    areaServed: ['Luján de Cuyo', 'Maipú', 'Valle de Uco', 'Mendoza'].map((n) => ({ '@type': 'Place', name: n })),
    knowsLanguage: ['es', 'en', 'pt'],
    sameAs: [ig, ...(isPh(trip) ? [] : [trip])],
    makesOffer: tours.map((x) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'TouristTrip', name: x.name, description: x.line },
      ...(isPh(price(x.id)) ? {} : { price: price(x.id), priceCurrency: 'USD' }),
    })),
  };

  const data = {
    lang: L.code,
    whatsapp: config.whatsapp,
    webhook: config.webhook,
    gaId: config.gaId,
    pixelId: config.metaPixelId,
    base,
    tours: tours.map((x) => ({ ...x, price: price(x.id) })),
    t: { detail: L.detail, tours: L.tours, book: L.book, wa: L.wa },
    suggest: Object.fromEntries(LANGS.map((o) => [o.code, { ...o.suggest, href: `${base}${o.path}` }])),
  };

  const langSwitch = (extra = '') => `<nav class="lang ${extra}" aria-label="${esc(L.nav.lang)}">${others
    .map((o) => `<a href="${base}${o.path}" hreflang="${o.code}" lang="${o.code}" data-lang="${o.code}" ${o.code === L.code ? 'aria-current="true"' : ''} title="${esc(o.name)}">${o.code.toUpperCase()}</a>`)
    .join('')}</nav>`;

  const navLinks = [
    ['#tours', L.nav.tours],
    ['#how', L.nav.how],
    ['#about', L.nav.about],
    ['#reviews', L.nav.reviews],
    ['#faq', L.nav.faq],
  ];

  const zoneKeys = [...new Set(tours.map((x) => x.zone))];
  const typeKeys = [...new Set(tours.map((x) => x.type))];

  return `<!doctype html>
<html lang="${L.htmlLang}" data-lang="${L.code}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(L.meta.title)}</title>
<meta name="description" content="${esc(L.meta.description)}">
<link rel="canonical" href="${url(L)}">
${LANGS.map((o) => `<link rel="alternate" hreflang="${o.code}" href="${url(o)}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${url(es)}">
<meta name="theme-color" content="#6A2E3A">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Hello Mendoza">
<meta property="og:title" content="${esc(L.meta.title)}">
<meta property="og:description" content="${esc(L.meta.description)}">
<meta property="og:url" content="${url(L)}">
<meta property="og:image" content="${config.siteUrl}/assets/img/og-image.jpg">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(L.hero.imgAlt)}">
<meta property="og:locale" content="${L.ogLocale}">
${LANGS.filter((o) => o !== L).map((o) => `<meta property="og:locale:alternate" content="${o.ogLocale}">`).join('\n')}
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${base}assets/img/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="${base}assets/img/apple-touch-icon.png">
<link rel="preload" href="${base}assets/fonts/dm-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${base}assets/fonts/cormorant-garamond-latin-500-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" as="image" href="${base}assets/img/hero-mobile-sm.webp" imagesrcset="${base}assets/img/hero-mobile-sm.webp 800w, ${base}assets/img/hero-mobile.webp 1080w" imagesizes="100vw" media="(max-width: 699px)" fetchpriority="high">
<link rel="preload" as="image" href="${base}assets/img/hero-desktop.webp" imagesrcset="${base}assets/img/hero-desktop-sm.webp 800w, ${base}assets/img/hero-desktop.webp 1920w" imagesizes="100vw" media="(min-width: 700px)" fetchpriority="high">
<link rel="stylesheet" href="${base}assets/css/styles.css?v=${VERSION}">
<script>(function(d){d.classList.add('js');try{if(matchMedia('(prefers-reduced-motion: no-preference)').matches)d.classList.add('anim');var s=localStorage.getItem('hm-lang'),m={es:'',en:'en/',pt:'pt/'};if(${L.code === 'es' ? 'true' : 'false'}&&s&&s!=='es'&&m[s]&&!/[?&]lang=es/.test(location.search))location.replace('${base}'+m[s]+location.hash)}catch(e){}})(document.documentElement)</script>
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
</head>
<body>
${sprite()}
<a class="skip" href="#main">${esc(L.skip)}</a>

<header class="bar" data-bar>
  <div class="bar__in wrap">
    <a class="brand" href="#top" aria-label="${esc(L.nav.home)}">
      <img class="brand__img" src="${base}assets/img/logo.png" alt="Hello Mendoza" width="96" height="96">
    </a>
    <nav class="nav" aria-label="${{ es: 'Menú principal', en: 'Main menu', pt: 'Menu principal' }[L.code]}">
      <ul class="nav__list" id="nav-list">
        ${navLinks.map(([h, l]) => `<li><a href="${h}">${esc(l)}</a></li>`).join('')}
        <li class="nav__cta-m"><a class="btn btn--primary btn--block" href="${wa(L.wa.general)}" target="_blank" rel="noopener" data-wa="general">${ic('chat')}${esc(L.nav.book)}</a></li>
      </ul>
    </nav>
    ${langSwitch()}
    <a class="btn btn--primary btn--sm bar__cta" href="${wa(L.wa.general)}" target="_blank" rel="noopener" data-wa="general">${ic('chat')}<span>${esc(L.nav.book)}</span></a>
    <button class="burger" type="button" aria-expanded="false" aria-controls="nav-list" data-open="${esc(L.nav.menu)}" data-close="${esc(L.nav.close)}" aria-label="${esc(L.nav.menu)}">${ic('menu', 'ic burger__open')}${ic('x', 'ic burger__close')}</button>
  </div>
</header>

<main id="main">
<section class="hero" id="top" aria-labelledby="hero-title">
  <picture class="hero__media">
    <source media="(max-width: 699px)" srcset="${base}assets/img/hero-mobile-sm.webp 800w, ${base}assets/img/hero-mobile.webp 1080w" sizes="100vw">
    <img src="${base}assets/img/hero-desktop.webp" srcset="${base}assets/img/hero-desktop-sm.webp 800w, ${base}assets/img/hero-desktop.webp 1920w" sizes="100vw" width="1920" height="1080" alt="${esc(L.hero.imgAlt)}" fetchpriority="high">
  </picture>
  <div class="hero__in wrap">
    <h1 class="hero__title" id="hero-title">${tHtml(L.hero.title)}</h1>
    <p class="hero__sub">${t(L.hero.sub)}</p>
    <div class="hero__ctas">
      <a class="btn btn--light" href="#tours">${esc(L.hero.ctaTours)}${ic('arrow')}</a>
      <a class="btn btn--primary" href="${wa(L.wa.general)}" target="_blank" rel="noopener" data-wa="general">${ic('chat')}${esc(L.hero.ctaWa)}</a>
    </div>
    <ul class="trust" role="list">
      <li><a href="${esc(tripHref)}" ${isPh(trip) ? '' : 'target="_blank" rel="noopener"'} class="trust__score">${t(isPh(config.tripadvisorScore) ? L.reviews.score : config.tripadvisorScore)} ${ic('star', 'ic ic--star')} ${esc(L.hero.trustScore)}</a></li>
      ${L.hero.trust.map((x) => `<li>${t(x)}</li>`).join('')}
    </ul>
  </div>
</section>

<section class="diffs section" aria-labelledby="diffs-title">
  <div class="wrap diffs__grid">
    <h2 class="h2 diffs__title reveal" id="diffs-title">${t(L.diffs.title)}</h2>
    <ul class="diffs__list" role="list">
      ${L.diffs.items.map((d) => `<li class="diff reveal"><span class="diff__icon">${ic(d.icon)}</span><h3 class="diff__title">${t(d.title)}</h3><p>${t(d.text)}</p></li>`).join('')}
    </ul>
  </div>
</section>

<section class="tours section" id="tours" aria-labelledby="tours-title">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="h2 reveal" id="tours-title">${t(L.tours.title)}</h2>
      <p class="lede reveal">${t(L.tours.intro)}</p>
    </div>
    <div class="filters" role="group" aria-label="${esc(L.tours.filterType)} / ${esc(L.tours.filterZone)}">
      <div class="filters__row">
        <span class="filters__label" id="f-type">${esc(L.tours.filterType)}</span>
        <div class="chips" role="group" aria-labelledby="f-type" data-filter="type">
          <button type="button" class="chip" aria-pressed="true" data-value="all">${esc(L.tours.all)}</button>
          ${typeKeys.map((k) => `<button type="button" class="chip" aria-pressed="false" data-value="${k}">${esc(L.tours.types[k])}</button>`).join('')}
        </div>
      </div>
      <div class="filters__row">
        <span class="filters__label" id="f-zone">${esc(L.tours.filterZone)}</span>
        <div class="chips" role="group" aria-labelledby="f-zone" data-filter="zone">
          <button type="button" class="chip" aria-pressed="true" data-value="all">${esc(L.tours.allZones)}</button>
          ${zoneKeys.map((k) => `<button type="button" class="chip" aria-pressed="false" data-value="${k}">${esc(L.tours.zones[k])}</button>`).join('')}
        </div>
      </div>
    </div>
    <p class="sr-only" aria-live="polite" data-count></p>
    <ul class="grid-tours" role="list">
      ${tours
        .map(
          (x, i) => `<li class="tour reveal" data-type="${x.type}" data-zone="${x.zone}" data-id="${x.id}">
        <div class="tour__media">${img(`tour-${x.id}-1`, x.alts[0], { base })}</div>
        <div class="tour__body">
          <p class="tour__meta"><span>${esc(L.tours.zones[x.zone])}</span><span aria-hidden="true">·</span><span>${ic('clock', 'ic ic--sm')}${x.hours} ${esc(L.tours.hours)}</span></p>
          <h3 class="tour__name"><a href="#tour-${x.id}" data-tour="${x.id}" aria-haspopup="dialog">${t(x.name)}</a></h3>
          <p class="tour__stops">${t(x.stops)}</p>
          <p class="tour__line">${t(x.line)}</p>
          <div class="tour__foot">
            <p class="tour__price"><span>${esc(L.tours.from)}</span> <strong>USD ${t(price(x.id))}</strong> <span>${esc(L.tours.perPerson)}</span></p>
            <span class="tour__more" aria-hidden="true">${esc(L.tours.details)}${ic('arrow', 'ic ic--sm')}</span>
          </div>
        </div>
      </li>`
        )
        .join('')}
    </ul>
    <div class="tours__empty" hidden data-empty><p>${esc(L.tours.empty)}</p><button type="button" class="btn btn--outline btn--sm" data-reset>${esc(L.tours.reset)}</button></div>
  </div>
</section>

<section class="custom" aria-labelledby="custom-title">
  <div class="wrap custom__grid">
    <div class="custom__media reveal">${img('custom-tour', L.custom.imgAlt, { base, sizes: '(min-width: 900px) 50vw, 100vw' })}</div>
    <div class="custom__body">
      <h2 class="h2 reveal" id="custom-title">${t(L.custom.title)}</h2>
      <p class="reveal">${t(L.custom.text)}</p>
      <a class="btn btn--light reveal" href="${wa(L.wa.custom)}" target="_blank" rel="noopener" data-wa="custom">${ic('chat')}${esc(L.custom.cta)}</a>
    </div>
  </div>
</section>

<section class="how section" id="how" aria-labelledby="how-title">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="h2 reveal" id="how-title">${t(L.how.title)}</h2>
      <p class="lede reveal">${t(L.how.intro)}</p>
    </div>
    <ol class="steps">
      ${L.how.steps.map((s, i) => `<li class="step reveal"><span class="step__n" aria-hidden="true">${i + 1}</span><h3 class="step__title">${t(s.title)}</h3><p>${t(s.text)}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="about section" id="about" aria-labelledby="about-title">
  <div class="wrap about__grid">
    <div class="about__text">
      <h2 class="h2 reveal" id="about-title">${t(L.about.title)}</h2>
      <p class="about__lead reveal">${t(L.about.lead)}</p>
      <p class="reveal">${t(L.about.story)}</p>
      <h3 class="about__langs-title reveal">${t(L.about.langsTitle)}</h3>
      <ul class="pills reveal" role="list">${L.about.langs.map((x, i) => `<li lang="${['es', 'en', 'pt'][i]}">${esc(x)}</li>`).join('')}</ul>
    </div>
    <ul class="guides" role="list">
      ${L.about.guides.map((g, i) => `<li class="guide reveal"><div class="guide__photo">${img(`guide-${i + 1}`, g.alt, { base, w: 800, h: 1000, sizes: '(min-width: 900px) 18vw, 45vw' })}</div><p class="guide__name">${t(g.name)}</p><p class="guide__role">${t(g.role)}</p></li>`).join('')}
    </ul>
  </div>
</section>

<section class="reviews section" id="reviews" aria-labelledby="reviews-title">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="h2 reveal" id="reviews-title">${t(L.reviews.title)}</h2>
      <p class="lede reveal">${t(L.reviews.intro)}</p>
    </div>
    <ul class="review-list" role="list">
      ${[1, 2, 3]
        .map(
          () => `<li class="review reveal">
        <figure>
          <p class="review__score"><span class="review__stars" aria-hidden="true">${ic('star', 'ic ic--star')}</span> ${t(L.reviews.score)} <span class="review__src">· ${L.tripadvisor}</span></p>
          <blockquote><p>${t(L.reviews.placeholder)}</p></blockquote>
          <figcaption><strong>${t(L.reviews.name)}</strong> <span>${t(L.reviews.country)}</span></figcaption>
        </figure>
      </li>`
        )
        .join('')}
    </ul>
    <p class="reviews__cta reveal"><a class="link" href="${esc(tripHref)}" ${isPh(trip) ? '' : 'target="_blank" rel="noopener"'}>${esc(L.reviews.cta)}${ic('external', 'ic ic--sm')}</a> ${isPh(trip) ? t(trip) : ''}</p>
  </div>
</section>

<section class="gallery section" aria-labelledby="gallery-title">
  <div class="wrap">
    <div class="sec-head sec-head--row">
      <div>
        <h2 class="h2 reveal" id="gallery-title">${t(L.gallery.title)}</h2>
        <p class="lede reveal">${t(L.gallery.text)}</p>
      </div>
      <a class="btn btn--outline reveal" href="${ig}" target="_blank" rel="noopener">${ic('instagram')}@${config.instagram}</a>
    </div>
    <ul class="gal" role="list">
      ${L.gallery.alts
        .map((a, i) => {
          const tall = i === 0 || i === 3;
          return `<li class="gal__item ${tall ? 'gal__item--tall' : ''} reveal">${img(`gallery-${i + 1}`, a, { base, w: 1200, h: tall ? 1500 : 800, sizes: '(min-width: 900px) 25vw, 50vw' })}</li>`;
        })
        .join('')}
    </ul>
  </div>
</section>

<section class="faq section" id="faq" aria-labelledby="faq-title">
  <div class="wrap faq__grid">
    <h2 class="h2 reveal" id="faq-title">${t(L.faq.title)}</h2>
    <div class="faq__list">
      ${L.faq.items.map((f) => `<details class="qa reveal"><summary><span>${t(f.q)}</span>${ic('plus', 'ic qa__icon')}</summary><div class="qa__a"><p>${t(f.a)}</p></div></details>`).join('')}
    </div>
  </div>
</section>

<section class="book section" id="book" aria-labelledby="book-title">
  <div class="wrap book__grid">
    <div class="book__intro">
      <h2 class="h2 reveal" id="book-title">${t(L.book.title)}</h2>
      <p class="lede reveal">${t(L.book.intro)}</p>
      <div class="book__wa reveal">
        <p class="book__wa-title">${t(L.book.waTitle)}</p>
        <p>${t(L.book.waText)}</p>
        <a class="btn btn--primary" href="${wa(L.wa.general)}" target="_blank" rel="noopener" data-wa="general">${ic('chat')}${esc(L.book.waCta)}</a>
      </div>
      <dl class="book__facts reveal">
        <div><dt>${ic('card')}${t(L.book.payTitle)}</dt><dd>${t(L.book.payText)}</dd></div>
        <div><dt>${ic('shield')}${t(L.book.cancelTitle)}</dt><dd>${t(L.book.cancelText)}</dd></div>
      </dl>
    </div>
    <form class="form reveal" id="booking-form" novalidate>
      <div class="field">
        <label for="f-name">${esc(L.book.name)}</label>
        <input id="f-name" name="nombre" type="text" autocomplete="name" required>
        <p class="field__err" id="f-name-err" aria-live="polite"></p>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="f-email">${esc(L.book.email)}</label>
          <input id="f-email" name="email" type="email" autocomplete="email" inputmode="email" required>
          <p class="field__err" id="f-email-err" aria-live="polite"></p>
        </div>
        <div class="field">
          <label for="f-phone">${esc(L.book.phone)}</label>
          <input id="f-phone" name="telefono" type="tel" autocomplete="tel" inputmode="tel" required aria-describedby="f-phone-hint">
          <p class="field__hint" id="f-phone-hint">${esc(L.book.phoneHint)}</p>
          <p class="field__err" id="f-phone-err" aria-live="polite"></p>
        </div>
      </div>
      <div class="field">
        <label for="f-tour">${esc(L.book.tour)}</label>
        <div class="select">
          <select id="f-tour" name="tour" required>
            <option value="">${esc(L.book.tourPlaceholder)}</option>
            ${tours.map((x) => `<option value="${esc(x.name)}" data-id="${x.id}">${esc(x.name)}</option>`).join('')}
            <option value="${esc(L.book.tourCustom)}" data-id="custom">${esc(L.book.tourCustom)}</option>
          </select>${ic('down', 'ic select__ic')}
        </div>
        <p class="field__err" id="f-tour-err" aria-live="polite"></p>
      </div>
      <div class="field-row field-row--3">
        <div class="field">
          <label for="f-date">${esc(L.book.date)}</label>
          <input id="f-date" name="fecha" type="date" required>
          <p class="field__err" id="f-date-err" aria-live="polite"></p>
        </div>
        <div class="field">
          <label for="f-people">${esc(L.book.people)}</label>
          <input id="f-people" name="personas" type="number" inputmode="numeric" min="1" max="60" value="2" required>
          <p class="field__err" id="f-people-err" aria-live="polite"></p>
        </div>
        <div class="field">
          <label for="f-lang">${esc(L.book.language)}</label>
          <div class="select">
            <select id="f-lang" name="idioma">
              ${[['es', 'Español'], ['en', 'English'], ['pt', 'Português']].map(([c, n]) => `<option value="${n}" ${c === L.code ? 'selected' : ''}>${n}</option>`).join('')}
            </select>${ic('down', 'ic select__ic')}
          </div>
        </div>
      </div>
      <div class="field">
        <label for="f-msg">${esc(L.book.message)} <span class="field__opt">(${esc(L.book.optional)})</span></label>
        <textarea id="f-msg" name="mensaje" rows="4" placeholder="${esc(L.book.messagePlaceholder)}"></textarea>
      </div>
      <div class="hp" aria-hidden="true"><label for="f-web">Website</label><input id="f-web" name="website" type="text" tabindex="-1" autocomplete="off"></div>
      <button class="btn btn--primary btn--block" type="submit" data-submit><span data-label>${esc(L.book.submit)}</span></button>
      <p class="form__status" role="status" aria-live="polite" data-status></p>
    </form>
  </div>
</section>
</main>

<footer class="foot">
  <div class="wrap">
    <div class="foot__top">
      <div class="foot__brand">
        <img src="${base}assets/img/logo.png" alt="Hello Mendoza" width="96" height="96" loading="lazy">
        <p class="foot__slogan">${esc(L.slogan)}</p>
        ${langSwitch('lang--foot')}
      </div>
      <ul class="foot__contact" role="list">
        <li><span class="foot__k">WhatsApp</span><a href="${wa(L.wa.general)}" target="_blank" rel="noopener" data-wa="general">${config.whatsappDisplay}</a></li>
        <li><span class="foot__k">${esc(L.footer.email)}</span>${isPh(config.email) ? t(config.email) : `<a href="mailto:${esc(config.email)}">${esc(config.email)}</a>`}</li>
        <li><span class="foot__k">${esc(L.footer.address)}</span>${t(config.address)}</li>
        <li><span class="foot__k">Instagram</span><a href="${ig}" target="_blank" rel="noopener">@${config.instagram}</a></li>
        <li><span class="foot__k">Tripadvisor</span>${isPh(trip) ? t(trip) : `<a href="${esc(trip)}" target="_blank" rel="noopener">Hello Mendoza</a>`}</li>
        <li><span class="foot__k">${esc(L.footer.license)}</span>${t(config.license)}</li>
      </ul>
    </div>
    <p class="foot__thanks">${esc(L.footer.thanks)}</p>
    <div class="foot__bottom">
      <p>© <span data-year>2026</span> Hello Mendoza. ${esc(L.footer.rights)}</p>
      <p><a href="#" data-legal="terms">${esc(L.footer.terms)}</a> · <a href="#" data-legal="privacy">${esc(L.footer.privacy)}</a> <span class="ph">[enlaces a completar]</span></p>
    </div>
  </div>
</footer>

<a class="fab" href="${wa(L.wa.general)}" target="_blank" rel="noopener" data-wa="general" aria-label="${esc(L.wa.float)}">${ic('chat')}</a>

<dialog class="sheet" id="tour-dialog" aria-labelledby="td-title">
  <div class="sheet__in" data-sheet></div>
</dialog>
<dialog class="lightbox" id="lightbox" aria-label="${esc(L.detail.enlarge)}">
  <button class="lb__btn lb__close" type="button" data-lb-close aria-label="${esc(L.detail.close)}">${ic('x')}</button>
  <button class="lb__btn lb__prev" type="button" data-lb-prev aria-label="${esc(L.detail.prev)}">${ic('left')}</button>
  <figure class="lb__fig"><img alt="" data-lb-img><figcaption data-lb-cap></figcaption></figure>
  <button class="lb__btn lb__next" type="button" data-lb-next aria-label="${esc(L.detail.next)}">${ic('right')}</button>
</dialog>
<div class="suggest" hidden data-suggest><p data-suggest-text></p><a class="btn btn--light btn--sm" data-suggest-go></a><button type="button" class="suggest__x" data-suggest-x>${ic('x')}</button></div>

<script id="hm-data" type="application/json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>
<script src="${base}assets/js/main.js?v=${VERSION}" defer></script>
</body>
</html>
`;
}

for (const L of LANGS) {
  const dir = path.join(root, L.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'index.html'), page(L));
}

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  path.join(root, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGS.map(
  (L) => `  <url>
    <loc>${url(L)}</loc>
    <lastmod>${today}</lastmod>
${LANGS.map((o) => `    <xhtml:link rel="alternate" hreflang="${o.code}" href="${url(o)}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${url(es)}"/>
  </url>`
).join('\n')}
</urlset>
`
);
writeFileSync(path.join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${config.siteUrl}/sitemap.xml\n`);
console.log('build ok', VERSION);
