'use strict';

const calcAverageHumanAge = function(dogAges) {
  const dogAgesInHumanYears = getDogAgesInHumanYears(dogAges);  
  
  const dogsOverHumanAgeOf18 = dogAgesInHumanYears.filter(dogHumanAge => dogHumanAge >= 18);

  const sumDogAgesOver18 = dogsOverHumanAgeOf18.reduce((accumulater, current) => accumulater + current,0);

  return ((sumDogAgesOver18 * 1.0) / dogsOverHumanAgeOf18.length);
}

const getDogAgesInHumanYears = function (dogAges) {
  const retArray = dogAges.map(function (dogAge) {
    if (dogAge <= 2) {
      return 2 * dogAge;
    } else {
      return 16 + (dogAge * 4);
    }
  });
  return retArray;
}


console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));