var map = L.map('map').setView([14, 0], 1 );

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    minZoom: 1,
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3'],
    attribution: '<a href="https://www.google.com/maps" target=_blank> Google Sattellite Map</a>' }).addTo(map);

L.Control.textbox = L.Control.extend({
		onAdd: function(map) {
			
		var text = L.DomUtil.create('div');
		text.id = "info_text";
		text.innerHTML = "<span>Continents, Population, Population Density, GDP and GDP Per Capita- 2023</span>"
		return text;
		},

		onRemove: function(map) {
			// Nothing to do here
		}
	});
	L.control.textbox = function(opts) { return new L.Control.textbox(opts);}
	L.control.textbox({ position: 'topright' }).addTo(map);

L.choropleth(Contenents, {
	valueProperty: 'GDP', // which property in the features to use
	scale: ['yellow' ,'red'], // chroma.js scale - include as many as you like
	steps: 5, // number of breaks or steps in range
	mode: 'q', // q for quantile, e for equidistant, k for k-means
	style: {
		color: 'white', // border color
		weight: 0.7,
		fillOpacity: 0.6
	},
	onEachFeature: function(feature, layer) {
		layer.bindPopup("<span class = 'headings'>Continent Name : </span> " + feature.properties.CONTINENT + "<br>"
        + "<span class = 'headings'>Total GDP (Billions) : </span>"+ "$" + feature.properties.GDP.toLocaleString().replace(/B(?=(d{3})+(?!d))/g, ",") + "<br>"
        + "<span class = 'headings'>Share : </span>" + feature.properties.Share +"%" + "<br>"
        + "<span class = 'headings'>Population : </span> " + feature.properties.Population.toLocaleString().replace(/B(?=(d{3})+(?!d))/g, ",") + "<br>"
        + "<span class = 'headings'>Density : </span> " + feature.properties.Density + " Persons / km2" + "<br>"
		+ "<span class = 'headings'>GDP Per Capita : </span> "+ "$" + feature.properties.GDPPERCAPI )
		 layer.on('mouseover', function(e) {
        e.target.setStyle({
            fillOpacity: 0.9
        });
    });
    layer.on('mouseout', function(e) {
        e.target.setStyle({
            fillOpacity: 0.6
        });
    });
}

}).addTo(map)

function addThousandsSeparator(n) {
    return n.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
