const bill = 275;
// const bill = 40;
// const bill = 430;
const tipPercent = (50 <= bill && bill <= 300) ? 0.15 : 0.20;
const tip = tipPercent * bill;
const finalValue = bill + tip;
console.log(`The bill was ${bill}, the tip percentage was ${tipPercent * 100}%, the tip was ${tip}, and the total value ${finalValue}`)
