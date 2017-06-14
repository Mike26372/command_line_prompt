var Promise = require('bluebird');
var prompt = require('prompt');
var fs = require('fs');
var { key } = require('./module.js');

Promise.promisifyAll(prompt);
Promise.promisifyAll(fs);

class Minesweeper {
  constructor() {
    this.bombBoard = null;
    this.gameBoard = null;
    this.startGame();
  }

  startGame() {
    this.createBoard('bombBoard');
  }

  nextTurn() {

  }

  printBoard(boardToPrint) {
    var columns = this[boardToPrint][0].length;
    console.log('  ' + Array.from(new Array(columns), (val, ind) => ind + 1).join(' '));
    this[boardToPrint].forEach((col, ind) => {
      console.log(`${ind} ${col.join(' ')}\n`);
    });
  }

  createBoard(boardToCreate) {
    let boardSchema = [
      {name: 'columns', description: 'Please enter the number of board columns', type: 'integer'},
      {name: 'rows', description: 'Please enter the number of board rows', type: 'integer'},
      {name: 'bombs', description: 'Please enter teh number of bombs to place', type: 'integer'}
    ];

    prompt.getAsync(boardSchema)
    .then(result => {
      let { rows, columns, bombs } = result;

      this[boardToCreate] = new Array(rows).fill(0).map(row => new Array(columns).fill('.'));
      this.printBoard('bombBoard');
      this.placeBombs(bombs);
    });

  }

  placeBombs(numBombs) {

  }


}

var minesweeper = new Minesweeper();