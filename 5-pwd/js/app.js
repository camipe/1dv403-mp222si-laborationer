"use strict";

// Klick på ikonen
  // Skapa en "window"-div
    // Stängningsknapp i hörnet
      // När knappen klickas på så stängs fönstret
  // Tolka JSON-obj
  // Skapa bildgalleriet från informationen
    // Om det tar tid ska en laddningsanimation visas

var app = {

  imageHeight: 0,
  imageWidth: 0,

  init: function() {

    $( "#imgviewer" ).on("click", function (e){
      e.preventDefault()
      app.openWindow();
    });
  },

  openWindow: function() {
    var $window = $('<div class="window"></div>');
    var $header = $('<header class="topbar"></header>');
    var $appDiv = $('<div class="appDiv"></div>');
    var $closeButton = $('<a href="#" class="close-button">X</a>');

    $('<h2>ImageViewer</h2>').appendTo($header);
    $closeButton.appendTo($header);

    $header.appendTo($window);
    $appDiv.appendTo($window);

    $window.appendTo("#desktop");

    app.getImageInfo();

    $closeButton.click(function() {
      $window.remove();
    })
  },

  closeWindow: function() {},

  getImageInfo: function() {
    var $data = $.ajax({
      url: 'http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/',
      type: 'GET',
      success: function() {
        // console.log($data.responseText)
        var imgList = JSON.parse($data.responseText);

        app.getImgRes(imgList);
        app.displayImages(imgList);

      },
      error: function(e) {
        console.log(e.message);
      }
    })
  },

  getImgRes: function(array) {

    for (var i = 0; i < array.length; i++) {
      if (app.imageHeight < array[i].thumbHeight) {
        app.imageHeight = array[i].thumbHeight;
      };
      if (app.imageWidth < array[i].thumbWidth) {
        app.imageWidth = array[i].thumbWidth;
      };
    };
  },

  displayImages: function(array) {
    var imgInfo;
    var $link;
    var $img;
    var $appDiv = $(".appDiv");

    for (var i = 0; i < array.length; i++) {
      imgInfo = array[i];

      $link = $('<a></a>');
      $link.attr("href", imgInfo.URL);
      $link.addClass("thumbnail");


      $img = $('<img>')
      $img.attr("src", imgInfo.thumbURL);
      $img.attr("width", imgInfo.thumbWidth);
      $img.attr("height", imgInfo.thumbHeight);


      $img.appendTo($link);
      $link.appendTo($appDiv);

      $(".thumbnail").css("height", (app.imageHeight + 4))
      $(".thumbnail").css("width", (app.imageWidth + 4))
    };
  }
};


window.onload = app.init();


