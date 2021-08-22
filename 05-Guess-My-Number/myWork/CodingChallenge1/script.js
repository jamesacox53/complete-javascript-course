'use strict';

const generateSecretNumber = function () {
  return Math.trunc(Math.random() * 20) + 1;
}

const defaultScore = 20;
const defaultHighScore = 0;
let score = defaultScore;
let highScore = defaultHighScore;
let secretNumber = generateSecretNumber();
let wonGame = false;
let lostGame = false;

//Todo: end the game when score is 0.
//Todo: when won don't let score of game change.
//Todo: Do lecture.

const mainJavascriptMethod = function () {
  
  getHTMLHighScore().textContent = highScore;
  getHTMLScore().textContent = score;

  if (checkIfHaveLostGame()) {
    haveLostGameNoGuess();
  }

  document.querySelector('.btn.check').addEventListener('click', htmlCheckButtonClicked);
  document.querySelector('.btn.again').addEventListener('click', htmlAgainButtonClicked);
}

const htmlAgainButtonClicked = function () {
  getHTMLMessage().textContent = `Start guessing...`
  getHTMLBody().style.backgroundColor = '#222';
  getHTMLNumber().style.width = '15rem';
  getHTMLNumber().textContent = '?';
  wonGame = false;
  lostGame = false;
  score = defaultScore;
  getHTMLScore().textContent = score;
  secretNumber = generateSecretNumber();
  getHTMLGuess().value = '';
}

const htmlCheckButtonClicked = function () {
  
  if (wonGame || lostGame) {
    return;
  }

  const guessValueString = getHTMLGuess().value;
  
  if (guessValueString.length === 0) {
    return;
  }
    
  const guessValueNumber = Number(guessValueString);
    
  if (Number.isNaN(guessValueNumber) || !Number.isInteger(guessValueNumber) || guessValueNumber < 1 || guessValueNumber > 20) {
    getHTMLMessage().textContent = 'Please enter a valid number.';
    return;
  }

  if (guessValueNumber === secretNumber) {
    htmlCheckButtonGuessEqual(guessValueNumber);

  } else {

    if (guessValueNumber > secretNumber) {
      htmlCheckButtonGuessTooHigh(guessValueNumber);

    } else if (guessValueNumber < secretNumber) {
      htmlCheckButtonGuessTooLow(guessValueNumber);   
    }
  }
}

const htmlCheckButtonGuessEqual = function (guess) {
  haveWonGame(guess);
}

const htmlCheckButtonGuessTooHigh = function (guess) {
  lowerScore();
  if (checkIfHaveLostGame()) {
    haveLostGameGuessed(guess);
  } else {
  getHTMLMessage().textContent = `The guess ${guess} was too high.`;
  }
}

const htmlCheckButtonGuessTooLow = function (guess) {
  lowerScore();
  if (checkIfHaveLostGame()) {
    haveLostGameGuessed(guess);
  } else {
  getHTMLMessage().textContent = `The guess ${guess} was too low.`;
  }
}

const lowerScore = function () {
  score--;
  getHTMLScore().textContent = score;
}

const haveWonGame = function(guess) {
  getHTMLMessage().textContent = `Congratulations ${guess} was the secret number.`
  getHTMLBody().style.backgroundColor = '#60b347';
  getHTMLNumber().style.width = '30rem';
  getHTMLNumber().textContent = secretNumber;
  wonGame = true;
  lostGame = false;

  if (score > highScore) {
    highScore = score;
    getHTMLHighScore().textContent = highScore;
  }
}

const checkIfHaveLostGame = function() {
  return (score <= 0);
}


const haveLostGameNoGuess = function() {
  getHTMLMessage().textContent = `You have lost, the secret number was ${secretNumber}.`
  haveLostGame();
}

const haveLostGameGuessed = function(guess) {
  getHTMLMessage().textContent = `The guess ${guess} was wrong. You have lost, the secret number was ${secretNumber}.`
  haveLostGame();
}

const haveLostGame = function() {
  getHTMLBody().style.backgroundColor = '#d4340d';
  getHTMLNumber().style.width = '30rem';
  getHTMLNumber().textContent = secretNumber;
  wonGame = false;
  lostGame = true;
}

const getHTMLGuess = function () {
  return document.querySelector('.guess');
}

const getHTMLNumber = function () {
  return document.querySelector('.number');
}

const getHTMLMessage = function () {
  return document.querySelector('.message');
}

const getHTMLBody = function () {
  return document.querySelector('body');
}

const getHTMLScore = function () {
  return document.querySelector('.score');
}

const getHTMLHighScore = function () {
  return document.querySelector('.highscore');
}

mainJavascriptMethod();
