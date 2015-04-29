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

function testGenerateNDimensionalTable(){
  var testTable = JSON.parse(fs.readFileSync('./testTable.txt', {encoding:'utf8'}));
  var generatedTable = generateNDimensionalTable(10);
  var fail = false;
  for(var i=1;i<testTable.length;i++){
    for(var j=1;j<testTable.length;j++){
      if(testTable[i][j] !== generatedTable[i][j]){
        console.log('failed test', testTable[i][j], generatedTable[i][j], i, j);
        fail = true;
      }
    }
  };
  if(fail){
    console.log('FAILED GENERATE N DIMENSIONAL TABLE TEST');
  }else{
    console.log('PASSED GENERATE N DIMENSIONAL TABLE TEST');
  }
};

testGenerateNDimensionalTable();
