var m_map = null;
var c_map = null;
var m_heatmap = null;
var heatData = null;
var c_heatData =null;
var c_heatData_2 = null;
var c_heatmap = null;
var c_heatmap_2 = null;

// initialize Google map
function myMap() {
        var styledMapType = new google.maps.StyledMapType(
			            [
			  {
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#1d2c4d"
			      }
			    ]
			  },
			  {
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#8ec3b9"
			      }
			    ]
			  },
			  {
			    "elementType": "labels.text.stroke",
			    "stylers": [
			      {
			        "color": "#1a3646"
			      }
			    ]
			  },
			  {
			    "featureType": "administrative.country",
			    "elementType": "geometry.stroke",
			    "stylers": [
			      {
			        "color": "#4b6878"
			      }
			    ]
			  },
			  {
			    "featureType": "administrative.land_parcel",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#64779e"
			      }
			    ]
			  },
			  {
			    "featureType": "administrative.province",
			    "elementType": "geometry.stroke",
			    "stylers": [
			      {
			        "color": "#4b6878"
			      }
			    ]
			  },
			  {
			    "featureType": "landscape.man_made",
			    "elementType": "geometry.stroke",
			    "stylers": [
			      {
			        "color": "#334e87"
			      }
			    ]
			  },
			  {
			    "featureType": "landscape.natural",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#023e58"
			      }
			    ]
			  },
			  {
			    "featureType": "poi",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#283d6a"
			      }
			    ]
			  },
			  {
			    "featureType": "poi",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#6f9ba5"
			      }
			    ]
			  },
			  {
			    "featureType": "poi",
			    "elementType": "labels.text.stroke",
			    "stylers": [
			      {
			        "color": "#1d2c4d"
			      }
			    ]
			  },
			  {
			    "featureType": "poi.park",
			    "elementType": "geometry.fill",
			    "stylers": [
			      {
			        "color": "#023e58"
			      }
			    ]
			  },
			  {
			    "featureType": "poi.park",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#3C7680"
			      }
			    ]
			  },
			  {
			    "featureType": "road",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#304a7d"
			      }
			    ]
			  },
			  {
			    "featureType": "road",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#98a5be"
			      }
			    ]
			  },
			  {
			    "featureType": "road",
			    "elementType": "labels.text.stroke",
			    "stylers": [
			      {
			        "color": "#1d2c4d"
			      }
			    ]
			  },
			  {
			    "featureType": "road.highway",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#2c6675"
			      }
			    ]
			  },
			  {
			    "featureType": "road.highway",
			    "elementType": "geometry.stroke",
			    "stylers": [
			      {
			        "color": "#255763"
			      }
			    ]
			  },
			  {
			    "featureType": "road.highway",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#b0d5ce"
			      }
			    ]
			  },
			  {
			    "featureType": "road.highway",
			    "elementType": "labels.text.stroke",
			    "stylers": [
			      {
			        "color": "#023e58"
			      }
			    ]
			  },
			  {
			    "featureType": "transit",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#98a5be"
			      }
			    ]
			  },
			  {
			    "featureType": "transit",
			    "elementType": "labels.text.stroke",
			    "stylers": [
			      {
			        "color": "#1d2c4d"
			      }
			    ]
			  },
			  {
			    "featureType": "transit.line",
			    "elementType": "geometry.fill",
			    "stylers": [
			      {
			        "color": "#283d6a"
			      }
			    ]
			  },
			  {
			    "featureType": "transit.station",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#3a4762"
			      }
			    ]
			  },
			  {
			    "featureType": "water",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#0e1626"
			      }
			    ]
			  },
			  {
			    "featureType": "water",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#4e6d70"
			      }
			    ]
			  }
			],
            {name: 'Styled Map'});



	  var currentplace = {lat: 30.784745, lng: 104.008718};
	  var mapCanvas = document.getElementById("map");
	  // set up the mobike map
	  m_map = new google.maps.Map(mapCanvas, {
	            zoom: 10,
	            mapTypeControlOptions: {
            		mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain','styled_map']
         		},
	            center: currentplace
	  });

	  m_map.mapTypes.set('styled_map', styledMapType);
      m_map.setMapTypeId('styled_map');
      heatData = new google.maps.MVCArray();  
	  m_heatmap = new google.maps.visualization.HeatmapLayer({
    		data: heatData,
    		radius:25
	   });
	   m_heatmap.setMap(m_map);
       m_heatmap.set('opacity', m_heatmap.get('opacity') ? null : 0.6);
       
       // set up the city bike map40.809440, -73.960222
       var c_currentplace = {lat: 40.809440, lng: -73.960222};
       var c_mapCanvas = document.getElementById("c_map");
       c_map = new google.maps.Map(c_mapCanvas, {
	            zoom: 12,
	            mapTypeControlOptions: {
            		mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain','styled_map']
         		},
	            center: c_currentplace
	  });

	  c_map.mapTypes.set('styled_map', styledMapType);
      c_map.setMapTypeId('styled_map');
      c_heatData = new google.maps.MVCArray();  
	  c_heatmap = new google.maps.visualization.HeatmapLayer({
    		data: c_heatData,
    		radius:25
	   });
	  c_heatmap.setMap(c_map);
      c_heatmap.set('opacity', c_heatmap.get('opacity') ? null : 0.6);
      
       // set up the city bike map222222222222
       
       var c_mapCanvas_2 = document.getElementById("c_map_2");
       c_map_2 = new google.maps.Map(c_mapCanvas_2, {
	            zoom: 12,
	            mapTypeControlOptions: {
            		mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain','styled_map']
         		},
	            center: c_currentplace
	  });

	  c_map_2.mapTypes.set('styled_map', styledMapType);
      c_map_2.setMapTypeId('styled_map');
      c_heatData_2 = new google.maps.MVCArray();  
	  c_heatmap_2 = new google.maps.visualization.HeatmapLayer({
    		data: c_heatData_2,
    		radius:25
	   });
	  c_heatmap_2.setMap(c_map_2);
      c_heatmap_2.set('opacity', c_heatmap_2.get('opacity') ? null : 0.6);
   
	   
      // var location = {lat: 30.784745, lng: 104.008718};
      // generateTweetsMarkers(location);
}





