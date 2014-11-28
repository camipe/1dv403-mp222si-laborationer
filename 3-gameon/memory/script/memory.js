"use strict";

var Memory = {

  gameRows: 3,
  gameCols: 3,

  brickOrder: [],

  init: function() {
    Memory.brickOrder = RandomGenerator.getPictureArray(Memory.gameRows, Memory.gameCols);
    console.log(Memory.brickOrder.length);
    Memory.generateBoard(Memory.brickOrder);
  },

  // Info - https://developer.mozilla.org/en-US/docs/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
  generateBoard: function(array) {
    var board = document.getElementById("board");

    var table = document.createElement("table");

    for (var i = 0; i < Memory.gameRows; i += 1) {
    // creates a table row
      var row = document.createElement("tr");

      for (var j = 0; j < Memory.gameCols; j += 1) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td");
        var cellText = document.createTextNode("cell in row "+i+", column "+j);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }

      table.appendChild(row);
    }

    board.appendChild(table);


  }
};

window.onload = Memory.init;
