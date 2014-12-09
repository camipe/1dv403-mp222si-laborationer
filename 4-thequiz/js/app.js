"use strict";

var app = {

  startURL: "http://vhost3.lnu.se:20080/question/1",

  init: function() {
    var startButton = document.getElementById("start");
    startButton.addEventListener("click", app.getQuestion.bind(null, app.startURL));

    var answer = {"answer" : "2"};

  },

  getQuestion: function(url) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        console.log(xhr.responseText);
      };
    };
    xhr.open('GET', url, true);
    xhr.send();
  },

  sendAnswer: function() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4) {
        console.log(xhr.responseText);
      };
    };

    xhr2.open('POST', 'http://vhost3.lnu.se:20080/answer/1', true);
    xhr2.setRequestHeader('Content-Type', 'application/json');
    xhr2.send(JSON.stringify(answer));
  }

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