// $(document).ready(function(e) {
var count = 0
function getGeo(){
         // alert(count)
         $.ajax({
            url: '/mapPos',
            data: {num: count},
            type: 'POST',
            success: function(response) {
               // alert(response)
               res = JSON.parse(response);
               // alert(res.length)
               addToHeatDaTA(res);
               setTimeout(cleanMap,3000);
              //  $.each([{ name: "John", lang: "JS" },{ a: "Jn", m: "S" }], function( index, item) {
              //       alert( "Key: " + index+ ", Value: " + float(item["lat"]) );
		            // //     $.each(item, function(index, v) {
		            // //      alert( "Key: " + index + ", Value: " + v );
		            // // });
              //   });
               // addToHeatDaTA(res);
               count += 1;
               // alert(count)

            },
            error: function(error) {
                // alert("fail");
            }
            
        });
        
        return false;
    }


function addToHeatDaTA(res){
	for (i = 0; i<res.length;i++) {
               	    lat = parseFloat(res[i].lat);
               	    lng = parseFloat(res[i].lng);
                    heatData.push(new google.maps.LatLng(lat,lng));    
    }
        
}

function cleanMap() {
    heatData.clear();
}

var refreshId = setInterval(getGeo, 4000);
getGeo();

var in_count = 0
function getIn(){
         // alert(count)
         $.ajax({
            url: '/cityinPos',
            data: {num: in_count},
            type: 'POST',
            success: function(response) {
               // alert(response)
               res = JSON.parse(response);

               // alert(res)
               in_addToHeatDaTA(res);
               // alert("Time:"+ count)
               setTimeout(in_cleanMap,4000);
               in_count += 1

            },
            error: function(error) {
                // alert("fail");
            }
            
        });
        
        return false;
    }


function in_addToHeatDaTA(res){
    for (i = 0; i<res.length;i++) {
        for(j = 0; j<parseInt(res[i].count);j++){
                    lat = parseFloat(res[i].lat);
                    lng = parseFloat(res[i].lng);
                    c_heatData.push(new google.maps.LatLng(lat,lng)); 
        }   
    }
        
}

function in_cleanMap() {
    c_heatData.clear();
}


getIn();
var refreshId_1 = setInterval(getIn, 5000);

var out_count = 0
function getOut(){
         // alert(count)
         $.ajax({
            url: '/cityoutPos',
            data: {num: out_count},
            type: 'POST',
            success: function(response) {
               // alert(response)
               res = JSON.parse(response);

               // alert(res)
               out_addToHeatDaTA(res);
               // alert("Time:"+ count)
               setTimeout(out_cleanMap,4000);
               out_count += 1

            },
            error: function(error) {
                // alert("fail");
            }
            
        });
        
        return false;
    }


function out_addToHeatDaTA(res){
    for (i = 0; i<res.length;i++) {
        for(j = 0; j<parseInt(res[i].count);j++){
                    lat = parseFloat(res[i].lat);
                    lng = parseFloat(res[i].lng);
                    c_heatData_2.push(new google.maps.LatLng(lat,lng)); 
        }   
    }
        
}

function out_cleanMap() {
    c_heatData_2.clear();
}


getIn();
var refreshId_2 = setInterval(getOut, 5000);

// function getStation(){
//          // alert(count)
//          $.ajax({
//             url: '/citystationPos',
//             data: {},
//             type: 'POST',
//             success: function(response) {
//                // alert(response)
//                res = JSON.parse(response);
//                placeMarker(res);
//                // alert(String(res[i].s_id))
               
//             },
//             error: function(error) {
//                 // alert("fail");
//             }
            
//         });
        
//         return false;
//     }

// var test =[{"s_id ": 2, "lat": 40.7587 , "lng": -73.9787,"add":'saddq1'},{"s_id ": 1, "lat": 40.7887 , "lng": -73.0787,"add":'saddq2'}];

// function placeMarker() {
// 	// for (i = 0; i<res.length;i++) {
// 	// 	// s_id = String(res[i].s_id);
// 	//  //    la = parseFloat(res[i].lat);
//  //  //       lo = parseFloat(res[i].lng);
//  //  //       add = String(res[i].add);
//  //        la = res[i].lat;
//  //        lo = res[i].lng;
//  //        location = {lat: la , lng: lo };
//         var location = {lat: 30.784745, lng: 104.008718};
//         alert(location)
// 		var marker = new google.maps.Marker({
// 			position: location,
// 			map: c_map,
// 			title: "hello"
// 		});

// 		var infowindow = new google.maps.InfoWindow({
// 			content: 'station_id'+s_id +'station_add'+add
// 		});

// 		marker.addListener('click', function() {
// 			infowindow.open(c_map, marker);
// 		});

//     // }
// }


function generateTweetsMarkers(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: c_map,
        animation: google.maps.Animation.DROP
    });
    var infowindow = new google.maps.InfoWindow({
        content: 'ee'
    });

    marker.addListener('click', function() {
        infowindow.open(c_map, marker);
    });

    marker.setMap(c_map);
}
// var location = {lat: 30.784745, lng: 104.008718};
// generateTweetsMarkers(location);


// placeMarker();
// getStation();

