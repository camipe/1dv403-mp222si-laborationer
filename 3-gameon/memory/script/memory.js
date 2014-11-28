"use strict";

var Memory = {

  gameRows: 2,
  gameCols: 2,

  brickOrder: [],

  init: function() {
    Memory.brickOrder = RandomGenerator.getPictureArray(Memory.gameRows, Memory.gameCols);
    console.log(Memory.brickOrder);
  }
};

window.onload = Memory.init;
