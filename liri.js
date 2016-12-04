// Instructions For HomeWork Assignment
//=============================================================================================================================
// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`

// What Each Command Should Do

// node liri.js my-tweets
// * This will show your last 20 tweets and when they were created at in your terminal/bash window.
// node liri.js spotify-this-song '<song name here>'
// * This will show the following information about the song in your terminal/bash window
//     * Artist(s)
//     * The song's name
//     * A preview link of the song from Spotify
//     * The album that the song is from

// * if no song is provided then your program will default to
//     * "The Sign" by Ace of Base
// node liri.js movie-this '<movie name here>'
// * This will output the following information to your terminal/bash window:

//     * Title of the movie.
//     * Year the movie came out.
//     * IMDB Rating of the movie.
//     * Country where the movie was produced.
//     * Language of the movie.
//     * Plot of the movie.
//     * Actors in the movie.
//     * Rotten Tomatoes Rating.
//     * Rotten Tomatoes URL.

// * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
//     * If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
//     * It's on Netflix!
// node liri.js do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Feel free to change the text in that document to test out the feature for other commands.
// BONUS

// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
// Make sure you append each command you run to the log.txt file.
// Do not overwrite your file each time you run a command.
//=============================================================================================================================

// Global Variables
var spotify = require('spotify');
var Twitter = require('twitter');
var keys = require('./keys.js');
var request = require('request');
var fs = require('fs');

// This is the command value area used at 3rd item of Node array
var command = process.argv[2]; 

	switch (command) {
		case 'spotify-this-song':
		spotifyMeCapn();
		break;

		case 'my-tweets':
		tweetsGalore();
		break;

		case 'movie-this':
		movieBuff();
		break;

		case 'do-what-it-says':
		whatCanIDo();
		break;
	}


// Spotify Function
function spotifyMeCapn() {

	var songSearch = process.argv[3];

	if (songSearch == null) {
		songSearch = 'The Sign by Ace of Base';
	}

	spotify.search({ type: 'track', query: songSearch }, function(err, data) {
    	if (err) {
        	console.log('Error occurred: ' + err);
        	return;
    	}
    	else {
    		var artistName = data.tracks.items[0].artists[0].name;
    		var songName = data.tracks.items[0].name;
    		var previewLink = data.tracks.items[0].preview_url;
    		var albumName = data.tracks.items[0].album.name;

    		console.log('========== Spotify Song Info: ==========');
    		console.log(' ')
    		console.log("Artist name: " + artistName);
    		console.log("Song name: " + songName);
    		console.log("Preview Link: " + previewLink);
    		console.log("Album Name: " + albumName);
    		console.log(' ')
    		console.log('========================================');
    	}
	});   
}

// Twitter Function
function tweetsGalore() {

	var client = new Twitter(keys.twitterKeys);

	var params = {screen_name: 'AsiaEuropeNA'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
 			if (!error) {
   			 	// console.log((tweets[0]));
   			 	for (var i = 0; i <= 20; i++) {
	   			 	console.log('============================================================');
	   			 	console.log('\n'+tweets[i].text);
	   			 	console.log(tweets[i].created_at + '\n');
	   			 	console.log('============================================================');
   				}
   			}
   			else {
   				return console.log('Danger! Danger! Will-Robinson! There is an '+error);
   			}	
		});
}

// OMDB/Movie Function
function movieBuff() {

	var movieName = process.argv[3];

	if (movieName == undefined) {
		movieName = 'Mr. Nobody';
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&tomatoes=true";

		// console.log(queryUrl);

	request(queryUrl, function(error, response, body) {

	  	// If the request is successful
	  	if (!error && response.statusCode === 200) {
	  		var body = JSON.parse(body);
			   	// Parse the body 
			   	console.log('Title: ' + body.Title);
		     	console.log('Year: ' + body.Year);
		      	console.log('Rated: ' + body.Rated);
		     	console.log('IMDB Rating: ' + body.imdbRating);
		      	console.log('Country: ' + body.Country);
		      	console.log('Language: ' + body.Language);
		      	console.log('Plot: ' + body.Plot);
		     	console.log('Actors: ' + body.Actors);
		      	console.log('Rotten Tomatoes Rating: ' + body.tomatoUserRating);
		      	console.log('Rotton Tomatoes URL: ' + body.tomatoURL);
	  	}
	  	else {
	  		console.log('If you haven\'t watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/');
	  		console.log('It\'s on NetFlix!');
	  	}
	});
}

// Do-What-It-Says Function 
function whatCanIDo() {

    fs.readFile('random.txt', 'utf8', function(error, body) {

    	if (error) {

    		return console.log('I cannot do that. There is an '+error);
    	}
    	else {

    		console.log(body);
    		spotifyMeCapn();
    	}
        
    });
}