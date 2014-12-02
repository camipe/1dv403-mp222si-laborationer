"use strict";

var Memory = {

  gameRows: 2,
  gameCols: 2,

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

    var brickCounter = 0;

    for (var i = 0; i < Memory.gameRows; i += 1) {
    // creates a table row
      var row = document.createElement("tr");

      for (var j = 0; j < Memory.gameCols; j += 1) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td");
        var brick = document.createElement("a");
        var brickImg = document.createElement("img");

        brickImg.src = "pics/0.png";
        brick.href = "#";
        brick.id = brickCounter;
        brick.appendChild(brickImg);
        cell.appendChild(brick);
        row.appendChild(cell);

        brickCounter += 1;
        brick.addEventListener("click", Memory.turnBrick)
      }

      table.appendChild(row);
    }

    board.appendChild(table);
  },

  turnBrick: function(e) {
    console.log("hej")
    console.log(this)
    console.log(this.parentNode)
  }
};



window.onload = Memory.init;
