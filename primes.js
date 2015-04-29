var fs = require('fs');

// Function for generating primes in range [start, end]
// Pass in previously generated primes for range from [0, start)
function generatePrimes(start, end, oldPrimes){
  var primes = [];
  var sieve = [];
  var p;
  if(start < 3){
    primes.push(2);
    start = 3;
  }else if(start % 2 === 0){
    start = start + 1;
  };
  for(var i=start;i<=end;i+=2){
    sieve.push(i);
  };
  var k = 0;
  // Process our sieve with the old primes
  if(oldPrimes){
    for(var z=0;z<oldPrimes.length;z++){
      for(var d=k;d<sieve.length;d++){
        if(sieve[d] % oldPrimes[z] === 0){
          sieve[d] = 0;
          // Advance k if we mark the next consecutive non-prime after k
          if(d === k + 1){
            k++;
          }
        }
      }
    }
  };
  // Important optimization here is to keep advancing k to the next available spot instead of iterating from the beginning
  while(k < sieve.length){
    while(sieve[k] === 0 && k < sieve.length){
      k++;
    };
    if(k === sieve.length){
      return primes;
    }
    primes.push(sieve[k]);
    p = sieve[k];
    k++;
    for(j=k;j<sieve.length;j++){
      if(sieve[j] % p === 0){
        sieve[j] = 0;
      }
    }
  }
  return primes;
};

function generateNPrimes(N, blockSize){
  var results = [];
  var start = 0;
  var end = blockSize;
  while(results.length < N){
    // This concatenation is ineffective, a further optimization would be to use linked list instead of arrays.
    // This allows O(1) combinations of two sets of primes
    results = results.concat(generatePrimes(start, end, results));
    start = results[results.length-1];
    end = start + blockSize;
  };
  return results;
};

function compareTwoPrimeSets(test, generated){
  var fail = false;
  test.forEach(function(el, ind){
    if(generated[ind] !== el){
      console.log('mismatch', el, 'generated=', generated[ind]);
      fail = true;
    }
  });
  return fail;
};

function testGeneratePrimes(){
  var test = fs.readFileSync('testPrimes.txt', {encoding:'utf8'});
  var primesArray = [];
  // Parse test text.
  var temp = "";
  for(var i=0;i<test.length;i++){
    if(test[i] !== " " && test[i] !== "\n"){
      temp = temp + test[i];
    }else if (temp.length > 0){
      primesArray.push(parseInt(temp));
      temp = "";
    }
  };

  var generatedPrimes = generatePrimes(0,10000);
  var fail = false;
  // Test basic generation of primes
  fail = fail && compareTwoPrimeSets(test, generatePrimes);

  var generatedPrimesChainOne = generatePrimes(0, 5000);
  var generatedPrimesChainTwo = generatePrimes(5001, 10000, generatedPrimesChainOne);

  var testSet = generatedPrimesChainOne + generatedPrimesChainTwo;
  // Test chaining of 2 prime range calculations
  fail = fail && compareTwoPrimeSets(test, generatePrimes);

  var generatedNPrimes = generateNPrimes(5900, 1000);
  // Test generation of N primes
  fail = fail && compareTwoPrimeSets(test, generatedNPrimes);

  if(fail){
    console.log('FAILED GENERATE PRIMES TEST');
  }else{
    console.log('PASSED GENERATE PRIMES');
  }
};

module.exports = {
  generatePrimes: generatePrimes,
  generateNPrimes: generateNPrimes
};
