'use strict';

// selecting elements
const playerElements = []; 
const scorePlayerElements = []; 
const currentScorePlayerElements = []; 
const diceElement = document.querySelector('.dice');

// selecting buttons
const newGameButton = document.querySelector('.btn--new');
const rollDiceButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');

// state of game
const numberOfPlayers = 2;
let gameOver = false;
let scores = [0, 0];
let currentScores = [0, 0];
let currentPlayer = 0;


const setUpSelectingElements = function () {
    
    for (let i = 0; i < numberOfPlayers; i++) {
        playerElements.push(document.querySelector(`.player--${i}`));
    }

    for (let i = 0; i < numberOfPlayers; i++) {
        scorePlayerElements.push(document.querySelector(`#score--${i}`));
    }

    for (let i = 0; i < numberOfPlayers; i++) {
        currentScorePlayerElements.push(document.querySelector(`#current--${i}`));
    }
};

const mainMethod = function () {

    setUpSelectingElements();
    initiateHTMLScores();
    
    hideDice();

    newGameButton.addEventListener('click', newGameButtonClicked);
    rollDiceButton.addEventListener('click', rollDiceButtonClicked);
    holdButton.addEventListener('click', holdButtonClicked);
};

const initiateHTMLScores = function () {
    for (let i = 0; i < scorePlayerElements.length; i++) {
        scorePlayerElements[i].textContent = scores[i];
    }
    
    for (let i = 0; i < currentScorePlayerElements.length; i++) {
        currentScorePlayerElements[i].textContent = currentScores[i];
    }
};

const newGameButtonClicked = function () {
    
    gameOver = false;
    resetAllPlayerCurrentScores();
    resetAllPlayerScores();
    hideDice();
    resetPlayersToDefault();
};

const rollDiceButtonClicked = function () {
    
    if (gameOver) {
        return;
    }

    const dice = rollDice();
    showDice(dice);

    if (dice === 1) {

        updateCurrentPlayerCurrentScore(0);
        switchPlayer();

    } else {
        // Add score to current player
        const newScore = currentScores[currentPlayer] + dice;
        updateCurrentPlayerCurrentScore(newScore);
    }
};

const holdButtonClicked = function () {

    if (gameOver) {
        return;
    }
    
    const newScore = scores[currentPlayer] + currentScores[currentPlayer];
    updateCurrentPlayerScore(newScore);
    updateCurrentPlayerCurrentScore(0);

    if (scores[currentPlayer] >= 100) {
        playerElements[currentPlayer].classList.add('player--winner');
        hideDice();
        gameOver = true;
    
    } else {
        switchPlayer();
    }
};

const showDice = function (diceNumber) {
    
    diceElement.src = `dice-${diceNumber}.png`;
    diceElement.classList.remove('hidden');
};

const hideDice = function () {
    diceElement.classList.add('hidden');
};

const updateCurrentPlayerCurrentScore = function (newScore) {
    updatePlayerCurrentScore(currentPlayer, newScore);
};

const updatePlayerCurrentScore = function (player, newScore) {
    currentScores[player] = newScore;
    currentScorePlayerElements[player].textContent = currentScores[player];
};

const updateCurrentPlayerScore = function (newScore) {
    updatePlayerScore(currentPlayer, newScore);
};

const updatePlayerScore = function (player, newScore) {
    scores[player] = newScore;
    scorePlayerElements[player].textContent = scores[player];
};

const resetAllPlayerCurrentScores = function () {
    
    for (let i = 0; i < currentScores.length; i++) {
        updatePlayerCurrentScore(i, 0);
    }
};

const resetAllPlayerScores = function () {
    
    for (let i = 0; i < currentScores.length; i++) {
        updatePlayerScore(i, 0);
    }
};

const switchPlayer = function () {

    const nextPlayer = (currentPlayer + 1) % numberOfPlayers;
    
    playerElements[currentPlayer].classList.toggle('player--active');
    playerElements[nextPlayer].classList.toggle('player--active');
    
    currentPlayer = nextPlayer;
};

const resetPlayersToDefault = function () {
    
    for(let i = 0; i < playerElements.length; i++) {
        
        const currPlayer = playerElements[currentPlayer];
        currPlayer.classList.remove('player--active');
        currPlayer.classList.remove('player--winner');
    }

    currentPlayer = 0;
    playerElements[currentPlayer].classList.add('player--active');
};


const rollDice = function () {
    return Math.trunc(Math.random() * 6) + 1;
};

mainMethod();