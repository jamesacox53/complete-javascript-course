'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2021-10-12T14:11:59.604Z',
    '2021-10-13T17:01:17.194Z',
    '2021-10-14T10:36:17.929Z',
    '2021-10-15T13:35:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Creating DOM Elements

const displayMovements = function (currentAccount, sort=false) {
  containerMovements.innerHTML = '';

  const movements = currentAccount.movements;
  
  const movementsOrdered = getMovementsInOrder(movements, sort);

  movementsOrdered.forEach(function (movement, index) {
    let type;
    
    const movementDate = new Date(currentAccount.movementsDates[movements.indexOf(movement)]);

    if (movement < 0) {
      type = `withdrawal`;
    } else {  
      type = `deposit`;
    }
  
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
        <div class="movements__date">${getMovementDateAndTimeString(movementDate)}</div>
        <div class="movements__value">${formatMoneyDisplay(movement)}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

// displayMovements(account1.movements);

// The map Method

const eurToUsd = 1.1;

const movementsUSD = movements.map(movement => movement * eurToUsd);

// console.log(movements);
// console.log(movementsUSD);

// Computing Usernames

const createUsernames = function (accounts) {

  accounts.forEach(function (account) {
    account.username = createUsername(account.owner);
  });
}

const createUsername = function (user) {
  
  const usersNames = user.split(' ');
  const usersNamesFirstLettersLowerCase = usersNames.map(name => name[0].toLowerCase());
  const username = usersNamesFirstLettersLowerCase.join('');
  
  return username;
}

createUsernames(accounts);
// console.log(accounts);

// The filter Method

const deposits = movements.filter(move => move > 0);

const withdrawals = movements.filter(move => move < 0);

// console.log(movements);
// console.log(deposits);
// console.log(withdrawals);

// The reduce Method

const balance = movements.reduce((accumulation, current) => accumulation + current, 0);

// console.log(balance);

const calcDisplayBalance = function (currentAccount) {

  const movements = currentAccount.movements;

  const balance = calcBalance(movements);

  updateBalance(currentAccount, balance);
}

const updateBalance = function(currentAccount, balance) {
  
  currentAccount.balance = balance;

  labelBalance.textContent = formatMoneyDisplay(balance);
}

const calcBalance = function (movements) {

  const balance = movements.reduce((accumulation, movement) => accumulation + movement, 0);

  return balance;
}

// calcDisplayBalance(account1.movements);

// The Magic of Chaining Methods

const calcDisplaySummary = function (currentAccount) {
  
  const movements = currentAccount.movements;

  const income = calcSummaryIncome(movements);
  labelSumIn.textContent = formatMoneyDisplay(income);

  const outgoing = calcSummaryOutgoing(movements);
  labelSumOut.textContent = formatMoneyDisplay(outgoing);

  const interest = calcSummaryInterest(currentAccount);
  labelSumInterest.textContent = formatMoneyDisplay(interest);

}

const calcSummaryIncome = function (movements) {
  const incomes = movements.filter(move => move > 0);
  const income = incomes.reduce((accumulator, current) => accumulator + current, 0);

  return income;
}

const calcSummaryOutgoing = function (movements) {
  const outgoings = movements.filter(move => move < 0);
  const outgoing = outgoings.reduce((accumulator, current) => accumulator + current, 0);

  return Math.abs(outgoing);
}

const calcSummaryInterest = function (currentAccount) {

  const movements = currentAccount.movements;
  const interestRate = currentAccount.interestRate;

  const incomes = movements.filter(move => move > 0);
  const interests = incomes.map(income => income * ((interestRate * 1.0)/100)).filter(interest => interest >= 1);
  const interest = interests.reduce((accumulator, current) => accumulator + current, 0);

  return interest;
}

// calcDisplaySummary(account1.movements);

// Implementing Login

let currentAccount;

const loginButtonClicked = function (event) {
  //prevent form from submitting
  event.preventDefault();

  const tempAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  const validLogin = checkAndActionIfAccountValid(tempAccount);

  if (!validLogin) {
    return;
  }

  // valid login
  currentAccount = tempAccount;

  displayBankingApplication (currentAccount);
}

const displayBankingApplication = function (currentAccount) {
  
  clearAllFields();

  displayUIAndWelcomeMessage(currentAccount);
  
  updateUI(currentAccount);
}

const updateUI = function (currentAccount) {

  setCurrentDateField();
  
  displayMovements(currentAccount);
  
  calcDisplayBalance(currentAccount);
  
  calcDisplaySummary(currentAccount);

  startLogoutTimer();
}

const clearLoginFields = function () {
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  inputLoginPin.blur();
}

const displayUIAndWelcomeMessage = function (currentAccount) {
  const firstName = currentAccount.owner.split(' ')[0];
  labelWelcome.textContent = `Welcome back, ${firstName}`;

  containerApp.style.opacity = 100;
}

const checkAndActionIfAccountValid = function (currentAccount) {

  if (currentAccount === undefined || currentAccount === null) {
    invalidLogin();
    return false;
  }

  const pin = parseInt(inputLoginPin.value, 10);

  if (Number.isNaN(pin)) {
    invalidLogin();
    return false;

  }

  if (currentAccount.pin !== pin) {
    invalidLogin();
    return false;
  }

  return true;
}

const invalidLogin = function () {
  alert('This Username/PIN is invalid.');
}

btnLogin.addEventListener('click', loginButtonClicked);

// Implementing Transfers


const transferMoneyButtonClicked = function (event) {
  
  //prevent form from submitting
  event.preventDefault();

  const recieverAccountUsername = inputTransferTo.value;
  const recieverAccount = accounts.find(account => account.username === recieverAccountUsername);

  const amount = Number(inputTransferAmount.value);

  const transferredMoney = transferMoney(recieverAccount, amount);
  
  if (!transferredMoney) {
    return;
  }

  clearTransferFields();

  updateUI(currentAccount);
}

const transferMoney = function(recieverAccount, amount) {

  if (currentAccount === undefined) {
    return;
  }
  
  const exists = checkAndActionIfAccountExists(recieverAccount);

  if (!exists) {
    return false;
  }
  
  const isSameAccount = checkAndActionIfSameAccount(recieverAccount);
  
  if (isSameAccount) {
    return false;
  }

  if (Number.isNaN(amount) || amount <= 0 || amount > currentAccount.balance) {
    alert('This transfer amount is invalid.');
    return false;
  }

  const currentDateString = (new Date()).toISOString();

  currentAccount.movements.push(-amount);
  currentAccount.movementsDates.push(currentDateString);
  
  recieverAccount.movements.push(amount);
  recieverAccount.movementsDates.push(currentDateString);

  return true;
}

const checkAndActionIfSameAccount = function (recieverAccount) {
    if (recieverAccount.username === currentAccount.username) {
      alert('You cannot transfer money to your own account.');
      return true;
    }
    return false;
}

const checkAndActionIfAccountExists = function (currentAccount) {
  if (currentAccount === undefined || currentAccount === null) {
    alert('This user does not exist, please enter a valid user name.')
    return false;
  }

  return true;
}

const clearTransferFields = function () {
  inputTransferTo.value = '';
  inputTransferAmount.value = '';
  inputTransferAmount.blur();
}

btnTransfer.addEventListener('click', transferMoneyButtonClicked);

// The findIndex Method

const closeAccountButtonClicked = function (event) {

  //prevent form from submitting
  event.preventDefault();

  if (currentAccount === undefined) {
    return;
  }

  const inputUsername = inputCloseUsername.value;
  const inputPIN = inputClosePin.value;
  
  const currentAccountDeleted = deleteCurrentAccount(inputUsername, inputPIN);

  if (!currentAccountDeleted) {
    return;
  }

  logOutCurrentUser();
}

const deleteCurrentAccount = function (inputUsername, inputPIN) {

  const isCorrectDetails = checkAndActionIfCurrentAccount(inputUsername, inputPIN);
  
  if (!isCorrectDetails) {
    return false;
  }

  const index = accounts.findIndex(account => account.username === currentAccount.username);

  if (index === undefined || index === null || index === -1) {
    alert('The current account has already been deleted.');
    return false;
  }

  accounts.splice(index , 1);
  return true;
} 

const checkAndActionIfCurrentAccount = function (inputUsername, inputPINString) {
  
  const pin = parseInt(inputPINString);

  if (Number.isNaN(pin) || currentAccount.username !== inputUsername || currentAccount.pin !== pin) {
    alert('This is not the correct Username/PIN.');
    return false;
  } 

  return true;  
}

const clearCloseAccountFields = function () {
  
  inputCloseUsername.value = '';
  inputClosePin.value = '';
  inputClosePin.blur();
}

const clearAllFields = function () {

  clearLoginFields();

  clearTransferFields();

  clearCloseAccountFields();

  clearLoanFields();

}

btnClose.addEventListener('click', closeAccountButtonClicked);

// some and every

const requestLoanButtonClicked = function (event) {

  //prevent form from submitting
  event.preventDefault();
  
  if (currentAccount === undefined) {
    return;
  }

  const loanAmount = getLoanAmount(inputLoanAmount.value);
  

  if (Number.isNaN(loanAmount)|| loanAmount <= 0) {
    alert('This is not a correct loan amount.');
    return;
  } 
  
  const acceptLoan = currentAccount.movements.some(movement => movement >= (loanAmount * 0.1));

  if (!acceptLoan) {
    alert('You did not meet the requirements to take out this loan.');
    return;
  }

  const currentDateString = (new Date()).toISOString();

  pauseLogOutTimer();
  setTimeout(performLoan, 5000, loanAmount, currentDateString);
}

const clearLoanFields = function() {

  inputLoanAmount.value = '';
  inputLoanAmount.blur();
}


btnLoan.addEventListener('click', requestLoanButtonClicked);

// flat and flatMap

const allMovements = accounts.flatMap(account => account.movements);
const overallBalance = allMovements.reduce((accumulator, movement) => accumulator + movement, 0);

// Sorting Arrays

const getMovementsInOrder = function(movements, sort) {
  const ret = movements.slice();

  if (sort) {
    ret.sort((a, b) => a - b);
  }

  return ret;
}

let sorted = false;

const sortButtonClicked = function (event) {

  event.preventDefault();

  displayMovements(currentAccount, !sorted);

  sorted = !sorted;

}

btnSort.addEventListener('click', sortButtonClicked);

// Math and Rounding

const getLoanAmount = function (value) {

return Math.floor(value);
}

const formatMoneyDisplay = function(amount) {
  
  const amountFormat = new Intl.NumberFormat(currentAccount.locale, {
    style: 'currency',
    currency: currentAccount.currency,
  }).format(amount);
  return amountFormat;
}

// Adding Dates to "Bankist" App

const setCurrentDateField = function() {
  const now = new Date();
  const currDateAndTime = formatDateAndTime(now);
  
  labelDate.textContent = currDateAndTime;
}

const formatDateAndTime = function (date) {

  const dateOptions = {
    hour:'2-digit',
    minute:'2-digit',
    day:'2-digit',
    month:'2-digit',
    year:'numeric'
  };
  
  const dateString = (new Intl.DateTimeFormat(currentAccount.locale, dateOptions)).format(date);

  return dateString;
}

// Operations With Dates

const getTimeStringFromDate = function (date) {

  const timeOptions = {
    hour:'2-digit',
    minute:'2-digit'
  };
  
  const timeString = (new Intl.DateTimeFormat(currentAccount.locale, timeOptions)).format(date);

  return timeString;
}


const getMovementDateAndTimeString = function (movementDate) {

  const now = new Date();

  const numDaysPassed = Math.round(Math.abs(now - movementDate) / (1000 * 60 * 60 * 24));

  if (numDaysPassed === 0) {
    return `Today at ${getTimeStringFromDate(movementDate)}`;
  }

  if (numDaysPassed === 1) {
    return `Yesterday at ${getTimeStringFromDate(movementDate)}`;
  }

  if (numDaysPassed <= 7) {
    return `${numDaysPassed} days ago at ${getTimeStringFromDate(movementDate)}`;
  }

  return formatDateAndTime(movementDate);
}

// Internationalizing Dates (Intl)

const locale = navigator.language;

// Internationalizing Numbers (Intl)

const currency = 'EUR';

// Timers: setTimeout and setInterval

const performLoan = function (loanAmount, currentDateString) {
  
  currentAccount.movements.push(loanAmount);
  currentAccount.movementsDates.push(currentDateString);

  updateUI(currentAccount);

  clearLoanFields();
  unPauseLogOutTimer();
}

// Implementing a Countdown Timer

let logOutTimer;
let logOutTimerPaused;

const startLogoutTimer = function () {

  let time = 600;

  stopLogOutTimer();

  logOutTimerPaused = false;

  const tick = function () {
    
    if (logOutTimerPaused) {
      return;
    }

    const timeString = getTimeStringMinutesSecondsFromDate(new Date(time * 1000));
    labelTimer.textContent = timeString;

    if (time <= 0) {
      logOutCurrentUser();
      return;
    }

    time--;

  }

  tick();

  logOutTimer = setInterval(tick, 1000);
}

const logOutCurrentUser = function () {
  
  stopLogOutTimer();

  clearAllFields();

  containerApp.style.opacity = 0;

  currentAccount = undefined;

  labelWelcome.textContent = `Log in to get started`;
}

const stopLogOutTimer = function () {
  if (logOutTimer !== undefined) {
    clearTimeout(logOutTimer);
  }

  logOutTimer = undefined;
}

const getTimeStringMinutesSecondsFromDate = function (date) {

  const timeOptions = {
    second:'2-digit',
    minute:'2-digit'
  };
  
  const timeString = (new Intl.DateTimeFormat(currentAccount.locale, timeOptions)).format(date);

  return timeString;
}

const pauseLogOutTimer = function() {
  logOutTimerPaused = true;
}

const unPauseLogOutTimer = function() {
  logOutTimerPaused = false;
}