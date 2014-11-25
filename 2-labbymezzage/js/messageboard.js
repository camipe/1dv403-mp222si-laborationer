"use strict";

var wrapper = document.querySelector(".wrapper");
var input = document.querySelector("#textInput");
var send = document.querySelector("#send");

var Messageboard = {

  messages: [],

  init: function() {

  },

  newMessage: function() {
    var mess = new Message(input.value, new Date());
    Messageboard.messages.push(mess);
    // console.log(Messageboard.messages.toString());
  }

};

window.onload = Messageboard.init;

send.onclick = Messageboard.newMessage;

