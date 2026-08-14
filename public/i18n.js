// ============================================================
// i18n.js — Selector de idioma (ES / EN / PT) para Hello Mendoza
// ============================================================
// Cómo funciona:
// 1) Cada texto traducible en el HTML tiene un atributo:
//      data-i18n="clave"            -> reemplaza el texto (textContent)
//      data-i18n-html="clave"       -> reemplaza el HTML interno (permite <br>, <h6>, etc.)
//      data-i18n-placeholder="clave"-> reemplaza el atributo placeholder de inputs
// 2) Este archivo contiene el diccionario TRANSLATIONS con esas claves
//    para "es", "en" y "pt".
// 3) window.HM_I18N expone helpers (t, getLang, setLang) que también
//    usa contacto.js para traducir los mensajes de estado del formulario.
// ============================================================

const TRANSLATIONS = {
  es: {
    "nav.packages": "Paquetes",
    "nav.about": "Nosotros",
    "nav.customers": "Clientes",
    "nav.moreinfo": "Más información",
    "nav.buytour": "Comprar tour",

    "hero.title": "Somos locales <br> pero hablamos tu idioma",
    "hero.subtitle": "Descubrí el alma de las bodegas de Mendoza.",
    "hero.cta": "Reservá tu tour",

    "common.time": "Duración •",
    "common.view_details": "Ver detalles",
    "common.duration": "Duración:",
    "common.meeting": "Punto de encuentro:",
    "common.meeting_value": "A coordinar según hotel/alojamiento",
    "common.includes": "Incluye:",
    "common.bilingual_guide": "Guía bilingüe (español / inglés / portugués)",
    "common.whatsapp": "Consultar por WhatsApp",
    "common.whatsapp_buy": "Comprar por WhatsApp",
    "common.reserve": "Reservar",

    "modal1.whatsapp_buy": "Hola! Quiero comprar el paquete “Luján de Cuyo” 🍷 ¿Me pasan disponibilidad y forma de pago?",
    "modal1.whatsapp_consult": "Hola! Tengo una consulta sobre el paquete “Luján de Cuyo”.",
    "modal2.whatsapp_buy": "Hola! Quiero comprar el paquete “Maipú” 🍷 ¿Me pasan disponibilidad y forma de pago?",
    "modal2.whatsapp_consult": "Hola! Tengo una consulta sobre el paquete “Maipú”.",
    "modal3.whatsapp_buy": "Hola! Quiero comprar el paquete “Valle de Uco” 🍷 ¿Me pasan disponibilidad y forma de pago?",
    "modal3.whatsapp_consult": "Hola! Tengo una consulta sobre el paquete “Valle de Uco”.",
    "modal4.whatsapp_buy": "Hola! Quiero comprar el paquete “Potrerillos” 🍷 ¿Me pasan disponibilidad y forma de pago?",
    "modal4.whatsapp_consult": "Hola! Tengo una consulta sobre el paquete “Potrerillos”.",
    "modal5.whatsapp_buy": "Hola! Quiero comprar el paquete “Salentein” 🍷 ¿Me pasan disponibilidad y forma de pago?",
    "modal5.whatsapp_consult": "Hola! Tengo una consulta sobre el paquete “Salentein”.",
    "modal6.whatsapp_buy": "Hola! Quiero comprar el paquete “Los Toneles” 🍷 ¿Me pasan disponibilidad y forma de pago?",
    "modal6.whatsapp_consult": "Hola! Tengo una consulta sobre el paquete “Los Toneles”.",

    "pkg1.title": "Experiencia “Luján de Cuyo”",
    "pkg1.desc": "Te invitamos a descubrir juntos en este tour nuestra apasionante cultura por este varietal en Luján de Cuyo, tierra Malbec por excelencia.",
    "pkg1.hours": "6 Horas",
    "pkg2.title": "Experiencia “Maipú”",
    "pkg2.desc": "Tour en el cual daremos un paseo por nuestras raíces, calles con túneles formados por antiguas arboledas, paisajes rústicos llenos de olivares y viñedos.",
    "pkg2.hours": "8 Horas",
    "pkg3.title": "Experiencia “Valle de Uco”",
    "pkg3.desc": "La experiencia turística en esta región se vive a través de sus bodegas de prestigio mundial, la calidez de su gente y su gastronomía típica que permite a los visitantes conectarse con los sabores, costumbres e identidad local.",
    "pkg3.hours": "10 Horas",
    "pkg4.title": "Experiencia “Potrerillos”",
    "pkg4.hours": "6 Horas",
    "pkg5.title": "Experiencia “Salentein”",
    "pkg5.hours": "2 Horas",
    "pkg6.title": "Experiencia “Los Toneles”",
    "pkg6.hours": "7 Horas",

    "modal1.title": "Luján de Cuyo, tour por la tierra del Malbec (3 bodegas).",
    "modal1.duration_value": "6 horas",
    "modal1.description": `Participaremos de una degustación de vinos en dos bodegas con historia y tradición vitivinícola. <br><br>
Seguidamente nos dirigimos a la tercera bodega donde realizaremos el almuerzo maridado con vinos para apreciar con todos los sentidos. <br><br>
Este tour es apto para disfrutar en todas las épocas del año ya que Mendoza presenta diferentes paisajes y productos regionales en cada estación para el deleite de nuestros visitantes. <br><br>
<h6 class="mt-3">Bodegas sugeridas:</h6> Bonfanti, Vistalba, Benegas, Penedo Borges, Caelum, Mendel, Budeguer, Lorca, Renacer, Dante Robino, Norton, Chandon, Huarpe, Piatelli, Las Perdices, Susana Balbo, Weinert
<h6 class="mt-3">Tour ideal con niños:</h6> Bonfanti, Tempus Alba, Ciudad`,
    "modal1.include1": "Transporte privado ida y vuelta",
    "modal1.include3": "Degustación en 3 bodegas",
    "modal1.include4": "Almuerzo o picada regional",

    "modal2.title": "Maipú, tour por la cuna del vino (2 bodegas y 1 olivícola)",
    "modal2.duration_value": "8 horas",
    "modal2.description": `Situada a unos 20 minutos de la ciudad de Mendoza, exploraremos esta región con vinos de culto de los cuales el mundo no deja de hablar. <br><br>
Visitaremos bodegas con tradición ferroviaria y de inmigrantes ligada a la vitivinicultura y también bodegas boutique con vinos de autor donde degustaremos sus vinos, participaremos de diferentes experiencias y conoceremos sus instalaciones. También visitaremos una olivícola de la región para aprender sobre los beneficios de consumir aceite de oliva. <br><br>
Finalizaremos con un almuerzo maridado con los vinos de la bodega y un menú pensado para destacar las virtudes de cada expresión varietal o blend en una auténtica experiencia enogastronómica mendocina. <br><br>
<h6 class="mt-3">Bodegas y olivícolas sugeridas:</h6> Trapiche, La Rural, Benegas, Esencia 1870, Carinae, Cinco Sentidos, Martino Wines, Manuel Villafañe, Finca Sabina, Laur, Maguay, Pasrai, Corazón de Lunlunta, Alma Oliva Finca Agostino, Tempus Alba, Santa Julia, El Enemigo, Mil Suelos (para tour caro). <br><br>
<h6 class="mt-3">Tour ideal con niños:</h6> Bonfanti, Tempus Alba, Ciudad`,
    "modal2.include1": "Transporte privado ida y vuelta",
    "modal2.include3": "Degustación en bodega + olivícola",
    "modal2.include4": "Almuerzo incluido",

    "modal3.title": "Valle de Uco, tour de imponente paisaje cordillerano.",
    "modal3.duration_value": "10 horas",
    "modal3.description": `El Valle de Uco es una de las zonas más reconocidas de Mendoza por su nivel de servicios al turista como hoteles y resorts y también por su vitivinicultura de altura que posiciona al fértil valle agrícola como uno de los mejores destinos enoturísticos a nivel nacional e internacional. <br><br>
Su imponente paisaje cordillerano se encuentra enmarcado por la cordillera de Los Andes, el cordón del Plata y el volcán Tupungato, con arroyos y ríos de deshielo que bañan un área de imponente belleza natural y escenarios espectaculares para la práctica de actividades al aire libre. <br><br>
Esta vasta región se compone de tres departamentos: Tupungato, Tunuyán y San Carlos, por lo que al planear el paseo es importante saber que la zona vitivinícola más alejada de la ciudad de Mendoza, San Carlos, se encuentra a dos horas de viaje. <br><br>
Participaremos de una experiencia sensorial que combina vino, naturaleza y vistas privilegiadas a la Cordillera de los Andes. <br><br>
Luego realizaremos el almuerzo con maridaje en un restaurante de bodega que se destaca por su arquitectura de vanguardia y su entorno natural, creando una experiencia memorable. <br><br>
<h6 class="mt-3">Bodegas sugeridas tour corto:</h6> Atamisque, Salentein, Andeluna, La Azul, Masi, Domaine Bousquet. <br><br>
<h6 class="mt-3">Bodegas sugeridas tour largo:</h6> Zuccardi, Alfa Crux, Clos de Los Siete, The Vines, Casa de Uco, Bemberg, Alpasión, Piedra Negra. <br><br>
<h6 class="mt-3">Tour ideal con niños:</h6> Bonfanti, Tempus Alba, Ciudad`,
    "modal3.include1": "Transporte privado ida y vuelta",
    "modal3.include3": "Degustación en 2 bodegas premium",
    "modal3.include4": "Almuerzo gourmet con maridaje",

    "modal4.title": "Experiencia \"Potrerillos\"",
    "modal4.duration_value": "6 horas",
    "modal4.description": "Fusce placerat luctus mi, a rutrum ipsum interdum nec. Morbi scelerisque eros at tristique dapibus. Donec ac cursus elit, et ornare tortor. Naturaleza y montaña junto al dique de Potrerillos, ideal para combinar con actividades al aire libre.",
    "modal4.include1": "Transporte privado ida y vuelta",
    "modal4.include3": "Parada panorámica en el dique",
    "modal4.include4": "Snack o almuerzo liviano",

    "modal5.title": "Experiencia \"Salentein\"",
    "modal5.duration_value": "2 horas",
    "modal5.description": "Fusce placerat luctus mi, a rutrum ipsum interdum nec. Morbi scelerisque eros at tristique dapibus. Donec ac cursus elit, et ornare tortor. Visita exprés ideal para quienes tienen poco tiempo pero quieren una experiencia premium.",
    "modal5.include1": "Tour guiado por la bodega",
    "modal5.include2": "Degustación de 3 vinos",
    "modal5.include3": "Visita a la sala de arte",

    "modal6.title": "Experiencia \"Los Toneles\"",
    "modal6.duration_value": "7 horas",
    "modal6.description": "Fusce placerat luctus mi, a rutrum ipsum interdum nec. Morbi scelerisque eros at tristique dapibus. Donec ac cursus elit, et ornare tortor. Recorrido histórico por bodegas centenarias con arquitectura tradicional mendocina.",
    "modal6.include1": "Transporte privado ida y vuelta",
    "modal6.include3": "Degustación en 2 bodegas históricas",
    "modal6.include4": "Almuerzo incluido",

    "testimonials.title": "Testimonios de nuestros pasajeros",

    "contact.title": "Contacto",
    "contact.name_label": "Nombre *",
    "contact.name_placeholder": "Tu nombre",
    "contact.email_label": "Email *",
    "contact.email_placeholder": "Tu email",
    "contact.phone_label": "Teléfono *",
    "contact.message_label": "Mensaje *",
    "contact.message_placeholder": "Escribe tu mensaje",
    "contact.submit": "Enviar mensaje",
    "contact.sending": "Enviando mensaje...",
    "contact.success": "✅ Mensaje enviado correctamente.",
    "contact.error_server": "❌ Error al enviar mensaje.",
    "contact.error_conn": "❌ Error de conexión con el servidor.",

    "footer.thanks": "¡Gracias por visitarnos!"
  },

  en: {
    "nav.packages": "Packages",
    "nav.about": "About Us",
    "nav.customers": "Customers",
    "nav.moreinfo": "More Info",
    "nav.buytour": "Buy tour",

    "hero.title": "We are locals <br> but speak your language",
    "hero.subtitle": "Discover the Soul of Mendoza's Wineries.",
    "hero.cta": "Let's take a tour",

    "common.time": "Time •",
    "common.view_details": "View Details",
    "common.duration": "Duration:",
    "common.meeting": "Meeting point:",
    "common.meeting_value": "To be arranged based on your hotel/accommodation",
    "common.includes": "Includes:",
    "common.bilingual_guide": "Bilingual guide (Spanish / English / Portuguese)",
    "common.whatsapp": "Ask on WhatsApp",
    "common.whatsapp_buy": "Buy on WhatsApp",
    "common.reserve": "Book now",

    "modal1.whatsapp_buy": "Hi! I'd like to buy the “Luján de Cuyo” package 🍷 Could you tell me availability and payment options?",
    "modal1.whatsapp_consult": "Hi! I have a question about the “Luján de Cuyo” package.",
    "modal2.whatsapp_buy": "Hi! I'd like to buy the “Maipú” package 🍷 Could you tell me availability and payment options?",
    "modal2.whatsapp_consult": "Hi! I have a question about the “Maipú” package.",
    "modal3.whatsapp_buy": "Hi! I'd like to buy the “Valle de Uco” package 🍷 Could you tell me availability and payment options?",
    "modal3.whatsapp_consult": "Hi! I have a question about the “Valle de Uco” package.",
    "modal4.whatsapp_buy": "Hi! I'd like to buy the “Potrerillos” package 🍷 Could you tell me availability and payment options?",
    "modal4.whatsapp_consult": "Hi! I have a question about the “Potrerillos” package.",
    "modal5.whatsapp_buy": "Hi! I'd like to buy the “Salentein” package 🍷 Could you tell me availability and payment options?",
    "modal5.whatsapp_consult": "Hi! I have a question about the “Salentein” package.",
    "modal6.whatsapp_buy": "Hi! I'd like to buy the “Los Toneles” package 🍷 Could you tell me availability and payment options?",
    "modal6.whatsapp_consult": "Hi! I have a question about the “Los Toneles” package.",

    "pkg1.title": "“Luján de Cuyo” Experience",
    "pkg1.desc": "Join us on this tour to discover our passion for this varietal in Luján de Cuyo, the Malbec land by excellence.",
    "pkg1.hours": "6 Hours",
    "pkg2.title": "“Maipú” Experience",
    "pkg2.desc": "A tour through our roots, along streets tunneled by old tree-lined avenues, and rustic landscapes full of olive groves and vineyards.",
    "pkg2.hours": "8 Hours",
    "pkg3.title": "“Valle de Uco” Experience",
    "pkg3.desc": "The tourist experience in this region comes alive through its world-renowned wineries, the warmth of its people, and its local cuisine, letting visitors connect with the flavors, customs and identity of the area.",
    "pkg3.hours": "10 Hours",
    "pkg4.title": "“Potrerillos” Experience",
    "pkg4.hours": "6 Hours",
    "pkg5.title": "“Salentein” Experience",
    "pkg5.hours": "2 Hours",
    "pkg6.title": "“Los Toneles” Experience",
    "pkg6.hours": "7 Hours",

    "modal1.title": "Luján de Cuyo: a tour through Malbec country (3 wineries).",
    "modal1.duration_value": "6 hours",
    "modal1.description": `We'll enjoy a wine tasting at two wineries steeped in history and winemaking tradition. <br><br>
Next, we'll head to the third winery for a wine-paired lunch — a feast for all the senses. <br><br>
This tour is perfect any time of year, since Mendoza offers different landscapes and regional produce in every season, for the delight of our visitors. <br><br>
<h6 class="mt-3">Suggested wineries:</h6> Bonfanti, Vistalba, Benegas, Penedo Borges, Caelum, Mendel, Budeguer, Lorca, Renacer, Dante Robino, Norton, Chandon, Huarpe, Piatelli, Las Perdices, Susana Balbo, Weinert
<h6 class="mt-3">Great tour for families with kids:</h6> Bonfanti, Tempus Alba, Ciudad`,
    "modal1.include1": "Round-trip private transport",
    "modal1.include3": "Tasting at 3 wineries",
    "modal1.include4": "Lunch or regional sharing board",

    "modal2.title": "Maipú: a tour through the cradle of wine (2 wineries and 1 olive grove)",
    "modal2.duration_value": "8 hours",
    "modal2.description": `Located about 20 minutes from the city of Mendoza, we'll explore a region behind cult wines the world can't stop talking about. <br><br>
We'll visit wineries with a railway and immigrant heritage tied to winemaking, as well as boutique wineries with signature wines, where we'll taste, take part in different experiences, and tour the facilities. We'll also visit a local olive grove to learn about the benefits of olive oil. <br><br>
We'll wrap up with a wine-paired lunch and a menu designed to highlight the character of each varietal or blend, for a true Mendoza wine-and-food experience. <br><br>
<h6 class="mt-3">Suggested wineries and olive groves:</h6> Trapiche, La Rural, Benegas, Esencia 1870, Carinae, Cinco Sentidos, Martino Wines, Manuel Villafañe, Finca Sabina, Laur, Maguay, Pasrai, Corazón de Lunlunta, Alma Oliva Finca Agostino, Tempus Alba, Santa Julia, El Enemigo, Mil Suelos (for a premium tour). <br><br>
<h6 class="mt-3">Great tour for families with kids:</h6> Bonfanti, Tempus Alba, Ciudad`,
    "modal2.include1": "Round-trip private transport",
    "modal2.include3": "Tasting at winery + olive grove",
    "modal2.include4": "Lunch included",

    "modal3.title": "Valle de Uco: a tour through breathtaking mountain scenery.",
    "modal3.duration_value": "10 hours",
    "modal3.description": `Valle de Uco is one of Mendoza's most renowned areas, known both for its tourist services — hotels and resorts — and for its high-altitude winemaking, which places this fertile valley among the top wine-tourism destinations nationally and internationally. <br><br>
Its breathtaking mountain scenery is framed by the Andes range, the Cordón del Plata and the Tupungato volcano, with meltwater streams and rivers running through an area of striking natural beauty, perfect for outdoor activities. <br><br>
This vast region is made up of three departments — Tupungato, Tunuyán and San Carlos — so when planning your visit it's worth knowing that the wine area farthest from the city of Mendoza, San Carlos, is a two-hour drive away. <br><br>
We'll take part in a sensory experience that blends wine, nature and privileged views of the Andes. <br><br>
We'll then enjoy a wine-paired lunch at a winery restaurant known for its cutting-edge architecture and natural surroundings, for a truly memorable experience. <br><br>
<h6 class="mt-3">Suggested wineries (short tour):</h6> Atamisque, Salentein, Andeluna, La Azul, Masi, Domaine Bousquet. <br><br>
<h6 class="mt-3">Suggested wineries (long tour):</h6> Zuccardi, Alfa Crux, Clos de Los Siete, The Vines, Casa de Uco, Bemberg, Alpasión, Piedra Negra. <br><br>
<h6 class="mt-3">Great tour for families with kids:</h6> Bonfanti, Tempus Alba, Ciudad`,
    "modal3.include1": "Round-trip private transport",
    "modal3.include3": "Tasting at 2 premium wineries",
    "modal3.include4": "Gourmet wine-paired lunch",

    "modal4.title": "\"Potrerillos\" Experience",
    "modal4.duration_value": "6 hours",
    "modal4.description": "Fusce placerat luctus mi, a rutrum ipsum interdum nec. Morbi scelerisque eros at tristique dapibus. Donec ac cursus elit, et ornare tortor. Nature and mountains by the Potrerillos reservoir — perfect to combine with outdoor activities.",
    "modal4.include1": "Round-trip private transport",
    "modal4.include3": "Scenic stop at the reservoir",
    "modal4.include4": "Snack or light lunch",

    "modal5.title": "\"Salentein\" Experience",
    "modal5.duration_value": "2 hours",
    "modal5.description": "Fusce placerat luctus mi, a rutrum ipsum interdum nec. Morbi scelerisque eros at tristique dapibus. Donec ac cursus elit, et ornare tortor. An express visit, perfect for those short on time but looking for a premium experience.",
    "modal5.include1": "Guided winery tour",
    "modal5.include2": "Tasting of 3 wines",
    "modal5.include3": "Visit to the art gallery",

    "modal6.title": "\"Los Toneles\" Experience",
    "modal6.duration_value": "7 hours",
    "modal6.description": "Fusce placerat luctus mi, a rutrum ipsum interdum nec. Morbi scelerisque eros at tristique dapibus. Donec ac cursus elit, et ornare tortor. A historic route through century-old wineries with traditional Mendoza architecture.",
    "modal6.include1": "Round-trip private transport",
    "modal6.include3": "Tasting at 2 historic wineries",
    "modal6.include4": "Lunch included",

    "testimonials.title": "Testimonials from our passengers",

    "contact.title": "Contact",
    "contact.name_label": "Name *",
    "contact.name_placeholder": "Your name",
    "contact.email_label": "Email *",
    "contact.email_placeholder": "Your email",
    "contact.phone_label": "Phone *",
    "contact.message_label": "Message *",
    "contact.message_placeholder": "Write your message",
    "contact.submit": "Send message",
    "contact.sending": "Sending message...",
    "contact.success": "✅ Message sent successfully.",
    "contact.error_server": "❌ Error sending message.",
    "contact.error_conn": "❌ Connection error with the server.",

    "footer.thanks": "Thank you for visiting!"
  },

  pt: {
    "nav.packages": "Pacotes",
    "nav.about": "Sobre nós",
    "nav.customers": "Clientes",
    "nav.moreinfo": "Mais informações",
    "nav.buytour": "Comprar tour",

    "hero.title": "Somos locais <br> mas falamos o seu idioma",
    "hero.subtitle": "Descubra a alma das vinícolas de Mendoza.",
    "hero.cta": "Vamos fazer um tour",

    "common.time": "Duração •",
    "common.view_details": "Ver detalhes",
    "common.duration": "Duração:",
    "common.meeting": "Ponto de encontro:",
    "common.meeting_value": "A combinar conforme o hotel/hospedagem",
    "common.includes": "Inclui:",
    "common.bilingual_guide": "Guia bilíngue (espanhol / inglês / português)",
    "common.whatsapp": "Consultar pelo WhatsApp",
    "common.whatsapp_buy": "Comprar pelo WhatsApp",
    "common.reserve": "Reservar",

    "modal1.whatsapp_buy": "Olá! Quero comprar o pacote “Luján de Cuyo” 🍷 Podem me informar disponibilidade e forma de pagamento?",
    "modal1.whatsapp_consult": "Olá! Tenho uma dúvida sobre o pacote “Luján de Cuyo”.",
    "modal2.whatsapp_buy": "Olá! Quero comprar o pacote “Maipú” 🍷 Podem me informar disponibilidade e forma de pagamento?",
    "modal2.whatsapp_consult": "Olá! Tenho uma dúvida sobre o pacote “Maipú”.",
    "modal3.whatsapp_buy": "Olá! Quero comprar o pacote “Valle de Uco” 🍷 Podem me informar disponibilidade e forma de pagamento?",
    "modal3.whatsapp_consult": "Olá! Tenho uma dúvida sobre o pacote “Valle de Uco”.",
    "modal4.whatsapp_buy": "Olá! Quero comprar o pacote “Potrerillos” 🍷 Podem me informar disponibilidade e forma de pagamento?",
    "modal4.whatsapp_consult": "Olá! Tenho uma dúvida sobre o pacote “Potrerillos”.",
    "modal5.whatsapp_buy": "Olá! Quero comprar o pacote “Salentein” 🍷 Podem me informar disponibilidade e forma de pagamento?",
    "modal5.whatsapp_consult": "Olá! Tenho uma dúvida sobre o pacote “Salentein”.",
    "modal6.whatsapp_buy": "Olá! Quero comprar o pacote “Los Toneles” 🍷 Podem me informar disponibilidade e forma de pagamento?",
    "modal6.whatsapp_consult": "Olá! Tenho uma dúvida sobre o pacote “Los Toneles”.",

    "pkg1.title": "Experiência “Luján de Cuyo”",
    "pkg1.desc": "Convidamos você a descobrir conosco, neste tour, nossa paixão por esta uva em Luján de Cuyo, terra do Malbec por excelência.",
    "pkg1.hours": "6 Horas",
    "pkg2.title": "Experiência “Maipú”",
    "pkg2.desc": "Um passeio pelas nossas raízes, por ruas com túneis formados por antigas arvoredas, paisagens rústicas cheias de olivais e vinhedos.",
    "pkg2.hours": "8 Horas",
    "pkg3.title": "Experiência “Valle de Uco”",
    "pkg3.desc": "A experiência turística nesta região é vivida através de suas vinícolas de prestígio mundial, do calor humano de sua gente e de sua gastronomia típica, que permite aos visitantes se conectarem com os sabores, costumes e identidade local.",
    "pkg3.hours": "10 Horas",
    "pkg4.title": "Experiência “Potrerillos”",
    "pkg4.hours": "6 Horas",
    "pkg5.title": "Experiência “Salentein”",
    "pkg5.hours": "2 Horas",
    "pkg6.title": "Experiência “Los Toneles”",
    "pkg6.hours": "7 Horas",

    "modal1.title": "Luján de Cuyo: um tour pela terra do Malbec (3 vinícolas).",
    "modal1.duration_value": "6 horas",
    "modal1.description": `Participaremos de uma degustação de vinhos em duas vinícolas com história e tradição vitivinícola. <br><br>
Em seguida, seguimos para a terceira vinícola, onde faremos um almoço harmonizado com vinhos para apreciar com todos os sentidos. <br><br>
Este passeio é ideal em qualquer época do ano, já que Mendoza apresenta paisagens e produtos regionais diferentes em cada estação, para o deleite dos visitantes. <br><br>
<h6 class="mt-3">Vinícolas sugeridas:</h6> Bonfanti, Vistalba, Benegas, Penedo Borges, Caelum, Mendel, Budeguer, Lorca, Renacer, Dante Robino, Norton, Chandon, Huarpe, Piatelli, Las Perdices, Susana Balbo, Weinert
<h6 class="mt-3">Passeio ideal para crianças:</h6> Bonfanti, Tempus Alba, Ciudad`,
    "modal1.include1": "Transporte privado ida e volta",
    "modal1.include3": "Degustação em 3 vinícolas",
    "modal1.include4": "Almoço ou tábua regional",

    "modal2.title": "Maipú: um tour pelo berço do vinho (2 vinícolas e 1 olivícola)",
    "modal2.duration_value": "8 horas",
    "modal2.description": `Localizada a cerca de 20 minutos da cidade de Mendoza, vamos explorar essa região de vinhos cult dos quais o mundo não para de falar. <br><br>
Visitaremos vinícolas com tradição ferroviária e de imigrantes ligada à vitivinicultura, além de vinícolas boutique com vinhos de autor, onde faremos degustações, participaremos de diferentes experiências e conheceremos as instalações. Também visitaremos uma olivícola da região para aprender sobre os benefícios do azeite de oliva. <br><br>
Encerraremos com um almoço harmonizado com os vinhos da vinícola e um cardápio pensado para destacar as virtudes de cada varietal ou blend, em uma autêntica experiência enogastronômica mendocina. <br><br>
<h6 class="mt-3">Vinícolas e olivícolas sugeridas:</h6> Trapiche, La Rural, Benegas, Esencia 1870, Carinae, Cinco Sentidos, Martino Wines, Manuel Villafañe, Finca Sabina, Laur, Maguay, Pasrai, Corazón de Lunlunta, Alma Oliva Finca Agostino, Tempus Alba, Santa Julia, El Enemigo, Mil Suelos (para tour premium). <br><br>
<h6 class="mt-3">Passeio ideal para crianças:</h6> Bonfanti, Tempus Alba, Ciudad`,
    "modal2.include1": "Transporte privado ida e volta",
    "modal2.include3": "Degustação em vinícola + olivícola",
    "modal2.include4": "Almoço incluído",

    "modal3.title": "Valle de Uco: um tour por uma paisagem cordilheirana deslumbrante.",
    "modal3.duration_value": "10 horas",
    "modal3.description": `O Valle de Uco é uma das regiões mais reconhecidas de Mendoza por seu nível de serviços turísticos, como hotéis e resorts, e também por sua vitivinicultura de altitude, que posiciona este fértil vale agrícola como um dos melhores destinos enoturísticos em nível nacional e internacional. <br><br>
Sua imponente paisagem cordilheirana é emoldurada pela Cordilheira dos Andes, pelo Cordón del Plata e pelo vulcão Tupungato, com riachos e rios de degelo que atravessam uma área de grande beleza natural e cenários espetaculares para atividades ao ar livre. <br><br>
Esta vasta região é composta por três departamentos — Tupungato, Tunuyán e San Carlos — por isso, ao planejar o passeio, é importante saber que a zona vitivinícola mais distante da cidade de Mendoza, San Carlos, fica a duas horas de viagem. <br><br>
Participaremos de uma experiência sensorial que combina vinho, natureza e vistas privilegiadas da Cordilheira dos Andes. <br><br>
Em seguida, faremos um almoço harmonizado em um restaurante de vinícola que se destaca por sua arquitetura de vanguarda e seu entorno natural, criando uma experiência memorável. <br><br>
<h6 class="mt-3">Vinícolas sugeridas (tour curto):</h6> Atamisque, Salentein, Andeluna, La Azul, Masi, Domaine Bousquet. <br><br>
<h6 class="mt-3">Vinícolas sugeridas (tour longo):</h6> Zuccardi, Alfa Crux, Clos de Los Siete, The Vines, Casa de Uco, Bemberg, Alpasión, Piedra Negra. <br><br>
<h6 class="mt-3">Passeio ideal para crianças:</h6> Bonfanti, Tempus Alba, Ciudad`,
    "modal3.include1": "Transporte privado ida e volta",
    "modal3.include3": "Degustação em 2 vinícolas premium",
    "modal3.include4": "Almoço gourmet harmonizado",

    "modal4.title": "Experiência \"Potrerillos\"",
    "modal4.duration_value": "6 horas",
    "modal4.description": "Fusce placerat luctus mi, a rutrum ipsum interdum nec. Morbi scelerisque eros at tristique dapibus. Donec ac cursus elit, et ornare tortor. Natureza e montanha junto ao dique de Potrerillos, ideal para combinar com atividades ao ar livre.",
    "modal4.include1": "Transporte privado ida e volta",
    "modal4.include3": "Parada panorâmica no dique",
    "modal4.include4": "Lanche ou almoço leve",

    "modal5.title": "Experiência \"Salentein\"",
    "modal5.duration_value": "2 horas",
    "modal5.description": "Fusce placerat luctus mi, a rutrum ipsum interdum nec. Morbi scelerisque eros at tristique dapibus. Donec ac cursus elit, et ornare tortor. Visita expressa, ideal para quem tem pouco tempo mas quer uma experiência premium.",
    "modal5.include1": "Tour guiado pela vinícola",
    "modal5.include2": "Degustação de 3 vinhos",
    "modal5.include3": "Visita à sala de arte",

    "modal6.title": "Experiência \"Los Toneles\"",
    "modal6.duration_value": "7 horas",
    "modal6.description": "Fusce placerat luctus mi, a rutrum ipsum interdum nec. Morbi scelerisque eros at tristique dapibus. Donec ac cursus elit, et ornare tortor. Um roteiro histórico por vinícolas centenárias com arquitetura tradicional mendocina.",
    "modal6.include1": "Transporte privado ida e volta",
    "modal6.include3": "Degustação em 2 vinícolas históricas",
    "modal6.include4": "Almoço incluído",

    "testimonials.title": "Depoimentos dos nossos passageiros",

    "contact.title": "Contato",
    "contact.name_label": "Nome *",
    "contact.name_placeholder": "Seu nome",
    "contact.email_label": "Email *",
    "contact.email_placeholder": "Seu email",
    "contact.phone_label": "Telefone *",
    "contact.message_label": "Mensagem *",
    "contact.message_placeholder": "Escreva sua mensagem",
    "contact.submit": "Enviar mensagem",
    "contact.sending": "Enviando mensagem...",
    "contact.success": "✅ Mensagem enviada com sucesso.",
    "contact.error_server": "❌ Erro ao enviar mensagem.",
    "contact.error_conn": "❌ Erro de conexão com o servidor.",

    "footer.thanks": "Obrigado pela visita!"
  }
};

