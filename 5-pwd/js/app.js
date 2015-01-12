"use strict";

// Klick på ikonen
  // Skapa en "window"-div
    // Stängningsknapp i hörnet
      // När knappen klickas på så stängs fönstret
  // Tolka JSON-obj
  // Skapa bildgalleriet från informationen
    // Om det tar tid ska en laddningsanimation visas

var app = {

  init: function() {
    console.log("Fungerar")
    app.openWindow();
    app.getImages();
  },

  openWindow: function() {
    var $window = $('<div class="window"></div>');
    var $header = $('<header class="topbar"></header>');
    var $appDiv = $('<div class="appDiv"></div>');

    $('<h2>ImageViewer</h2>').appendTo($header);
    $('<a href="#" class="close-button">X</a>').appendTo($header);

    $header.appendTo($window);
    $appDiv.appendTo($window);

    $window.appendTo("#desktop");
  },

  getImages: function() {
    var $data = $.ajax({
      url: 'http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/',
      type: 'GET',
      success: function() {
        //called when successful
        console.log("Success")
        console.log($data.responseText)
      },
      error: function(e) {
        console.log(e.message);
      }
    })


  }
};


window.onload = app.init();


