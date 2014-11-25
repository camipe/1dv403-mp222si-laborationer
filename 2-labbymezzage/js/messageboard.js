"use strict";

var messageArea = document.querySelector(".messageArea");
var input = document.querySelector("#textInput");
var send = document.querySelector("#send");

var Messageboard = {

  messages: [],

  init: function() {

  },

  // Create new message object and push to array
  newMessage: function() {
    var mess = new Message(input.value, new Date());
    Messageboard.messages.push(mess);
    Messageboard.renderMessages();
  },

  // Render all messages to page
  renderMessages: function() {
    // Clear message area
    messageArea.innerHTML = "";

    // Render each message in array
    for (var i = 0; i < Messageboard.messages.length; i++) {
      Messageboard.renderMessage(i);
    };
  },

  renderMessage: function(messageID) {
    var div = document.createElement("div");
    var text = document.createElement("p");

    div.className = "message";
    messageArea.appendChild(div);

    text.innerHTML = Messageboard.messages[messageID].getHTMLText();
    div.appendChild(text);

  }

};

window.onload = Messageboard.init;

send.onclick = Messageboard.newMessage;

