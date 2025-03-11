// Configuração dos grupamentos e suas cores
const grupamentos = {
  'DOC': '#ff0000',      // vermelho
  '1º GPT E': '#00BFFF', // azul claro (DeepSkyBlue)
  '2º GPT E': '#00FF00', // verde Lime
  '3º GPT E': '#ffa500', // laranja
  '4º GPT E': '#ffff00'  // amarelo
};

// Inicializar o mapa centralizado no Brasil
const map = L.map('map').setView([-14.235004, -51.92528], 4);

// Definir as diferentes camadas de mapa
const mapas = {
  "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }),
  "Humanitarian": L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">HOT</a>'
  }),
  "Topográfico": L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '© OpenStreetMap contributors, © SRTM | Style: © OpenTopoMap (CC-BY-SA)'
  }),
  "Satélite (Esri)": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Esri, NASA, NOAA'
  })
};

// Adicionar a camada padrão ao mapa
mapas["Satélite (Esri)"].addTo(map);

// Adicionar o controle de camadas
L.control.layers(mapas).addTo(map);

// Dados das obras
const obras = [
  {
    om: '3º Batalhão de Engenharia e Combate (3º BE Cmb)',
    nome: 'ERS 130 Entre Lageado/RS e Arroio do Meio/RS (Rio Forqueta)',
    ptrab: 120000,
    orgaoFinanciador: 'CMS',
    grupamento: '4º GPT E',
    coordenadas: [-29.4667, -51.9667] // Lajeado/RS
  },
  {
    om: '6º Batalhão de Engenharia de Combate',
    nome: 'Implantação de via de trafegabilidade em estirão do Equador',
    ptrab: 13813703.94,
    orgaoFinanciador: 'EME / Amazônia Protegida',
    grupamento: '2º GPT E',
    coordenadas: [-4.2316, -69.9406] // Região de fronteira Brasil-Equador
  },
  {
    om: '21ª Companhia de Engenharia de Construção',
    nome: 'Manutenção Emergencial da Pista de Pouso do 2ºPEF/5ºBIS - QUERARI - 1ª FASE',
    ptrab: 258197.94,
    orgaoFinanciador: 'EME',
    grupamento: '2º GPT E',
    coordenadas: [1.0833, -69.6000] // Querari/AM
  },
  {
    om: '21ª Companhia de Engenharia de Construção',
    nome: 'Manutenção Emergencial da Pista de Pouso do 3ºPEF/5ºBIS - São Joaquim',
    ptrab: 361126.26,
    orgaoFinanciador: 'EME',
    grupamento: '2º GPT E',
    coordenadas: [2.1900, -68.7500] // São Joaquim/AM
  },
  {
    om: '21ª Companhia de Engenharia de Construção',
    nome: 'PATO BR-307/AM,SEGMENTO DO KM 1327,8(SÃO GABRIEL DA CACHOEIRA) - KM 1429,6 (IGARAPÉ BALAIO)',
    ptrab: 24424366.60,
    orgaoFinanciador: 'DNIT',
    grupamento: '2º GPT E',
    coordenadas: [-0.1326, -67.0847] // Ponto médio entre São Gabriel da Cachoeira e Igarapé Balaio
  },
  {
    om: '6º Batalhão de Engenharia de Construção',
    nome: 'Monitoramento de 4 áreas degradadas em Pacaraima-RR',
    ptrab: 883991.46,
    orgaoFinanciador: 'EME',
    grupamento: '2º GPT E',
    coordenadas: [4.4751, -61.1477] // Pacaraima/RR
  },
  {
    om: '6º Batalhão de Engenharia de Construção',
    nome: 'Construção do Pátio do CECMA-OP TEXEIRA',
    ptrab: 6857937.35,
    orgaoFinanciador: 'EME/BANCADA DO ACRE',
    grupamento: '2º GPT E',
    coordenadas: [-9.9749, -67.8249] // Rio Branco/AC
  },
  {
    om: '6º Batalhão de Engenharia de Construção',
    nome: 'Implantação do Centro de Formação de Reservistas do Comando Militar da Amazônia',
    ptrab: 3883012.69,
    orgaoFinanciador: 'EME',
    grupamento: '2º GPT E',
    coordenadas: [-9.9749, -67.8249] // Rio Branco/AC
  },
  {
    om: '6º Batalhão de Engenharia de Construção',
    nome: 'Manutenção da Rede de Estradas nas Bases de Instrução do CIGS',
    ptrab: 619529.30,
    orgaoFinanciador: 'EME',
    grupamento: '2º GPT E',
    coordenadas: [-3.1190, -60.0217] // Manaus/AM - CIGS
  },
  {
    om: '6º Batalhão de Engenharia de Construção',
    nome: 'Monitoramento de 4 áreas Degradas em UIRAMUTÃ e SAMÃ',
    ptrab: 614105.45,
    orgaoFinanciador: 'MD/Ministério da Defesa',
    grupamento: '2º GPT E',
    coordenadas: [4.5954, -60.1658] // Uiramutã/RR
  },
  {
    om: '5º Batalhão de Engenharia de Construção (5ºBEC)',
    nome: 'BR 364-RO-JARU',
    ptrab: 31961516.12,
    orgaoFinanciador: 'DNIT',
    grupamento: '2º GPT E',
    coordenadas: [-10.4467, -62.4667] // Jaru/RO
  },
  {
    om: 'Aeródromo de Santa Rosa do Purus',
    nome: 'BR 364-RO-JARU',
    ptrab: 74669368.58,
    orgaoFinanciador: 'PPRENG/ASTROS',
    grupamento: '2º GPT E',
    coordenadas: [-9.4474, -70.4905] // Santa Rosa do Purus/AC
  },
  {
    om: '5º Batalhão de Engenharia de Construção (5ºBEC)',
    nome: 'Implantação das Vias Laterais da Travessia do Rio Jaru',
    ptrab: 40961559.67,
    orgaoFinanciador: 'DNIT',
    grupamento: '2º GPT E',
    coordenadas: [-10.4467, -62.4667] // Jaru/RO
  },
  {
    om: '5º Batalhão de Engenharia de Construção (5ºBEC)',
    nome: 'Serviços de Engenharia Necessários à Execução das Obras do Remanescente da Barragem de Arvorezinha BAGÉ/RS',
    ptrab: 55912456.86,
    orgaoFinanciador: 'PREF MUN BAGÉ/RS',
    grupamento: '4º GPT E',
    coordenadas: [-31.3297, -54.1063] // Bagé/RS
  },
  {
    om: '3º Batalhão de Engenharia e Combate (3º BE Cmb)',
    nome: 'ERS 287, Km 226 Próx Santa maria (Rio Arroio Grande)',
    ptrab: 120000,
    orgaoFinanciador: 'CMS',
    grupamento: '4º GPT E',
    coordenadas: [-29.6842, -53.8069] // Santa Maria/RS
  },
  {
    om: '1º Batalhão Ferroviário (1º B Fv)',
    nome: 'Melhoria da Capacidade da BR-166/RS, Incluindo a Duplicação, no Subtrecho Guaíba-Pelotas',
    ptrab: 255528384.19,
    orgaoFinanciador: 'DNIT',
    grupamento: '4º GPT E',
    coordenadas: [-30.7213, -51.9802] // Ponto médio entre Guaíba e Pelotas
  },
  {
    om: '5º Batalhão de Engenharia de Construção (5ºBEC)',
    nome: 'Lançamento PNT de Equipagem Metálica ou Similar sobre o Rio Perequê, no Trecho que liga os Municípios de Porto Belo e Itapema/SC',
    ptrab: 823041.68,
    orgaoFinanciador: 'Secretaria da Proteção e Defesa Civil de Santa Catarina',
    grupamento: '4º GPT E',
    coordenadas: [-27.1513, -48.5951] // Ponto médio entre Porto Belo e Itapema/SC
  },
  {
    om: '5º Batalhão de Engenharia de Construção (5ºBEC)',
    nome: 'Aquisição e Modernização de Equipamentos e Viaturas Material Permanente para Engenharia do Exército Brasileiro - Sistema de Obras de Cooperação (SOC)',
    ptrab: 14998570.23,
    orgaoFinanciador: 'DNIT',
    grupamento: 'DOC',
    coordenadas: [-8.7619, -63.9039] // Porto Velho/RO - 5º BEC
  },
  {
    om: '2º Batalhão de Engenharia de Construção (2ºBEC)',
    nome: 'Manutenção da Rodovia Federal  BR-222/PI , Trecho Piripiri/PI-São João do Arraial/PI',
    ptrab: 30064993.42,
    orgaoFinanciador: 'DNIT',
    grupamento: '1º GPT E',
    coordenadas: [-3.9589, -41.7817] // Ponto médio entre Piripiri e São João do Arraial/PI
  },
  {
    om: '4º Batalhão de Engenharia de Construção (4ºBEC)',
    nome: 'Implantação da Ferrovia de Integração Oeste Leste - Lote 6',
    ptrab: 170245996.13,
    orgaoFinanciador: 'INFRA S.A',
    grupamento: '1º GPT E',
    coordenadas: [-12.1524, -44.9931] // Barreiras/BA - 4º BEC
  },
  {
    om: '3º Batalhão de Engenharia de Construção (3ºBEC)',
    nome: 'Crema da BR-135/MA KM51,4 ao KM 125,72',
    ptrab: 125079113.44,
    orgaoFinanciador: 'DNIT',
    grupamento: '1º GPT E',
    coordenadas: [-4.2167, -44.3667] // Ponto médio do trecho da BR-135/MA
  },
  {
    om: '1º Batalhão de Engenharia de Construção (1ºBEC)',
    nome: 'Crema da BR-226/RN',
    ptrab: 94927964.95,
    orgaoFinanciador: 'DNIT',
    grupamento: '1º GPT E',
    coordenadas: [-5.7793, -35.2009] // Natal/RN - 1º BEC
  },
  {
    om: '2º Batalhão de Engenharia de Construção (2ºBEC)',
    nome: 'Apoio a SEDEC/MIDR-MA 317/MA',
    ptrab: 669650.29,
    orgaoFinanciador: 'MIDR',
    grupamento: '1º GPT E',
    coordenadas: [-5.0892, -42.8016] // Teresina/PI - 2º BEC
  },
  {
    om: '7º Batalhão de Engenharia e Combate (7ºBE Cmb)',
    nome: 'Lançamento, Operação e Manuteção de Ponte na BR135/BA (Em Transição da FIOL)',
    ptrab: 677400.00,
    orgaoFinanciador: 'INFRA S.A',
    grupamento: '1º GPT E',
    coordenadas: [-12.1391, -44.9961] // Interseção BR-135/FIOL em Barreiras/BA
  },
  {
    om: '2° BATALHÃO DE ENGENHARIA DE CONSTRUÇÃO (2° BEC)',
    nome: 'IMPLANTAÇÃO DA BR-367/MG',
    ptrab: 328741747.74,
    orgaoFinanciador: 'DNIT',
    grupamento: '1º GPT E',
    coordenadas: [-16.5089, -39.0728] // BR-367/MG
  },
  {
    om: '2º Batalhão Ferroviário',
    nome: 'Implantação e adequação de infraestrutura no municipio de Araguarí/MG',
    ptrab: 19323444.54,
    orgaoFinanciador: 'Prefeitura de Araguari/MG',
    grupamento: 'DOC',
    coordenadas: [-18.6456, -48.1934] // Araguari/MG
  },
  {
    om:'1° BATALHÃO DE ENGENHARIA FR CONSTRUÇÃO (1° BEC)',
    nome: 'CREMA DA BR-226/RN',
    ptrab: 94927964.95,
    orgaoFinanciador: 'DNIT',
    grupamento: '1º GPT E',
    coordenadas: [-5.3972147,-41.5656592,12.48] // BR-226
  },
  {
    om: '2° BATALHÃO DE ENGENHARIA DE CONSTRUÇÃO (2° BEC)',
    nome: 'PATO BR 222/PI',
    ptrab: 30409886.71,
    orgaoFinanciador: 'DNIT',
    grupamento: '1º GPT E',
    coordenadas: [-3.6960798,-43.5852533,15] // BR-222
  },
  {
    om:'7° BATALHÃO DE ENGENHARIA DE COMBATE (7° B E Cmb)',
    nome: 'CONSERVAÇÃO BR-110-316/PE',
    ptrab: 21533902.01,
    orgaoFinanciador: 'DNIT',
    grupamento: '1º GPT E',
    coordenadas: [-7.0917606,-37.301139] // BR-110-316/PE
  },
  {
    om: '3º BATALHÃO DE ENGENHARIA DE CONSTRUÇÃO (3º BEC)',
    nome: 'CREMA DA BR-135/MA',
    ptrab: 126079113.44,
    orgaoFinanciador: 'DNIT',
    grupamento: '1º GPT E',
    coordenadas: [-11.4109313,-44.8985733,15] // BR-135/MA
  },
  {
    om: '5º BATALHÃO DE ENGENHARIA DE CONSTRUÇÃO (5º BEC)',
    nome: 'IMPLANTAÇÃO DAS VIAS LATERAIS DO RIO JARU NA BR 364-RO',
    ptrab: 31961513.12,
    orgaoFinanciador: 'DNIT',
    grupamento: '2º GPT E',
    coordenadas: [-10.4463411,-62.4748329,15] // BR-364/RO 
  },
  {
    om: '8º BATALHÃO DE ENGENHARIA DE CONSTRUÇÃO (8º BEC)',
    nome: 'IMPLANTAÇÃO DA BR 156/AP',
    ptrab: 158229045.24,
    orgaoFinanciador: 'DNIT',
    grupamento: '2º GPT E',
    coordenadas: [1.224273,-51.0204522,15] // BR-156/AP
  },
  {
    om: '1° GRUPAMENTO DE ENGENHARIA (1°Gpt E)',
    nome: 'PROJETO BÁSICO E EXECUTIVO DAS BR-110/316/PE',
    ptrab: 3353959.62,
    orgaoFinanciador: 'DNIT',
    grupamento: '1º GPT E',
    coordenadas: [-7.1785588,-37.3536388,11.3] // BR-110,316/PE
  },
  {
    om: '1º BATALHÃO FERROVIÁRIO (1º B Fv)',
    nome: 'SERVIÇOS DE ENGENHARIA REMANESCENTES DA BARRAGEM DE ARVOREZINHA EM BAGÉ/RS',
    ptrab: 56120034.29,
    orgaoFinanciador: 'PREF MUN BAGÉ/RS',
    grupamento: '4º GPT E',
    coordenadas: [-31.2927096,-54.1821758,15] // DAEB Barragem Arvorezinha
  },
  {
    om: '2º BATALHÃO FERROVIÁRIO (2º B Fv)',
    nome: 'DUPLICAÇÃO E RESTAURAÇÃO DA GO 213',
    ptrab: 257688372.21,
    orgaoFinanciador: 'GOV DO GOIÁS',
    grupamento: '1º GPT E',
    coordenadas: [-17.6959738,-48.5261647,15] // GO-213
  },
  {
    om: '5° BATALHÃO DE ENGENHARIA DE COMBATE BLINDADO (5° BE Cmd BLD)',
    nome: 'EMPREGO DA PONTE LSB SOBRE O RIO PEREQUÊ-SC',
    ptrab: 823041.68,
    orgaoFinanciador: 'SECRETARIA DA PROTEÇÃO E DEFESA CIVIL DE SANTA CATARINA',
    grupamento: '4º GPT E',
    coordenadas: [-27.146155,-48.5942944,16.65] // RIO PEREQUÊ 
  },
  {
    om: '2º BATALHÃO FERROVIÁRIO (2º B Fv)',
    nome: 'AQUISIÇÃO DE EQUIPAMENTO E VIATURA PARA A OBRA DA GO 213',
    ptrab: 20588800.00,
    orgaoFinanciador: 'GOV DO GOIÁS',
    grupamento: '1º GPT E',
    coordenadas: [-16.6453413,-49.2134305] // GO-213
  },
  {
    om: '3º BATALHÃO DE ENGENHARIA E COMBATE (3º BE Cmb)',
    nome: 'MOBILIZAÇÃO, MONTAGEM, DESMOTAGEM E DESMOBILIZAÇÃO DE PONTES METÁLICAS MÓVEIS UTILIZADAS NO REESTABELECIMENTO DE TRÉFEGO EM LOCAIS COM TRÁFEGO INTERROMPIDO PELO ESTADO DE CALAMIDADE PÚBLICA OCORRIDO NO ESTADO DE RIO GRANDE DO SUL.',
    ptrab: 935903.37,
    orgaoFinanciador: 'CMS',
    grupamento: '4º GPT E',
    coordenadas: [-30.0355792,-51.2392007] //  Rio Grande do Sul
  },
  {
    om: '21ª COMPANHIA DE ENGENHARIA DE CONSTRUÇÃO (21ª Cia E Cnst)',
    nome: 'MANUTENÇÃO EMERGENCIAL DA PISTA DE POUSO DO 2º PEF/5º BIS - QUERARI - 1ª FASE',
    ptrab: 579098.71,
    orgaoFinanciador: 'EME',
    grupamento: '2º GPT E',
    coordenadas: [0.6252363,-66.1350135] // 5° Pelotão Especial de Fronteira Maturacá
  },
  {
    om: '9° BATALHÃO DE ENGENHARIA DE CONSTRUÇÃO (9° BEC)',
    nome: 'CONSTRUÇÃO DA INFRAETRUTURA DA 18° BDA INF PAN EM CORUMBÁ-MS.',
    ptrab: 31273779.40,
    orgaoFinanciador: 'PRENG/SISFRON',
    grupamento: '3º GPT E',
    coordenadas: [-19.0002351,-57.6693609] // 18ª Brigada de Infantaria de Pantanal
  },
  {
    om: '4º BATALHÃO DE ENGENHARIA DE CONSTRUÇÃO (4º BEC)',
    nome: 'CONSTRUÇÃO DA INFRAESTRUTURA DO NOVO HMAB',
    ptrab: 5101111.81,
    orgaoFinanciador: 'PPRENG',
    grupamento: '1º GPT E',
    coordenadas: [-15.7725749,-47.9403027] // Hospital Militar de Área de Brasília
  },
  {
    om: '7º BATALHÃO DE ENGENHARIA DE CONSTRUÇÃO (7º BEC)',
    nome: 'READEQUAÇÃO DO AERÓDROMO DE SANTA ROSA DO PURUS',
    ptrab: 74669368.58,
    orgaoFinanciador: 'EME/EMANDA PARLAMENTAR',
    grupamento: '2º GPT E',
    coordenadas: [-9.4426095,-70.4947622] // Santa Rosa do Purus Airport
  },
  {
    om: '9º BATALHÃO DE ENGENHARIA E COMBATE (9º BE Cmb)',
    nome: 'LANÇAMENTO DE PONTE NO CAMPO DE PROVAS BRIGADEIRO VELOSO, EM APOIO À FAB',
    ptrab: 710862.24,
    orgaoFinanciador: 'FAB',
    grupamento: '4º GPT E',
    coordenadas: [-9.3364932,-54.9674159] // Cpbv Proving Ground Brigadeiro Veloso
  },
  {
    om: '1º BATALHÃO DE ENGENHARIA E COMBATE (1º BE Cmb)',
    nome: 'REVITALIZAÇÃO DA INFRAESTRUTURA DO DC MUN',
    ptrab: 3342647.20,
    orgaoFinanciador: 'PPRENG/SISFRON',
    grupamento: '1º GPT E',
    coordenadas: [-22.6539722,-43.7272376] // Ammunition Depot Center
  },
  { 
    om: '6° BATALHÃO DE ENGENHARIA DE CONSTRUÇÃO (6° BEC)',
    nome: 'CONSTRUÇÃO DO PÁTIO DO CECMA-OP PEDRO TEIXEIRA',
    ptrab: 6857937.35,
    orgaoFinanciador: 'EME/SISFRON',
    grupamento: '2º GPT E',
    coordenadas: [-3.0814609,-60.0825798] // Exército Brasileiro — Centro de Embarcações do Comando Militar da Amazônia (CECMA)
  },
  {
    om: '3º BATALHÃO DE ENGENHARIA E COMBATE (3º BE Cmb)',
    nome: 'ERS 130 ENTRE LAGEADO/RS E ARROIO DO MEIO/RS (RIO FORQUETA)',
    ptrab: 935903.37,
    orgaoFinanciador: 'SEDEC',
    grupamento: '4º GPT E',
    coordenadas: [-29.4126698,-51.9863917] // Estiva do Rio Forqueta
  },
  {
    om: '7º BATALHÃO DE ENGENHARIA E COMBATE (7º BE Cmb)',
    nome: 'LANÇAMENTO, OPERAÇÃO E MANUTENÇÃO DE PONTE NA BR 135/BA (EM TRANSIÇÃO DA FIOL)',
    ptrab: 890085.78,
    orgaoFinanciador: 'DNIT',
    grupamento: '4º GPT E',
    coordenadas: [-12.9677496,-50.5314259] // PONTILHÃO FERROVIA NORTE-SUL
  },
  {
    om: '2° BATALHÃO DE ENGENHARIA DE CONTRUÇÃO (2° BEC)',
    nome: 'RDV MA 317 - CAJARI/MA',
    ptrab: 669650.29,
    orgaoFinanciador: 'MDR/COTER',
    grupamento: '4º GPT E',
    coordenadas: [-3.3202884,-45.0095708] // MA-317
  },
  {
    om: 'DEPARTAMENTO DE ENGENHARIA E CONTRUÇÃO E DIRETORIA DE OBRAS DE COOPERAÇÃO (DEC/DOC)',
    nome: 'EMPREGO DAS PONTES LSB',
    ptrab: 50116272.71,
    orgaoFinanciador: 'DNIT',
    grupamento: 'DOC',
    coordenadas: []
  }
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
             style="width: 35px; height: 35px; filter: ${cor === '#ffff00' ?
               'brightness(0) saturate(100%) invert(89%) sepia(82%) saturate(635%) hue-rotate(359deg) brightness(102%) contrast(103%)' :
               cor === '#00FF00' ?
               'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(128%) contrast(108%)' :
               `brightness(0) saturate(100%) invert(31%) sepia(100%) saturate(7475%) hue-rotate(${
                 cor === '#ff0000' ? '0deg' :
                 cor === '#00BFFF' ? '195deg' :
                 cor === '#ffa500' ? '30deg' : '0deg'
               }) brightness(${cor === '#ff0000' ? '118%' : cor === '#00BFFF' ? '120%' : '100%'}) contrast(${cor === '#ff0000' ? '124%' : cor === '#00BFFF' ? '110%' : '100%'})`
             }; drop-shadow(0 1px 2px rgba(0,0,0,0.3));">
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
