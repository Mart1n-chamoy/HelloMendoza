# Hello Mendoza — sitio web

Sitio estático de una sola página en tres idiomas (ES / EN / PT). Sin frameworks: HTML, CSS y JavaScript.

## Qué subir a Hostinger

Subí a `public_html/` el contenido de esta carpeta **tal cual**:

```
index.html          ← español (por defecto)
en/index.html       ← inglés
pt/index.html       ← portugués
assets/             ← css, js, fuentes e imágenes
.htaccess           ← caché, compresión y tipos de archivo
robots.txt
sitemap.xml
```

`src/`, `tools/`, `package.json` y este README son para el repo de GitHub: no hacen falta en el hosting (no molestan si se suben).

## Datos pendientes

Todo lo que falta aparece en la página resaltado en dorado y entre `[corchetes]`. Se completa en dos lugares:

| Dónde | Qué |
|---|---|
| `src/config.mjs` | dominio (`siteUrl`), precios, puntaje y URL de Tripadvisor, email, dirección, número de habilitación, IDs de Google Analytics y Meta Pixel |
| `src/i18n/es.mjs`, `en.mjs`, `pt.mjs` | descripciones de Potrerillos, Salentein y Los Toneles, bodegas sugeridas, historia del equipo, nombres de guías, reseñas reales, medios de pago, cancelación, horarios a confirmar |

Después de editar, regenerá las páginas:

```bash
node tools/build.mjs
```

Esto reescribe `index.html`, `en/index.html`, `pt/index.html`, `sitemap.xml` y `robots.txt`. **No edites los HTML a mano**: se pisan en el próximo build.

> Importante: cambiá `siteUrl` antes de publicar. Se usa en la URL canónica, hreflang, sitemap y datos estructurados.

## Imágenes

Las imágenes son las **fotos y el logo reales** de Hello Mendoza (excepto las 3 fotos de guías, que son siluetas hasta cargar las reales). Cada foto tiene dos archivos: `nombre-lg.webp` (grande) y `nombre-sm.webp` (800 px, para celular). Para cambiar una, reemplazá los dos con el **mismo nombre** en `assets/img/`. Las fotos de cada tour se leen de la lista `alts` en `src/i18n/*.mjs`: la cantidad de textos define cuántas fotos (`tour-<id>-1`, `-2`…) tiene el carrusel; Potrerillos y Salentein tienen 1 sola por ahora:

| Archivo | Uso | Tamaño sugerido |
|---|---|---|
| `hero-desktop.webp` / `-sm` | portada en computadora (16:9) | 1920×1080 / 800 px |
| `hero-mobile.webp` / `-sm` | portada en celular (vertical) | 1080×1700 / 800 px |
| `tour-{id}-1..3.webp` / `-sm` | 3 fotos por tour (`lujan`, `maipu`, `uco`, `potrerillos`, `salentein`, `toneles`) | 1600×1067 / 800 px |
| `custom-tour.webp` | bloque "tour a medida" | 1600×1067 |
| `gallery-1..6.webp` | galería (1 y 4 son verticales) | 1200×1500 y 1200×800 |
| `guide-1..3.webp` | fotos de los guías | 800×1000 |
| `logo.png` | logo redondo (sirve sobre fondo claro y oscuro) | 192×193 |
| `og-image.jpg` | imagen al compartir en redes | 1200×630 |

Cada imagen tiene versión grande y `-sm` (800 px de ancho). Podés convertir a WebP con [Squoosh](https://squoosh.app). Si cambiás el contenido de una foto, actualizá su texto alternativo en `src/i18n/*.mjs`.

## Cómo funciona

- **Idiomas:** cada idioma es una página propia (mejor para Google). El selector guarda la elección; si alguien eligió inglés y vuelve a la portada, se lo lleva a `/en/`. Si el navegador está en otro idioma, aparece una sugerencia discreta.
- **WhatsApp:** todos los enlaces abren `wa.me/5492614603906` con el mensaje armado en el idioma activo; desde un tour, el mensaje nombra el tour.
- **Formulario:** envía un POST JSON a `https://n8n.comercialsl.com/webhook/formulario-hellomendoza` con `nombre, email, telefono, mensaje, tour, fecha, personas, idioma` (+ `idioma_web`). Espera `{"ok": true}`. Si falla, muestra el error y ofrece WhatsApp con los datos cargados. El webhook de n8n debe permitir CORS desde tu dominio (en el nodo Webhook → *Options → Allowed Origins*).
- **Analítica:** completá `gaId` y `metaPixelId` en `src/config.mjs`. Se registran clics en WhatsApp (`whatsapp_click` / Contact), apertura de tours (`view_item`) y consultas enviadas (`generate_lead` / Lead).
- **Enlace directo a un tour:** `tudominio.com/#tour-maipu` abre ese tour.

## Regenerar las ilustraciones (opcional)

```bash
npm install
python3 tools/scenes.py && node tools/render.mjs
```
