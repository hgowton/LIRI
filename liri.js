require("dotenv").config();
const keys = require("./keys.js")
var Spotify = require('node-spotify-api');
var axios = require("axios");
var fs = require("fs");
var moment = require('moment');

var a = process.argv[2]

var term =  process.argv.slice(3).join(" ");
var divLine = '\n____________'

//Spotify API call
function songs (){

    //if no term is provided do a call for The Sign
    if(!term) {
        term = "The Sign";
    }

    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: term, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        songI = data.tracks.items
        var songInfo = [
            "\nArtists: " + songI[0].artists[0].name,
            "Song Title: " + songI[0].name,
            "Song Preview: " + songI[0].preview_url,
            "Album Title: " + songI[0].album.name
        ].join("\n");
            
            //append information to the log 
            fs.appendFile("log.txt", songInfo, function(err) {
                if (err) throw err;
                console.log(songInfo);
            });
      
    });
}

//Bands in Town call
function bands (){
    if(!term) {
        term = "paul mccartney";
    }
    var queryUrl =
    'https://rest.bandsintown.com/artists/' + term + '/events?app_id=codingbootcamp';
    console.log(queryUrl);

    //makes call for Bands in town with specific artist
    axios.get(queryUrl)
    .then(function(response) {

        for (i = 0; i < response.data.length; i++) {
            var bInfo = response.data[i]
            var time = bInfo.datetime

        var bandInfo = [
            "\nVenue: " + bInfo.venue.name,
            "Location: " + bInfo.venue.country + ", " + bInfo.venue.city,
            "Date: " + bInfo.datetime].join("\n");
            
            //append information to the log 
            fs.appendFile("log.txt", bandInfo, function(err) {
                if (err) throw err;
                console.log(bandInfo);
            });

            console.log(moment(time).format('MMMM Do YYYY h:mm:ss a'))
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
function term () {

    //removes first three indexes and joins all remaining index with space
    var word = process.argv.slice(3).join(" ");

    //if no movie is provided do a call for Mr. Nobody
    if(!term) {
        term = "Mr.Nobody";
    }

    var queryUrl =
    'http://www.omdbapi.com/?t=' + word + '&y=&plot=short&apikey=trilogy';
    
    axios.get(queryUrl)
    .then(function(response) {
        console.log(response);
        infoM = response.data

        var movieInfo = [
            "Title: " + infoM.Title,
            "Year:" + infoM.Year,
            "IMDB Rating: " + infoM.imdbRating,
            "Rotten Tomatoes Rating: " + infoM.Ratings[1].Value,
            "Produced in " + infoM.Country,
            "Native Language: " + infoM.Language,
            "Plot of Movie: " + infoM.Plot,
            "Actors: " + infoM.Actors
        ].join("\n\n");
    
        //append information to the log 
        fs.appendFile("log.txt", movieInfo + divLine, function(err) {
            if (err) throw err;
            console.log(movieInfo);
        });
        
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

function newS () {
    var data = fs.readFileSync("random.txt", "utf8") 
        var dataArr = data.split(",");
        
        // console.log("needs to happen 1st: " + dataArr[1]);
        term = dataArr[1]
    }

if (a == "movie-this") {
    movie();
}else if (a == "concert-this") {
    bands();
}else if (a == "spotify-this-song") {
    songs();
} else if (a == "do-what-it-says") {
    newS();
    songs();
    }




