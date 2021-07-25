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
populationOfChina = 1441;
populationOfFrance = 67;
populationOfBrazil = 211;
percentageOfPopChina1 = percentageOfWorld1(populationOfChina);
percentageOfPopFrance1 = percentageOfWorld1(populationOfFrance);
percentageOfPopBrazil1 = percentageOfWorld1(populationOfBrazil);
console.log(percentageOfPopChina1);
console.log(percentageOfPopFrance1);
console.log(percentageOfPopBrazil1);

const percentageOfWorld2 = function (population) {
    return (population / 7900) * 100;
}

percentageOfPopChina2 = percentageOfWorld2(populationOfChina);
percentageOfPopFrance2 = percentageOfWorld2(populationOfFrance);
percentageOfPopBrazil2 = percentageOfWorld2(populationOfBrazil);
console.log(percentageOfPopChina2);
console.log(percentageOfPopFrance2);
console.log(percentageOfPopBrazil2);
