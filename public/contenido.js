/* ═══════════════════════════════════════════════════════════════════
   HELLO MENDOZA · CONTENIDO DE LA PÁGINA
   ───────────────────────────────────────────────────────────────────
   Este es el ÚNICO archivo que necesitás editar.
   Lo abrís en Hostinger → Administrador de archivos → public_html →
   contenido.js → clic derecho → Editar. Cambiás, guardás y recargás
   la página. Listo.

   REGLAS (si no se respetan, la página muestra un aviso con la línea):
   1. El texto va siempre entre comillas simples:  'así'
   2. Si el texto lleva un apóstrofo, escribilo con barra:  'it\'s'
      (o usá el apóstrofo tipográfico ’ que no necesita barra)
   3. Cada línea termina en coma. No borres llaves { } ni corchetes [ ].
   4. es = español · en = inglés · pt = portugués
   5. Lo que está entre [corchetes] es un dato pendiente: reemplazalo.

   FOTOS: subilas a la carpeta  public_html/fotos/  y escribí acá el
   nombre exacto del archivo (ej.: 'maipu-4.jpg'). Sirven .jpg, .png
   y .webp. Ideal: 1600 px de ancho y menos de 400 KB.
   Para AGREGAR una foto, copiá una línea { archivo: … } completa
   (desde la llave que abre hasta la coma final) y cambiale los datos.
   Para QUITAR una, borrá ese bloque entero.
   ═══════════════════════════════════════════════════════════════════ */