(function () {
  const STORAGE_KEY = "hm_lang";
  const DEFAULT_LANG = "es";
  const SUPPORTED = Object.keys(TRANSLATIONS); // ["es", "en", "pt"]

  function getLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED.includes(saved) ? saved : DEFAULT_LANG;
  }

  function t(key, lang) {
    lang = lang || getLang();
    const dict = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG];
    return dict[key] !== undefined ? dict[key] : (TRANSLATIONS[DEFAULT_LANG][key] || key);
  }

  function applyLanguage(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;

    // Texto plano
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key, lang);
    });

    // HTML interno (permite <br>, <h6>, etc. dentro del texto)
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      el.innerHTML = t(key, lang);
    });

    // Placeholders de inputs/textareas
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      el.setAttribute("placeholder", t(key, lang));
    });

    // Links de WhatsApp con mensaje pre-armado (consulta o compra de un paquete)
    document.querySelectorAll("[data-wa-msg]").forEach((el) => {
      const key = el.getAttribute("data-wa-msg");
      const phone = el.getAttribute("data-wa-phone") || "5492614603906";
      const message = t(key, lang);
      el.setAttribute("href", `https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
    });

    // Atributo lang del documento (accesibilidad / SEO)
    document.documentElement.setAttribute("lang", lang);

    // Marcar botón activo en el selector
    document.querySelectorAll(".lang-switcher button").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    localStorage.setItem(STORAGE_KEY, lang);
  }

  function setLang(lang) {
    applyLanguage(lang);
  }

  // Exponer helpers para que contacto.js pueda traducir sus mensajes
  window.HM_I18N = { t, getLang, setLang };

  document.addEventListener("DOMContentLoaded", () => {
    applyLanguage(getLang());

    document.querySelectorAll(".lang-switcher button").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
    });
  });
})();
