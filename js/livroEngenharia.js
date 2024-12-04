let pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 1.5,
    canvas = document.getElementById('pdf-render'),
    ctx = canvas.getContext('2d');

// Função para carregar o PDF
function loadPDF(url) {
  pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_;
    document.getElementById('page-count').textContent = pdfDoc.numPages;
    pageNum = 1;
    renderPage(pageNum);
  });

  document.querySelector('.pdf-viewer-container').style.display = 'block'; // Exibir visualizador
}

// Renderizar a página
function renderPage(num) {
  pageRendering = true;

  pdfDoc.getPage(num).then(page => {
    const viewport = page.getViewport({ scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };

    const renderTask = page.render(renderContext);

    renderTask.promise.then(() => {
      pageRendering = false;
      if (pageNumPending !== null) {
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });

  document.getElementById('page-num').textContent = num;

  // Animação ao mudar de página
  gsap.fromTo(
    ".canvas-container",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8 }
  );
}

// Navegar entre as páginas
document.getElementById('prev-page').addEventListener('click', () => {
  if (pageNum <= 1) return;
  pageNum--;
  renderPage(pageNum);
});

document.getElementById('next-page').addEventListener('click', () => {
  if (pageNum >= pdfDoc.numPages) return;
  pageNum++;
  renderPage(pageNum);
});

// Controles de zoom
document.getElementById('zoom-in').addEventListener('click', () => {
  if (scale >= 3) return;
  scale += 0.5;
  renderPage(pageNum);
});

document.getElementById('zoom-out').addEventListener('click', () => {
  if (scale <= 0.5) return;
  scale -= 0.5;
  renderPage(pageNum);
});

// Selecionar um livro e carregar o PDF
document.querySelectorAll('.book-list button').forEach(button => {
  button.addEventListener('click', (e) => {
    const url = e.target.getAttribute('data-url');
    loadPDF(url);
  });
});
