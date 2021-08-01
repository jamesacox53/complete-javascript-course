const calcTip = function (bill) {
    if (bill >= 50 && bill <= 300) {
        return bill * 0.15;
    } else {
        return bill * 0.2;
    }
}

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

for (let i = 0; i < bills.length; i++) {
    tip = calcTip(bills[i]);
    tips.push(tip);

    total = tip + bills[i];
    totals.push(total);
}

console.log(bills);
console.log(tips);
console.log(totals);

const calcAverage = function (arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
    }

    if (arr.length === 0) {
        return 0;
    } else {
        return sum / arr.length;
    }
};

console.log(calcAverage(totals));