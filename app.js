
// setup express framework
var express = require('express');
var path = require('path');
var app = express();

// setup twitter API
var stream = null;
var twitter = require('twitter');
var client = new twitter({
  consumer_key: 'lQh5ZG5viedzgjirgFWuIXD5u',
  consumer_secret: 'aCrEQNdrcT4XICKfGt94XUJv9og9BqI8Joq0QoJpVL1m6zqZde',
  access_token_key: '835162261702524929-81ljXBl157EmLxwudQ35w1Yy4umcwvG',
  access_token_secret: 'ZYNEs4H64m38Mk6p5kecX1cuta1KfQZkx4TuM4h1g2mDP'
});


// setup socket io for real-time communication
var server = require('http').createServer(app);  
var io = require('socket.io')(server);


// setup views
app.use('/static', express.static('node_modules'));
app.use(express.static(__dirname + '/public'));  
app.get('/', function(req,res,next) {  
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(9000);  

// setup Elastic Search
var dateFormat = require('dateformat');
var elasticsearch=require('elasticsearch');
var es_client = new elasticsearch.Client( {  
  hosts: 'https://search-twittermap-fjzwtst72zyuyclysxstpsdfey.us-west-2.es.amazonaws.com'
});



stream = client.stream('statuses/filter',  {'locations':'-180,-90,180,90'});
stream.on('data', function(event) {
	var m_geo = event.coordinates;
	// extract useful informtion from raw data
	if (event.coordinates != null) {
    	m_geo = m_geo['coordinates'];
        var timestamp = new Date();

		var m_data = {
            'user': event.user.screen_name,
            'text': event.text,
            'geo': m_geo,
            'time': timestamp
		};
		//console.log(m_data);

		es_client.index({  
	  		index: 'twittermap',
	  		id: event.id_str,
	  		type: 'tweets',
	  		body: m_data
		},function(err,resp,status) {
	       //console.log(resp);
		});
		socket.emit('query_res_streaming', m_data);
	}
});

// handle stream errors
stream.on('error', function(error) {
	return error;
});



//console.log("received key words:");
// use connection to process and render stream data
io.on('connection', function(socket) {  
 
 	// start streamming once we start the server
    socket.on('start_stream', function(words) {
        var must_arr = [];
        if (words != "All") {
            must_arr = [{
                            "match": {
                                "text": words
                            }
                        }];
        }

  		es_client.search({
		  index: 'twittermap',
		  type: 'tweets',
          size: 30,
		  body: {
            "query": {
                "bool": {
                    "must": must_arr
                }
            },
            "sort": {"time": {"order": "desc"}}
        }

        }, function (error, body) {
        	var res = validateResult(body)
        	if (res != null)
            	socket.emit('query_res_streaming', res);
        });
	   
    });


	socket.on('search_tweets', function(locations) {
        var cur_time = new Date();
        var start_time = new Date(cur_time.getTime() - 60*60*1000);
		var range = 100;
		// search nearby tweets
        es_client.search({
		  index: 'twittermap',
		  type: 'tweets',
          size: 20,
		  body: {
            "query": {
                "bool": {
                    "must": [
                        {
                            "geo_distance": {
                                "geo": {
                                    "lat": locations[0],
                                    "lon": locations[1]
                                },
                                "distance": range.toString() + "km"
                            }
                        },
                        {
                            "range": {
                                "time": {
                                    "gte": start_time,
                                    "lte": cur_time
                                }
                            }
                        }
                    ]
                }
            },
            "sort": {"time": {"order": "desc"}}
        }
        }, function (error, body) {
        	var res = validateResult(body);
        	if (res != null)
            	socket.emit('query_res_search', res);
        });
	});

    // close socket if receive signal
    socket.on('stop', function(stopMsg) {
		// print the server console for debugging
		//console.log("I am inside stop");
		stream = null;
		socket.disconnect(0);
		socket = null;
	});


});

module.exports = app;
