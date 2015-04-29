var generateNPrimes = require('./primes.js').generateNPrimes;
var fs = require('fs');

function generateNDimensionalTable(N){
  var primes = generateNPrimes(N, N);
  var table = [[0]];
  // Populate table with multiplied values
  for(var i=1;i<N;i++){
    table[i] = [];
    for(var j=1;j<N;j++){
      table[i][j] = primes[i-1] * primes[j-1];
    }
  };
  // Populate first column and row of table with primes
  for(var i=1;i<N;i++){
    table[i][0] = primes[i-1];
  };
  for(var j=1;j<N;j++){
    table[0][j] = primes[j-1];
  };
  return table;
};

// Function for making spaces with certain width
function makeSpacing(len){
  var res = "";
  for(var i=0;i<len;i++){
    res += " ";
  };
  return res;
};

// The strategy for printTable is to iterate through the table and construct the rows of the table by string concatenation
// To account for varying widths of the numbers, it keeps track of the maximum column width so far, and adds the appropriate spacing
function printTable(table){
  var rows = [];
  for(var i=0;i<table.length;i++){
    var maxColLen = 0;
    for(var j=0;j<table.length;j++){
      if(rows[j] === undefined){
        rows[j] = "";
      };
      var stringedInt = String(table[i][j]);
      rows[j] += stringedInt;
      // Set max length of item in this column
      if(stringedInt.length + rows[j].length > maxColLen){
        maxColLen = stringedInt.length + rows[j].length;
      };
    };
    for(var k=0;k<table.length;k++){
      rows[k] += makeSpacing(maxColLen - rows[k].length + 2);
    };
  };
  console.log(rows.join('\n'));
};
printTable(generateNDimensionalTable(10));

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
