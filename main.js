var generateNPrimes = require('./primes.js').generateNPrimes;
var fs = require('fs');

function generateNDimensionalTable(N){
  var primes = generateNPrimes(N, N);
  var table = [[0]];
  for(var i=1;i<N;i++){
    table[i] = [];
    for(var j=1;j<N;j++){
      table[i][j] = primes[i-1] * primes[j-1];
    }
  };
  for(var i=1;i<N;i++){
    table[i][0] = primes[i-1];
  };
  for(var j=1;j<N;j++){
    table[0][j] = primes[j-1];
  };
  return table;
};

console.log(generateNDimensionalTable(10));

function testGenerateNDimensionalTable(){
  var testTable = fs.readFileSync('./testTable.txt');
  var generatedTable = generateNDimensionalTable(10);
  for(var i=0;i<testTable.length;i++){
    for(var j=0;j<testTable.length;j++){

    }
  }
};
