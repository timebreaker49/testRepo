title = "";
var albumURI = "";

$('#player').hide();

// var uri = JSON.parse(localStorage.getItem('URI'));
// console.log(uri);

$(document).ready(function() {

    if (!_token) {
       
    var spotifyButton = $('<button>');
    spotifyButton.text('Log into Spotify');
    spotifyButton.addClass('waves-effect waves-dark #e0e0e0 btn grey lighten-2 black-text text-darken-2');
    $('#spotify').append(spotifyButton);
        // window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
    }

    spotifyAuthenticated();

})


// Get the hash of the url
const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function(initial, item) {
        if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
window.location.hash = '';

// Set token
let _token = hash.access_token;
localStorage.setItem('token', _token);

const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = '20db032cf5354ecc98d3c6f236ec5b28';
const redirectUri = 'https://timebreaker49.github.io/testRepo/';
const scopes = [
    'user-top-read'
];

var someFunction = function(title){
    console.log('someFunction is running');    

        // let movie = $('#text').val().trim();
        // console.log(movie);
        let queryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";
            $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                console.log(response);        
                var movieDiv = $("<div class='movie'>");
                var rating = response.Rated;
                var pOne = $("<p>").text("Rating: " + rating);
                movieDiv.append(pOne);
                var released = response.Released;
                var pTwo = $("<p>").text("Released: " + released);
                movieDiv.append(pTwo);
                var plot = response.Plot;
                var pThree = $("<p>").text("Plot: " + plot);
                movieDiv.append(pThree);
                var imgURL = response.Poster;
                var image = $("<img>").attr("src", imgURL);
                movieDiv.append(image);
                $("#movies-view").html(movieDiv);           
            });

       };

var albumSearch = function(title) {
    console.log('albumSearch is running')
    // Make a call using the token
     if (token) {
    $.ajax({
        url: 'https://api.spotify.com/v1/search?q=' + title + '&type=album&limit=1',
        type: "GET",
        beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + _token); },
        success: function(response) {
            // // Do something with the returned data
            var data = response;

            var albumURI = response.albums.items["0"].uri;
            console.log(albumURI);
            localStorage.setItem('URI', (albumURI));
           
            $('iframe').attr('src', 'https://open.spotify.com/embed?uri=' + albumURI);
            $('#player').show();
            //accesses the album's uri for the web player;
        }

    });
} else {console.log('nope')}

}


$('form').on('submit', function(e) {

    e.preventDefault();

    let title = $('#text').val().trim();
    console.log(title);

    $('#text').val("");

    someFunction(title);     
    albumSearch(title);

    // localStorage.clear();
    localStorage.setItem('movie', title);

});


$('#spotify').on('click', function() {

    if (!_token) {
        window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
    }
})

//once the user has authenticated, verified by checking for an auth token, hide the button and search for the album
var spotifyAuthenticated = function() {

    if (_token) {

        $('#spotify').empty();
        localStorage.setItem('token', _token);
        console.log(_token);
    }
}

