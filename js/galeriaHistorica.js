document.querySelectorAll('.image-container img').forEach(img => {
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const fullImg = document.createElement('img');
    fullImg.src = img.src;
    fullImg.alt = img.alt;
    overlay.appendChild(fullImg);

    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
      overlay.remove();
    });
  });
});

// Estilo CSS para a imagem em tela cheia
const style = document.createElement('style');
style.textContent = `
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .overlay img {
    max-width: 90%;
    max-height: 90%;
    border-radius: 8px;
  }
`;
document.head.appendChild(style);
