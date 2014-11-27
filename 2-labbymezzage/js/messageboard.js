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
    if (Messageboard.input.value === "" || /^\s+$/.test(Messageboard.input.value)) {
      throw new Error("Textsträngen är inte giltig.")
    };
    var mess = new Message(Messageboard.input.value, new Date());
    Messageboard.messages.push(mess);
    Messageboard.renderMessages();
  },

  // Render all messages to page
  renderMessages: function() {
    // Clear message area
    Messageboard.messageArea.innerHTML = "";

    var trackMessages = document.createElement("p");
    trackMessages.id = "tracker"
    trackMessages.innerHTML = "Antal meddelanden: " + Messageboard.messages.length;
    Messageboard.messageArea.appendChild(trackMessages);

    // Render each message in array
    for (var i = 0; i < Messageboard.messages.length; i++) {
      Messageboard.renderMessage(i);
    };
  },

  // Render single message
  renderMessage: function(messageID) {
    var div = document.createElement("div");
    var text = document.createElement("p");
    var timeText = document.createElement("p");
    var deleteMessageButton = document.createElement("a");
    var deleteMessageImg = document.createElement("img");
    var timeButton = document.createElement("a");
    var timeButtonImg = document.createElement("img");

    // Create div to hold message
    div.className = "message";
    div.id = messageID;
    Messageboard.messageArea.appendChild(div);
    // Insert text from input field to div
    text.innerHTML = Messageboard.messages[messageID].getHTMLText();
    div.appendChild(text);

    // Insert button for time alert
    timeButtonImg.src = "img/circular191.png";
    timeButton.href = "#";
    timeButton.appendChild(timeButtonImg);
    div.appendChild(timeButton);

    // Insert button deleting messages
    deleteMessageImg.src = "img/close33.png";
    deleteMessageButton.href = "#";
    deleteMessageButton.appendChild(deleteMessageImg);
    div.appendChild(deleteMessageButton);

    // Insert timestamp
    timeText.innerHTML = Messageboard.messages[messageID].getDate().toLocaleTimeString();
    timeText.className = "timetext"
    div.appendChild(timeText);

    // Set onclick behaviour for buttons
    timeButton.onclick = Messageboard.timeAlert;
    deleteMessageButton.onclick = Messageboard.removeMessage;
  },

  // Function to remove messages
  removeMessage: function() {
    if (window.confirm("Är du säker på att du vill ta bort meddelandet?")) {
      Messageboard.messages.splice(this.parentNode.id, 1);
      Messageboard.renderMessages();
    };

    return false;
  },

  // Function to show an alert with the message creation time
  timeAlert: function() {
    var timeString = Messageboard.messages[this.parentNode.id].getDate().toLocaleString('se');
    alert("Inlägget skapdes " + timeString);
  }

};

window.onload = Messageboard.init;



