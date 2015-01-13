"use strict";

// Kvar att göra:
  // Snygga till menubar med ikon
    // Byt ut texten i a-taggen mot en bild
  // Snygga till topbaren ikoner för stäng och innan h-tagg
  // Lägg till en footer i window
    // Skapa en loading bar som kan visas i footern
  // Snygga till bildgalleriet



var app = {

  imageHeight: 0,
  imageWidth: 0,
  isWindowOpen: false,

  init: function() {

    $( "#imgviewer" ).on("click", function (e){
      e.preventDefault()
      if (app.isWindowOpen === false) {
        app.openWindow();
        app.isWindowOpen = true;
      };

    });
  },

  openWindow: function() {
    var $window = $('<div class="window"></div>');
    var $header = $('<header class="topbar"></header>');
    var $appDiv = $('<div class="appDiv"></div>');
    var $closeButton = $('<a href="#" class="close-button">X</a>');
    var $footer = $('<div class="footer"></div>');

    $('<h2>ImageViewer</h2>').appendTo($header);
    $closeButton.appendTo($header);

    $('<img src="img/ajax-loader.gif" class="loading">'). appendTo($footer);
    $('<span class="loading">Loading<span>').appendTo($footer);

    $header.appendTo($window);
    $appDiv.appendTo($window);
    $footer.appendTo($window);

    $window.appendTo("#desktop");

    app.getImageInfo();

    $closeButton.click(function() {
      $window.remove();
      app.isWindowOpen = false;
    })
  },

  closeWindow: function() {},

  getImageInfo: function() {
    var $data = $.ajax({
      url: 'http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/',
      type: 'GET',
      beforeSend: function(){
       $('.loading').show();
      },
      success: function() {
        $('.loading').hide();
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


      $img = $('<img>');
      $img.attr("src", imgInfo.thumbURL);
      $img.attr("width", imgInfo.thumbWidth);
      $img.attr("height", imgInfo.thumbHeight);

      $link.click(function(e) {
        var that = $(this);
        e.preventDefault();
        app.changeBackground(that);
      });

      $img.appendTo($link);
      $link.appendTo($appDiv);

      $(".thumbnail").css("height", (app.imageHeight + 4))
      $(".thumbnail").css("width", (app.imageWidth + 4))
    };
  },

  changeBackground: function(obj) {
    var imgURL = obj.attr("href");
    $("body").css("background", "url(" + imgURL + ")");
  }
};


window.onload = app.init();


