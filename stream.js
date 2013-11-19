var util = require('util'),
twitter = require('twitter'),
keys = require('./keys2.js');
console.log('You are comparing %s and %s', process.argv[2], process.argv[3]);
var input1 = process.argv[2];
var input2 = process.argv[3];
var counter1 = 0;
var counter2 = 0;

var twit = new twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
});

var switchARooney = function(input) {
    twit.stream('filter', {track:input}, function(stream) {
        stream.on('data', function(data) {
            input==input1 ? counter1++ : counter2++;
        });
        setTimeout(moveOn, 500, stream, input);
    });
};

var moveOn = function(stream, input) {
    stream.destroy;
    input==input1 ? input=input2 :input=input1;
    console.log(counter1, counter2);
    switchARooney(input);
};

switchARooney(input1);
