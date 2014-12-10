"use strict";

var app = {

  startURL: "http://vhost3.lnu.se:20080/question/1",
  questions: [],
  answers: [],
  responses: [],
  tries: 0,
  endOfGame: false,

  init: function() {
    var startButton = document.getElementById("start");
    startButton.addEventListener("click", app.getQuestion.bind(null, app.startURL));

    // var answer = {"answer" : "2"};
    // app.sendAnswer(answer);



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
          app.getQuestion(app.responses[app.responses.length - 1].nextURL)
          app.printPage();
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

    if (app.endOfGame === true) {
      text.innerHTML = "Grattis du klarade det på " + app.tries + " försök!"
    } else {
      console.log(app.responses[app.responses.length - 1])
      text.innerHTML = app.responses[app.responses.length - 1].question;
      input.id = "textinput";
      button.innerHTML = "Skicka";
      button.id = "sendButton";

      button.addEventListener("click", function() {
        app.sendAnswer(input.value);
      });
      div.appendChild(input);
      div.appendChild(button);
    }
    div.appendChild(text);

  },

  printResult: function() {

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

