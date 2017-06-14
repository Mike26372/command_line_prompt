var Promise = require('bluebird');
var prompt = require('prompt');
var fs = require('fs');
var { key } = require('./module.js');

Promise.promisifyAll(prompt);
Promise.promisifyAll(fs);

class LiftoffChallengeProgram {
  constructor() {
    // this.getNumber();
    this.logModule();
  }

  getNumber() {
    let numberSchema = [
      {name: 'number', description: 'Please enter an number', type: 'integer'}
    ];


    prompt.getAsync(numberSchema)
      .then(result => {
        let {number} = result;
        let randomNum = Math.floor(Math.random() * 10);
        let message = `Your number was: ${number}\nA random number is: ${randomNum}\nThese numbers added together is: ${number + randomNum}`;
        console.log(message);
        return this.isNumberEven(number + randomNum);
      })
      .then(result => {
        var message = `The number is ${result ? '' : 'not '}even`;
        console.log(message);
      })
      .catch(err => {
        console.error(err);
      });
  }

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

var program = new LiftoffChallengeProgram();