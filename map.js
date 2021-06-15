const map = L.map('map').setView([-25, 290], 3);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

// Adding Voyager Labels
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png', {
  maxZoom: 18,
  zIndex: 10
}).addTo(map);

var client = new carto.Client({
  apiKey: '17e8cd5410fb0b9b12cd7e8164ffa73320211ad0',
  username: 'alexchase'
});

const LACountriesDataset = new carto.source.Dataset(`
  samerica_adm0
`);
const LACountriesStyle = new carto.style.CartoCSS(`
  #layer {
  polygon-fill: #162945;
    polygon-opacity: 0.5;
    ::outline {
      line-width: 1;
      line-color: #FFFFFF;
      line-opacity: 0.5;
    }
  }
`);
const LACountriesPoly = new carto.layer.Layer(LACountriesDataset, LACountriesStyle);

const LAWordsSource = new carto.source.SQL(`
  SELECT *
    FROM test_scraper2_clean1
    WHERE text like '% boludo %'
`);

const LAWordsStyle = new carto.style.CartoCSS(`
  #layer {

    image-filters: colorize-alpha(blue, cyan, #008000, yellow , orange, red);
    marker-file: url(http://s3.amazonaws.com/com.cartodb.assets.static/alphamarker.png);

    marker-width: 15;
    marker-width: 6;
    marker-fill: #FF583E;
    marker-fill-opacity: 0.03;
    marker-line-width: 0.5;
    marker-line-color: #FFFFFF;
    marker-line-opacity: 0.03;
    marker-type: ellipse;
    marker-allow-overlap: true;
    comp-op: src-atop;
  }
`);





//marker-comp-op: src-atop;
const LAWords = new carto.layer.Layer(LAWordsSource, LAWordsStyle, {
  featureOverColumns: ['text']
});


client.addLayers([LACountriesPoly, LAWords]);
client.getLeafletLayer().addTo(map);


const popup = L.popup({ closeButton: false });
  LAWords.on(carto.layer.events.FEATURE_OVER, featureEvent => {
    popup.setLatLng(featureEvent.latLng);
    if (!popup.isOpen()) {
      popup.setContent(featureEvent.data.text);
      popup.openOn(map);
    }
  });

LAWords.on(carto.layer.events.FEATURE_OUT, featureEvent => {
  popup.removeFrom(map);
});
//console.log('dataview')
const wordDataview = new
carto.dataview.Category(LACountriesDataset, 'adm0_a3', {
  limit: 16
});
wordDataview.on('dataChanged', data => {
  const countryNames = data.categories.map(category => category.name).sort();
  //console.log(countryNames);
  console.log('dv1')
  refreshWordsWidget(countryNames);
});

function refreshWordsWidget(adminNames) {
  //console.log('refresh')
  const widgetDom = document.querySelector('#wordWidget');
  const wordsDom = widgetDom.querySelector('.js-words');

  const widgetDom2 = document.querySelector('#countriesWidget');
  const wordsDom2 = widgetDom2.querySelector('.js-countries');

  const widgetDom3 = document.querySelector('#selectorWidget');
  const wordsDom3 = widgetDom3.querySelector('.js-selector');

  wordsDom.onchange = event => {
    var e = document.getElementById("countriesWidget");

    //console.log(wordsDom2.options[wordsDom2.selectedIndex].value)
    var country = wordsDom2.options[wordsDom2.selectedIndex].value
    const admin = event.target.value;
    filterPopulatedPlacesByWord(admin, country);
  };

  wordsDom2.onchange = event => {
    //console.log('change')
    var word = wordsDom.options[wordsDom.selectedIndex].value
    const admin = event.target.value;

    highlightCountry(admin);
    filterCountries(admin, word);
  };

  wordsDom3.onchange = event => {
    //console.log('change')
    const admin = event.target.value;
    LayerActions(admin);
  };

  adminNames.forEach(admin => {
    //console.log(admin);
    const option = document.createElement('option');
    option.innerHTML = admin;
    option.value = admin;
    wordsDom2.appendChild(option);
  });
}

