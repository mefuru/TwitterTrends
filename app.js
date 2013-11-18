var request = require('request'); // https://github.com/mikeal/request
var CONSUMER_KEY = 
var CONSUMER_SECRET = 
var BEARER_TOKEN_CREDENTIALS = CONSUMER_KEY + ':' + CONSUMER_SECRET;
var buf = new Buffer(BEARER_TOKEN_CREDENTIALS);
var BASE_64_ENCODED_TOKEN_CREDENTIALS = 'Basic ' + buf.toString('base64'); // conv to base 64

// params reqd for post req
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
    var bodyObj = JSON.parse(body);
    var key = bodyObj.access_token; // obtain bearer
    var searchURL = 'https://api.twitter.com/1.1/search/tweets.json';
    var options = { // options for search get request
        uri: searchURL,
        headers: {
            Authorization: 'Bearer ' + key,
        },
        qs : {
            q: 'HackerSchool'    
        }
    };
    request.get(options, function(err, res, body) {
        console.log(JSON.parse(body));
    });
})




