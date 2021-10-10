'use strict';

const juliaD1 = [3, 5, 2, 12, 7];
const kateD1 = [4, 1, 15, 8, 3];
const juliaD2 = [9, 16, 6, 8, 3];
const kateD2 = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsStringArray = checkDogsGetStringArray(dogsJulia, dogsKate);

  for (const dogString of dogsStringArray) {
    console.log(dogString);
  }
}

const checkDogsGetStringArray = function (dogsJulia, dogsKate) {
    
  const retArray = [];

  const dogsJuliaWithoutCats = dogsJulia.slice(1, -2); 

  const allDogs = dogsJuliaWithoutCats.concat(dogsKate);

  allDogs.forEach(function (dog, index) {
        
    if (dog >= 3) {
      retArray.push(`Dog number ${index + 1} is an adult, and is ${dog} years old`);
     
    } else {
      retArray.push(`Dog number ${index + 1} is still a puppy`); 
    }
  });

  return retArray;
}

checkDogs(juliaD1, kateD1);
checkDogs(juliaD2, kateD2);