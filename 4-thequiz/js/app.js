"use strict";

var app = {

  startURL: "http://vhost3.lnu.se:20080/question/1",
  questions: [],
  answers: [],

  init: function() {
    var startButton = document.getElementById("start");
    startButton.addEventListener("click", app.getQuestion.bind(null, app.startURL));

    var answer = {"answer" : "2"};
    app.sendAnswer(answer);

    //app.printPage()

  },

  getQuestion: function(url) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        app.saveResponse(xhr.responseText, app.questions);
      };
    };
    xhr.open('GET', url, true);
    xhr.send();
  },

  sendAnswer: function(answer) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4) {
        console.log(xhr.responseText);
      };
    };

    xhr.open('POST', 'http://vhost3.lnu.se:20080/answer/1', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(answer));
  },

  printPage: function() {
    var div = document.querySelector(".quiz");
    var text = document.createElement("p");
    var button = document.createElement("button");

    div.innerHTML = "";

    text.innerHTML = "hej";
    button.innerHTML = "Skicka"
    button.id = "send";

    div.appendChild(text);
    div.appendChild(button);

  },

  saveResponse: function(response, targetArr) {
    var responseObj = JSON.parse(response);
    var arr = targetArr;
    console.log(arr);
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

