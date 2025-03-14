document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".galeria img");
    const overlay = document.getElementById("overlay");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeBtn = document.querySelector(".close");
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");
    let currentImageIndex = 0;
  
    // Função para abrir a imagem no lightbox
    function openLightbox(index) {
      currentImageIndex = index;
      const imageSrc = images[currentImageIndex].src;
      lightboxImage.src = imageSrc;
      overlay.style.display = "flex";
    }
  
    // Função para fechar o lightbox
    function closeLightbox() {
      overlay.style.display = "none";
    }
  
    // Função para mostrar a próxima imagem
    function showNextImage() {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      openLightbox(currentImageIndex);
    }
  
    // Função para mostrar a imagem anterior
    function showPrevImage() {
      currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      openLightbox(currentImageIndex);
    }
  
    // Adiciona o evento de clique para cada imagem na galeria
    images.forEach((image, index) => {
      image.addEventListener("click", () => {
        openLightbox(index);
      });
    });
  
    // Eventos de clique para os botões de navegação
    nextBtn.addEventListener("click", showNextImage);
    prevBtn.addEventListener("click", showPrevImage);
  
    // Evento de clique para fechar o lightbox
    closeBtn.addEventListener("click", closeLightbox);
  
    // Fecha o lightbox ao clicar fora da imagem
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeLightbox();
      }
    });
  });