window.HM_CONTENIDO = {

  // ════════════════════════════════════════════════════════════
  //  1. DATOS DE CONTACTO Y AJUSTES
  //  Precios de cada tour: más abajo, en la sección TOURS.
  //  googleAnalytics: ej. 'G-ABC123'  ·  metaPixel: ej. '1234567890'  (vacío = apagado)
  // ════════════════════════════════════════════════════════════

  ajustes: {
    whatsapp: '5492614603906',
    whatsappVisible: '+54 9 261 460-3906',
    email: '[email a completar]',
    direccion: '[dirección a completar]',
    habilitacion: '[número de habilitación a completar]',
    instagram: 'hellomzaok',
    tripadvisorUrl: '[URL de Tripadvisor]',
    tripadvisorPuntaje: '[puntaje]',
    formulario: 'https://n8n.comercialsl.com/webhook/formulario-hellomendoza',
    googleAnalytics: '',
    metaPixel: '',
  },


  // ════════════════════════════════════════════════════════════
  //  2. FOTOS DE PORTADA Y DEL BLOQUE "A MEDIDA"
  //  escritorio: horizontal (ej. 1920×1080) · celular: vertical (ej. 1080×1700)
  // ════════════════════════════════════════════════════════════

  portada: {
    escritorio: 'portada-escritorio.webp',
    celular: 'portada-celular.webp',
    aMedida: 'a-medida.webp',
  },


  // ════════════════════════════════════════════════════════════
  //  3. TOURS
  //  Para agregar un tour: copiá un bloque completo, desde { hasta },
  //  tipo: 'vino', 'naturaleza' o 'corto'
  //  zona: 'lujan', 'maipu', 'uco', 'montana' o 'ciudad'
  //  precio: solo el número, ej. '120'  (se muestra "Desde USD 120 por persona")
  //  bodegas: null si el tour no tiene bodegas sugeridas
  //  La primera foto de la lista es la que se ve en la tarjeta.
  // ════════════════════════════════════════════════════════════

  tours: [
    {
      precio: '[precio]',
      horas: 6,
      tipo: 'vino',
      zona: 'lujan',
      nombre: {
        es: 'Luján de Cuyo, tierra del Malbec',
        en: 'Luján de Cuyo, land of Malbec',
        pt: 'Luján de Cuyo, terra do Malbec',
      },
      paradas: {
        es: '3 bodegas',
        en: '3 wineries',
        pt: '3 vinícolas',
      },
      resumen: {
        es: 'Degustación en dos bodegas y almuerzo maridado en la tercera.',
        en: 'Tastings at two wineries and a wine-paired lunch at the third.',
        pt: 'Degustação em duas vinícolas e almoço harmonizado na terceira.',
      },
      descripcion: {
        es: 'La zona donde el Malbec se hizo famoso. Probás vinos en dos bodegas y cerrás con un almuerzo maridado en la tercera, con la cordillera de fondo.',
        en: 'The area that made Malbec famous. Taste at two wineries and finish with a wine-paired lunch at the third, with the Andes in the background.',
        pt: 'A região onde o Malbec ficou famoso. Você degusta em duas vinícolas e termina com um almoço harmonizado na terceira, com a cordilheira ao fundo.',
      },
      fotos: [
        {
          archivo: 'lujan-1.webp',
          es: 'Dos copas y una botella de vino sobre una tabla, con la cordillera de fondo',
          en: 'Two glasses and a bottle of wine on a board, with the Andes behind',
          pt: 'Duas taças e uma garrafa de vinho sobre uma tábua, com a cordilheira ao fundo',
        },
        {
          archivo: 'lujan-2.webp',
          es: 'Hileras de viñedo con hojas rojas de otoño',
          en: 'Vineyard rows with red autumn leaves',
          pt: 'Fileiras de vinhedo com folhas vermelhas de outono',
        },
        {
          archivo: 'lujan-3.webp',
          es: 'Picada de fiambres y una copa de tinto servida en la mesa',
          en: 'Charcuterie spread and a glass of red wine on the table',
          pt: 'Tábua de frios e uma taça de tinto servida na mesa',
        },
        {
          archivo: 'lujan-4.webp',
          es: 'Grupo descansando en reposeras sobre el césped de una bodega',
          en: 'Group relaxing in lounge chairs on a winery lawn',
          pt: 'Grupo descansando em espreguiçadeiras no gramado de uma vinícola',
        },
      ],
      itinerario: [
        {
          hora: '09:30',
          es: 'Te buscamos por tu hotel',
          en: 'Hotel pickup',
          pt: 'Buscamos você no hotel',
        },
        {
          hora: '10:15',
          es: 'Primera bodega: recorrido y degustación',
          en: 'First winery: tour and tasting',
          pt: 'Primeira vinícola: visita e degustação',
        },
        {
          hora: '12:00',
          es: 'Segunda bodega: degustación',
          en: 'Second winery: tasting',
          pt: 'Segunda vinícola: degustação',
        },
        {
          hora: '13:30',
          es: 'Almuerzo maridado en la tercera bodega',
          en: 'Wine-paired lunch at the third winery',
          pt: 'Almoço harmonizado na terceira vinícola',
        },
        {
          hora: '15:30',
          es: 'Regreso a tu hotel',
          en: 'Back to your hotel',
          pt: 'Retorno ao hotel',
        },
      ],
      incluye: [
        {
          es: 'Traslado privado ida y vuelta desde tu hotel',
          en: 'Private round-trip transport from your hotel',
          pt: 'Transporte privativo ida e volta do seu hotel',
        },
        {
          es: 'Guía local en español, inglés o portugués',
          en: 'Local guide in English, Spanish or Portuguese',
          pt: 'Guia local em português, espanhol ou inglês',
        },
        {
          es: 'Degustación en dos bodegas',
          en: 'Tastings at two wineries',
          pt: 'Degustação em duas vinícolas',
        },
        {
          es: 'Almuerzo maridado en la tercera bodega',
          en: 'Wine-paired lunch at the third winery',
          pt: 'Almoço harmonizado na terceira vinícola',
        },
      ],
      noIncluye: [
        {
          es: 'Compras de vino en las bodegas',
          en: 'Wine purchases at the wineries',
          pt: 'Compras de vinho nas vinícolas',
        },
        {
          es: 'Propinas',
          en: 'Tips',
          pt: 'Gorjetas',
        },
        {
          es: '[otros a completar]',
          en: '[others to complete]',
          pt: '[outros a completar]',
        },
      ],
      bodegas: {
        es: '[bodegas sugeridas a completar]',
        en: '[suggested wineries to complete]',
        pt: '[vinícolas sugeridas a completar]',
      },
    },
    {
      precio: '[precio]',
      horas: 8,
      tipo: 'vino',
      zona: 'maipu',
      nombre: {
        es: 'Maipú, cuna del vino',
        en: 'Maipú, cradle of wine',
        pt: 'Maipú, berço do vinho',
      },
      paradas: {
        es: '2 bodegas y 1 olivícola',
        en: '2 wineries & 1 olive farm',
        pt: '2 vinícolas e 1 olivícola',
      },
      resumen: {
        es: 'Bodegas históricas y boutique, olivícola y almuerzo maridado.',
        en: 'Historic and boutique wineries, an olive oil farm and a wine-paired lunch.',
        pt: 'Vinícolas históricas e boutique, olivícola e almoço harmonizado.',
      },
      descripcion: {
        es: 'Donde empezó la historia del vino en Mendoza. Una bodega histórica, una boutique y una olivícola para probar aceites de oliva, con almuerzo maridado.',
        en: 'Where Mendoza’s wine story began. A historic winery, a boutique one and an olive farm to taste olive oils, with a wine-paired lunch.',
        pt: 'Onde começou a história do vinho em Mendoza. Uma vinícola histórica, uma boutique e uma olivícola para provar azeites, com almoço harmonizado.',
      },
      fotos: [
        {
          archivo: 'maipu-1.webp',
          es: 'Tabla de degustación con copas de vino en una bodega de Maipú',
          en: 'Tasting board with wine glasses at a Maipú winery',
          pt: 'Tábua de degustação com taças de vinho em uma vinícola de Maipú',
        },
        {
          archivo: 'maipu-2.webp',
          es: 'Camioneta celeste antigua convertida en food truck bajo los árboles',
          en: 'Vintage light-blue van turned into a food truck under the trees',
          pt: 'Van antiga azul-clara transformada em food truck sob as árvores',
        },
        {
          archivo: 'maipu-3.webp',
          es: 'Nave de una bodega con grandes toneles de roble',
          en: 'Winery hall lined with large oak barrels',
          pt: 'Salão de uma vinícola com grandes tonéis de carvalho',
        },
        {
          archivo: 'maipu-4.webp',
          es: 'Aceitunas verdes y moradas recién cosechadas',
          en: 'Fresh green and purple olives',
          pt: 'Azeitonas verdes e roxas recém-colhidas',
        },
      ],
      itinerario: [
        {
          hora: '09:00',
          es: 'Te buscamos por tu hotel',
          en: 'Hotel pickup',
          pt: 'Buscamos você no hotel',
        },
        {
          hora: '09:45',
          es: 'Bodega histórica: recorrido y degustación',
          en: 'Historic winery: tour and tasting',
          pt: 'Vinícola histórica: visita e degustação',
        },
        {
          hora: '11:30',
          es: 'Olivícola: elaboración y cata de aceites',
          en: 'Olive farm: production and oil tasting',
          pt: 'Olivícola: produção e degustação de azeites',
        },
        {
          hora: '13:00',
          es: 'Bodega boutique con almuerzo maridado',
          en: 'Boutique winery with wine-paired lunch',
          pt: 'Vinícola boutique com almoço harmonizado',
        },
        {
          hora: '17:00',
          es: 'Regreso a tu hotel',
          en: 'Back to your hotel',
          pt: 'Retorno ao hotel',
        },
      ],
      incluye: [
        {
          es: 'Traslado privado ida y vuelta desde tu hotel',
          en: 'Private round-trip transport from your hotel',
          pt: 'Transporte privativo ida e volta do seu hotel',
        },
        {
          es: 'Guía local en español, inglés o portugués',
          en: 'Local guide in English, Spanish or Portuguese',
          pt: 'Guia local em português, espanhol ou inglês',
        },
        {
          es: 'Degustación en dos bodegas',
          en: 'Tastings at two wineries',
          pt: 'Degustação em duas vinícolas',
        },
        {
          es: 'Visita y cata en la olivícola',
          en: 'Olive farm visit and tasting',
          pt: 'Visita e degustação na olivícola',
        },
        {
          es: 'Almuerzo maridado',
          en: 'Wine-paired lunch',
          pt: 'Almoço harmonizado',
        },
      ],
      noIncluye: [
        {
          es: 'Compras en bodegas y olivícola',
          en: 'Purchases at wineries and the olive farm',
          pt: 'Compras nas vinícolas e na olivícola',
        },
        {
          es: 'Propinas',
          en: 'Tips',
          pt: 'Gorjetas',
        },
        {
          es: '[otros a completar]',
          en: '[others to complete]',
          pt: '[outros a completar]',
        },
      ],
      bodegas: {
        es: '[bodegas sugeridas a completar]',
        en: '[suggested wineries to complete]',
        pt: '[vinícolas sugeridas a completar]',
      },
    },
    {
      precio: '[precio]',
      horas: 10,
      tipo: 'vino',
      zona: 'uco',
      nombre: {
        es: 'Valle de Uco, paisaje cordillerano',
        en: 'Uco Valley, Andean landscapes',
        pt: 'Vale de Uco, paisagem da cordilheira',
      },
      paradas: {
        es: 'Bodegas premium',
        en: 'Premium wineries',
        pt: 'Vinícolas premium',
      },
      resumen: {
        es: 'Bodegas premium y almuerzo gourmet con maridaje en restaurante de bodega.',
        en: 'Premium wineries and a gourmet paired lunch at a winery restaurant.',
        pt: 'Vinícolas premium e almoço gourmet harmonizado em restaurante de vinícola.',
      },
      descripcion: {
        es: 'Viñedos de altura al pie de los Andes. Visitás bodegas premium y almorzás en el restaurante de una bodega, con un menú gourmet maridado.',
        en: 'High-altitude vineyards at the foot of the Andes. Visit premium wineries and enjoy a gourmet, wine-paired lunch at a winery restaurant.',
        pt: 'Vinhedos de altitude ao pé dos Andes. Você visita vinícolas premium e almoça no restaurante de uma vinícola, com menu gourmet harmonizado.',
      },
      fotos: [
        {
          archivo: 'uco-1.webp',
          es: 'Botellas y copas de tinto frente a un lago con la cordillera de fondo',
          en: 'Bottles and glasses of red wine in front of a lake with the Andes behind',
          pt: 'Garrafas e taças de tinto diante de um lago com a cordilheira ao fundo',
        },
        {
          archivo: 'uco-2.webp',
          es: 'Salón de una bodega con ventanales y sillones',
          en: 'Winery lounge with big windows and armchairs',
          pt: 'Salão de uma vinícola com janelões e poltronas',
        },
        {
          archivo: 'uco-3.webp',
          es: 'Plato de carne con copas de vino y una botella sobre la mesa',
          en: 'Plate of beef with wine glasses and a bottle on the table',
          pt: 'Prato de carne com taças de vinho e uma garrafa sobre a mesa',
        },
      ],
      itinerario: [
        {
          hora: '08:30',
          es: 'Te buscamos por tu hotel',
          en: 'Hotel pickup',
          pt: 'Buscamos você no hotel',
        },
        {
          hora: '10:00',
          es: 'Primera bodega premium: recorrido y degustación',
          en: 'First premium winery: tour and tasting',
          pt: 'Primeira vinícola premium: visita e degustação',
        },
        {
          hora: '13:00',
          es: 'Almuerzo gourmet con maridaje en restaurante de bodega',
          en: 'Gourmet paired lunch at a winery restaurant',
          pt: 'Almoço gourmet harmonizado em restaurante de vinícola',
        },
        {
          hora: '15:30',
          es: 'Segunda bodega premium',
          en: 'Second premium winery',
          pt: 'Segunda vinícola premium',
        },
        {
          hora: '18:30',
          es: 'Regreso a tu hotel',
          en: 'Back to your hotel',
          pt: 'Retorno ao hotel',
        },
      ],
      incluye: [
        {
          es: 'Traslado privado ida y vuelta desde tu hotel',
          en: 'Private round-trip transport from your hotel',
          pt: 'Transporte privativo ida e volta do seu hotel',
        },
        {
          es: 'Guía local en español, inglés o portugués',
          en: 'Local guide in English, Spanish or Portuguese',
          pt: 'Guia local em português, espanhol ou inglês',
        },
        {
          es: 'Degustaciones en bodegas premium',
          en: 'Tastings at premium wineries',
          pt: 'Degustações em vinícolas premium',
        },
        {
          es: 'Almuerzo gourmet con maridaje',
          en: 'Gourmet lunch with wine pairing',
          pt: 'Almoço gourmet harmonizado',
        },
      ],
      noIncluye: [
        {
          es: 'Compras de vino en las bodegas',
          en: 'Wine purchases at the wineries',
          pt: 'Compras de vinho nas vinícolas',
        },
        {
          es: 'Propinas',
          en: 'Tips',
          pt: 'Gorjetas',
        },
        {
          es: '[otros a completar]',
          en: '[others to complete]',
          pt: '[outros a completar]',
        },
      ],
      bodegas: {
        es: '[bodegas sugeridas a completar]',
        en: '[suggested wineries to complete]',
        pt: '[vinícolas sugeridas a completar]',
      },
    },
    {
      precio: '[precio]',
      horas: 6,
      tipo: 'naturaleza',
      zona: 'montana',
      nombre: {
        es: 'Potrerillos',
        en: 'Potrerillos',
        pt: 'Potrerillos',
      },
      paradas: {
        es: 'Dique y montaña',
        en: 'Lake & mountains',
        pt: 'Represa e montanha',
      },
      resumen: {
        es: 'Naturaleza y montaña junto al dique, parada panorámica y almuerzo liviano.',
        en: 'Nature and mountains by the reservoir, a scenic stop and a light lunch.',
        pt: 'Natureza e montanha junto à represa, parada panorâmica e almoço leve.',
      },
      descripcion: {
        es: '[descripción a completar]',
        en: '[description to complete]',
        pt: '[descrição a completar]',
      },
      fotos: [
        {
          archivo: 'potrerillos-1.webp',
          es: 'Viñedo de Mendoza al atardecer con el sol entre las hileras',
          en: 'Mendoza vineyard at sunset with the sun over the rows',
          pt: 'Vinhedo de Mendoza ao pôr do sol com o sol entre as fileiras',
        },
      ],
      itinerario: [
        {
          hora: '09:30',
          es: 'Te buscamos por tu hotel',
          en: 'Hotel pickup',
          pt: 'Buscamos você no hotel',
        },
        {
          hora: '10:30',
          es: 'Parada panorámica sobre el dique',
          en: 'Scenic stop above the reservoir',
          pt: 'Parada panorâmica sobre a represa',
        },
        {
          hora: '11:30',
          es: 'Recorrido por la montaña junto al dique',
          en: 'Mountain drive along the reservoir',
          pt: 'Passeio pela montanha junto à represa',
        },
        {
          hora: '13:00',
          es: 'Almuerzo liviano',
          en: 'Light lunch',
          pt: 'Almoço leve',
        },
        {
          hora: '15:30',
          es: 'Regreso a tu hotel',
          en: 'Back to your hotel',
          pt: 'Retorno ao hotel',
        },
      ],
      incluye: [
        {
          es: 'Traslado privado ida y vuelta desde tu hotel',
          en: 'Private round-trip transport from your hotel',
          pt: 'Transporte privativo ida e volta do seu hotel',
        },
        {
          es: 'Guía local en español, inglés o portugués',
          en: 'Local guide in English, Spanish or Portuguese',
          pt: 'Guia local em português, espanhol ou inglês',
        },
        {
          es: 'Almuerzo liviano',
          en: 'Light lunch',
          pt: 'Almoço leve',
        },
        {
          es: '[otros a completar]',
          en: '[others to complete]',
          pt: '[outros a completar]',
        },
      ],
      noIncluye: [
        {
          es: 'Propinas',
          en: 'Tips',
          pt: 'Gorjetas',
        },
        {
          es: '[otros a completar]',
          en: '[others to complete]',
          pt: '[outros a completar]',
        },
      ],
      bodegas: null,
    },
    {
      precio: '[precio]',
      horas: 2,
      tipo: 'corto',
      zona: 'uco',
      nombre: {
        es: 'Salentein',
        en: 'Salentein',
        pt: 'Salentein',
      },
      paradas: {
        es: '1 bodega',
        en: '1 winery',
        pt: '1 vinícola',
      },
      resumen: {
        es: 'Visita exprés a la bodega, degustación de 3 vinos y sala de arte.',
        en: 'Express winery visit, a tasting of 3 wines and the art gallery.',
        pt: 'Visita expressa à vinícola, degustação de 3 vinhos e galeria de arte.',
      },
      descripcion: {
        es: '[descripción a completar]',
        en: '[description to complete]',
        pt: '[descrição a completar]',
      },
      fotos: [
        {
          archivo: 'salentein-1.webp',
          es: 'Racimos de uvas tintas entre las hileras de un viñedo',
          en: 'Bunches of red grapes between vineyard rows',
          pt: 'Cachos de uvas tintas entre as fileiras de um vinhedo',
        },
      ],
      itinerario: [
        {
          hora: '0:00',
          es: 'Llegada y recorrido por la bodega',
          en: 'Arrival and winery tour',
          pt: 'Chegada e visita à vinícola',
        },
        {
          hora: '0:45',
          es: 'Degustación de 3 vinos',
          en: 'Tasting of 3 wines',
          pt: 'Degustação de 3 vinhos',
        },
        {
          hora: '1:30',
          es: 'Visita a la sala de arte',
          en: 'Art gallery visit',
          pt: 'Visita à galeria de arte',
        },
      ],
      incluye: [
        {
          es: 'Visita guiada a la bodega',
          en: 'Guided winery tour',
          pt: 'Visita guiada à vinícola',
        },
        {
          es: 'Degustación de 3 vinos',
          en: 'Tasting of 3 wines',
          pt: 'Degustação de 3 vinhos',
        },
        {
          es: 'Sala de arte',
          en: 'Art gallery',
          pt: 'Galeria de arte',
        },
        {
          es: '[traslado: confirmar]',
          en: '[transport: to confirm]',
          pt: '[transporte: a confirmar]',
        },
      ],
      noIncluye: [
        {
          es: 'Compras de vino',
          en: 'Wine purchases',
          pt: 'Compras de vinho',
        },
        {
          es: 'Propinas',
          en: 'Tips',
          pt: 'Gorjetas',
        },
        {
          es: '[otros a completar]',
          en: '[others to complete]',
          pt: '[outros a completar]',
        },
      ],
      bodegas: {
        es: 'Bodegas Salentein',
        en: 'Bodegas Salentein',
        pt: 'Bodegas Salentein',
      },
    },
    {
      precio: '[precio]',
      horas: 7,
      tipo: 'vino',
      zona: 'ciudad',
      nombre: {
        es: 'Los Toneles',
        en: 'Los Toneles',
        pt: 'Los Toneles',
      },
      paradas: {
        es: 'Bodegas centenarias',
        en: 'Century-old wineries',
        pt: 'Vinícolas centenárias',
      },
      resumen: {
        es: 'Recorrido histórico por bodegas centenarias, con almuerzo.',
        en: 'A historic route through century-old wineries, with lunch.',
        pt: 'Roteiro histórico por vinícolas centenárias, com almoço.',
      },
      descripcion: {
        es: '[descripción a completar]',
        en: '[description to complete]',
        pt: '[descrição a completar]',
      },
      fotos: [
        {
          archivo: 'toneles-1.webp',
          es: 'Dos copas de vino blanco en una degustación',
          en: 'Two glasses of white wine at a tasting',
          pt: 'Duas taças de vinho branco em uma degustação',
        },
        {
          archivo: 'toneles-2.webp',
          es: 'Vino tinto sirviéndose en una copa',
          en: 'Red wine being poured into a glass',
          pt: 'Vinho tinto sendo servido em uma taça',
        },
      ],
      itinerario: [
        {
          hora: '09:30',
          es: 'Te buscamos por tu hotel',
          en: 'Hotel pickup',
          pt: 'Buscamos você no hotel',
        },
        {
          hora: '10:00',
          es: 'Primera bodega centenaria: recorrido histórico',
          en: 'First century-old winery: historic tour',
          pt: 'Primeira vinícola centenária: visita histórica',
        },
        {
          hora: '11:45',
          es: 'Segunda bodega y degustación',
          en: 'Second winery and tasting',
          pt: 'Segunda vinícola e degustação',
        },
        {
          hora: '13:30',
          es: 'Almuerzo',
          en: 'Lunch',
          pt: 'Almoço',
        },
        {
          hora: '16:30',
          es: 'Regreso a tu hotel',
          en: 'Back to your hotel',
          pt: 'Retorno ao hotel',
        },
      ],
      incluye: [
        {
          es: 'Traslado privado ida y vuelta desde tu hotel',
          en: 'Private round-trip transport from your hotel',
          pt: 'Transporte privativo ida e volta do seu hotel',
        },
        {
          es: 'Guía local en español, inglés o portugués',
          en: 'Local guide in English, Spanish or Portuguese',
          pt: 'Guia local em português, espanhol ou inglês',
        },
        {
          es: 'Degustaciones',
          en: 'Tastings',
          pt: 'Degustações',
        },
        {
          es: 'Almuerzo',
          en: 'Lunch',
          pt: 'Almoço',
        },
      ],
      noIncluye: [
        {
          es: 'Compras de vino',
          en: 'Wine purchases',
          pt: 'Compras de vinho',
        },
        {
          es: 'Propinas',
          en: 'Tips',
          pt: 'Gorjetas',
        },
        {
          es: '[otros a completar]',
          en: '[others to complete]',
          pt: '[outros a completar]',
        },
      ],
      bodegas: {
        es: 'Bodega Los Toneles · [otras a completar]',
        en: 'Bodega Los Toneles · [others to complete]',
        pt: 'Bodega Los Toneles · [outras a completar]',
      },
    },
  ],


  // ════════════════════════════════════════════════════════════
  //  4. GALERÍA
  //  vertical: true para fotos verticales (ocupan dos filas), false para horizontales.
  // ════════════════════════════════════════════════════════════

  galeria: [
    {
      archivo: 'galeria-1.webp',
      vertical: true,
      es: 'Dos copas y una botella de vino sobre una tabla, con la cordillera de fondo',
      en: 'Two glasses and a bottle of wine on a board, with the Andes behind',
      pt: 'Duas taças e uma garrafa de vinho sobre uma tábua, com a cordilheira ao fundo',
    },
    {
      archivo: 'galeria-2.webp',
      vertical: false,
      es: 'Mesa servida junto a un lago con la cordillera nevada de fondo',
      en: 'Table set beside a lake with snow-capped mountains behind',
      pt: 'Mesa posta ao lado de um lago com montanhas nevadas ao fundo',
    },
    {
      archivo: 'galeria-3.webp',
      vertical: false,
      es: 'Racimos de uvas tintas entre las hileras de un viñedo',
      en: 'Bunches of red grapes between vineyard rows',
      pt: 'Cachos de uvas tintas entre as fileiras de um vinhedo',
    },
    {
      archivo: 'galeria-4.webp',
      vertical: true,
      es: 'Cava circular con una gran piedra al centro y paredes de botellas',
      en: 'Round cellar with a large stone in the middle and walls of bottles',
      pt: 'Adega circular com uma grande pedra no centro e paredes de garrafas',
    },
    {
      archivo: 'galeria-5.webp',
      vertical: false,
      es: 'Picada de fiambres y una copa de tinto servida en la mesa',
      en: 'Charcuterie spread and a glass of red wine on the table',
      pt: 'Tábua de frios e uma taça de tinto servida na mesa',
    },
    {
      archivo: 'galeria-6.webp',
      vertical: false,
      es: 'Vino tinto cayendo en una copa',
      en: 'Red wine being poured into a glass',
      pt: 'Vinho tinto caindo em uma taça',
    },
  ],


  // ════════════════════════════════════════════════════════════
  //  5. GUÍAS (sección "Quiénes somos")
  //  Fotos verticales (ej. 800×1000).
  // ════════════════════════════════════════════════════════════

  guias: [
    {
      archivo: 'guia-1.webp',
      nombre: '[nombre del guía]',
      idiomas: {
        es: '[idiomas que habla]',
        en: '[languages spoken]',
        pt: '[idiomas que fala]',
      },
    },
    {
      archivo: 'guia-2.webp',
      nombre: '[nombre del guía]',
      idiomas: {
        es: '[idiomas que habla]',
        en: '[languages spoken]',
        pt: '[idiomas que fala]',
      },
    },
    {
      archivo: 'guia-3.webp',
      nombre: '[nombre del guía]',
      idiomas: {
        es: '[idiomas que habla]',
        en: '[languages spoken]',
        pt: '[idiomas que fala]',
      },
    },
  ],


  // ════════════════════════════════════════════════════════════
  //  6. OPINIONES DE TRIPADVISOR
  //  Solo reseñas reales. Copiá el texto tal cual y en su idioma original.
  //  puntaje: número del 1 al 5 (ej. 5).
  // ════════════════════════════════════════════════════════════

  opiniones: [
    {
      nombre: '[nombre]',
      pais: '[país]',
      puntaje: '[puntaje]',
      texto: '[reseña real a cargar]',
    },
    {
      nombre: '[nombre]',
      pais: '[país]',
      puntaje: '[puntaje]',
      texto: '[reseña real a cargar]',
    },
    {
      nombre: '[nombre]',
      pais: '[país]',
      puntaje: '[puntaje]',
      texto: '[reseña real a cargar]',
    },
  ],


  // ════════════════════════════════════════════════════════════
  //  7. PREGUNTAS FRECUENTES
  //  Para agregar una, copiá un bloque { pregunta … respuesta … } completo.
  // ════════════════════════════════════════════════════════════

  preguntas: [
    {
      pregunta: {
        es: '¿Me pasan a buscar por el hotel?',
        en: 'Do you pick me up at my hotel?',
        pt: 'Vocês me buscam no hotel?',
      },
      respuesta: {
        es: 'Sí. Todos los tours incluyen traslado privado ida y vuelta: te buscamos y te dejamos en la puerta de tu hotel en Mendoza. [zonas de cobertura a confirmar]',
        en: 'Yes. Every tour includes private round-trip transport: we pick you up and drop you off at your hotel door in Mendoza. [coverage area to confirm]',
        pt: 'Sim. Todos os passeios incluem transporte privativo ida e volta: buscamos e deixamos você na porta do seu hotel em Mendoza. [área de cobertura a confirmar]',
      },
    },
    {
      pregunta: {
        es: '¿Puedo ir con niños?',
        en: 'Can I bring kids?',
        pt: 'Posso ir com crianças?',
      },
      respuesta: {
        es: 'Sí. Para familias recomendamos Bonfanti y Tempus Alba, que son cómodas para ir con chicos. Avisanos las edades al reservar.',
        en: 'Yes. For families we recommend Bonfanti and Tempus Alba, which are comfortable with children. Let us know their ages when you book.',
        pt: 'Sim. Para famílias recomendamos Bonfanti e Tempus Alba, que são tranquilas para ir com crianças. Informe as idades ao reservar.',
      },
    },
    {
      pregunta: {
        es: '¿Tienen opciones vegetarianas?',
        en: 'Do you have vegetarian options?',
        pt: 'Vocês têm opções vegetarianas?',
      },
      respuesta: {
        es: 'Avisanos al reservar y lo coordinamos con cada bodega. [confirmar opciones vegetarianas, veganas y sin TACC]',
        en: 'Tell us when you book and we’ll arrange it with each winery. [confirm vegetarian, vegan and gluten-free options]',
        pt: 'Avise ao reservar e combinamos com cada vinícola. [confirmar opções vegetarianas, veganas e sem glúten]',
      },
    },
    {
      pregunta: {
        es: '¿Qué pasa si llueve?',
        en: 'What if it rains?',
        pt: 'E se chover?',
      },
      respuesta: {
        es: 'Las visitas y degustaciones se hacen dentro de las bodegas, así que el tour sigue. [política ante mal tiempo a completar]',
        en: 'Visits and tastings happen inside the wineries, so the tour goes on. [bad weather policy to complete]',
        pt: 'As visitas e degustações acontecem dentro das vinícolas, então o passeio continua. [política em caso de mau tempo a completar]',
      },
    },
    {
      pregunta: {
        es: '¿Qué medios de pago aceptan?',
        en: 'Which payment methods do you accept?',
        pt: 'Quais formas de pagamento vocês aceitam?',
      },
      respuesta: {
        es: '[medios de pago a completar]',
        en: '[payment methods to complete]',
        pt: '[formas de pagamento a completar]',
      },
    },
    {
      pregunta: {
        es: '¿Cuál es la política de cancelación?',
        en: 'What is your cancellation policy?',
        pt: 'Qual é a política de cancelamento?',
      },
      respuesta: {
        es: '[política de cancelación a completar]',
        en: '[cancellation policy to complete]',
        pt: '[política de cancelamento a completar]',
      },
    },
    {
      pregunta: {
        es: '¿Qué idiomas hablan los guías?',
        en: 'Which languages do the guides speak?',
        pt: 'Quais idiomas os guias falam?',
      },
      respuesta: {
        es: 'Español, inglés y portugués. Elegís el idioma al reservar.',
        en: 'English, Spanish and Portuguese. You choose the language when you book.',
        pt: 'Português, espanhol e inglês. Você escolhe o idioma ao reservar.',
      },
    },
  ],


  // ════════════════════════════════════════════════════════════
  //  8. TEXTOS DE LA PÁGINA (títulos, botones, mensajes)
  //  Están en el orden en que aparecen en la página.
  //  meta = título y descripción que muestra Google.
  //  wa = mensajes que se precargan en WhatsApp. {tour} se reemplaza por el nombre del tour.
  //  En la portada, <em>…</em> marca la parte del título en cursiva dorada.
  // ════════════════════════════════════════════════════════════

  textos: {
    meta: {
      title: {
        es: 'Tours de bodegas en Mendoza con guía local | Hello Mendoza',
        en: 'Mendoza Wine Tours with Local Guides | Hello Mendoza',
        pt: 'Passeios por vinícolas em Mendoza com guia local | Hello Mendoza',
      },
      description: {
        es: 'Tours de bodegas en Mendoza con guía local en español, inglés y portugués y traslado desde tu hotel. Luján de Cuyo, Maipú y Valle de Uco. Reservá por WhatsApp.',
        en: 'Mendoza wine tours with local guides who speak English, Spanish and Portuguese, plus hotel pickup. Luján de Cuyo, Maipú and Uco Valley. Book on WhatsApp.',
        pt: 'Tours de vinícolas em Mendoza com guia local que fala português, espanhol e inglês e transfer do seu hotel. Luján de Cuyo, Maipú e Vale de Uco. Reserve pelo WhatsApp.',
      },
    },
    slogan: {
      es: 'Somos locales pero hablamos tu idioma',
      en: 'We’re locals, but we speak your language',
      pt: 'Somos locais, mas falamos a sua língua',
    },
    skip: {
      es: 'Saltar al contenido',
      en: 'Skip to content',
      pt: 'Pular para o conteúdo',
    },
    nav: {
      tours: {
        es: 'Tours',
        en: 'Tours',
        pt: 'Passeios',
      },
      how: {
        es: 'Cómo funciona',
        en: 'How it works',
        pt: 'Como funciona',
      },
      about: {
        es: 'Nosotros',
        en: 'About us',
        pt: 'Quem somos',
      },
      reviews: {
        es: 'Opiniones',
        en: 'Reviews',
        pt: 'Avaliações',
      },
      faq: {
        es: 'Preguntas',
        en: 'FAQ',
        pt: 'Dúvidas',
      },
      book: {
        es: 'Reservar por WhatsApp',
        en: 'Book on WhatsApp',
        pt: 'Reservar pelo WhatsApp',
      },
      bookShort: {
        es: 'WhatsApp',
        en: 'WhatsApp',
        pt: 'WhatsApp',
      },
      menu: {
        es: 'Abrir menú',
        en: 'Open menu',
        pt: 'Abrir menu',
      },
      close: {
        es: 'Cerrar menú',
        en: 'Close menu',
        pt: 'Fechar menu',
      },
      lang: {
        es: 'Idioma',
        en: 'Language',
        pt: 'Idioma',
      },
      home: {
        es: 'Hello Mendoza, inicio',
        en: 'Hello Mendoza, home',
        pt: 'Hello Mendoza, início',
      },
    },
    hero: {
      title: {
        es: 'Descubrí el alma de las bodegas de Mendoza con locales que <em>hablan tu idioma</em>',
        en: 'Discover the soul of Mendoza’s wineries with locals who <em>speak your language</em>',
        pt: 'Descubra a alma das vinícolas de Mendoza com locais que <em>falam a sua língua</em>',
      },
      sub: {
        es: 'Tours de vino y gastronomía en Luján de Cuyo, Maipú y Valle de Uco. Te buscamos por el hotel y te llevamos a las bodegas que elegimos nosotros.',
        en: 'Wine and food tours in Luján de Cuyo, Maipú and the Uco Valley. We pick you up at your hotel and take you to wineries we’ve chosen ourselves.',
        pt: 'Passeios de vinho e gastronomia em Luján de Cuyo, Maipú e Vale de Uco. Buscamos você no hotel e levamos às vinícolas que nós escolhemos.',
      },
      ctaTours: {
        es: 'Ver tours',
        en: 'See tours',
        pt: 'Ver passeios',
      },
      ctaWa: {
        es: 'Reservar por WhatsApp',
        en: 'Book on WhatsApp',
        pt: 'Reservar pelo WhatsApp',
      },
      trustScore: {
        es: 'en Tripadvisor',
        en: 'on Tripadvisor',
        pt: 'no Tripadvisor',
      },
      trust: [
        {
          es: 'Guías en español, inglés y portugués',
          en: 'Guides in English, Spanish and Portuguese',
          pt: 'Guias em português, espanhol e inglês',
        },
        {
          es: 'Traslado desde tu hotel',
          en: 'Hotel pickup and drop-off',
          pt: 'Transfer do seu hotel',
        },
      ],
      imgAlt: {
        es: 'Copa de vino tinto sobre un viñedo de Mendoza al atardecer, con la cordillera de los Andes nevada de fondo',
        en: 'Glass of red wine over a Mendoza vineyard at sunset, with the snow-capped Andes behind',
        pt: 'Taça de vinho tinto sobre um vinhedo de Mendoza ao pôr do sol, com a cordilheira dos Andes nevada ao fundo',
      },
    },
    diffs: {
      title: {
        es: 'Lo que nos hace distintos',
        en: 'What makes us different',
        pt: 'O que nos faz diferentes',
      },
      items: [
        {
          icon: {
            es: 'languages',
            en: 'languages',
            pt: 'languages',
          },
          title: {
            es: 'Guía local trilingüe',
            en: 'Trilingual local guide',
            pt: 'Guia local trilíngue',
          },
          text: {
            es: 'Nacimos acá y te contamos Mendoza en español, inglés o portugués.',
            en: 'Born and raised here, we tell you Mendoza’s story in English, Spanish or Portuguese.',
            pt: 'Nascemos aqui e contamos Mendoza em português, espanhol ou inglês.',
          },
        },
        {
          icon: {
            es: 'van',
            en: 'van',
            pt: 'van',
          },
          title: {
            es: 'Transporte privado ida y vuelta',
            en: 'Private round-trip transport',
            pt: 'Transporte privativo ida e volta',
          },
          text: {
            es: 'Te buscamos por tu hotel y te dejamos ahí al terminar. Sin manejar, sin horarios de colectivo.',
            en: 'We pick you up at your hotel and bring you back. No driving, no bus schedules.',
            pt: 'Buscamos você no hotel e deixamos lá no final. Sem dirigir, sem horários de ônibus.',
          },
        },
        {
          icon: {
            es: 'glass',
            en: 'glass',
            pt: 'glass',
          },
          title: {
            es: 'Bodegas elegidas por nosotros',
            en: 'Wineries we hand-pick',
            pt: 'Vinícolas escolhidas por nós',
          },
          text: {
            es: 'Visitamos cada bodega antes de recomendarla. Solo vas a las que nos gustan.',
            en: 'We visit every winery before we recommend it. You only go to the ones we love.',
            pt: 'Visitamos cada vinícola antes de recomendar. Você só vai às que a gente adora.',
          },
        },
        {
          icon: {
            es: 'route',
            en: 'route',
            pt: 'route',
          },
          title: {
            es: 'Itinerario a medida',
            en: 'Tailor-made itinerary',
            pt: 'Roteiro sob medida',
          },
          text: {
            es: 'Ajustamos bodegas, horarios y comidas a tu grupo y a tu ritmo.',
            en: 'We adjust wineries, times and meals to your group and your pace.',
            pt: 'Ajustamos vinícolas, horários e refeições ao seu grupo e ao seu ritmo.',
          },
        },
      ],
    },
    tours: {
      title: {
        es: 'Nuestros tours',
        en: 'Our tours',
        pt: 'Nossos passeios',
      },
      intro: {
        es: 'Seis salidas para conocer Mendoza por sus vinos, su comida y su montaña. Tocá un tour para ver el itinerario completo.',
        en: 'Six ways to get to know Mendoza through its wine, food and mountains. Tap a tour to see the full itinerary.',
        pt: 'Seis saídas para conhecer Mendoza pelos vinhos, pela comida e pela montanha. Toque em um passeio para ver o roteiro completo.',
      },
      filterType: {
        es: 'Tipo',
        en: 'Type',
        pt: 'Tipo',
      },
      filterZone: {
        es: 'Zona',
        en: 'Area',
        pt: 'Região',
      },
      all: {
        es: 'Todos',
        en: 'All',
        pt: 'Todos',
      },
      allZones: {
        es: 'Todas',
        en: 'All',
        pt: 'Todas',
      },
      types: {
        vino: {
          es: 'Vino y gastronomía',
          en: 'Wine & food',
          pt: 'Vinho e gastronomia',
        },
        naturaleza: {
          es: 'Naturaleza',
          en: 'Nature',
          pt: 'Natureza',
        },
        corto: {
          es: 'Visita corta',
          en: 'Short visit',
          pt: 'Visita curta',
        },
      },
      zones: {
        lujan: {
          es: 'Luján de Cuyo',
          en: 'Luján de Cuyo',
          pt: 'Luján de Cuyo',
        },
        maipu: {
          es: 'Maipú',
          en: 'Maipú',
          pt: 'Maipú',
        },
        uco: {
          es: 'Valle de Uco',
          en: 'Uco Valley',
          pt: 'Vale de Uco',
        },
        montana: {
          es: 'Montaña',
          en: 'Mountains',
          pt: 'Montanha',
        },
        ciudad: {
          es: 'Gran Mendoza',
          en: 'Greater Mendoza',
          pt: 'Grande Mendoza',
        },
      },
      from: {
        es: 'Desde',
        en: 'From',
        pt: 'A partir de',
      },
      perPerson: {
        es: 'por persona',
        en: 'per person',
        pt: 'por pessoa',
      },
      hours: {
        es: 'horas',
        en: 'hours',
        pt: 'horas',
      },
      details: {
        es: 'Ver tour',
        en: 'See tour',
        pt: 'Ver passeio',
      },
      empty: {
        es: 'No hay tours con esos filtros.',
        en: 'No tours match those filters.',
        pt: 'Nenhum passeio com esses filtros.',
      },
      reset: {
        es: 'Ver todos',
        en: 'Show all',
        pt: 'Ver todos',
      },
      count: {
        es: '{n} tours',
        en: '{n} tours',
        pt: '{n} passeios',
      },
    },
    detail: {
      itinerary: {
        es: 'Itinerario',
        en: 'Itinerary',
        pt: 'Roteiro',
      },
      itineraryNote: {
        es: 'Horarios orientativos [a confirmar]. Los ajustamos a tu hotel y a tu vuelo.',
        en: 'Approximate times [to confirm]. We adjust them to your hotel and your flight.',
        pt: 'Horários aproximados [a confirmar]. Ajustamos ao seu hotel e ao seu voo.',
      },
      includes: {
        es: 'Incluye',
        en: 'Included',
        pt: 'Inclui',
      },
      excludes: {
        es: 'No incluye',
        en: 'Not included',
        pt: 'Não inclui',
      },
      meeting: {
        es: 'Punto de encuentro',
        en: 'Meeting point',
        pt: 'Ponto de encontro',
      },
      meetingText: {
        es: 'A coordinar según tu hotel. Te pasamos a buscar por la puerta.',
        en: 'Arranged according to your hotel. We pick you up at the door.',
        pt: 'A combinar conforme o seu hotel. Buscamos você na porta.',
      },
      wineries: {
        es: 'Bodegas sugeridas',
        en: 'Suggested wineries',
        pt: 'Vinícolas sugeridas',
      },
      kids: {
        es: '¿Viajás con niños?',
        en: 'Traveling with kids?',
        pt: 'Viajando com crianças?',
      },
      kidsText: {
        es: 'Para familias recomendamos Bonfanti y Tempus Alba: son bodegas cómodas para ir con chicos.',
        en: 'For families we recommend Bonfanti and Tempus Alba: both are easy, comfortable visits with children.',
        pt: 'Para famílias recomendamos Bonfanti e Tempus Alba: são vinícolas tranquilas para ir com crianças.',
      },
      consult: {
        es: 'Consultar por WhatsApp',
        en: 'Ask on WhatsApp',
        pt: 'Perguntar pelo WhatsApp',
      },
      book: {
        es: 'Reservar este tour',
        en: 'Book this tour',
        pt: 'Reservar este passeio',
      },
      prev: {
        es: 'Foto anterior',
        en: 'Previous photo',
        pt: 'Foto anterior',
      },
      next: {
        es: 'Foto siguiente',
        en: 'Next photo',
        pt: 'Próxima foto',
      },
      close: {
        es: 'Cerrar',
        en: 'Close',
        pt: 'Fechar',
      },
      photoOf: {
        es: 'Foto {i} de {n}',
        en: 'Photo {i} of {n}',
        pt: 'Foto {i} de {n}',
      },
      enlarge: {
        es: 'Ampliar foto',
        en: 'Enlarge photo',
        pt: 'Ampliar foto',
      },
      duration: {
        es: 'Duración',
        en: 'Duration',
        pt: 'Duração',
      },
    },
    custom: {
      title: {
        es: 'Armamos tu tour a medida',
        en: 'We build your tailor-made tour',
        pt: 'Montamos o seu passeio sob medida',
      },
      text: {
        es: '¿Querés combinar zonas, sumar una bodega en particular o ir a tu ritmo? Contanos qué te gusta, cuántos son y qué fecha tenés. Te proponemos un itinerario en el día.',
        en: 'Want to combine areas, add a specific winery or go at your own pace? Tell us what you like, how many you are and your date. We’ll send you an itinerary the same day.',
        pt: 'Quer combinar regiões, incluir uma vinícola específica ou ir no seu ritmo? Conte o que você gosta, quantas pessoas são e a data. Enviamos um roteiro no mesmo dia.',
      },
      cta: {
        es: 'Armar mi tour por WhatsApp',
        en: 'Plan my tour on WhatsApp',
        pt: 'Montar meu passeio pelo WhatsApp',
      },
      imgAlt: {
        es: 'Viñedo de Mendoza al atardecer con la cordillera de fondo',
        en: 'Mendoza vineyard at sunset with the Andes behind',
        pt: 'Vinhedo de Mendoza ao pôr do sol com a cordilheira ao fundo',
      },
    },
    how: {
      title: {
        es: 'Cómo funciona',
        en: 'How it works',
        pt: 'Como funciona',
      },
      intro: {
        es: 'Reservar es simple y lo hacés desde el celular.',
        en: 'Booking is simple, and you can do it all from your phone.',
        pt: 'Reservar é simples e você faz tudo pelo celular.',
      },
      steps: [
        {
          title: {
            es: 'Nos escribís',
            en: 'Message us',
            pt: 'Você nos escreve',
          },
          text: {
            es: 'Por WhatsApp o por el formulario. Contanos fecha, cantidad de personas y qué tour te interesa.',
            en: 'On WhatsApp or through the form. Tell us your date, group size and the tour you like.',
            pt: 'Pelo WhatsApp ou pelo formulário. Conte a data, quantas pessoas e qual passeio interessa.',
          },
        },
        {
          title: {
            es: 'Confirmamos y reservás con una seña',
            en: 'We confirm, you pay a deposit',
            pt: 'Confirmamos e você reserva com um sinal',
          },
          text: {
            es: 'Te confirmamos disponibilidad y precio final. Con una seña tu lugar queda asegurado.',
            en: 'We confirm availability and the final price. A deposit secures your spot.',
            pt: 'Confirmamos a disponibilidade e o preço final. Com um sinal, sua vaga fica garantida.',
          },
        },
        {
          title: {
            es: 'Te pasamos a buscar por el hotel',
            en: 'We pick you up at your hotel',
            pt: 'Buscamos você no hotel',
          },
          text: {
            es: 'El día del tour te buscamos por la puerta de tu hotel. Vos solo disfrutás.',
            en: 'On the day, we pick you up at your hotel door. You just enjoy.',
            pt: 'No dia do passeio, buscamos você na porta do hotel. Você só aproveita.',
          },
        },
      ],
    },
    book: {
      title: {
        es: 'Reservá tu tour',
        en: 'Book your tour',
        pt: 'Reserve o seu passeio',
      },
      intro: {
        es: 'Completá el formulario y te respondemos con disponibilidad y precio. Si preferís, escribinos directo por WhatsApp.',
        en: 'Fill in the form and we’ll reply with availability and price. If you prefer, message us directly on WhatsApp.',
        pt: 'Preencha o formulário e respondemos com disponibilidade e preço. Se preferir, fale direto com a gente pelo WhatsApp.',
      },
      name: {
        es: 'Nombre y apellido',
        en: 'Full name',
        pt: 'Nome completo',
      },
      email: {
        es: 'Email',
        en: 'Email',
        pt: 'E-mail',
      },
      phone: {
        es: 'Teléfono / WhatsApp',
        en: 'Phone / WhatsApp',
        pt: 'Telefone / WhatsApp',
      },
      phoneHint: {
        es: 'Con código de país, por ejemplo +55 o +1',
        en: 'Include your country code, e.g. +1 or +44',
        pt: 'Com código do país, por exemplo +55',
      },
      tour: {
        es: 'Tour',
        en: 'Tour',
        pt: 'Passeio',
      },
      tourPlaceholder: {
        es: 'Elegí un tour',
        en: 'Choose a tour',
        pt: 'Escolha um passeio',
      },
      tourCustom: {
        es: 'Tour a medida',
        en: 'Tailor-made tour',
        pt: 'Passeio sob medida',
      },
      date: {
        es: 'Fecha',
        en: 'Date',
        pt: 'Data',
      },
      people: {
        es: 'Cantidad de personas',
        en: 'Number of people',
        pt: 'Número de pessoas',
      },
      language: {
        es: 'Idioma del tour',
        en: 'Tour language',
        pt: 'Idioma do passeio',
      },
      message: {
        es: 'Mensaje',
        en: 'Message',
        pt: 'Mensagem',
      },
      messagePlaceholder: {
        es: 'Contanos dónde te alojás, si viajás con niños o si tenés alguna preferencia.',
        en: 'Tell us where you’re staying, if you’re traveling with kids or any preferences.',
        pt: 'Conte onde você está hospedado, se viaja com crianças ou se tem alguma preferência.',
      },
      optional: {
        es: 'opcional',
        en: 'optional',
        pt: 'opcional',
      },
      submit: {
        es: 'Enviar consulta',
        en: 'Send request',
        pt: 'Enviar consulta',
      },
      sending: {
        es: 'Enviando…',
        en: 'Sending…',
        pt: 'Enviando…',
      },
      success: {
        es: '¡Listo! Recibimos tu consulta. Te respondemos pronto por email o WhatsApp.',
        en: 'Done! We got your request. We’ll reply soon by email or WhatsApp.',
        pt: 'Pronto! Recebemos sua consulta. Respondemos em breve por e-mail ou WhatsApp.',
      },
      error: {
        es: 'No pudimos enviar tu consulta. Probá de nuevo o escribinos por WhatsApp.',
        en: 'We couldn’t send your request. Please try again or message us on WhatsApp.',
        pt: 'Não conseguimos enviar sua consulta. Tente de novo ou fale com a gente pelo WhatsApp.',
      },
      required: {
        es: 'Completá este campo.',
        en: 'Please fill in this field.',
        pt: 'Preencha este campo.',
      },
      invalidEmail: {
        es: 'Revisá el email, parece incompleto.',
        en: 'Please check the email, it looks incomplete.',
        pt: 'Confira o e-mail, parece incompleto.',
      },
      invalidDate: {
        es: 'Elegí una fecha a partir de hoy.',
        en: 'Please choose today or a later date.',
        pt: 'Escolha uma data a partir de hoje.',
      },
      waTitle: {
        es: '¿Más rápido por WhatsApp?',
        en: 'Faster on WhatsApp?',
        pt: 'Mais rápido pelo WhatsApp?',
      },
      waText: {
        es: 'Te respondemos en el día.',
        en: 'We reply the same day.',
        pt: 'Respondemos no mesmo dia.',
      },
      waCta: {
        es: 'Escribinos por WhatsApp',
        en: 'Message us on WhatsApp',
        pt: 'Fale com a gente pelo WhatsApp',
      },
      payTitle: {
        es: 'Medios de pago',
        en: 'Payment methods',
        pt: 'Formas de pagamento',
      },
      payText: {
        es: '[medios de pago a completar]',
        en: '[payment methods to complete]',
        pt: '[formas de pagamento a completar]',
      },
      cancelTitle: {
        es: 'Política de cancelación',
        en: 'Cancellation policy',
        pt: 'Política de cancelamento',
      },
      cancelText: {
        es: '[política de cancelación a completar]',
        en: '[cancellation policy to complete]',
        pt: '[política de cancelamento a completar]',
      },
    },
    footer: {
      thanks: {
        es: '¡Gracias por visitarnos!',
        en: 'Thanks for visiting!',
        pt: 'Obrigado pela visita!',
      },
      address: {
        es: 'Dirección',
        en: 'Address',
        pt: 'Endereço',
      },
      email: {
        es: 'Email',
        en: 'Email',
        pt: 'E-mail',
      },
      license: {
        es: 'Habilitación',
        en: 'License',
        pt: 'Habilitação',
      },
      terms: {
        es: 'Términos y condiciones',
        en: 'Terms and conditions',
        pt: 'Termos e condições',
      },
      privacy: {
        es: 'Privacidad',
        en: 'Privacy',
        pt: 'Privacidade',
      },
      rights: {
        es: 'Todos los derechos reservados.',
        en: 'All rights reserved.',
        pt: 'Todos os direitos reservados.',
      },
      follow: {
        es: 'Seguinos',
        en: 'Follow us',
        pt: 'Siga a gente',
      },
    },
    wa: {
      general: {
        es: '¡Hola Hello Mendoza! Quiero consultar por un tour de bodegas.',
        en: 'Hi Hello Mendoza! I’d like to ask about a winery tour.',
        pt: 'Olá, Hello Mendoza! Quero saber sobre um passeio por vinícolas.',
      },
      tour: {
        es: '¡Hola Hello Mendoza! Me interesa el tour «{tour}». ¿Me pasan disponibilidad y precio?',
        en: 'Hi Hello Mendoza! I’m interested in the “{tour}” tour. Could you send me availability and price?',
        pt: 'Olá, Hello Mendoza! Tenho interesse no passeio “{tour}”. Podem me passar disponibilidade e preço?',
      },
      custom: {
        es: '¡Hola Hello Mendoza! Quiero armar un tour a medida. Somos [cantidad] personas y nos gustaría ir el [fecha].',
        en: 'Hi Hello Mendoza! I’d like a tailor-made tour. We are [number] people and would like to go on [date].',
        pt: 'Olá, Hello Mendoza! Quero montar um passeio sob medida. Somos [quantidade] pessoas e gostaríamos de ir no dia [data].',
      },
      float: {
        es: 'Escribinos por WhatsApp',
        en: 'Message us on WhatsApp',
        pt: 'Fale com a gente pelo WhatsApp',
      },
    },
    suggest: {
      text: {
        es: 'Este sitio también está en español.',
        en: 'This site is also available in English.',
        pt: 'Este site também está em português.',
      },
      go: {
        es: 'Ver',
        en: 'View',
        pt: 'Ver',
      },
      dismiss: {
        es: 'Cerrar',
        en: 'Close',
        pt: 'Fechar',
      },
    },
    tripadvisor: {
      es: 'Tripadvisor',
      en: 'Tripadvisor',
      pt: 'Tripadvisor',
    },
    faq: {
      title: {
        es: 'Preguntas frecuentes',
        en: 'Frequently asked questions',
        pt: 'Perguntas frequentes',
      },
    },
    gallery: {
      title: {
        es: 'Brindis, mesas largas y montaña',
        en: 'Toasts, long tables and mountains',
        pt: 'Brindes, mesas longas e montanha',
      },
      text: {
        es: 'Así se viven nuestros tours. Seguinos para ver las salidas de cada semana.',
        en: 'This is what our tours feel like. Follow us to see each week’s outings.',
        pt: 'É assim que se vivem nossos passeios. Siga a gente para ver as saídas de cada semana.',
      },
      cta: {
        es: 'Seguinos en Instagram',
        en: 'Follow us on Instagram',
        pt: 'Siga no Instagram',
      },
    },
    about: {
      title: {
        es: 'Quiénes somos',
        en: 'Who we are',
        pt: 'Quem somos',
      },
      lead: {
        es: 'Somos locales pero hablamos tu idioma.',
        en: 'We’re locals, but we speak your language.',
        pt: 'Somos locais, mas falamos a sua língua.',
      },
      story: {
        es: 'Somos un equipo de guías nacidos en Mendoza. Conocemos las bodegas, la gente que hace el vino y los lugares donde comemos nosotros. [historia del equipo a completar]',
        en: 'We’re a team of guides born in Mendoza. We know the wineries, the people who make the wine and the places where we eat ourselves. [team story to complete]',
        pt: 'Somos uma equipe de guias nascidos em Mendoza. Conhecemos as vinícolas, as pessoas que fazem o vinho e os lugares onde nós mesmos comemos. [história da equipe a completar]',
      },
      langsTitle: {
        es: 'Idiomas que hablamos',
        en: 'Languages we speak',
        pt: 'Idiomas que falamos',
      },
    },
    reviews: {
      title: {
        es: 'Lo que dicen nuestros viajeros',
        en: 'What our travelers say',
        pt: 'O que dizem nossos viajantes',
      },
      intro: {
        es: 'Opiniones reales publicadas en Tripadvisor.',
        en: 'Real reviews published on Tripadvisor.',
        pt: 'Avaliações reais publicadas no Tripadvisor.',
      },
      cta: {
        es: 'Ver todas las opiniones en Tripadvisor',
        en: 'Read all reviews on Tripadvisor',
        pt: 'Ver todas as avaliações no Tripadvisor',
      },
    },
  },
};
