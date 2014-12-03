"use strict";

var Memory = {

  gameRows: 4,
  gameCols: 4,
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

    // if two or more bricks are active exit function
    if (Memory.activeBricks.length >= 2) {
      return;
    };

    console.log("Clicked")

    // Turn the clicked brick
    Memory.turnBrick(this);

    if (Memory.activeBricks.length === 2) {
      Memory.tries += 1;
      if (Memory.areBricksEqual()) {
        Memory.score += 1;
        var arrayLength = Memory.activeBricks.length;
        for (var i = 0; i < arrayLength; i++) {
          var element = Memory.activeBricks.pop();
          // element.classList.toggle("active");
        };
      };
    };

    if (Memory.activeBricks.length >= 2) {
      window.setTimeout(Memory.brickDefault, 1000);

    };
    console.log("Score: ", Memory.score);
    console.log("Tries: ", Memory.tries);

    if (Memory.score === (Memory.gameCols * Memory.gameRows) / 2 ) {
      Memory.printResult();
    };
  },

  areBricksEqual: function() {
    if (Memory.activeBricks.length === 2) {
      var ab1 = Memory.activeBricks[0].id
      var ab2 = Memory.activeBricks[1].id

      // console.log("Bricka 1: ", ab1)
      // console.log("Bricka 2: ", ab2)

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
    // e.classList.add("active");
    Memory.activeBricks.push(e);
    e.removeEventListener('click', Memory.brickClick);
    console.log(Memory.activeBricks);
  },

  brickDefault: function(e) {
    console.log("Vänd tillbaka")
    var arrayLength = Memory.activeBricks.length;
    for (var i = 0; i < arrayLength; i++) {
      var element = Memory.activeBricks.pop();
      var img = element.querySelector("img")
      img.src = "pics/0.png";
      // element.classList.toggle("active");
      element.addEventListener("click", Memory.brickClick)
    };
  },

  printResult: function() {
    var board = document.getElementById("board");
    var h2 = document.createElement("h2");
    var text = document.createElement("p");

    h2.innerHTML = "Grattis!"
    text.innerHTML = "Du klarade det på " + Memory.tries + " försök!"

    board.appendChild(h2);
    board.appendChild(text);
  },
};

window.onload = Memory.init;
