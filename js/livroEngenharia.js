function setupPDFViewer(containerId) {
  const container = document.getElementById(containerId);
  const buttons = container.querySelectorAll(".book-list button");
  const pdfViewerContainer = container.querySelector(".pdf-viewer-container");
  const canvas = container.querySelector(".pdf-render");
  const ctx = canvas.getContext("2d");
  let pdfDoc = null, pageNum = 1, scale = 1.5;

  function renderPage(num) {
    pdfDoc.getPage(num).then((page) => {
      const viewport = page.getViewport({ scale });
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: ctx,
        viewport: viewport,
      };

      page.render(renderContext).promise.then(() => {
        container.querySelector(".page-num").textContent = num;
      });
    });
  }

  function loadPDF(url) {
    pdfjsLib
      .getDocument(url)
      .promise.then((pdf) => {
        pdfDoc = pdf;
        container.querySelector(".page-count").textContent = pdfDoc.numPages;
        pageNum = 1;
        renderPage(pageNum);
        pdfViewerContainer.style.display = "block";
      })
      .catch((error) => {
        console.error("Erro ao carregar o PDF:", error);
      });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const url = button.getAttribute("data-url");

      // Fechar qualquer outro visualizador de PDF aberto
      const otherContainers = document.querySelectorAll(".pdf-library-container");
      otherContainers.forEach((otherContainer) => {
        const otherPdfViewer = otherContainer.querySelector(".pdf-viewer-container");
        if (otherPdfViewer !== pdfViewerContainer) {
          otherPdfViewer.style.display = "none"; // Fecha o visualizador da outra div
        }
      });

      loadPDF(url);
    });
  });

  container.querySelector(".prev-page").addEventListener("click", () => {
    if (pageNum > 1) renderPage(--pageNum);
  });

  container.querySelector(".next-page").addEventListener("click", () => {
    if (pageNum < pdfDoc.numPages) renderPage(++pageNum);
  });

  container.querySelector(".zoom-in").addEventListener("click", () => {
    if (scale < 3) {
      scale += 0.2;
      renderPage(pageNum);
    }
  });

  container.querySelector(".zoom-out").addEventListener("click", () => {
    if (scale > 0.5) {
      scale -= 0.2;
      renderPage(pageNum);
    }
  });

  container.querySelector(".close-btn").addEventListener("click", () => {
    pdfViewerContainer.style.display = "none";
  });
}

// Inicialize cada visualizador de PDF
setupPDFViewer("pdf-library-container-1");
setupPDFViewer("pdf-library-container-2");
