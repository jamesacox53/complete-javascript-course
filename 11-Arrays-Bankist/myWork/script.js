'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (movement, index) {
    let type;
    
    if (movement < 0) {
      type = `withdrawal`;
    } else {  
      type = `deposit`;
    }
  
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
        <div class="movements__value">${movement}€</div>
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

  labelBalance.textContent = `${balance} €`;
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
  labelSumIn.textContent = `${income}€`;

  const outgoing = calcSummaryOutgoing(movements);
  labelSumOut.textContent = `${outgoing}€`;

  const interest = calcSummaryInterest(currentAccount);
  labelSumInterest.textContent = `${interest}€`;

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

  displayMovements(currentAccount.movements);
  
  calcDisplayBalance(currentAccount);
  
  calcDisplaySummary(currentAccount);

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

  currentAccount.movements.push(-amount);
  recieverAccount.movements.push(amount);

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

  clearAllFields();

  containerApp.style.opacity = 0;

  currentAccount = undefined;
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

  const loanAmount = parseInt(inputLoanAmount.value);

  if (Number.isNaN(loanAmount)|| loanAmount <= 0) {
    alert('This is not a correct loan amount.');
    return;
  } 
  
  const acceptLoan = currentAccount.movements.some(movement => movement >= (loanAmount * 0.1));

  if (!acceptLoan) {
    alert('You did not meet the requirements to take out this loan.');
    return;
  }

  currentAccount.movements.push(loanAmount);

  updateUI(currentAccount);

  clearLoanFields();
}

const clearLoanFields = function() {

  inputLoanAmount.value = '';
  inputLoanAmount.blur();
}


btnLoan.addEventListener('click', requestLoanButtonClicked);

// flat and flatMap

const allMovements = accounts.flatMap(account => account.movements);
const overallBalance = allMovements.reduce((accumulator, movement) => accumulator + movement, 0);