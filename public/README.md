# Hello Mendoza — cómo editar la página

Todo el contenido está en **un solo archivo: `contenido.js`**. No hay que instalar nada ni compilar nada.

## Cambiar un texto, un precio o un dato

1. En Hostinger: **Administrador de archivos → public_html**.
2. Clic derecho en **`contenido.js` → Editar**.
3. Buscá lo que querés cambiar con **Ctrl + F** (Cmd + F en Mac).
4. Cambiá el texto **dentro de las comillas**. Guardá.
5. Recargá la página.

Cada texto aparece en los tres idiomas, uno debajo del otro:

```js
nombre: {
  es: 'Maipú, cuna del vino',
  en: 'Maipú, cradle of wine',
  pt: 'Maipú, berço do vinho',
},
```

Si dejás un idioma vacío (`en: ''`), se muestra el texto en español.

## Cambiar una foto

1. Subí la foto nueva a **`public_html/fotos/`**. Sirven .jpg, .png y .webp. Ideal: unos 1600 px de ancho y menos de 400 KB. Podés achicarla en [squoosh.app](https://squoosh.app).
2. En `contenido.js`, buscá la foto vieja (por ejemplo `maipu-1.webp`) y escribí el nombre de la nueva.

Si la subís **con el mismo nombre** que la anterior, no hace falta tocar `contenido.js`.

## Agregar o quitar fotos, tours, preguntas u opiniones

Son listas. Para **agregar**, copiá un bloque completo, desde la llave `{` hasta la `},` que lo cierra, pegalo al lado y cambiale los datos. Para **quitar**, borrá el bloque entero.

Ejemplo, una foto más para un tour:

```js
{
  archivo: 'maipu-4.jpg',
  es: 'Almuerzo bajo la parra',
  en: 'Lunch under the vines',
  pt: 'Almoço sob a parreira',
},
```

## Las 3 reglas para no romper nada

1. El texto va entre **comillas simples**: `'así'`.
2. Si el texto lleva apóstrofo, ponele una barra antes: `'it\'s'`.
3. Cada línea termina en **coma**. No borres llaves `{ }` ni corchetes `[ ]`.

Si algo quedó mal escrito, la página muestra un aviso con **el número de línea** donde está el error. Lo corregís, guardás y vuelve a funcionar.

> Consejo: antes de hacer cambios grandes, descargá una copia de `contenido.js` (clic derecho → Descargar). Si algo sale mal, la volvés a subir.

## Qué hay en cada carpeta

| Archivo | Para qué | ¿Se edita? |
|---|---|---|
| `contenido.js` | todos los textos, precios, datos y lista de fotos | **Sí** |
| `fotos/` | las fotos de la página | **Sí**, subís las tuyas |
| `assets/img/logo.png` | logo redondo (sirve sobre fondo claro y oscuro) | Reemplazar una vez |
| `assets/img/og-image.jpg` | imagen que aparece al compartir el link (1200×630) | Reemplazar una vez |
| `index.html`, `en/`, `pt/` | estructura de la página en cada idioma | No |
| `assets/css`, `assets/js`, `assets/fonts` | diseño y funcionamiento | No |

## Datos técnicos

- **Formulario:** envía un POST JSON a la dirección de `formulario` en `contenido.js`, con `nombre, email, telefono, mensaje, tour, fecha, personas, idioma, idioma_web`. Espera la respuesta `{"ok": true}`. El webhook de n8n tiene que permitir tu dominio en *Allowed Origins*.
- **Analítica:** completá `googleAnalytics` y `metaPixel` en `contenido.js`.
- **Enlace directo a un tour:** `tudominio.com/#tour-maipu-cuna-del-vino`. El nombre sale del nombre del tour en español.
- **Dominio:** `https://hellomendoza.com`, ya configurado en `index.html`, `en/`, `pt/`, `sitemap.xml` y `robots.txt`.
