// Initial User Data
const account1 = {
  owner: "Kevin Wessa",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates2: [
    "2022-07-01T13:15:33.035Z",
    "2022-08-30T09:48:16.867Z",
    "2022-10-25T06:04:23.907Z",
    "2023-01-01T14:18:46.235Z",
    "2023-03-02T16:33:06.386Z",
    "2023-04-15T14:43:26.374Z",
    "2023-05-25T18:49:59.371Z",
    "2023-06-04T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Christine Wessa",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2022-05-01T13:15:33.035Z",
    "2022-06-30T09:48:16.867Z",
    "2022-08-25T06:04:23.907Z",
    "2022-10-25T14:18:46.235Z",
    "2023-01-02T16:33:06.386Z",
    "2023-02-15T14:43:26.374Z",
    "2023-03-25T18:49:59.371Z",
    "2023-04-04T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Matt Worthen",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2022-06-01T13:15:33.035Z",
    "2022-07-30T09:48:16.867Z",
    "2022-09-25T06:04:23.907Z",
    "2022-11-30T14:18:46.235Z",
    "2023-02-02T16:33:06.386Z",
    "2023-03-15T14:43:26.374Z",
    "2023-04-25T18:49:59.371Z",
    "2023-05-04T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: "Kyle Fennesy",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2022-08-01T13:15:33.035Z",
    "2022-09-30T09:48:16.867Z",
    "2022-11-25T06:04:23.907Z",
    "2023-01-30T14:18:46.235Z",
    "2023-03-02T16:33:06.386Z",
    "2023-05-15T14:43:26.374Z",
    "2023-06-25T18:49:59.371Z",
    "2023-08-04T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4];

export default accounts;
