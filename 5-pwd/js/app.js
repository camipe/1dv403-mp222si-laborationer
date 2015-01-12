"use strict";

// Klick på ikonen
  // Skapa en "window"-div
    // Stängningsknapp i hörnet
      // När knappen klickas på så stängs fönstret
  // Tolka JSON-obj
  // Skapa bildgalleriet från informationen
    // Om det tar tid ska en laddningsanimation visas

var app = {

  images: [],

  init: function() {
    console.log("Fungerar")
    app.openWindow();
    app.getImageInfo();
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

  getImageInfo: function() {
    var $data = $.ajax({
      url: 'http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/',
      type: 'GET',
      success: function() {
        // console.log($data.responseText)
        var imgList = JSON.parse($data.responseText);

        console.log("Success")
        app.displayImages(imgList);

      },
      error: function(e) {
        console.log(e.message);
      }
    })
  },

  displayImages: function(array) {
    var imgInfo;
    var $link;
    var $img;
    var $appDiv = $(".appDiv")

    for (var i = 0; i < array.length; i++) {
      imgInfo = array[i];

      $link = $('<a></a>');
      $link.attr("href", imgInfo.URL);
      $link.addClass("thumbNail");


      $img = $('<img>')
      $img.attr("src", imgInfo.thumbURL);
      $img.attr("width", imgInfo.thumbWidth);
      $img.attr("height", imgInfo.thumbHeight);


      $img.appendTo($link);
      $link.appendTo($appDiv);
    };
  }
};


window.onload = app.init();


