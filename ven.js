Plotly.d3.csv('VEN_viz.csv', function (err, data) {

  ///console.log('heeeeeere')
  //console.log(data)
  //create_chart(data);

  // my_data = [
  //   {country: "cono", year: "2019-1-1", pop: "11", continent: "Slang", lifeExp: "0.024891", gdpPercap: "0.002952"},
  //   {country: "cono", year: "2019-2-1", pop: "929", continent: "Slang", lifeExp: "0.322942", gdpPercap: "0.00142952"},
  //   {country: "cono", year: "2019-3-1", pop: "2539", continent: "Slang", lifeExp: "0.6220942", gdpPercap: "0.003952"},
  //   {country: "regimen", year: "2019-3-1", pop: "567", continent: "Political", lifeExp: "0.006411", gdpPercap: "0.002725"},
  //   {country: "maduro", year: "2019-2-1", pop: "936", continent: "Politician", lifeExp: "0.015891", gdpPercap: "0.013423"},
  //   {country: "maduro", year: "2019-3-1", pop: "1936", continent: "Politician", lifeExp: "0.021891", gdpPercap: "0.013423"},
  //
  // ];


  create_chart(data);
});



function create_chart(data) {
  console.log('in')
  console.log(data)
  // Create a lookup table to sort and regroup the columns of data,
  // first by year, then by continent:
  var lookup = {};
  function getData(year, continent) {
    var byYear, trace;
    if (!(byYear = lookup[year])) {;
      byYear = lookup[year] = {};
    }
	 // If a container for this year + continent doesn't exist yet,
	 // then create one:
    if (!(trace = byYear[continent])) {
      trace = byYear[continent] = {
        x: [],
        y: [],
        id: [],
        text: [],
        marker: {size: []}
      };
    }
    return trace;
  }

  // Go through each row, get the right trace, and append the data:
  console.log(data.length)
  for (var i = 0; i < data.length; i++) {
    //console.log('WOW')
    var datum = data[i];
    //console.log(datum)
    var trace = getData(datum.year, datum.continent);
    trace.text.push(datum.country);
    trace.id.push(datum.country);
    trace.x.push(datum.lifeExp);
    trace.y.push(datum.gdpPercap);
    //console.log(datum.pop);
    trace.marker.size.push(datum.pop);
  }

  // Get the group names:
  var years = Object.keys(lookup);
  console.log('whaaat')
  console.log(years)
  // In this case, every year includes every continent, so we
  // can just infer the continents from the *first* year:
  var firstYear = lookup[years[2]];
  var continents = Object.keys(firstYear);

  // Create the main traces, one for each continent:
  var traces = [];
  for (i = 0; i < continents.length; i++) {
    var data = firstYear[continents[i]];
	 // One small note. We're creating a single trace here, to which
	 // the frames will pass data for the different years. It's
	 // subtle, but to avoid data reference problems, we'll slice
	 // the arrays to ensure we never write any new data into our
	 // lookup table:
    traces.push({
      name: continents[i],
      x: data.x.slice(),
      y: data.y.slice(),
      id: data.id.slice(),
      text: data.text.slice(),
      mode: 'markers',
      marker: {
        size: data.marker.size.slice(),
        sizemode: 'area',
        sizeref: 2
      }
    });
  }

  // Create a frame for each year. Frames are effectively just
  // traces, except they don't need to contain the *full* trace
  // definition (for example, appearance). The frames just need
  // the parts the traces that change (here, the data).
  var frames = [];
  for (i = 0; i < years.length; i++) {
    frames.push({
      name: years[i],
      data: continents.map(function (continent) {
        return getData(years[i], continent);
      })
    })
  }

  // Now create slider steps, one for each frame. The slider
  // executes a plotly.js API command (here, Plotly.animate).
  // In this example, we'll animate to one of the named frames
  // created in the above loop.
  var sliderSteps = [];
  for (i = 0; i < years.length; i++) {
    sliderSteps.push({
      method: 'animate',
      label: years[i],
      args: [[years[i]], {
        mode: 'immediate',
        transition: {duration: 500},
        frame: {duration: 500, redraw: false},
      }]
    });
  }

  var layout = {
    xaxis: {
      title: 'relative frequency',
      range: [0, 1]
    },
    yaxis: {
      title: '% of all usage',
      //type: 'log',
      range: [0.03, 0.03]
    },
    hovermode: 'closest',
	 // We'll use updatemenus (whose functionality includes menus as
	 // well as buttons) to create a play button and a pause button.
	 // The play button works by passing `null`, which indicates that
	 // Plotly should animate all frames. The pause button works by
	 // passing `[null]`, which indicates we'd like to interrupt any
	 // currently running animations with a new list of frames. Here
	 // The new list of frames is empty, so it halts the animation.
    updatemenus: [{
      x: 0,
      y: 0,
      yanchor: 'top',
      xanchor: 'left',
      showactive: false,
      direction: 'left',
      type: 'buttons',
      pad: {t: 87, r: 10},
      buttons: [{
        method: 'animate',
        args: [null, {
          mode: 'immediate',
          fromcurrent: true,
          transition: {duration: 300},
          frame: {duration: 500, redraw: false}
        }],
        label: 'Play'
      }, {
        method: 'animate',
        args: [[null], {
          mode: 'immediate',
          transition: {duration: 0},
          frame: {duration: 0, redraw: false}
        }],
        label: 'Pause'
      }]
    }],
	 // Finally, add the slider and use `pad` to position it
	 // nicely next to the buttons.
    sliders: [{
      pad: {l: 130, t: 55},
      currentvalue: {
        visible: true,
        prefix: 'Year:',
        xanchor: 'right',
        font: {size: 20, color: '#666'}
      },
      steps: sliderSteps
    }]
  };

  // Create the plot:
  Plotly.plot('ven_graph', {
    data: traces,
    layout: layout,
    frames: frames,
  });
}
