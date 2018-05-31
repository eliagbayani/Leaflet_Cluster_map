// See post: http://asmaloney.com/2015/06/code/clustering-markers-on-leaflet-maps
// if we want to show left pan or the like: https://github.com/stefanocudini/leaflet-list-markers

latlng = get_all_latlongs(data.records);
center_map = getCentroid(latlng);

var map = L.map( 'map', {
  center: center_map,
  // center: [10.0, 5.0],
  minZoom: 1,
  zoom: 2,
  fullscreenControl: true,
  loadingControl: true
});


//listener, good source here: https://leafletjs.com/reference-1.3.0.html#map-zoomend
map.on('zoomstart', function() {
    enable();
});

// L.DomUtil.TRANSITION = false; --- no effect
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
    // animate: false,              --- no effect
    // animateAddingMarkers:false   --- no effect
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
  /*
  var popup = markers[i].name +
              '<br/>' + markers[i].a +
              '<br/><b>IATA/FAA:</b> ' + markers[i].b +
              '<br/><b>ICAO:</b> ' + markers[i].c +
              '<br/><b>Timezone:</b> ' + markers[i].d;
  */
  pic = markers[i];
  var title = pic.b;                                                                                                              //sciname
  var infoHtml = '<div class="info"><h3>' + title + '</h3>';
  if(pic.l)       {infoHtml += '<div class="info-body"><img src="' + pic.l + '" class="info-img"/></div><br/>';}                  //pic_url
  if(pic.a) {infoHtml += 'Catalog number: ' + pic.a + '<br/>';}                                                                   //catalogNumber
  infoHtml += 'Source portal: <a href="http://www.gbif.org/occurrence/' + pic.g + '" target="_blank">GBIF record</a>' + '<br/>' + //gbifID
              'Publisher: <a href="http://www.gbif.org/publisher/' + pic.d + '" target="_blank">' + pic.c + '</a><br/>' +         //publisher_id & publisher
              'Dataset: <a href="http://www.gbif.org/dataset/' + pic.f + '" target="_blank">' + pic.e + '</a><br/>';              //dataset_id & dataset
  if(pic.j)   {infoHtml += 'Recorded by: ' + pic.j + '<br/>';}                                                                    //recordedBy
  if(pic.k) {infoHtml += 'Identified by: ' + pic.k + '<br/>';}                                                                    //identifiedBy
  if(pic.m) {infoHtml += 'Event date: ' + pic.m + '<br/>';}                                                                       //eventDate
  infoHtml += '</div>';



  var m = L.marker( [markers[i].h, markers[i].i], {icon: myIcon} )
                  .bindPopup( infoHtml );

  markerClusters.addLayer( m );
  latlng.push([markers[i].h, markers[i].i]); //add value to array latlng
}
map.addLayer( markerClusters );


//---------------------------------------------------------------------------------------------------------------- to center map 
/* working but moved above
var center = getCentroid(latlng);
map.setView(center, 2); //can pass array e.g. var center to setView()
*/
/* other options: https://stackoverflow.com/questions/12735303/how-to-change-the-map-center-in-leaflet
map.setView({lat:center[0], lng:center[1]}, 2); //or can pass object to setView()
map.panTo({lat:center[0], lng:center[1]});
*/
//----------------------------------------------------------------------------------------------------------------//for Cluster On/Off
// /*
var toggle = L.easyButton({
  id: 'eli',
  states: [{
    stateName: 'add-markers',
    icon: 'fa-map-marker',
    // icon: '<span class="star">&diamond;</span>',
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

// if(markers.length < 15000) {
    toggle.addTo(map);
// }
// */

//----------------------------------------------------------------------------------------------------------------
//for enable disable cluster
function enable() {
    // alert("view port: "+getFeaturesInView());
    markerClusters.enableClustering();
}
function disable() {
    // alert(markers.length);
    // alert("view port: "+getFeaturesInView());
    if(getFeaturesInView() <= 1000) {markerClusters.disableClustering();}
    else {
        alert("Cannot un-cluster. Too many points.");
        control.state('add-markers');
    }
}
function getFeaturesInView() { //https://stackoverflow.com/questions/22081680/get-a-list-of-markers-layers-within-current-map-bounds-in-leaflet
  var features = [];
  var i = 0;
  map.eachLayer( function(layer) {
    if(layer instanceof L.Marker) {
      if(map.getBounds().contains(layer.getLatLng())) {
        features.push(layer.feature);
        // alert(console.debug(layer));
        if(isNaN(layer._childCount)){i = i + 1;}
        else                        {i = i + layer._childCount;}
      }
    }
  });
  /* working OK
  alert("total latlongs = "+i);                 //total coordinates, lat longs
  alert("total markers = "+features.length);    //total no of markers e.g. dot icon + cluster icon
  */
  return i; //total coordinates in current view
}
//---------------------------------------------------------------------------------------------------------------- from: http://webdevzoom.com/get-center-of-polygon-triangle-and-area-using-javascript-and-php/
// var getCentroid = function (coord) 
function getCentroid(coord)
{
    var center = coord.reduce(function (x,y) {
        return [x[0] + y[0]/coord.length, x[1] + y[1]/coord.length] 
    }, [0,0])
    return center;
}
//----------------------------------------------------------------------------------------------------------------
function get_all_latlongs(markers)
{
    var latlng = [];
    for ( var i = 0; i < markers.length; ++i ) {
      latlng.push([markers[i].h, markers[i].i]); //add value to array latlng
    }
    return latlng;
}