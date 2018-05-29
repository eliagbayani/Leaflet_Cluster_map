// See post: http://asmaloney.com/2015/06/code/clustering-markers-on-leaflet-maps

var map = L.map( 'map', {
  center: [10.0, 5.0],
  minZoom: 1,
  zoom: 2,
  fullscreenControl: true
});

// var map_x = L.map('toggle-map', {scrollWheelZoom: false}).setView([37.8, -96], 4); //just other syntax with other attributes


L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
 subdomains: ['a','b','c']
}).addTo( map );


/* working but used 'toggle' instead
L.easyButton('<strong>Off</strong>', function(){disable();}).addTo(map);
L.easyButton('<strong>On</strong>' , function(){enable(); }).addTo(map);
*/

/* sample of using 'star' in css
L.easyButton('<span class="star">&starf;</span>', function(){alert('button works')}).addTo(map);
*/


// /*
var toggle = L.easyButton({
  id: 'eli',
  states: [{
    stateName: 'add-markers',
    icon: 'fa-map-marker',
    // icon: '<span class="diamond">&diamond;</span>',
    title: 'Cluster Off',
    onClick: function(control) {
        disable();
        control.state('remove-markers');
    }
  }, {
    stateName: 'remove-markers',
    icon: 'fa-undo',
    // icon: '<span class="star">&olarr;</span>',
    title: 'Cluster On',
    onClick: function(control) {
        enable();
        control.state('add-markers');
    }
  }]
});
toggle.addTo(map);
// */

L.easyButton( 'icon ion-home', function(){
  alert('you just clicked an ionicon');
});


L.easyButton( '<i class="material-icons">face</i>', function(){
  alert('you just clicked a material icon');
});


//----------------------------------------------------------------------------------------------------------------
//for NavBar
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
    maxClusterRadius: 50
});

var markers = data.records;
// alert(markers.length);
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
}

map.addLayer( markerClusters );

//----------------------------------------------------------------------------------------------------------------
//for enable disable cluster
function enable() {
    // alert(markerClusters.freezeAtZoom('max'));
    markerClusters.enableClustering();
}
function disable() {
    // alert(markerClusters.freezeAtZoom('max'));
    markerClusters.disableClustering();
}
//----------------------------------------------------------------------------------------------------------------

