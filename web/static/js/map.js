var m_map = null;
var m_heatmap = null;
var m_markers = [];
var m_markers_search = [];
var m_circles = [];
var socket = null;
var heatData = null;

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


	  // var currentplace = {lat: 40.7587, lng: -73.9787};
	  var currentplace = {lat: 30.784745, lng: 104.008718};
	  var mapCanvas = document.getElementById("map");
	  m_map = new google.maps.Map(mapCanvas, {
	            zoom: 5,
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

       google.maps.event.addListener(m_map, 'click', function(event) {
    		placeMarker(event.latLng);
  	   });

  	    heatData.push(new google.maps.LatLng(30.78411,104.018283)); 
		heatData.push(new google.maps.LatLng(30.784127, 103.983204)); 
		heatData.push(new google.maps.LatLng(30.782719, 103.988234)); 
		heatData.push(new google.maps.LatLng(30.779854, 103.984445)); 
		heatData.push(new google.maps.LatLng(30.779862, 103.984397)); 
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
               alert(response)
               res = JSON.parse(response);
               addToHeatDaTA(res);
               
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
	    alert(index)
	
        $.each(res, function(index, item) {
        	var lat = item["lat"+''];
        	alert(lat);
        	var lng = item["lng"+''];
        	alert("lng"+lat)
            heatData.push(new google.maps.LatLng(lat,104.018283)); 
            
        });       
}

getGeo();

// });
