function initMap() {
  // Definir a localização e o nível de zoom
  var location = {lat: -37.817209, lng: 144.955431}; // Coordenadas de exemplo

  // Estilos personalizados do mapa
  var customStyle = [
    {
      "elementType": "geometry",
      "stylers": [{ "color": "#ebe3cd" }]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#523735" }]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{ "color": "#f5f1e6" }]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{ "color": "#c9c9c9" }]
    }
  ];

  // Criar o mapa com estilos
  var map = new google.maps.Map(document.getElementById('custom-map'), {
    zoom: 15,
    center: location,
    styles: customStyle
  });

  // Adicionar um marcador no mapa
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
}

// Inicializa o mapa assim que a API for carregada
google.maps.event.addDomListener(window, 'load', initMap);
