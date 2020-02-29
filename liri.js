require("dotenv").config();
const keys = require("./keys.js")
var Spotify = require('node-spotify-api');
var bit_js = require('bit_js');
var axios = require("axios");

var output = "";
var word = '';
for (let i = 2; i < process.argv.length; i++) {
  word = word + process.argv[i] + ' ';
  console.log(word);
}

var artist = '';
for (let i = 2; i < process.argv.length; i++) {
  artist = artist + process.argv[i];
  console.log(artist);
}
//Spotify API call
// var spotify = new Spotify(keys.spotify);
 
// spotify.search({ type: 'track', query: word }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
 
// console.log(data); 
// });

//Bands in Town call
var queryUrl =
  'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp';
console.log(queryUrl);
//makes call for Bands in town with specific artist
axios.get(queryUrl)
  .then(function(response) {
    // console.log(response);
    console.log(response.data[2].venue.name)
    console.log(response.data[2].venue.country + ", " + response.data[2].venue.city)
    console.log(response.data[2].datetime)
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log('---------------Data---------------');
      console.log(error.response.data);
      console.log('---------------Status---------------');
      console.log(error.response.status);
      console.log('---------------Status---------------');
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });








switch (word) {
    case "movie-this":
        var queryUrl =
        'http://www.omdbapi.com/?t=' + word + '&y=&plot=short&apikey=trilogy';
        // This line is just to help us debug against the actual URL.
        console.log(queryUrl);
        axios
        .get(queryUrl)
        .then(function(response) {
            console.log(response);
            output = response.data.Title + " was released in " + response.data.Year + ".\n"
            console.log("IMDB Rating: " + response.data.Ratings.imdbRating)
            console.log("Rotten Tomatoes Rating: XXXX")
            console.log("Produced in " + response.data.Country)
            console.log("Native Language: " + response.data.Language)
            console.log("Plot of Movie: " + response.data.Plot)
            console.log("Actors: " + response.data.Actors)
            
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('---------------Data---------------');
                console.log(error.response.data);
                console.log('---------------Status---------------');
                console.log(error.response.status);
                console.log('---------------Status---------------');
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
    });
    break;
}
console.log(output)