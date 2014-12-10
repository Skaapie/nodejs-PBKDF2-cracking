'use strict';

var fs = require('fs');
var crypto = require('crypto');


// <CONFIG>

var pathToPasswordFile = '10k-common-passwords.txt';

// Sample data.
var toCrackArr =
[
  {
    user : 'test',
    hashedPassword : 'VeisCQcK0LkmBnmUWi3rCwZJYREYxfCara+8/iZXJohyCoygioY1eaEya7ymFXnvXFY07YbK9Cfy/UZl3dnqRw==',
    salt : 'i9qVmVBYt6ePIfW0LwofAw=='
  }
];

// </CONFIG>


// Start.
// => Pre-process the toCrackArr.
// => Read in passwords from file.
// => Start crack.
function start() {
  
  preProcessToCrack(toCrackArr);
  

  // Populated with all the passwords to try.
  var passwordList = readPasswordList(pathToPasswordFile);
  

  startCracking(toCrackArr, passwordList);

};

start();


function startCracking(toCrack, passwords) {
  
  console.log('Starting cracking process.');
  console.log('Number to crack:', toCrack.length);
  console.log('Number of passwords in list:', passwords.length);

  var foundArr = [];

  for(var p = 0, pN = passwords.length; p < pN; p++) {

    var passwordToTest = passwords[p];

    for(var c = 0, cN = toCrack.length; c < cN; c++) {
      
      var itemToCrack = toCrack[c];
      var hashedPassword = itemToCrack.hashedPassword;
      var saltBuffer = itemToCrack.saltBuffer;

      var derivedHash = crypto.pbkdf2Sync(passwordToTest, saltBuffer, 10000, 64).toString('base64');

      if(derivedHash == hashedPassword) {
        var found = { password: passwordToTest, obj : itemToCrack };
        foundArr.push(found);
        console.log('Found password: ', found);
        
        // Speed optimisation?
        // Remove the item from the array when found: unless you might want to test/hope for collisions.
        toCrackArr.splice(c, 1);
        c--;
        cN--;
        break;
      }

    }

  }

  console.log('Finished cracking process.');
  console.log('Number of passwords found:', foundArr.length);

  if(foundArr.length > 0) {

    console.log('Found the following passwords:', foundArr);

  }

};


// Create the buffer of the salt once instead of on each iteration.
function preProcessToCrack(arr) {

  for(var i = 0, iN = arr.length; i < iN; i++) {

    arr[i].saltBuffer = new Buffer(arr[i].salt, 'base64');

  }

};


// Read all the passwords from the file into an array for quick lookup.
function readPasswordList(path) {

  return fs.readFileSync(path).toString().split('\r\n')

};