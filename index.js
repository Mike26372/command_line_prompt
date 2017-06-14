var Promise = require('bluebird');
var prompt = require('prompt');
var fs = require('fs');

Promise.promisifyAll(prompt);
Promise.promisifyAll(fs);

class LiftoffChallengeProgram {
  constructor() {

  }
}

var program = new LiftoffChallengeProgram();