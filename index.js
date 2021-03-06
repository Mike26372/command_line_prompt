var Promise = require('bluebird');
var prompt = require('prompt');

Promise.promisifyAll(prompt);

class Minesweeper {
  constructor() {
    this.bombBoard = null;
    this.gameBoard = null;
    this.rows = null;
    this.columns = null;
    this.bombs = null;
    this.gameLost = false;
    this.startGame();
  }

  startGame() {
    this.getBoardSpecs()
      .then(result => {
        this.createBoard('bombBoard');
        this.createBoard('gameBoard', 'H');
        this.placeBombs('bombBoard');
        this.updateBombBoard();
        this.nextTurn();
      });
  }

  nextTurn() {
    this.printBoard('gameBoard');
    prompt.getAsync(['row', 'column'])
      .then(result => {
        let {row, column} = result;
        let rowIndex = row - 1;
        let columnIndex = column - 1;
        this.placeMarker(rowIndex, columnIndex);
        if (this.gameLost) {
          return console.log('Game over! You lose :(');
        }
        this.revealAdjacentSpots(rowIndex, columnIndex);
        if (this.checkIfWinner()) {
          return console.log('Congratulations, you\'ve won!');
          // throw new Error('Winner');
        }
        this.nextTurn();
      })
      .catch(err => {
        return console.error('turn error!', err);
      });
  }

  printBoard(boardToPrint) {
    console.log(`${boardToPrint} being printed!`);
    var columns = this[boardToPrint][0].length;
    console.log('  ' + Array.from(new Array(columns), (val, ind) => ind + 1).join('  '));
    this[boardToPrint].forEach((col, ind) => {
      console.log(`${ind + 1} ${col.join('  ')}\n`);
    });
  }

  getBoardSpecs() {
    let boardSchema = [
      {name: 'columns', description: 'Please enter the number of board columns', type: 'integer'},
      {name: 'rows', description: 'Please enter the number of board rows', type: 'integer'},
      {name: 'bombs', description: 'Please enter the number of bombs to place', type: 'integer'}
    ];
    return new Promise((resolve, reject) => {
      prompt.getAsync(boardSchema)
      .then(result => {
        let { rows, columns, bombs } = result;
        this.rows = rows;
        this.columns = columns;
        this.bombs = bombs;
        resolve(result);
      });
    });

  }

  updateBombBoard() {
    for (var i = 0; i < this.columns; i++) {
      for (var j = 0; j < this.rows; j++) {
        if (this.bombBoard[j][i] !== 'B') {
          var count = this.getAdjacentCount(j, i);
          this.bombBoard[j][i] = count > 0 ? `${count}` : '.'; 
        }
      }
    }
    // this.printBoard('bombBoard');
  }

  createBoard(boardToCreate, placeholder = '.') {
    let { rows, columns, bombs } = this;
    this[boardToCreate] = new Array(rows).fill(0).map(row => new Array(columns).fill(placeholder));
    // this.printBoard(boardToCreate);

  }

  placeBombs(board) {
    // place bombs at random
    let bombsPlaced = 0;
    let { bombs, rows, columns } = this;

    while (bombsPlaced < bombs) {
      let bombRow = Math.floor(Math.random() * rows);
      let bombColumn = Math.floor(Math.random() * columns);

      if (this.bombBoard[bombRow][bombColumn] !== 'B') {
        this.bombBoard[bombRow][bombColumn] = 'B';
        bombsPlaced++;
      }
    }

    // this.printBoard(board);
  }

  placeMarker(row, column) {
    if (this.bombBoard[row][column] === 'B') {
      this.gameLost = true;
    }
  }

  checkIfWinner() {
    // To be implemented by checking if gameboard has any remaining H's, assuming player has not lost yet
    var count = 0;
    for (var i = 0; i < this.columns; i++) {
      for (var j = 0; j < this.rows; j++) {
        if (this.gameBoard[j][i] === 'H' && this.bombBoard[j][i] !== 'B') count++;
      }
    }
    return count === 0;
  }

  revealAdjacentSpots(row, column) {
    // With more time I would clean this up

    var stack = [];
    stack.push([row, column]);

    while (stack.length) {
      let [currentRow, currentColumn] = stack.pop();
      let insideBoard = (currentRow >= 0 && currentRow < this.rows && currentColumn >= 0 && currentColumn < this.columns);
      // console.log(insideBoard);
      if (!insideBoard) continue;
      
      if (this.bombBoard[currentRow][currentColumn] === 'B') {
        continue;  
      }

      if (!isNaN(parseInt(this.gameBoard[currentRow][currentColumn], 10))) continue;
      if (this.gameBoard[currentRow][currentColumn] === '.') continue;

      if (this.bombBoard[currentRow][currentColumn] !== '.') {
        this.gameBoard[currentRow][currentColumn] = this.bombBoard[currentRow][currentColumn];
      } else {
        this.gameBoard[currentRow][currentColumn] = '.';
        stack.push([currentRow - 1, currentColumn - 1]);
        stack.push([currentRow - 1, currentColumn]);
        stack.push([currentRow - 1, currentColumn + 1]);
        stack.push([currentRow, currentColumn - 1]);
        stack.push([currentRow, currentColumn + 1]);
        stack.push([currentRow + 1, currentColumn - 1]);
        stack.push([currentRow + 1, currentColumn]);
        stack.push([currentRow + 1, currentColumn + 1]);
      }
    }
  }

  getAdjacentCount(row, column) {
    // With more time I would clean this up
    var count = 0;
    if (row - 1 >= 0 && row - 1 < this.rows && column - 1 >= 0 && column - 1 < this.columns && this.bombInPlace(row - 1, column - 1)) count++;
    if (row - 1 >= 0 && row - 1 < this.rows && column >= 0 && column < this.columns && this.bombInPlace(row - 1, column)) count++;
    if (row - 1 >= 0 && row - 1 < this.rows && column + 1 >= 0 && column + 1 < this.columns && this.bombInPlace(row - 1, column + 1)) count++;
    if (row >= 0 && row < this.rows && column - 1 >= 0 && column - 1 < this.columns && this.bombInPlace(row, column - 1)) count++;
    if (row >= 0 && row < this.rows && column + 1 >= 0 && column + 1 < this.columns && this.bombInPlace(row, column + 1)) count++;
    if (row + 1 >= 0 && row + 1 < this.rows && column - 1 >= 0 && column - 1 < this.columns && this.bombInPlace(row + 1, column - 1)) count++;
    if (row + 1 >= 0 && row + 1 < this.rows && column >= 0 && column < this.columns && this.bombInPlace(row + 1, column)) count++;
    if (row + 1 >= 0 && row + 1 < this.rows && column + 1 >= 0 && column + 1 < this.columns && this.bombInPlace(row + 1, column + 1)) count++;
    return count;
  }

  bombInPlace(row, column) {
    return this.bombBoard[row][column] === 'B' ? true : false;
  }


}

var minesweeper = new Minesweeper();