function LayerActions(admin) {
  console.log(admin)
  if (admin == 'dots'){
      LAWordsStyle.setContent(`
        #layer {
          marker-width: 6;
          marker-fill: #FF583E;
          marker-fill-opacity: 1;
          marker-line-width: 0.5;
          marker-line-color: #FFFFFF;
          marker-line-opacity: 0.5;
          marker-type: ellipse;
          marker-allow-overlap: true;
          marker-comp-op: src-atop;

        }
      `);
    }
  else if (admin == 'heatmap') {
      LAWordsStyle.setContent(`
        #layer {
          image-filters: colorize-alpha(blue, cyan, #008000, yellow , orange, red);
          marker-file: url(http://s3.amazonaws.com/com.cartodb.assets.static/alphamarker.png);

          marker-width: 15;
          marker-width: 6;
          marker-fill: #FF583E;
          marker-fill-opacity: 0.03;
          marker-line-width: 0.5;
          marker-line-color: #FFFFFF;
          marker-line-opacity: 0.03;
          marker-type: ellipse;
          marker-allow-overlap: true;
          comp-op: src-atop;

        }
      `);
    }
}
function highlightCountry(admin) {
  //console.log(admin);
  let cartoCSS = `
    #layer {
      polygon-fill: #162945;
      polygon-opacity: 0.5;
      ::outline {
        line-width: 1;
        line-color: #FFFFFF;
        line-opacity: 0.5;
      }
    }
  `;
  if (admin) {
    cartoCSS = `
      ${cartoCSS}
      #layer[adm0_a3!='${admin}'] {
        polygon-fill: #CDCDCD;
      }
    `;
  }
  LACountriesStyle.setContent(cartoCSS);
}

function filterCountries(admin, word) {
  console.log(word)
  let query = `
    SELECT *
      FROM test_scraper2_clean1
      WHERE country IN (SELECT adm0_a3 FROM samerica_adm0) AND text like '% ${word} %'
  `;
  if (admin) {
    query = `
      SELECT *
        FROM test_scraper2_clean1
        WHERE country='${admin}' AND text like '% ${word} %'
    `;
  }
  LAWordsSource.setQuery(query);
}

// Fill in the list of words
const widgetDom = document.querySelector('#wordWidget');
const wordsDom = widgetDom.querySelector('.js-words');
const wordNames = ['parce', 'weon', 'pana', 'auto', 'carro', 'campera', 'chaqueta',
 'heladera', 'nevera', 'refrigerador', 'resfrio', 'gripe', 'resfriado',
 'novio', 'pololo', 'metro', 'subte', 'hijueputa', 'pelotudo', 'cono',
 'piscina', 'pileta', 'chamba', 'laburo', 'chela', 'birra',
 'pues', 'vaina', 'onda', 'bacan', 'ahre', 'oye', 'che', 'tranqui', 'raja',
 'flaca', 'pibe',  'pisco',  'apagon', 'humanitaria','sinluz']
wordNames.forEach(admin => {
  const option = document.createElement('option');
  option.innerHTML = admin;
  option.value = admin;
  wordsDom.appendChild(option);
});

function filterPopulatedPlacesByWord(admin, country) {
  let query = `
    SELECT *
      FROM test_scraper2_clean1
      WHERE text IS NOT NULL AND country IN (SELECT adm0_a3 FROM samerica_adm0)
  `;
  if (admin && country != '') {
    console.log('1')
    query = `
      SELECT *
        FROM test_scraper2_clean1
        WHERE text like '% ${admin} %' AND country = '${country}'
    `;
  }
  else if (admin) {
    console.log('2')
    query = `
      SELECT *
        FROM test_scraper2_clean1
        WHERE text like '% ${admin} %'
    `;
  }

  LAWordsSource.setQuery(query);
}


//how many words
const averagePopulation = new carto.dataview.Formula(LAWordsSource, 'one', {
  operation: carto.operation.SUM
});

averagePopulation.on('dataChanged', data => {
  refreshAveragePopulationWidget(data.result);
});

function refreshAveragePopulationWidget(avgPopulation) {
  console.log('here')
  console.log(avgPopulation)
  const widgetDom = document.querySelector('#avgPopulationWidget');
  const averagePopulationDom = widgetDom.querySelector('.js-average-population');
  averagePopulationDom.innerText = Math.floor(avgPopulation);
}
client.addDataview(averagePopulation);
client.addDataview(wordDataview);
