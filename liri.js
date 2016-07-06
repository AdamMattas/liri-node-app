var request = require('request');
var Twitter = require('twitter');
var keys = require('./keys.js');
var twit = new Twitter(keys.twitterKeys);
var userInput = process.argv[2];

if(userInput == "my-tweets"){
  tweeter();
}

function tweeter(){

  //var params = {screen_name: 'adamfader'};
  twit.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=adamfader&count=20', function(error, tweets, response){
    if(!error){
      for(i = 0; i < tweets.length; i++){
        console.log(tweets[i].user.screen_name + ' said: ' + tweets[i].text);
      }
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