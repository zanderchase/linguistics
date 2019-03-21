
$(document).ready(function () {
    let w = $(window).width();
    let h = $(window).height();
    console.log("width: ", w);
    let bs_md_mode = (w >= 768);
    heat(w, bs_md_mode);
});

function heat(w, md_mode) {
    if(md_mode) {
        $('#heat1').css('height', w / 2 * .8 + 'px');
        $('#heat2').css('height', w / 2 * .8 + 'px');
    } else {
        $('#heat1').css('height', w + 'px');
        $('#heat2').css('height', w + 'px');
    }

    Plotly.d3.json('https://raw.githubusercontent.com/plotly/datasets/master/custom_heatmap_colorscale.json', function (figure) {
        let data = [
            {
                z: [
                  [0.033579382,0.083822879,0.028307352,0.076432428,0.112847193,0.08287486,0.036328626,0.068136183,0.091947176],
                  [0.023175335,0.097510361,0.021067407,0.124006938,0.099096093,0.088085261,0.035234028,0.106335373,0.089937336],
                  [0.17875446,0.003899066,0.20456117,0.0,0.00225828,0.023284497,0.176347887,0.003466308,0.001861338],
                  [0.017602273,0.086907185,0.018021625,0.116745263,0.116794474,0.083338151,0.020302564,0.083539543,0.076283562],
                  [0.184644977,0.003313778,0.188110141,0.001600502,0.00219447,0.019507024,0.159060659,0.0, 0.001754427],
                  [0.018044167,0.104459804,0.020286094,0.122082028,0.102860753,0.098439009,0.016692453,0.09155134,0.065739716],
                  [0.016175952,0.1435163,0.031341415,0.089397632,0.049610309,0.153585214,0.042002433,0.079185538,0.057326392],
                  [0.149248874,0.0072409,0.184574955,0.010434152,0.003433538,0.029216977,0.134998232,0.005013603,0.004978734],
                  [0.147496401,0.00722034,0.185949946,0.001101102,0.002671071,0.032915473,0.12438541,0.011498683,0.003162226],
                ],
                x:
                    ['Asuncion','Bogota','Buenos Aires','Caracas','Lima','Medellin', 'Montevideo', 'Quito', 'Santiago'],
                y:
                    ["he", "han", "tenes","tienes", "queres", "quieres", "usted", "sos", "vos"],
                type: 'heatmap',
                colorscale: 'YIOrRd'
            }
        ];
        let layout1 = {
            title: 'Grammar<br>variation by country',
            autosize: true, xaxis: {automargin: true}, yaxis: {automargin: true},
        };
        Plotly.newPlot('heat1', data, layout1);
    });

    Plotly.d3.json('https://raw.githubusercontent.com/plotly/datasets/master/custom_heatmap_colorscale.json', function (figure) {
        let data2 = [
            {
                z: [
                  [0.056773775,0.02624783,0.204541224,0.013360398,0.013651233,0.017709105,0.136291692,0.016299332,0.018299203],
                  [0.199347062,0.00516921,0.163791225,0.007857662,0.016545396,0.004735864,0.136010291,0.006926862,0.017045757],
                  [0.064612045,0.131543562,0.018639329,0.086823633,0.121112271,0.145194163,0.015067069,0.067569028,0.03488413],
                  [0.0,0.06939573,0.013565106,0.174437699,0.024770129,0.067194197,0.006365698,0.015205111,0.018447276],
                  [0.129213263,0.011380153,0.157199444,0.009195956,0.033623198,0.00790314,0.084306415,0.020176488,0.14507807],
                  [0.0506873,0.050707084,0.100343201,0.034600989,0.060550822,0.060611442,0.114904113,0.043152637,0.121888387],
                  [0.173835048,0.0,0.232658892,0.0,0.0,0.0,0.132800262,0.0,0.0],
                  [0.013903914,0.163156572,0.012765667,0.081575364,0.077979286,0.133032876,0.013542812,0.070899288,0.070677163],

                ],
                x:
                    ['Asuncion','Bogota','Buenos Aires','Caracas','Lima','Medellin', 'Montevideo', 'Quito', 'Santiago'],

                y:
                    ['re', 'che', 'pues', 'vaina', 'onda', 'saco', 'heladera', 'carro'],
                type: 'heatmap',
                colorscale: 'YIOrRd'
            }
        ];
        let layout2 = {
            title: 'Lexicon<br>variation by country',
            autosize: true,
            xaxis: {automargin: true},
            yaxis: {automargin: true}
        };
        Plotly.newPlot('heat2', data2, layout2);
    });
}
