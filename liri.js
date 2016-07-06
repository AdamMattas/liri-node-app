var request = require('request');
var Twitter = require('twitter');
var keys = require('./keys.js');
var twit = new Twitter(keys.twitterKeys);
var spotify = require('spotify');
var userInput1 = process.argv[2];
var userInput2 = process.argv[3];

if(userInput1 == 'my-tweets'){
  tweeter();
}else if(userInput1 == 'spotify-this-song'){
  spotty();
}

function tweeter(){

  twit.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=adamfader&count=20', function(error, tweets, response){
    if(!error){
      for(i = 0; i < tweets.length; i++){
        console.log(tweets[i].user.screen_name + ' said: ' + tweets[i].text);
      }
    }else{
      console.log(error);
    }
  });

}

function spotty(){

  spotify.search({ type: 'track', query: userInput2 }, function(err, data) {
    if (err){
      console.log('Error occurred: ' + err);
      return;
    }
    console.log(data.tracks.items[0].artists[0].name);
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].album.name);
    console.log(data.tracks.items[0].preview_url); 
  });

}