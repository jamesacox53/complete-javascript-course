const calcAverage = (num1, num2, num3) => (num1 + num2 + num3) / 3;

function checkWinner(avgDolphins, avgKoalas) {
    if (avgDolphins >= 2 * avgKoalas) {
        return `Dolphins win (${avgDolphins} vs. ${avgKoalas})`;
    } else if (avgKoalas >= 2 * avgDolphins) {
        return `Koalas win (${avgKoalas} vs. ${avgDolphins})`;
    } else {
        return `Nobody wins.`;
    }
}

const DolphinsAvg1 = calcAverage(44, 23, 71);
const KoalasAvg1 = calcAverage(65, 54, 49);
const DolphinsAvg2 = calcAverage(85, 54, 41);
const KoalasAvg2 = calcAverage(23, 34, 27);

console.log(checkWinner(DolphinsAvg1, KoalasAvg1));
console.log(checkWinner(DolphinsAvg2, KoalasAvg2));