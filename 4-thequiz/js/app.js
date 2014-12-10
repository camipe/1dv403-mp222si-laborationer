"use strict";

var app = {

  startURL: "http://vhost3.lnu.se:20080/question/1",
  responses: [],
  tries: 0,
  allTries: [],
  endOfGame: false,

  init: function() {
    var startButton = document.getElementById("start");
    startButton.addEventListener("click", app.getQuestion.bind(null, app.startURL));

  },

  getQuestion: function(url) {
    var xhr = new XMLHttpRequest();
    if (!app.endOfGame) {
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          app.saveResponse(xhr.responseText, app.responses);
          app.printPage();
        };
      };
      xhr.open('GET', url, true);
      xhr.send();

    } else {
      app.printPage();
    }
  },

  sendAnswer: function(answer) {
    var xhr = new XMLHttpRequest();
    var URL = app.responses[app.responses.length - 1].nextURL;
    var JSONAnswer = {"answer" : answer}
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4) {
        app.tries += 1;
        if (xhr.status === 200) {
          app.saveResponse(xhr.responseText, app.responses);
          app.allTries.push(app.tries);
          app.tries = 0;
          if (app.endOfGame) {
            app.printResult();
          } else {
            app.getQuestion(app.responses[app.responses.length - 1].nextURL)
            app.printPage();


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
    var div = document.querySelector(".quiz");
    var text = document.createElement("p");
    var button = document.createElement("button");
    var input = document.createElement("input");
    var arrItem = app.responses[app.responses.length - 1];

    div.innerHTML = "";


    text.innerHTML = app.responses[app.responses.length - 1].question;
    input.id = "textinput";
    button.innerHTML = "Skicka";
    button.id = "sendButton";

    button.addEventListener("click", function() {
      app.sendAnswer(input.value);
    });

    div.appendChild(input);
    div.appendChild(button);
    div.appendChild(text);

  },

  printResult: function() {
    var div = document.querySelector(".quiz");
    var text = document.createElement("p");
    var list = document.createElement("ol")

    div.innerHTML = "";

    text.innerHTML = "Grattis, du har klarat alla frågor. Sen hur många försök det tog nedan.<br>" +
    "Fråga:"
    for (var i = 0; i < app.allTries.length; i+=1) {
      var li = document.createElement("li");
      var textnode = document.createTextNode(app.allTries[i] + " försök.");
      li.appendChild(textnode);
      list.appendChild(li);
    }
    div.appendChild(text);
    div.appendChild(list);
  },

  printError: function() {
    var div = document.querySelector(".quiz");
    var text = document.querySelector("#error") || document.createElement("p");

    text.id = "error"
    text.innerHTML = "Fel, försök igen! (Antal försök: " + app.tries + ")";
    div.appendChild(text);

  },

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



// En funktion som hämtar första frågan
  // Variabel som håller koll på start url
  // Hämta första frågan
  // Skriv ut på sidan

// En funktion som skriver ut frågan
  // Ta ut "question" från objektet
  // Skapa HTML-element
  // Lägg till elementen på sidan

// Hämta fråga (URL)
  // Skapa XHR-objekt
  // onreadystatechange, lagra svarsobjektet i array

