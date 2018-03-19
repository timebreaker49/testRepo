title = "";
var albumURI = "";

$('#player').hide();

// var uri = JSON.parse(localStorage.getItem('URI'));
// console.log(uri);

// Get the hash of the url
const hash = window.location.hash
.substring(1)
.split('&')
.reduce(function (initial, item) {
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




var albumSearch = function(title) {
// Make a call using the token
$.ajax({
   url: 'https://api.spotify.com/v1/search?q=' + title + '&type=album&limit=1',
   type: "GET",
   beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + _token );},
   success: function(response) { 
  // // Do something with the returned data
      var data = response;
      
      var albumURI = response.albums.items["0"].uri;
      console.log(albumURI);
      localStorage.setItem('URI', albumURI);
      console.log(localStorage.URI);
      //accesses the album's uri for the web player;

// NEXT STEPS: figure out how to generate a spotify web player (dynamically?) using the uri;        

       var theGoods = response;
}

});

}

$('form').on('submit', function(e) {

    e.preventDefault();

    let title = $('#text').val().trim();
    console.log(title);

    $('#text').val("");

    albumSearch(title);

  var spotifyButton = $('<button>');
  spotifyButton.text('Log into Spotify');
  spotifyButton.addClass('waves-effect waves-dark #e0e0e0 btn grey lighten-2 black-text text-darken-2');
  $('#spotify').append(spotifyButton);

  // localStorage.clear();
  localStorage.setItem('movie', title);
  
});


$('#spotify').on('click', function() {

if (!_token) {
  window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
}
spotifyAuthenticated();
})

//once the user has authenticated, verified by checking for an auth token, hide the button and search for the album
var spotifyAuthenticated = function() {

if (_token) {

  $('#spotify').empty();
  localStorage.setItem('token', _token);
  console.log(_token);
  albumSearch();
  var uri = localStorage.getItem('URI');
  console.log(uri);
  $('iframe').attr('src', 'https://open.spotify.com/embed?uri=' + uri);
  $('#player').show();
  //use this to change the src of the spotify player -- place 
  // spotifyPlayer();
}
}


//To do

//1. need to add logic to search for token. If token exists, hide button
  

  // If there is no token, redirect to Spotify authorization
// SCORETREK Javascript
// >>>>>>> 1ae36e73c849092eb2e8b8d2eb870ea950e6ea38