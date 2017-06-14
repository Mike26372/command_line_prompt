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
    this[boardToPrint].forEach((col, ind) => {
      console.log(`${col.join(' ')}\n`);
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
    });

  }

  placeBombs() {

  }

  // getNumber() {
  //   let numberSchema = [
  //     {name: 'number', description: 'Please enter an number', type: 'integer'}
  //   ];


  //   prompt.getAsync(numberSchema)
  //     .then(result => {
  //       let {number} = result;
  //       let randomNum = Math.floor(Math.random() * 10);
  //       let message = `Your number was: ${number}\nA random number is: ${randomNum}\nThese numbers added together is: ${number + randomNum}`;
  //       console.log(message);
  //       return this.isNumberEven(number + randomNum);
  //     })
  //     .then(result => {
  //       var message = `The number is ${result ? '' : 'not '}even`;
  //       console.log(message);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }

  isNumberEven(number) {
    var result = false;
    return new Promise((resolve, reject) => {
      if (number % 2 === 0) {
        result = true;
      }
      resolve(result);
    });
  }

  logModule() {
    console.log(key);
  }

}

var program = new Minesweeper();