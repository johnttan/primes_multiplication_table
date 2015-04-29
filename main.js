var fs = require('fs');
function generatePrimes(start, end){
  var primes = [];
  var sieve = [];
  var p;
  if(start < 3){
    primes.push(2);
    start = 3;
  };
  for(var i=start;i<=end;i+=2){
    sieve.push(i);
  };
  var k = 0;
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

// function generateNPrimes()

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
  primesArray.forEach(function(el, ind){
    if(generatedPrimes[ind] !== el){
      console.log('mismatch', el, 'generated=', generatedPrimes[ind]);
      fail = true;
    }
  });
  if(fail){
    console.log('FAILED GENERATE PRIMES TEST');
  }else{
    console.log('PASSED GENERATE PRIMES');
  }
};

testGeneratePrimes();
