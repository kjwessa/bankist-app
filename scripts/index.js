"use strict";

import accounts from "./accounts.js";

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmounts = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//* Functions
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const formatMovementDate = (date) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const displayMovements = (acc, sort = false) => {
  // clear the container
  containerMovements.innerHTML = "";
  // allow the users to sort their transactions
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date);
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const eurToUSD = 1.1;

const calcDisplayBalance = (accounts) => {
  accounts.balance = accounts.movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);
  labelBalance.textContent = formatCur(accounts.balance, accounts.locale, accounts.currency);
};

const calcDisplaySummary = (accounts) => {
  const incomes = accounts.movements
    .filter((mov) => {
      return mov > 0;
    })
    .map((mov) => {
      return mov + eurToUSD;
    })
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  const withdrawals = accounts.movements
    .filter((mov) => {
      return mov < 0;
    })
    .map((mov) => {
      return mov + eurToUSD;
    })
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  const interest = accounts.movements
    .filter((mov) => {
      return mov > 0;
    })
    .map((deposit) => {
      return (deposit * accounts.interestRate) / 100;
    })
    .filter((int) => {
      return int >= 1;
    })
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  labelSumIn.textContent = formatCur(incomes, accounts.locale, accounts.currency);
  labelSumOut.textContent = formatCur(withdrawals, accounts.locale, accounts.currency);
  labelSumInterest.textContent = formatCur(interest, accounts.locale, accounts.currency);
};

const createUsernames = (accounts) => {
  accounts.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUsernames(accounts);

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // in each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;
    // when 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }
    // reduce by 1 second every time
    time--;
  };

  // set time to 5 minutes
  let time = 600;
  // initially call the timer
  tick();
  // call the timer every second
  const timer = setInterval(tick, 1000);
  return timer;
};

// Event Handlers

let currentAccount, timer;

const updateUI = function () {
  // display movements
  displayMovements(currentAccount);
  // display balance
  calcDisplayBalance(currentAccount);
  // display summary
  calcDisplaySummary(currentAccount);
};

// FAKE ALWAYS LOGGED IN
currentAccount = accounts[0]; //?
updateUI(currentAccount);
containerApp.style.opacity = 100;

// Create current date

btnLogin.addEventListener("click", function (evt) {
  evt.preventDefault();
  currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display UI and a welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = 100;

    // Create current date
    const now = new Date();

    const locale = navigator.language;

    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };

    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    if (timer) clearInterval(timer);

    // Start the timer
    timer = startLogOutTimer();

    // update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (evt) {
  evt.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find((acc) => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (evt) {
  // Prevent the form from submitting
  evt.preventDefault();
  // Get the amount of the loan and round down to the nearest integer
  const requestedAmount = Math.floor(inputLoanAmounts.value);
  if (requestedAmount > 0 && currentAccount.movements.some((mov) => mov >= requestedAmount * 0.1)) {
    setTimeout(function () {
      currentAccount.movements.push(requestedAmount);

      // add loan date

      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmounts.value = "";
});

btnClose.addEventListener("click", function (evt) {
  evt.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // delete account
    const index = accounts.findIndex((acc) => acc.username === currentAccount.username);
    accounts.splice(index, 1);

    // hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;

btnSort.addEventListener("click", function (evt) {
  evt.preventDefault();
  // change the UI
  displayMovements(currentAccount, !sorted);
  // change the sorted variable
  sorted = !sorted;
});
