var LIBRARY = [
  {title: 'C Major Scale', notes: 'A B C D E F G' },
  {title: 'Chromatic Scale', notes: 'A A# B C C# D D# E F F# G G#' },
  {title: 'Random Song', notes: 'A B*2 C D A*4 D E*2 F A B A A*2' },
  {title: 'Adup Licate', notes: 'A B*2 C D A*4 D E*2 F A B A A*2' },
  {title: 'Yankee Doodle', notes: 'C F*4 C F*4 B C D A*2 B*2 A B*2 C' },
  {title: 'Descending Notes', notes: 'G F E D C B A G F E D C B A' }
];

var BPM = 600;

// Add a song with the given title and notes to the library.
var addSongToLibrary = function(title, notes) {
  $('#library-list').append("<li>" +
                                "<i class='fa fa-bars'></i>" +
                                "<i class='fa fa-trash'></i>" +
                                "<span class='title'>" + title + "</span>" +
                                "<div class='notes'>" + notes + "</div>" +
                              "</li>");
  $('#library-list .notes').hide();
};
var addSongToPlaylist = function(title, notes) {
  $('#playlist-list').append("<li>" +
                                "<i class='fa fa-bars'></i>" +
                                "<i class='fa fa-trash'></i>" +
                                "<span class='title'>" + title + "</span>" +
                                "<div class='notes'>" + notes + "</div>" +
                              "</li>");
};


// Add all LIBRARY songs to the library.
var initializeLibrary = function() {
  for(var i=0; i < LIBRARY.length; i+=1) {
    addSongToLibrary(LIBRARY[i].title, LIBRARY[i].notes);
    // Fade in the message over 0.8s.
    $('#message').fadeIn(800);
    setTimeout(function(){
      // Fade out the message after 5s over 0.3s.
      $('#message').fadeOut(800);
    }, 5000);
  }
};


// Play all songs in the playlist.
var playAll = function() {
//
//   // Grab the top song in the queue, parse its notes and play them.
//   // Then recurse until there are no more songs left in the queue.
//   //
  var playNext = function() {
    var songItem = $('#playlist-list li:first-child');
    if (songItem.length == 0) {
    // No more songs.
    // Re-enable the play button.
    $('#play-button').attr('disabled', false).text('Play All');
    $('#library-list li').map(function(){
      if ($(this).is(":hidden")) {
          $(this).remove();
        }
      });
    // Fade out the message.
    $('#message').fadeOut();
    return;
    }

    var title = songItem.find('.title').text();
    var notes = songItem.find('.notes').text();
    var song = parseSong(notes);
    $('#message').html("Now playing: <strong>" + title + "</strong>").show();

    playSong(song, BPM, function() {
      songItem.remove();
      $('#library-list').append(songItem);
      playNext();
    });
};
     // Disable the play button to start.
      $('#play-button').attr('disabled', true).text('Playing');
      $("#library-list .fa-trash").click(function (){
          $(this).parent().slideUp(500);
         });
      playNext();
}


$(document).ready(function() {
    // Initialize the library with some songs.
    initializeLibrary();
    $("#library-list .notes").click(function(){
        var note=$(this).text();
        var name=$(this).prev().text();
        //console.log(name,note);
        addSongToPlaylist(name,note);
      });
      //use click add playlis
      $("#library-list .fa-bars" ).dblclick(function() {
        $(this).next().next().next().slideDown(300);
      });
      // Play all songs in the playlist when the "play" button is clicked.
      $('#play-button').on('click', playAll);

      // Add Your Code Here.
      // Sortable
     $("#library-list,#playlist-list").sortable({
       connectWith: "#library-list,#playlist-list"
     });

     $("#library-list").delegate("li", "dblclick", function(){
         $(".notes").slideDown();
     });

     $('input').keyup(function(event){
       if (event.which==13){
      var a = $('input').val();a
      // console.log($('span:contains(a)').val());
      $("span:contains('" + a + "')").css("color","pink");
      setTimeout(function(){
          $("span:contains('" + a + "')").css("color","#999");
      },1000);
      setTimeout(function(){
         $("span:contains('" + a + "')").css("color","pink");
      },1000);
      setTimeout(function(){
          $("span:contains('" + a + "')").css("color","#999");
      },1000);
      }
    });
      $("#playlist-list .fa-trash").click(function (){
      $(this).parent().slideUp(500);
      });
  });
