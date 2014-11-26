"use strict";

var Messageboard = {

  messages: [],
  messageArea: document.querySelector(".messageArea"),
  input: document.querySelector("#textInput"),
  send: document.querySelector("#send"),

  init: function() {
    Messageboard.send.onclick = Messageboard.newMessage;

    // Enter = Post message, Shift+Enter = New line
    Messageboard.input.onkeypress = function(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        Messageboard.newMessage();
      };
    };
  },

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

    var trackMessages = document.createElement("p");
    trackMessages.innerHTML = "Antal meddelanden: " + Messageboard.messages.length;
    Messageboard.messageArea.appendChild(trackMessages);

    // Render each message in array
    for (var i = 0; i < Messageboard.messages.length; i++) {
      Messageboard.renderMessage(i);
    };
  },

  renderMessage: function(messageID) {
    var div = document.createElement("div");
    var text = document.createElement("p");
    var timeText = document.createElement("p");
    var deleteMessageButton = document.createElement("a");
    var deleteMessageImg = document.createElement("img");
    var timeButton = document.createElement("a");
    var timeButtonImg = document.createElement("img");

    div.className = "message";
    div.id = messageID;
    Messageboard.messageArea.appendChild(div);

    text.innerHTML = Messageboard.messages[messageID].getHTMLText();
    div.appendChild(text);

    timeButtonImg.src = "img/circular191.png";
    timeButton.href = "#";
    timeButton.appendChild(timeButtonImg);
    div.appendChild(timeButton);

    deleteMessageImg.src = "img/close33.png";
    deleteMessageButton.href = "#";
    deleteMessageButton.appendChild(deleteMessageImg);
    div.appendChild(deleteMessageButton);

    timeText.innerHTML = Messageboard.messages[messageID].getDate().toLocaleTimeString();
    div.appendChild(timeText);

    timeButton.onclick = Messageboard.timeAlert;
    deleteMessageButton.onclick = Messageboard.removeMessage;
  },

  removeMessage: function() {
    Messageboard.messages.splice(this.parentNode.id, 1);
    Messageboard.renderMessages();
    return false;
  },

  timeAlert: function() {
    var timeString = Messageboard.messages[this.parentNode.id].getDate().toLocaleString('se');
    alert("Inlägget skapdes " + timeString);
  }

};

window.onload = Messageboard.init;



