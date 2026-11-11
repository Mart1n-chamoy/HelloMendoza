// ─────────────────────────────────────────────────────────────
//  CONFIGURACIÓN GENERAL — editá estos datos y corré `node tools/build.mjs`
//  Lo que está entre [corchetes] es un dato pendiente: reemplazalo.
// ─────────────────────────────────────────────────────────────
export const config = {
  // Dominio final, sin barra al final (se usa en canonical, hreflang, sitemap y datos estructurados)
  siteUrl: 'https://www.[tu-dominio].com',

  whatsapp: '5492614603906',
  whatsappDisplay: '+54 9 261 460-3906',
  webhook: 'https://n8n.comercialsl.com/webhook/formulario-hellomendoza',

  instagram: 'hellomzaok',
  tripadvisorUrl: '[URL de Tripadvisor]',
  tripadvisorScore: '[puntaje]',

  email: '[email a completar]',
  address: '[dirección a completar]',
  license: '[número de habilitación a completar]',

  // Analítica: dejá vacío para desactivar. Ej.: 'G-XXXXXXX' y '1234567890'
  gaId: '',
  metaPixelId: '',

  // Precio "desde", por persona, en USD. Reemplazá cada '[precio]' por el número.
  prices: {
    lujan: '[precio]',
    maipu: '[precio]',
    uco: '[precio]',
    potrerillos: '[precio]',
    salentein: '[precio]',
    toneles: '[precio]',
  },
};
