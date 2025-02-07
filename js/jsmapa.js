// Configuração dos grupamentos e suas cores
const grupamentos = {
  'DOC': '#ff0000',      // vermelho
  '1º GPT E': '#0000ff', // azul
  '2º GPT E': '#008000', // verde
  '3º GPT E': '#ffa500', // laranja
  '4º GPT E': '#ffff00'  // amarelo
};

// Inicializar o mapa centralizado no Brasil
const map = L.map('map').setView([-14.235004, -51.92528], 4);

// Adicionar a camada do mapa
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg', {
  maxZoom: 20,
  attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a>'
}).addTo(map);

// Dados das obras
const obras = [
  {
    om: '3º Batalhão de Engenharia e Combate',
    nome: 'ERS 130 entre lageado/RS e Arroio do meio/RS(Rio Forqueta)',
    ptrab: 120000,
    orgaoFinanciador: 'DNIT',
    grupamento: '4º GPT E',
    coordenadas: [-29.4667, -51.9667] // Lajeado/RS
  }
  // Adicione mais obras aqui no mesmo formato
];

// Função para criar o ícone do trator com a cor do grupamento
function criarIconeTrator(cor) {
  return L.divIcon({
    html: `
      <div style="
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <img src="https://cdn-icons-png.flaticon.com/512/2318/2318605.png" 
             style="width: 35px; height: 35px; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3)); ${cor === '#ffff00' ? 'filter: brightness(0) saturate(100%) invert(89%) sepia(82%) saturate(635%) hue-rotate(359deg) brightness(102%) contrast(103%);' : `filter: brightness(0) saturate(100%) invert(31%) sepia(100%) saturate(${cor === '#ff0000' ? '7475%' : cor === '#0000ff' ? '7475%' : cor === '#008000' ? '7475%' : '7475%'}) hue-rotate(${cor === '#ff0000' ? '0deg' : cor === '#0000ff' ? '240deg' : cor === '#008000' ? '120deg' : cor === '#ffa500' ? '30deg' : '0deg'}) brightness(${cor === '#ff0000' ? '118%' : '100%'}) contrast(${cor === '#ff0000' ? '124%' : '100%'});`}">
      </div>
    `,
    className: 'trator-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });
}

// Criar e adicionar a legenda
const legenda = L.control({ position: 'bottomright' });
legenda.onAdd = function() {
  const div = document.createElement('div');
  div.className = 'legenda-mapa';
  let conteudo = '<h4>Legenda</h4>';
  
  for (const [nome, cor] of Object.entries(grupamentos)) {
    conteudo += `
      <div class="legenda-item">
        <span style="background-color: ${cor}"></span>
        <label>${nome}</label>
      </div>
    `;
  }
  
  div.innerHTML = conteudo;
  return div;
};
legenda.addTo(map);

// Adicionar marcadores para cada obra
obras.forEach(obra => {
  const marker = L.marker(obra.coordenadas, {
    icon: criarIconeTrator(grupamentos[obra.grupamento])
  }).addTo(map);

  // Formatar o valor do PTrab
  const ptrabFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(obra.ptrab);

  // Adicionar popup com informações
  marker.bindPopup(`
    <div class="popup-obra">
      <p><strong>OM:</strong> ${obra.om}</p>
      <p><strong>Obra:</strong> ${obra.nome}</p>
      <p><strong>Valor do PTrab:</strong> ${ptrabFormatado}</p>
      <p><strong>Órgão Financiador:</strong> ${obra.orgaoFinanciador}</p>
    </div>
  `);
});

// Adicionar estilos CSS necessários
const style = document.createElement('style');
style.textContent = `
  .legenda-mapa {
    background: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
  .legenda-mapa h4 {
    margin: 0 0 10px 0;
    color: #333;
  }
  .legenda-item {
    display: flex;
    align-items: center;
    margin: 5px 0;
  }
  .legenda-item span {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 8px;
    display: inline-block;
  }
  .legenda-item label {
    color: #333;
    font-size: 12px;
  }
  .trator-icon {
    border: none;
    background: none;
  }
`;
document.head.appendChild(style);
