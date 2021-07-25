function describeCountry(country, population, capital) {
    return `${country} has ${population} people and it's capital city is ${capital}.`;
}

const finlandString = describeCountry('Finland', '6 million', 'Helsinki');
console.log(finlandString);

const franceString = describeCountry('France', '67 million', 'Paris');
console.log(franceString);

const brazilString = describeCountry('Brazil', '211 million', 'Brasilia');
console.log(brazilString);

function percentageOfWorld1(population) {
    return (population / 7900) * 100;
}
const populationOfChina = 1441;
const populationOfFrance = 67;
const populationOfBrazil = 211;
const percentageOfPopChina1 = percentageOfWorld1(populationOfChina);
const percentageOfPopFrance1 = percentageOfWorld1(populationOfFrance);
const percentageOfPopBrazil1 = percentageOfWorld1(populationOfBrazil);
console.log(percentageOfPopChina1);
console.log(percentageOfPopFrance1);
console.log(percentageOfPopBrazil1);

const percentageOfWorld2 = function (population) {
    return (population / 7900) * 100;
}

const percentageOfPopChina2 = percentageOfWorld2(populationOfChina);
const percentageOfPopFrance2 = percentageOfWorld2(populationOfFrance);
const percentageOfPopBrazil2 = percentageOfWorld2(populationOfBrazil);
console.log(percentageOfPopChina2);
console.log(percentageOfPopFrance2);
console.log(percentageOfPopBrazil2);

const percentageOfWorld3 = population => (population / 7900) * 100;
const percentageOfPopChina3 = percentageOfWorld3(populationOfChina);
const percentageOfPopFrance3 = percentageOfWorld3(populationOfFrance);
const percentageOfPopBrazil3 = percentageOfWorld3(populationOfBrazil);
console.log(percentageOfPopChina3);
console.log(percentageOfPopFrance3);
console.log(percentageOfPopBrazil3);

function describePopulation(country, population) {
    const percentageOfWorld = percentageOfWorld1(population);
    return `${country} has ${population} million people, which is about ${percentageOfWorld}% of the world.`
}

console.log(describePopulation('China', populationOfChina));
console.log(describePopulation('France', populationOfFrance));
console.log(describePopulation('Brazil', populationOfBrazil));