// ============================================================
// lightbox.js — Ampliar fotos de los carruseles de los modales
// ============================================================
// Al hacer clic en una foto dentro de un carrusel (clase .zoomable),
// se abre un overlay a pantalla completa con esa foto agrandada.
// Las flechas del overlay navegan entre todas las fotos de ESE
// mismo carrusel (no mezcla fotos de paquetes distintos).
// ============================================================

(function () {
  let currentImages = []; // elementos <img> del carrusel actualmente abierto
  let currentIndex = 0;

  function getOverlayEls() {
    return {
      overlay: document.getElementById("imgLightbox"),
      img: document.getElementById("imgLightboxImg"),
    };
  }

  function openLightbox(images, index) {
    currentImages = images;
    currentIndex = index;
    const { overlay, img } = getOverlayEls();
    if (!overlay || !img) return;

    img.src = currentImages[currentIndex].src;
    img.alt = currentImages[currentIndex].alt || "";
    overlay.classList.add("active");
    document.body.style.overflow = "hidden"; // evita scroll de fondo mientras está abierto
  }

  function closeLightbox() {
    const { overlay } = getOverlayEls();
    if (!overlay) return;
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function showIndex(newIndex) {
    if (!currentImages.length) return;
    currentIndex = (newIndex + currentImages.length) % currentImages.length;
    const { img } = getOverlayEls();
    img.src = currentImages[currentIndex].src;
    img.alt = currentImages[currentIndex].alt || "";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const { overlay } = getOverlayEls();
    if (!overlay) return;

    // Clic en cualquier foto "zoomable": abre el lightbox con las fotos
    // de ese mismo carrusel (por si en el futuro hay más de una).
    document.querySelectorAll(".zoomable").forEach((imgEl) => {
      imgEl.addEventListener("click", (e) => {
        e.stopPropagation(); // no interfiere con el modal de Bootstrap que lo contiene
        const carousel = imgEl.closest(".carousel");
        const scope = carousel || document;
        const images = Array.from(scope.querySelectorAll(".carousel-item img"));
        const index = images.indexOf(imgEl);
        openLightbox(images, index === -1 ? 0 : index);
      });
    });

    overlay.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    overlay.querySelector(".lightbox-prev").addEventListener("click", (e) => {
      e.stopPropagation();
      showIndex(currentIndex - 1);
    });
    overlay.querySelector(".lightbox-next").addEventListener("click", (e) => {
      e.stopPropagation();
      showIndex(currentIndex + 1);
    });

    // Clic en el fondo oscuro (fuera de la imagen) también cierra
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeLightbox();
    });

    // Navegación y cierre por teclado
    document.addEventListener("keydown", (e) => {
      if (!overlay.classList.contains("active")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showIndex(currentIndex - 1);
      if (e.key === "ArrowRight") showIndex(currentIndex + 1);
    });
  });
})();
