function onEachFeature(feature, layer) {
    var popupContent = "";

    if (feature.properties && feature.properties.name) {
        popupContent += feature.properties.name;
    }

    layer.bindPopup(popupContent);
};


$(document).ready(
    function() {
	var map = L.map( 'map' ).setView( [40.728, -74], 13 );
	var osmLayerUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
	var attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';
	var options = { attribution: attribution, maxZoom: 18 };
	L.tileLayer( osmLayerUrl, options ).addTo( map );

	$.get('/newyork.json', function(data) {
            L.geoJson(data, { onEachFeature: onEachFeature }).addTo(map);
	});
    }
);
