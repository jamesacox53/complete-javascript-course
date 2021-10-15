'use strict';

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
  ];

// Q1.

dogs.forEach(dog => dog.recommendedFood = Math.trunc((dog.weight ** 0.75) * 28));

console.log(dogs);

// Q2.

const sarahsDog = dogs.find((dog) => dog.owners.includes('Sarah'))

console.log(sarahsDog);

const isEatingOkAmount = (dog) => (dog.curFood > (dog.recommendedFood * 0.90) && dog.curFood < (dog.recommendedFood * 1.10));
  
console.log(isEatingOkAmount(sarahsDog) ? `Sarahs dog is eating an ok amount` : `Sarahs dog is not eating an ok amount.`);

// Q3.

let ownersEatTooMuch = [];
let ownersEatTooLittle = [];

const isEatingTooMuch = (dog) => (dog.curFood > dog.recommendedFood);

const isEatingTooLittle = (dog) => (dog.curFood < dog.recommendedFood);

dogs.forEach(function (dog) {

  if (isEatingTooMuch(dog)) {
    ownersEatTooMuch = ownersEatTooMuch.concat(dog.owners);
  }

  if (isEatingTooLittle(dog)) {
    ownersEatTooLittle = ownersEatTooLittle.concat(dog.owners);
  }
})

console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

// Q4.

const ownersEatTooMuchString = ownersEatTooMuch.join(' and ');

const ownersEatTooLittleString = ownersEatTooLittle.join(' and ');

console.log(`${ownersEatTooMuchString}'s dogs eat too much!`);
console.log(`${ownersEatTooLittleString}'s dogs eat too little!`);

// Q5.

console.log(dogs.some((dog) => dog.recommendedFood === dog.curFood));

// Q6.

console.log(dogs.some((dog) => isEatingOkAmount(dog)));

// Q7.

const dogsEatingOkAmountOfFood = dogs.filter((dog) => isEatingOkAmount(dog));

console.log(dogsEatingOkAmountOfFood);

// Q8.

const dogsCopy = dogs.slice();

dogsCopy.sort((a, b) => a.recommendedFood - b.recommendedFood);

console.log(dogsCopy);