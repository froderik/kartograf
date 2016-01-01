
$(document).ready(
    function() {
	var map = L.map( 'map' ).setView( [40.728, -74], 13 );
	var osmLayerUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
	var attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';
	var options = { attribution: attribution, maxZoom: 18 };
	L.tileLayer( osmLayerUrl, options ).addTo( map );

	$.get('/newyork.json', function(data) {
	    for( var i = 0; i < data.features.length; i++ ) {
		var feature = data.features[i];
		var icon = L.MakiMarkers.icon({icon: "restaurant", color: "#000", size: "m"});
		var x = feature.geometry.coordinates[0];
		var y = feature.geometry.coordinates[1];
		var hasAName = feature.properties && feature.properties.name
		var popupContent = hasAName ? feature.properties.name : "";
		L.marker([y, x], {icon: icon}).bindPopup(popupContent).addTo(map);
	    }
	});
    }
);
