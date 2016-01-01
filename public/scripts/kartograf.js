
var nameOfFeature = function(feature) {
    var hasAName = feature.properties && feature.properties.name
    return hasAName ? feature.properties.name : "";
};

var coordsOfFeature = function(feature) {
    var lon = feature.geometry.coordinates[0];
    var lat = feature.geometry.coordinates[1];

    return [lat, lon];
};

var addOneMarker = function(feature, map) {
    var icon = L.MakiMarkers.icon({icon: "restaurant", color: "#000", size: "m"});		
    L.marker(coordsOfFeature(feature), {icon: icon}).bindPopup(nameOfFeature(feature)).addTo(map);    
};

$(document).ready(
    function() {
	var mapLat = $('#map').data( 'lat' );
	var mapLon = $('#map').data( 'lon' );
	var mapZoom = $('#map').data( 'zoom' );
	var map = L.map( 'map' ).setView( [mapLat, mapLon], mapZoom );
	var osmLayerUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
	var attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';
	var options = { attribution: attribution, maxZoom: 18 };
	L.tileLayer( osmLayerUrl, options ).addTo( map );

	$.get('/newyork.json', function(data) {
	    for( var i = 0; i < data.features.length; i++ ) {
		addOneMarker(data.features[i], map);
	    }
	});
    }
);
