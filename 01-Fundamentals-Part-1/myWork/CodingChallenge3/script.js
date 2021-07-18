let dolphinsAverageScore = (96 + 108 + 89) / 3;
let koalasAverageScore = (88 + 91 + 110) / 3;

// let dolphinsAverageScore = (97 + 112 + 101) / 3;
// let koalasAverageScore = (109 + 95 + 123) / 3;

// let dolphinsAverageScore = (97 + 112 + 101) / 3;
// let koalasAverageScore = (109 + 95 + 106) / 3;

// let dolphinsAverageScore = (97 + 112 + 1) / 3;
// let koalasAverageScore = (109 + 95 + 6) / 3;

if (dolphinsAverageScore > koalasAverageScore && dolphinsAverageScore >= 100) {
    console.log("Dolphins win!");
} else if (koalasAverageScore > dolphinsAverageScore && koalasAverageScore >= 100) {
    console.log("Koalas win!");
} else if (koalasAverageScore === dolphinsAverageScore && koalasAverageScore >= 100 && dolphinsAverageScore >= 100) {
    console.log("The game is a draw!");
} else {
    console.log("Nobody wins.");
}