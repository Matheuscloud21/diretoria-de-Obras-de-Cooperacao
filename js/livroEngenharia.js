// Variáveis principais
let pdfDoc = null,
  pageNum = 1,
  scale = 1.5, // Escala inicial
  canvas = document.getElementById("pdf-render"),
  ctx = canvas.getContext("2d");

// Armazenar as páginas renderizadas em cache para evitar renderizações repetidas
const pageCache = {};

function loadPDF(url) {
  pdfjsLib
    .getDocument({
      url: url,
      cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist/cmaps/',
      cMapPacked: true,
      workerSrc: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js',
    })
    .promise.then((pdfDoc_) => {
      pdfDoc = pdfDoc_;
      document.getElementById("page-count").textContent = pdfDoc.numPages;
      pageNum = 1;
      renderPage(pageNum); // Renderiza a primeira página
      document.querySelector(".pdf-viewer-container").style.display = "block"; // Exibe o visualizador
    })
    .catch((error) => {
      console.error("Erro ao carregar o PDF:", error);
      alert("Não foi possível carregar o arquivo PDF.");
    });
}

// Função para renderizar a página com cache
function renderPage(num) {
  // Verifica se a página já está no cache
  if (pageCache[num]) {
    canvas.width = pageCache[num].width;
    canvas.height = pageCache[num].height;
    ctx.putImageData(pageCache[num].imageData, 0, 0);
    document.getElementById("page-num").textContent = num;
    return;
  }

  pdfDoc.getPage(num).then((page) => {
    const viewport = page.getViewport({ scale });
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport,
    };

    page.render(renderContext).promise.then(() => {
      // Armazena a imagem da página no cache
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      pageCache[num] = { imageData, width: canvas.width, height: canvas.height };
      document.getElementById("page-num").textContent = num;
    });
  });
}

// Função para navegar entre as páginas com lazy loading
function goToPage(num) {
  if (num < 1 || num > pdfDoc.numPages) return;
  
  // Renderiza a página atual
  renderPage(num);

  // Carregar a próxima e a anterior página se necessário
  if (num > 1 && !pageCache[num - 1]) {
    renderPage(num - 1); // Carregar a página anterior
  }
  if (num < pdfDoc.numPages && !pageCache[num + 1]) {
    renderPage(num + 1); // Carregar a próxima página
  }
  
  pageNum = num;
}

// Navegar entre páginas
document.getElementById("prev-page").addEventListener("click", () => {
  if (pageNum > 1) goToPage(pageNum - 1);
});

document.getElementById("next-page").addEventListener("click", () => {
  if (pageNum < pdfDoc.numPages) goToPage(pageNum + 1);
});

// Controle de Zoom
document.getElementById("zoom-in").addEventListener("click", () => {
  if (scale >= 3) return; // Limita o zoom máximo
  scale += 0.2;
  renderPage(pageNum);
});

document.getElementById("zoom-out").addEventListener("click", () => {
  if (scale <= 0.5) return; // Limita o zoom mínimo
  scale -= 0.2;
  renderPage(pageNum);
});

// Carregar PDF ao clicar em um botão
document.querySelectorAll(".book-list button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const url = e.target.getAttribute("data-url");
    loadPDF(url);
  });
});

// Fechar o visualizador de PDF ao clicar no "X"
document.getElementById("close-pdf").addEventListener("click", () => {
  document.querySelector(".pdf-viewer-container").style.display = "none"; // Esconde o visualizador
});