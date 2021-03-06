
var nameOfFeature = function(feature) {
    var hasAName = feature.properties && feature.properties.name;
    return hasAName ? feature.properties.name : "";
};

var coordsOfFeature = function(feature) {
    var lon = feature.geometry.coordinates[0];
    var lat = feature.geometry.coordinates[1];

    return [lat, lon];
};

var categoryOfFeature = function(feature) {
    var hasACategory = feature.properties && feature.properties.category;
    return hasACategory ? feature.properties.category : null;
};

var addOneMarker = function(feature, map) {
    var icon = L.MakiMarkers.icon({icon: categoryOfFeature(feature), color: "#000", size: "m"});		
    L.marker(coordsOfFeature(feature), {icon: icon}).bindPopup(nameOfFeature(feature)).addTo(map);    
};

var createMap = function() {
    	var mapLat = $('#map').data( 'lat' );
	var mapLon = $('#map').data( 'lon' );
	var mapZoom = $('#map').data( 'zoom' );
	return L.map( 'map' ).setView( [mapLat, mapLon], mapZoom );
};

var mapOptions = function() {
    var attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';
    return { attribution: attribution, maxZoom: 18 };
};

$(document).ready(
    function() {
				var map = createMap();
				var osmLayerUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
				L.tileLayer( osmLayerUrl, mapOptions() ).addTo( map );

				var dataSource = $('#map').data( 'source' );
				$.get(dataSource, function(data) {
						jsonData = JSON.parse(data)
						var features = jsonData[ 'features' ]
						for( var i = 0; i < features.length; i++ ) {
								addOneMarker(features[i], map);
						}
				});
    }
);
