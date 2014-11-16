"use strict";

var Messageboard = {

  messages: [],

  init: function() {
    var mess = new Message("Hejhejhej hoho", new Date());
  }

};

window.onload = Messageboard.init;

