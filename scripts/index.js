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

const displayMovements = (movements, sort = false) => {
  // allow the users to sort their transactions
  const transactions = sort ? movements.slice().sort((a, b) => a - b) : movements;

  containerMovements.innerHTML = "";
  transactions.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${mov.toFixed(2)} €</div>
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
  labelBalance.textContent = `${accounts.balance.toFixed(2)}€`;
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

  labelSumIn.textContent = `${incomes.toFixed(2)} €`;
  labelSumOut.textContent = `${Math.abs(withdrawals).toFixed(2)} €`;
  labelSumInterest.textContent = `${interest.toFixed(2)} €`;
};

const createUsernames = (accs) => {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUsernames(accounts);

// Event Handlers

let currentAccount;

const updateUI = function () {
  // display movements
  displayMovements(currentAccount.movements);
  // display balance
  calcDisplayBalance(currentAccount);
  // display summary
  calcDisplaySummary(currentAccount);
};

btnLogin.addEventListener("click", function (evt) {
  evt.preventDefault();
  currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display UI and a welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

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
    currentAccount.movements.push(requestedAmount);
    updateUI(currentAccount);
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
  displayMovements(currentAccount.movements, !sorted);
  // change the sorted variable
  sorted = !sorted;
});
