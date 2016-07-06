var request = require('request');
var Twitter = require('twitter');
//var keys = require('./keys.js');

var client = new Twitter({
  consumer_key: '9nC0QzSjyQPzNLBgvuk8Sw3UG',
  consumer_secret: '5aiI6ByDplSrzpr4d9L3J7zb9WVtGjTfEJyi4LMk2yJphaeoeD',
  access_token_key: '2765922531-d8ojfBl1aqvufYKZSPR95TV3ivzKm0fShxA7Hgv',
  access_token_secret: 'SFlA6b85t5IlAl6GHpwJatmrvGjjv7fGMcNqsWuH5sMzh'
});

var userInput = process.argv[2];

if(userInput == "my-tweets"){
  tweeter();
}

function tweeter(){

  //var params = {screen_name: 'adamfader'};
  client.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=adamfader&count=3', function(error, tweets, response){
    if (!error) {
      console.log(tweets);
    }else{
      console.log(error);
    }
  });
  /**
 * Stream statuses filtered by keyword
 * number of tweets per second depends on topic popularity
 **/
  // client.stream('statuses/filter', {track: 'adamfader'},  function(stream) {
  //   stream.on('data', function(tweet) {
  //     console.log(tweet.text);
  //   });

  //   stream.on('error', function(error) {
  //     console.log(error);
  //   });
  // });
}