const country = "The United Kingdom";
const continent = 'Europe';
let population = 66650000;
// let population = 600;


const isIsland = true;
const language = 'english';

console.log("country: " + country);
console.log("continent: " + continent);
console.log("population: " + population);
console.log("isIsland: " + isIsland);
console.log("language: " + language);

let halfThePopulation = population / 2;
console.log("half the population: " + halfThePopulation);

population++;

halfThePopulation = population / 2;
console.log("half the population: " + halfThePopulation);
populationOfFinland = 6000000;
const morePeopleThanFinland = population > populationOfFinland;

console.log("Does " + country + " have more people than Finland?: " + morePeopleThanFinland);

const avgPopOfACountry = 33000000;
const isPopLessThanAverage = population < avgPopOfACountry;

const description = country + " is in " + continent + ", and it's " + population + " people speak " + language;
console.log(description);

const description2 = `${country} is in ${continent}, and it's ${population} people speak ${language}`;
console.log(description2);

if (!isPopLessThanAverage) {
    console.log(`${country}'s population is above average`);
} else {
    console.log(`${country}'s population is ${avgPopOfACountry - population} below average`);
}

console.log("I am " + 23 + " years old.");

console.log(23 + " I am years old.");

console.log('13' > '15');

console.log('9' - '5');
console.log('19' - '13' + '17');
console.log('19' - '13' + 17);
console.log('123' < 57);
console.log(5 + 6 + '4' + 9 - 4 - 2);
