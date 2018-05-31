this was taken from: 

https://asmaloney.com/2015/06/code/clustering-markers-on-leaflet-maps/

downloaded from github: Leaflet_Cluster_Example-master.zip
https://github.com/asmaloney/Leaflet_Cluster_Example

--------------------------------------------

and prototyping for EOL maps, I've added forlders

/data/
/vendor/


=========================================================================================================================================
<!-- Important plugins: https://leafletjs.com/plugins.html -->

<!-- for fullscreen --> <!-- from here: https://github.com/Leaflet/Leaflet.fullscreen ========== NOT USED ANYMORE cannot be downloaded and referenced locally -->
=========================================================================================================================================
// if we want to show left pan or the like: https://github.com/stefanocudini/leaflet-list-markers

=========================================================================================================================================
// var map_x = L.map('toggle-map', {scrollWheelZoom: false}).setView([37.8, -96], 4); //just other syntax with other attributes
=========================================================================================================================================
/* working but used 'toggle' instead
L.easyButton('<strong>Off</strong>', function(){disable();}).addTo(map);
L.easyButton('<strong>On</strong>' , function(){enable(); }).addTo(map);
*/

/* sample of using 'star' in css
L.easyButton('<span class="star">&starf;</span>', function(){alert('button works')}).addTo(map);
*/
=========================================================================================================================================
//---------------------------------------------------------------------------------------------------------------- to center map 
/* working but moved above
var center = getCentroid(latlng);
map.setView(center, 2); //can pass array e.g. var center to setView()
*/
/* other options: https://stackoverflow.com/questions/12735303/how-to-change-the-map-center-in-leaflet
map.setView({lat:center[0], lng:center[1]}, 2); //or can pass object to setView()
map.panTo({lat:center[0], lng:center[1]});
*/

=========================================================================================================================================
=========================================================================================================================================
=========================================================================================================================================
=========================================================================================================================================
