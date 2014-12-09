"use strict";

var Memory = {

  // Declaring 'global' variables
  gameRows: 3,
  gameCols: 4,
  score: 0,
  tries: 0,

  // Arrays that keep track of the order of the bricks and which bricks have been turned
  brickOrder: [],
  activeBricks: [],

  // Runs when page load is complete, generates a random order for the bricks and creates the board
  init: function() {
    Memory.brickOrder = RandomGenerator.getPictureArray(Memory.gameRows, Memory.gameCols);
    Memory.generateBoard(Memory.brickOrder);
  },

  // Function which generates the board
  // Info - https://developer.mozilla.org/en-US/docs/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
  generateBoard: function(array) {
    var board = document.getElementById("board");
    var table = document.createElement("table");

    var brickCounter = 0; // Counter to keep track of the number of bricks created which is used as ID

    for (var i = 0; i < Memory.gameRows; i += 1) {
    // creates a table row
      var row = document.createElement("tr");

      for (var j = 0; j < Memory.gameCols; j += 1) {
        // Creates the elements needed in one cell
        var cell = document.createElement("td");
        var brick = document.createElement("a");
        var brickImg = document.createElement("img");

        // Assign attributes
        brickImg.src = "pics/0.png";
        brick.href = "#";
        brick.id = brickCounter;

        // Append elments to the cell and the cell to the row
        brick.appendChild(brickImg);
        cell.appendChild(brick);
        row.appendChild(cell);

        // Track that one cell has been created and an eventlistner for it
        brickCounter += 1;
        brick.addEventListener("click", Memory.brickClick)
      }
      // Append row to table
      table.appendChild(row);
    }
    // Append the table to the board div
    board.appendChild(table);
  },

  // Function which runs when a brick is clicked
  brickClick: function(e) {
    e.preventDefault();

    // if two or more bricks are active exit function
    if (Memory.activeBricks.length >= 2) {
      return;
    };

    // Turn the clicked brick
    Memory.turnBrick(this);

    if (Memory.activeBricks.length === 2) {
      // When there are two active bricks add a try
      Memory.tries += 1;

      // If they are equal give a score point and empty the the activeBricks array
      if (Memory.areBricksEqual()) {

        Memory.score += 1;
        var arrayLength = Memory.activeBricks.length;

        for (var i = 0; i < arrayLength; i++) {
          var element = Memory.activeBricks.pop();
        };
      };
    };

    // if they were not equal a timer to turn them back in 1 second will be set
    if (Memory.activeBricks.length >= 2) {
      window.setTimeout(Memory.brickDefault, 1000);
    };

    // If the max score has been reached print result
    if (Memory.score === (Memory.gameCols * Memory.gameRows) / 2 ) {
      Memory.printResult();
    };
  },

  // Function which check if bricks are equal
  areBricksEqual: function() {

    // Check if there are two active bricks and get their ID
    if (Memory.activeBricks.length === 2) {

      // Get their ID
      var ab1 = Memory.activeBricks[0].id
      var ab2 = Memory.activeBricks[1].id

      // Use the id's to compare to the brick order array
      if (Memory.brickOrder[ab1] === Memory.brickOrder[ab2]) {
          return true;
        };

      } else {
        return false;
      }
  },

  // Function which turns the brick around by switching the image
  turnBrick: function(e) {

    // Get img element and change the src
    var img = e.querySelector("img")
    img.src = "pics/" + Memory.brickOrder[e.id] + ".png";

    // push it to activebricks and remove the eventlistner
    Memory.activeBricks.push(e);
    e.removeEventListener('click', Memory.brickClick);

  },
  // Function which turns the brick back to default state
  brickDefault: function(e) {

    var arrayLength = Memory.activeBricks.length;
    // loops through the array of active bricks and reset the image, then remove item from array
    for (var i = 0; i < arrayLength; i++) {
      var element = Memory.activeBricks.pop();
      var img = element.querySelector("img")
      img.src = "pics/0.png";

      // Add the eventlistner back
      element.addEventListener("click", Memory.brickClick)
    };
  },

  // Function to print the result on the page
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
