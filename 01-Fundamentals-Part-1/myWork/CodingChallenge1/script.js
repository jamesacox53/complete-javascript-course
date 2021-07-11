const markHeight1 = 1.69
const markWeight1 = 78
const johnHeight1 = 1.95
const johnWeight1 = 92

const markHeight2 = 1.88
const markWeight2 = 95
const johnHeight2 = 1.76
const johnWeight2 = 85

const markBMI1 = markWeight1 / (markHeight1 ** 2)

const johnBMI1 = johnWeight1 / (johnHeight1 ** 2)

const markBMI2 = markWeight2 / (markHeight2 ** 2)

const johnBMI2 = johnWeight2 / (johnHeight2 ** 2)

const markHigherBMI1 = markBMI1 > johnBMI1;

console.log(markBMI1, johnBMI1, markHigherBMI1);

const markHigherBMI2 = markBMI2 > johnBMI2;

console.log(markBMI2, johnBMI2, markHigherBMI2);
