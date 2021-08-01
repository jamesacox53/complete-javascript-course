const markMiller = {
    fullName: 'Mark Miller',
    weight: 78,
    height: 1.69,
    calcBMI: function () {
        const bmi = this.weight / (this.height ** 2);
        this.bmi = bmi;
        return this.bmi;
    }
};

const johnSmith = {
    fullName: 'John Smith',
    weight: 92,
    height: 1.95,
    calcBMI: function () {
        const bmi = this.weight / (this.height ** 2);
        this.bmi = bmi;
        return this.bmi;
    }
};

markMiller.calcBMI();
johnSmith.calcBMI();

let wasWinner;
let winnerName;
let winnerBmi;
let loserName;
let loserBmi;

if (markMiller.bmi > johnSmith.bmi) {
    wasWinner = true;
    winnerName = markMiller.fullName;
    winnerBmi = markMiller.bmi;

    loserName = johnSmith.fullName;
    loserBmi = johnSmith.bmi;

} else if (johnSmith.bmi > markMiller.bmi) {
    wasWinner = true;
    winnerName = johnSmith.fullName;
    winnerBmi = johnSmith.bmi;

    loserName = markMiller.fullName;
    loserBmi = markMiller.bmi;

} else {
    wasWinner = false;
    winnerName = johnSmith.fullName;
    winnerBmi = johnSmith.bmi;

    loserName = markMiller.fullName;
    loserBmi = markMiller.bmi;
}

if (wasWinner) {
    console.log(`${winnerName}'s BMI (${winnerBmi}) is higher than ${loserName}'s BMI (${loserBmi})`);
}
else {
    console.log(`Both ${winnerName} and ${loserName} have the same BMI (${winnerBmi})`);
}