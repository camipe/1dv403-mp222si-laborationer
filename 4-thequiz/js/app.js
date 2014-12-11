"use strict";

var app = {
  // Variables
  startURL: "http://vhost3.lnu.se:20080/question/1",
  responses: [],
  tries: 0,
  allTries: [],
  endOfGame: false,

  init: function() {
    // Inititing onclick for the the start button
    var startButton = document.getElementById("start");
    startButton.addEventListener("click", app.getQuestion.bind(null, app.startURL));

  },
  // Function that get the next question
  getQuestion: function(url) {
    // Only get question if EndOfGame is false
    if (!app.endOfGame) {

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {

        if (xhr.readyState === 4 && xhr.status === 200) {
          // Save the response and print the page
          app.saveResponse(xhr.responseText, app.responses);
          app.printPage();

        };
      };

      xhr.open('GET', url, true);
      xhr.send();

    }
  },
  // Function to send answer
  sendAnswer: function(answer) {

    var URL = app.responses[app.responses.length - 1].nextURL;
    var JSONAnswer = {"answer" : answer}

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){

      if (xhr.readyState === 4) {
        // Add 1 to current question's counter
        app.tries += 1;

        // if the answer is correct save the response, push counter to array
        // and reset the current counter, then either print result or the next question
        if (xhr.status === 200) {

          app.saveResponse(xhr.responseText, app.responses);
          app.allTries.push(app.tries);
          app.tries = 0;

          if (app.endOfGame) {
            app.printResult();
          } else {

            app.getQuestion(app.responses[app.responses.length - 1].nextURL)

          }
        } else {
          app.printError();
        };
      };
    };

    xhr.open('POST', URL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(JSONAnswer));

  },

  printPage: function() {
    // Variables
    var div = document.querySelector(".quiz");
    var text = document.createElement("p");
    var button = document.createElement("button");
    var input = document.createElement("input");
    var arrItem = app.responses[app.responses.length - 1];
    // Clear the div
    div.innerHTML = "";

    // Extract the question from the last saved server response
    text.innerHTML = app.responses[app.responses.length - 1].question;
    input.id = "textinput";
    button.innerHTML = "Skicka";
    button.id = "sendButton";

    button.addEventListener("click", function() {
      app.sendAnswer(input.value);
    });

    // Append elements to DOM
    div.appendChild(text);
    div.appendChild(input);
    div.appendChild(button);

  },

  printResult: function() {
    // Variables
    var div = document.querySelector(".quiz");
    var text = document.createElement("p");
    var list = document.createElement("ol")

    // Clear div
    div.innerHTML = "";

    text.innerHTML = "Grattis, du har klarat alla frågor. " +
    "Se hur många försök det tog nedan.<br>Fråga:"
    // Loop through all the counters and print them in ordered list
    for (var i = 0; i < app.allTries.length; i+=1) {

      var li = document.createElement("li");
      var textnode = document.createTextNode(app.allTries[i] + " försök.");
      li.appendChild(textnode);
      list.appendChild(li);

    }

    div.appendChild(text);
    div.appendChild(list);

  },
  // Function which tells the user when the answer was wrong
  printError: function() {
    var div = document.querySelector(".quiz");
    var text = document.querySelector("#error") || document.createElement("p");

    text.id = "error"
    text.innerHTML = "Fel, försök igen! (Antal försök: " + app.tries + ")";
    div.appendChild(text);

  },
  // Function which saves the server response
  saveResponse: function(response, targetArr) {
    var responseObj = JSON.parse(response);
    var arr = targetArr;

    if (!responseObj.hasOwnProperty("nextURL")) {
      app.endOfGame = true;
    };

    arr.push(responseObj);

  },

};

window.onload = app.init;

