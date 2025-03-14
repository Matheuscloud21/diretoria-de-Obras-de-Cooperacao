# Estilos de Mapa Disponíveis

Aqui estão algumas opções de estilos de mapa que você pode usar alterando a URL no tileLayer:

1. **OpenStreetMap Padrão (Atual)**
```javascript
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
```

2. **OpenStreetMap HOT (Humanitarian)**
```javascript
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">HOT</a>'
})
```

3. **OpenTopoMap (Topográfico)**
```javascript
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
  attribution: '© OpenStreetMap contributors, © SRTM | Style: © OpenTopoMap (CC-BY-SA)'
})
```

4. **Stamen Terrain (Terreno)**
```javascript
L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png', {
  maxZoom: 18,
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
```

5. **Stamen Toner (Preto e Branco)**
```javascript
L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png', {
  maxZoom: 20,
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
```

6. **Watercolor (Artístico)**
```javascript
L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png', {
  maxZoom: 16,
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
```

7. **CyclOSM (Ciclismo)**
```javascript
L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
  maxZoom: 20,
  attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
```

Para mudar o estilo, simplesmente substitua o código do tileLayer atual pelo código do estilo desejado no arquivo `jsmapa.js`.

Você também pode implementar um controle de camadas para permitir que o usuário alterne entre diferentes estilos de mapa dinamicamente. Aqui está um exemplo de como fazer isso:

```javascript
// Definir as diferentes camadas
const mapas = {
  "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }),
  
  "Topográfico": L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '© OpenStreetMap contributors, © SRTM | Style: © OpenTopoMap (CC-BY-SA)'
  }),
  
  "Terreno": L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png', {
    maxZoom: 18,
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>'
  })
};

// Adicionar a primeira camada ao mapa
mapas.OpenStreetMap.addTo(map);

// Adicionar o controle de camadas
L.control.layers(mapas).addTo(map);
```

Este código criará um controle no canto superior direito do mapa que permite alternar entre os diferentes estilos.