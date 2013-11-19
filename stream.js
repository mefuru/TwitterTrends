var util = require('util'),
twitter = require('twitter'),
keys = require('./keys2.js');
var twit = new twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
});

twit.stream('filter', {track:'NYC'}, function(stream) {
    stream.on('data', function(data) {
        console.log(util.inspect(data));
    });
    // Disconnect stream after five seconds
    setTimeout(stream.destroy, 10000);
});


