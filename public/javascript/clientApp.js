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



	  var currentplace = {lat: 40.7587, lng: -73.9787};
	  var mapCanvas = document.getElementById("map");
	  m_map = new google.maps.Map(mapCanvas, {
	            zoom: 4,
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
         
          
}

// user can place marker
function placeMarker(location) {
	var marker = new google.maps.Marker({
		position: location, 
		map: m_map,
		animation: google.maps.Animation.DROP,
	});

	var infowindow = new google.maps.InfoWindow({
		content: "Yihan is a nice girl :]"
	});

	marker.addListener('click', function() {
		infowindow.open(m_map, marker);
	});

	m_map.setCenter(location);
	m_markers.push(marker);
	searchTweets(location);
}


//add markers 
function generateMarkers(location,contains){
      
	  var m_circle = new google.maps.Circle({
	    strokeColor: '#7914d1',
	    strokeOpacity: 0.35,
	    strokeWeight: 2,
	    fillColor: '#7914d1',
	    fillOpacity: 0.1,
	    map: m_map,
	    center: new google.maps.LatLng(location[1],location[0]),
	    radius: 7000
	  });
     
      heatData.push(new google.maps.LatLng(location[1],location[0]));
      m_circles.push(m_circle);
}


// generate markers for searching results
function generateTweetsMarkers(location, contains) {
	var marker = new google.maps.Marker({
        position: new google.maps.LatLng(location[1],location[0]),
        map: m_map,
        animation: google.maps.Animation.DROP
    });
	var infowindow = new google.maps.InfoWindow({
		content: contains
	});

	marker.addListener('click', function() {
		infowindow.open(m_map, marker);
	});

    marker.setMap(m_map);
    m_markers_search.push(marker);

}

function cleanMap(isStop) {
    //m_heatmap.setMap(m_heatmap.getMap() ? null : m_map);
    heatData.clear();

    for (var i = 0; i < m_markers.length; i++) {
        m_markers[i].setMap(null);
    }

 	for (var i = 0; i < m_circles.length; i++) {
        m_circles[i].setMap(null);
    }

    if (isStop == true) {
    	for (var i = 0; i < m_markers_search.length; i++) {
        	m_markers_search[i].setMap(null);
    	}
    	m_markers_search = [];
    }

    m_markers = [];
    m_circles = [];
}



function searchTweets(location) {

	if (socket == null) {
		socket = io.connect('http://twitter-map.hiywbibmdg.us-west-2.elasticbeanstalk.com:1818');
	}

	var loc = [location.lat(), location.lng()];

	socket.emit('search_tweets', loc);
	socket.on('query_res_search', function(tweets) {
        for (var i = 0; i < tweets.length; i++) {
            var tweet = tweets[i];
            
		    var contains = tweet.text;
		    var location = [tweet.geo[0], tweet.geo[1]];
			var elemDiv = document.createElement('div');

			// elemDiv.innerHTML = contains;
			// document.body.appendChild(elemDiv);
		    generateTweetsMarkers(location, contains);
		}
	});	

}


function streamingTweets() {
	cleanMap(false);
	var key = document.getElementById("keyList").value;
    if (socket == null) {
    	socket = io.connect();
    }

	socket.emit('start_stream', key);
	socket.on('query_res_streaming', function(tweets) {
		for (var i = 0; i < tweets.length; i++) {
			var tweet = tweets[i];
		    var contains = tweet.text;
		    var location = [tweet.geo[0], tweet.geo[1]];
			var elemDiv = document.createElement('div');

			// elemDiv.innerHTML = contains;
			// document.body.appendChild(elemDiv);
		    generateMarkers(location,contains);
		}
	
	});

}
function startStream() {
	streamingTweets();
	var intervalID = setInterval(streamingTweets, 3000);
}


function stopStream() {
	cleanMap(true);
	//socket.emit('stop', "shut down");
	socket.disconnect(0);
	socket = null;

}

