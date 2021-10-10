'use strict';

const calcAverageHumanAge = dogAges => dogAges.map(dogAge => dogAge <=2 ? 2 * dogAge : 16 + (dogAge * 4)).filter(dogHumanAge => dogHumanAge >= 18).reduce((accumulater, current, i, array) => accumulater + ((current * 1.0) / array.length), 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));