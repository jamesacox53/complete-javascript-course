const country = "The United Kingdom";
const continent = 'Europe';
let population = 66650000;

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