const country = "The United Kingdom";
const continent = 'Europe';
let population = 66650000;
// let population = 600;

const isIsland = true;
// let isIsland = true;
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

// const numNeighbours = Number(prompt('How many neighbour countries does your country have?'));
// if (numNeighbours === 1) {
//     console.log('Only 1 border!');
// } else if (numNeighbours > 1) {
//     console.log('More than 1 border');
// } else {
//     console.log('No borders');
// }

// population = 1000000;
// isIsland = false;

if (language == "english" && population < 50000000 && !isIsland) {
    console.log(`You should live in ${country} :)`);
} else {
    console.log(`${country} does not meet your criteria :(`);
}

const day = 'monday';

switch (day) {
    case 'monday': // day === 'monday'
        console.log('Plan course structure');
        console.log('Go to coding meetup');
        break;
    case 'tuesday':
        console.log('Prepare theory videos');
        break;
    case 'wednesday':
    case 'thursday':
        console.log('Write code examples');
        break;
    case 'friday':
        console.log('Record videos');
        break;
    case 'saturday':
    case 'sunday':
        console.log('Enjoy the weekend :D');
        break;
    default:
        console.log('Not a valid day!');
}

switch (language) {
    case 'mandarin':
        console.log('Most number of native speakers!');
        break;
    case 'spanish':
        console.log('2nd place in number of native speakers');
        break;
    case 'english':
        console.log('3rd place');
        break;
    case 'hindi':
        console.log('Number 4');
        break;
    case 'arabic':
        console.log('5th most spoken language');
        break;
    default:
        console.log('Great language too :D');
        break;
}