require("dotenv").config();
const keys = require("./keys.js")
var Spotify = require('node-spotify-api');
var axios = require("axios");

var a = process.argv[2]
var b = process.argv[3]
// console.log(a)
// console.log(b)

var song = '';
for (let i = 3; i < process.argv.length; i++) {
  song = song + process.argv[i] + ' ';
  console.log(song);
}

var word = '';
for (let i = 3; i < process.argv.length; i++) {
  word = word + process.argv[i] + ' ';
//   console.log(word);
}

var artist = '';
for (let i = 3; i < process.argv.length; i++) {
  artist = artist + process.argv[i];
//   console.log(artist);
}

//Spotify API call
function songs (){

    var spotify = new Spotify(keys.spotify);
    
    spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        songI = data.tracks.items
        console.log(songI); 
        console.log("Artists: " + songI[0].artists[0])
        console.log("Song Title: " + songI[0].name)
        console.log("Song Preview: " + songI[0].preview_url)
        console.log("Album Title: " + songI[0].album.name)
        console.log("ARtists: " + songI[0].album.artists[0])
        
    });
}

//Bands in Town call
function bands (){
    var queryUrl =
    'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp';
    console.log(queryUrl);
    //makes call for Bands in town with specific artist
    axios.get(queryUrl)
    .then(function(response) {
        // console.log(response);
        for (i = 0; i < response.data.length; i++) {
            console.log(response.data[i].venue.name)
            console.log(response.data[i].venue.country + ", " + response.data[i].venue.city)
            console.log(response.data[i].datetime)
        }
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
}

//OMBI call
function movie () {
    var queryUrl =
    'http://www.omdbapi.com/?t=' + word + '&y=&plot=short&apikey=trilogy';
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);
    axios
    .get(queryUrl)
    .then(function(response) {
        console.log(response);
        infoM = response.data
        output = infoM.Title + " was released in " + infoM.Year + ".\n"
        console.log("IMDB Rating: " + infoM.imdbRating)
        console.log("Rotten Tomatoes Rating: XXXX" + infoM.Ratings)
        console.log("Produced in " + infoM.Country)
        console.log("Native Language: " + infoM.Language)
        console.log("Plot of Movie: " + infoM.Plot)
        console.log("Actors: " + infoM.Actors)
        
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
}

if (a == "movie-this") {
    movie();
}else if (a == "concert-this") {
    bands();
}else if (a == "spotify-this-song") {
    songs();
}


