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
  },

  openWindow: function() {
    var $window = $('<div class="window"></div>').appendTo("body");
  }
}



window.onload = app.init();


