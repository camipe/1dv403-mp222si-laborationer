"use strict";

var Memory = {

  gameRows: 2,
  gameCols: 2,
  score: 0,
  tries: 0,

  brickOrder: [],

  activeBricks: [],

  init: function() {
    Memory.brickOrder = RandomGenerator.getPictureArray(Memory.gameRows, Memory.gameCols);
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
        brick.addEventListener("click", Memory.brickClick)
      }

      table.appendChild(row);
    }

    board.appendChild(table);
  },

  brickClick: function(e) {
    e.preventDefault();
    if (this.classList.contains("active")) {
     return;
    };
    if (Memory.activeBricks.length >= 2) {
      return;
    };

    console.log("Clicked")
    Memory.turnBrick(this);

    console.log(Memory.areBricksEqual())

    if (Memory.areBricksEqual()) {
      Memory.score += 1;
    } else {
      Memory.tries += 1;
    }

    if (Memory.activeBricks.length >= 2) {
        window.setTimeout(Memory.brickDefault, 1000);
     };

  },

  areBricksEqual: function() {
    if (Memory.activeBricks.length === 2) {
      var ab1 = Memory.activeBricks[0].id
      var ab2 = Memory.activeBricks[1].id

      console.log("Bricka 1: ", ab1)
      console.log("Bricka 2: ", ab2)

      if (Memory.brickOrder[ab1] === Memory.brickOrder[ab2]) {
          return true;
        };

      } else {
        return false;
      }
  },

  turnBrick: function(e) {
    var img = e.querySelector("img")
    console.log("Turn")
    img.src = "pics/" + Memory.brickOrder[e.id] + ".png";
    e.classList.add("active");
    Memory.activeBricks.push(e);
    console.log(Memory.activeBricks);
  },

  brickDefault: function(e) {
    console.log("Vänd tillbaka")
    var arrayLength = Memory.activeBricks.length;
    for (var i = 0; i < arrayLength; i++) {
      var element = Memory.activeBricks.pop();
      var img = element.querySelector("img")
      img.src = "pics/0.png";
      element.classList.toggle("active");
    };
  },
};



window.onload = Memory.init;
