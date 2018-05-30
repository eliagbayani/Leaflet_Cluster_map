// See post: http://asmaloney.com/2015/06/code/clustering-markers-on-leaflet-maps

var map = L.map( 'map', {
  center: [10.0, 5.0],
  minZoom: 1,
  zoom: 2,
  fullscreenControl: true,
  loadingControl: true
});

// var map_x = L.map('toggle-map', {scrollWheelZoom: false}).setView([37.8, -96], 4); //just other syntax with other attributes


L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
 subdomains: ['a','b','c']
}).addTo( map );


/* working but used 'toggle' instead
L.easyButton('<strong>Off</strong>', function(){disable();}).addTo(map);
L.easyButton('<strong>On</strong>' , function(){enable(); }).addTo(map);
*/

/* sample of using 'star' in css
L.easyButton('<span class="star">&starf;</span>', function(){alert('button works')}).addTo(map);
*/




//----------------------------------------------------------------------------------------------------------------//for NavBar
L.control.navbar().addTo(map);

//----------------------------------------------------------------------------------------------------------------

var myURL = jQuery( 'script[src$="leaf-demo_v2.js"]' ).attr( 'src' ).replace( 'leaf-demo_v2.js', '' );

var myIcon = L.icon({
  iconUrl: myURL + 'images/pin24.png',
  iconRetinaUrl: myURL + 'images/pin48.png',
  iconSize: [29, 24],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

// var markerClusters = L.markerClusterGroup();
var markerClusters = L.markerClusterGroup({
    // spiderfyOnMaxZoom: false,
    // showCoverageOnHover: false,
    // zoomToBoundsOnClick: false
    maxClusterRadius: 60
    /* working-sshhh, only if u want to customize
    ,
    iconCreateFunction: function(cluster) {
        return L.divIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
    }
    */
    
    
});



var markers = data.records;
// alert(markers.length);
var latlng = [];
for ( var i = 0; i < markers.length; ++i )
{
  var popup = markers[i].name +
              '<br/>' + markers[i].a +
              '<br/><b>IATA/FAA:</b> ' + markers[i].b +
              '<br/><b>ICAO:</b> ' + markers[i].c +
              '<br/><b>Timezone:</b> ' + markers[i].d;

  var m = L.marker( [markers[i].h, markers[i].i], {icon: myIcon} )
                  .bindPopup( popup );

  markerClusters.addLayer( m );
  latlng.push([markers[i].h, markers[i].i]); //add value to array latlng
}
map.addLayer( markerClusters );


//------------------ to center map

// alert("eli");
var center = getCentroid(latlng);
alert(center);

map.setView({lat:center[0], lng:center[1]}, 2);

//----------------------------------------------------------------------------------------------------------------//for Cluster On/Off
// /*
var toggle = L.easyButton({
  id: 'eli',
  states: [{
    stateName: 'add-markers',
    icon: 'fa-map-marker',
    // icon: '<span class="diamond">&diamond;</span>',
    title: 'Cluster On',
    onClick: function(control) {
        disable();
        control.state('remove-markers');
    }
  }, {
    stateName: 'remove-markers',
    icon: 'fa-undo',
    // icon: '<span class="star">&olarr;</span>',
    title: 'Cluster Off',
    onClick: function(control) {
        enable();
        control.state('add-markers');
    }
  }]
});
if(markers.length < 20000) {
    toggle.addTo(map);
}
// */

//----------------------------------------------------------------------------------------------------------------
//for enable disable cluster
function enable() {
    markerClusters.enableClustering();
}
function disable() {
    alert(markers.length);
    markerClusters.disableClustering();
}
//----------------------------------------------------------------------------------------------------------------
// var getCentroid = function (coord) 
function getCentroid(coord)
{
	var center = coord.reduce(function (x,y) {
		return [x[0] + y[0]/coord.length, x[1] + y[1]/coord.length] 
	}, [0,0])
	return center;
}
