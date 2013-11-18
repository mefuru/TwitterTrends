var keys = require('./keys'),
    request = require('request'); // https://github.com/mikeal/request
var CONSUMER_KEY = keys.CONSUMER_KEY;
var CONSUMER_SECRET = keys.CONSUMER_SECRET;
var BEARER_TOKEN_CREDENTIALS = CONSUMER_KEY + ':' + CONSUMER_SECRET;
var buf = new Buffer(BEARER_TOKEN_CREDENTIALS);
var BASE_64_ENCODED_TOKEN_CREDENTIALS = 'Basic ' + buf.toString('base64'); // conv to base 64


var url = 'https://api.twitter.com/oauth2/token';
var options = {
    headers: {
        'Authorization': BASE_64_ENCODED_TOKEN_CREDENTIALS,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    form: {
        'grant_type': 'client_credentials'
    }
};
request.post(url, options, function (err, res, body) {
    if (err) throw err;
    var bodyObj = JSON.parse(body);
    var key = bodyObj.access_token; // obtain bearer
    console.log(key);
    getLocations(key);
});


// Obtain an array of location objects for which trending data is available
var getLocations = function(key) {
    var options = {
        uri: 'https://api.twitter.com/1.1/trends/available.json',
        headers: {
            Authorization: 'Bearer ' + key,
        },
        json: true // sets body but to JSON representation of value and adds Content-type: application/json header. Additionally, parses the response body as JSON.
    };
    request.get(options, function(err, res, body) {
        var locations = body;
        locations.forEach(function(location, index, arr) {
            console.log(location.name, location.woeid);
            // getTrendsForALocation(key, location.woeid);
        });
        getTrendsForALocation(key, 1);
    });
};

var getTrendsForALocation = function(key, woeid) {
    var options = {
        uri: 'https://api.twitter.com/1.1/trends/place.json',
        headers: {
            Authorization: 'Bearer ' + key,
        },
        json: true,
        qs: {
            id: woeid
        }
    };
    request.get(options, function(err, res, body) {
        var trends = body[0].trends;
        trends.forEach(function(trend, index, arr) {
            console.log(trend.name);
        });

    });
};
