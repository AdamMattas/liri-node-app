var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var keys = require('./keys.js');
var twit = new Twitter(keys.twitterKeys);
var spotify = require('spotify');
var userInput1 = process.argv[2];
var userInput2 = process.argv[3];
var logArray = [];
var inputArray = [];

if(userInput1 == 'my-tweets'){
  tweeter();
}else if(userInput1 == 'spotify-this-song'){
  if(userInput2 == undefined){
    userInput2 = "what's my age again";  
  }
  spotty();
}else if(userInput1 == 'movie-this'){
  if(userInput2 == undefined){
    userInput2 = "mr nobody";  
  }
  movie();  
}else if(userInput1 == 'do-what-it-says'){
  randCommand();  
}

function appendCommand(){

  fs.appendFile('log.txt', "Command:\r\n" + userInput1 + " " + userInput2 + "\r\n", 'utf8', function(err){
    
    // If an error was experienced we say it.
    if(err){
      console.log(err);
    }

    // If no error is experienced, we'll log the phrase "Content Added" to our node console. 
    else {
      console.log("Content Added!");
    }

  })

}

function appendNoCommand(){

  fs.appendFile('log.txt', "Command:\r\n" + userInput1 + userInput2 + "\r\n", 'utf8', function(err){
    
    // If an error was experienced we say it.
    if(err){
      console.log(err);
    }

    // If no error is experienced, we'll log the phrase "Content Added" to our node console. 
    else {
      console.log("Content Added!");
    }

  })

}

function appendResponse(){

  var cleanArray = logArray.toString().replace(/,/g, "");

  fs.appendFile('log.txt', "Response:\r\n" + cleanArray + "\r\n", 'utf8', function(err) {
    
    // If an error was experienced we say it.
    if(err){
      console.log(err);
    }

    // If no error is experienced, we'll log the phrase "Content Added" to our node console. 
    else {
      console.log("Content Added!");
    }

  })

}

function tweeter(){

  twit.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=adamfader&count=20', function(error, tweets, response){
    if(!error){
      appendCommand();
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
    logArray.push(data.tracks.items[0].artists[0].name + "\r\n");
    logArray.push(data.tracks.items[0].name + "\r\n");
    logArray.push(data.tracks.items[0].album.name + "\r\n");
    logArray.push(data.tracks.items[0].preview_url + "\r\n");
    console.log(logArray);
    appendCommand();
    appendResponse();
  });

}

function movie(){

  // Then run a request to the OMDB API with the movie specified
  request('http://www.omdbapi.com/?t=' + userInput2 + '&tomatoes=true&y=&plot=short&r=json', function (error, response, body) {
    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode == 200) {
      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it). 
      console.log("Title: " + JSON.parse(body)["Title"]);
      console.log("Year: " + JSON.parse(body)["Year"]);
      console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"])
      console.log("Country: " + JSON.parse(body)["Country"])
      console.log("Plot: " + JSON.parse(body)["Plot"])
      console.log("Actors: " + JSON.parse(body)["Actors"])
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"])
      console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"])
      logArray.push("Title: " + JSON.parse(body)["Title"] + "\r\n");
      logArray.push("Year: " + JSON.parse(body)["Year"] + "\r\n");
      logArray.push("IMDB Rating: " + JSON.parse(body)["imdbRating"] + "\r\n");
      logArray.push("Country: " + JSON.parse(body)["Country"] + "\r\n");
      logArray.push("Plot: " + JSON.parse(body)["Plot"] + "\r\n");
      logArray.push("Actors: " + JSON.parse(body)["Actors"] + "\r\n");
      logArray.push("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"] + "\r\n");
      logArray.push("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"] + "\r\n");

      appendCommand();
      appendResponse();
    }
  });

}

function randCommand(){
  // This block of code will read from the "movies.txt" file.
  // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
  // The code will store the contents of the reading inside the variable "data" 
  fs.readFile("random.txt", "utf8", function(error, data) {

      // We will then print the contents of data
      console.log(data);

      // Then split it by commas (to make it more readable)
      var dataArr = data.split(',');

      // We will then re-display the content with the split for aesthetics.
      //console.log(dataArr);
      //inputArray.push(dataArr[0]);
      //inputArray.push(dataArr[1]);
      userInput1 = dataArr[0];
      userInput2 = dataArr[1];
      // console.log(userInput1);
      // console.log(userInput2);
      //appendNoCommand();
      if(userInput1 == 'spotify-this-song'){
        spotty();
      }else if(userInput1 == 'movie-this'){
        movie();  
      }
      
  });
}