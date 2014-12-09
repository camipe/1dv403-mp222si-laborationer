"use strict";

var app = {
  init: function() {
    var startButton = document.getElementById("start");
    startButton.addEventListener("click", function() {
      var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        console.log(xhr.responseText);
      };
    };

    xhr.open('GET', 'http://vhost3.lnu.se:20080/question/1', true);
    xhr.send();

    var answer = {"answer" : "2"};
    var xhr2 = new XMLHttpRequest();

    xhr2.onreadystatechange = function(){console.log(xhr2.responseText)};
    xhr2.open('POST', 'http://vhost3.lnu.se:20080/answer/1', true);
    xhr2.setRequestHeader('Content-Type', 'application/json');
    xhr2.send(JSON.stringify(answer));

    })

  }

};

window.onload = app.init;



// En funktion som hämtar första frågan

// En funktion hämtar nästa frågan

// En funktion som skriver ut frågan

