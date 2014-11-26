"use strict";

var Messageboard = {

  messages: [],

  init: function() {
    Messageboard.send.onclick = Messageboard.newMessage;
  },

  messageArea: document.querySelector(".messageArea"),
  input: document.querySelector("#textInput"),
  send: document.querySelector("#send"),
  numberOfMessages: 0,

  // Create new message object and push to array
  newMessage: function() {
    var mess = new Message(Messageboard.input.value, new Date());
    Messageboard.messages.push(mess);
    Messageboard.renderMessages();
  },

  // Render all messages to page
  renderMessages: function() {
    // Clear message area
    Messageboard.messageArea.innerHTML = "";

    // Render each message in array
    for (var i = 0; i < Messageboard.messages.length; i++) {
      Messageboard.renderMessage(i);
    };
  },

  renderMessage: function(messageID) {
    var div = document.createElement("div");
    var text = document.createElement("p");
    var timeText = document.createElement("p");

    div.className = "message";
    Messageboard.messageArea.appendChild(div);

    text.innerHTML = Messageboard.messages[messageID].getHTMLText();
    div.appendChild(text);

    timeText.innerHTML = Messageboard.messages[messageID].getDate().toLocaleTimeString();
    div.appendChild(timeText);
  }

};

window.onload = Messageboard.init;



