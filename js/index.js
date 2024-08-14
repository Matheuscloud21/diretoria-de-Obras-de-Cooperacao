document.addEventListener("DOMContentLoaded", function() {
  const quadrados = document.querySelectorAll(".quadrado");

  quadrados.forEach(quadrado => {
    const linhaVertical = quadrado.querySelector(".linha-vertical");

    if (linhaVertical) {
      quadrado.addEventListener("mouseover", function() {
        linhaVertical.style.width = "100%";
      });

      quadrado.addEventListener("mouseout", function() {
        linhaVertical.style.width = "10%";
      });
    }
  });
});