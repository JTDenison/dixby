var keys = require('./keys.js');
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var fs = require('fs');

//Give the user options what to select
console.log("Type my-tweets , spotify-this-song , movie-this , or do-what-it-says to get started!");

//process[2] = user options, process[3] = search parameter for spotify or movie.
var arguOne = process.argv[2];
var arguTwo = process.argv[3];


//for loop to take any extra process[] in comand line
//stackin overflowin 
for (i = 4; i < process.argv.length; i++) {
    arguTwo += '+' + process.argv[i];
}


// changed from  if.then to switch 
function userSwitcharoonie() {
    //arguOne for main switch = user input
    switch (arguOne) {

        case 'my-tweets':
            myTweeters();
           // dataLog();
            break;

        case 'spotify-this-song':
            spotifySong();
         //   dataLog();
            break;

        case 'movie-this':
            movieThis();
         //   dataLog();
            break;

        case 'do-what-it-says':
            doWhat();
       //     dataLog();
            break;

    }
};


//twitter 

function myTweeters() {
    console.log("Get Tweeted on!");
    //var to call from  ./keys
    var client = new twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });

    //made var for tweet count and user/screen name
    var params = {
        screen_name: 'joshe_2020',
        count: 20
    };

    //npm twitter
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                var returnedTweets = ('Number: ' + (i + 1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
                console.log("-------------------------");
                console.log(returnedTweets);
                console.log("-------------------------");
            }
        };
    });

}; //end myTweeters;

function spotifySong() {
    console.log('===========================================');
    console.log("What is the gawd awful ringing noise!?...is that MUSIC?");


    var searchTrack;

    // use undefined for default search!
    if (arguTwo === undefined) {
        searchTrack = "The Sign";
    } else {
        searchTrack = arguTwo;
    }
    // spotify search //npm install
    spotify.search({ type: 'track', query: searchTrack }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            //tried searching for release year! Spotify doesn't return this!
            console.log('===========================================');
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Track: " + data.tracks.items[0].name);
            console.log("Preview URL: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log('===========================================');
        }
    });
}; //end spotifySong


//omdb //npm install *request*
function movieThis() {
    console.log('===========================================');
    console.log("Netflix and Chill....?");
    // console.log("Pizza and a fuck?.....WHAT???.....you dont like pizza?")
    var searchMovie;
    // use undefined for default search!
    if (arguTwo === undefined) {
        searchMovie = "Mr. Nobody";
    } else {
        searchMovie = arguTwo;
    };
    // add tomatoes url and json format // request required here
    var movieUrl = 'http://www.omdbapi.com/?t=' + searchMovie + '&y=&plot=long&tomatoes=true&r=json';
    request(movieUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            

            var movieData = JSON.parse(body)

            console.log('================ Movie Info ================');
            console.log('Title: ' + movieData.Title);
            console.log('Year: ' + movieData.Year);
            console.log('IMDB Rating: ' + movieData.imdbRating);
            console.log('Country: ' + movieData.Country);
            console.log('Language: ' + movieData.Language);
            console.log('Plot: ' + movieData.Plot);
            console.log('Actors: ' + movieData.Actors);
            console.log('Rotten Tomatoes Rating: ' + movieData.tomatoRating);       //notworkings
            console.log('Rotten Tomatoes URL: ' + movieData.tomatoURL);
            console.log('===========================================');
        }
    });
};

//end movieThis()

function doWhat() {
    console.log("I do what I want!!!! ");
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            console.log(error);
        } else {

            //split data, using ' , ' method // add  dataArr vars
            var dataArr = data.split(',');
            arguOne = dataArr[0];
            arguTwo = dataArr[1];

            userSwitcharoonie();

        };

    });

};

userSwitcharoonie();

// Shit that doesnt work below....again

// BONUS

  function dataLog() {
    fs.appendFile("./log.txt", ", " + arguTwo)};