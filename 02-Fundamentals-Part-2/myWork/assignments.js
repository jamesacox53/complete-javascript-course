function describeCountry(country, population, capital) {
    return `${country} has ${population} people and it's capital city is ${capital}.`;
}

const finlandString = describeCountry('Finland', '6 million', 'Helsinki');
console.log(finlandString);

const franceString = describeCountry('France', '67 million', 'Paris');
console.log(franceString);

const brazilString = describeCountry('Brazil', '211 million', 'Brasilia');
console.log(brazilString);