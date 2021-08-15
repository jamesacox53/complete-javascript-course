'use strict';

const defaultScore = 20;
let score = defaultScore;
let secretNumber = Math.trunc(Math.random() * 20) + 1;

//Todo: end the game when score is 0.
//Todo: when won don't let score of game change.
//Todo: Do lecture.

const mainJavascriptMethod = function () {
  document.querySelector('.btn.check').addEventListener('click', htmlCheckButtonClicked);
}

const htmlCheckButtonClicked = function () {
  const guessValueString = getHTMLGuess().value;
  
  if (guessValueString.length === 0) {
    return;
  }
    
  const guessValueNumber = parseInt(guessValueString, 10);
    
  if (Number.isNaN(guessValueNumber) || guessValueNumber < 1 || guessValueNumber > 20) {
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
    
    htmlCheckButtonGuessWrong();
  }
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

const htmlCheckButtonGuessEqual = function (guess) {
  getHTMLMessage().textContent = `Congratulations ${guess} was the secret number.`
  getHTMLBody().style.backgroundColor = '#60b347';
  getHTMLNumber().style.width = '30rem';
}

const htmlCheckButtonGuessWrong = function () {
  score--;
  getHTMLScore().textContent = score;
}

const htmlCheckButtonGuessTooHigh = function (guess) {
  getHTMLMessage().textContent = `The guess ${guess} was too high.`;
}

const htmlCheckButtonGuessTooLow = function (guess) {
  getHTMLMessage().textContent = `The guess ${guess} was too low.`;
}

mainJavascriptMethod();
