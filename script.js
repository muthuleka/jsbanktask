let task = document.getElementById("task");
let username = document.getElementById("userName");
let password = document.getElementById("password");
let button = document.querySelector(".login__btn");
let welcome = document.querySelector(".welcome");
let balance = document.querySelector(".balance__value");

let loanbtn = document.querySelector(".form__btn--loan");
let loanamt = document.querySelector(".form__input--loan-amount");
let reqAmount = document.querySelector(".form__label--loan");

let transfer = document.querySelector('.form__input--to');
let transferamnt = document.querySelector('.form__input--amount');
let transferbutton = document.querySelector('.form__btn--transfer');
let transferLabelamnt = document.querySelector('.fmamt');
let transferLabelaccount = document.querySelector('.form__label');
let movement = document.querySelector('.movements');

let account1 = {
  message: "logged successfully",
  user: "muthuleka",
  pin: 333,
  balance: 6800,
  movements: []
};

let account2 = {
  message: "logged successfully",
  user: "shalini",
  pin: 222,
  balance: 5400,
  movements: []
};

let accounts = [account1, account2];

function findUserAccount(user, pin = null) {
  return accounts.find(acc => acc.user === user && (pin === null || acc.pin === parseInt(pin)));
}

function displayMovements(movements, user) {
  movement.innerHTML = '';
  movements.forEach(mov => {
    let divbar = document.createElement("div");
    let typediv = document.createElement("div");
    let datediv = document.createElement("div");
    let amntdiv = document.createElement("div");

    typediv.innerHTML = mov.type === 'deposit' ? 'Deposit' : 'Withdrawal';
    datediv.innerHTML = new Date().toLocaleDateString();
    amntdiv.innerHTML = `${mov.amount}€ (${user})`;

    divbar.classList.add("movements__row");
    typediv.classList.add("movements__type", mov.type === 'deposit' ? 'movements__type--deposit' : 'movements__type--withdrawal');
    datediv.classList.add("movements__date");
    amntdiv.classList.add("movements__value");

    divbar.appendChild(typediv);
    divbar.appendChild(datediv);
    divbar.appendChild(amntdiv);
    movement.appendChild(divbar);
  });
}

button.addEventListener("click", function (e) {
  e.preventDefault();
  let userAccount = findUserAccount(username.value, password.value);
  if (userAccount) {
    task.style.opacity = 1;
    welcome.innerHTML = `Welcome back, ${userAccount.user}`;
    balance.innerHTML = `${userAccount.balance}$`;
    displayMovements(userAccount.movements, userAccount.user);
  } else {
    console.log("Error: Incorrect username or password.");
  }
});

loanbtn.addEventListener('click', function (e) {
  e.preventDefault();
  let userAccount = findUserAccount(username.value);
  if (userAccount) {
    let money = parseFloat(loanamt.value);
    if (money < 1000) {
      userAccount.balance += money;
      userAccount.movements.push({ type: 'deposit', amount: money });
      balance.innerHTML = `${userAccount.balance}$`;
      displayMovements(userAccount.movements, userAccount.user);
      reqAmount.innerHTML = ""; // Clear any previous error message
    } else {
      reqAmount.innerHTML = "Request amount should be less than 1000";
    }
  }
});

transferbutton.addEventListener('click', function (e) {
  e.preventDefault();
  let senderAccount = findUserAccount(username.value);
  let receiverAccount = findUserAccount(transfer.value);
  if (senderAccount && receiverAccount) {
    let transferAmount = parseFloat(transferamnt.value);
    if (senderAccount.balance >= transferAmount) {
      senderAccount.balance -= transferAmount;
      receiverAccount.balance += transferAmount;
      senderAccount.movements.push({ type: 'withdrawal', amount: transferAmount });
      receiverAccount.movements.push({ type: 'deposit', amount: transferAmount });
      balance.innerHTML = `${senderAccount.balance}$`;
      displayMovements(senderAccount.movements, senderAccount.user);
      // Display receiver's movements separately
      setTimeout(() => {
        displayMovements(receiverAccount.movements, receiverAccount.user);
      }, 1000);
      transferLabelamnt.innerHTML = ""; // Clear any previous error message
    } else {
      transferLabelamnt.innerHTML = "Insufficient balance";
    }
  } else {
    console.log("Error: User not found.");
  }
});

let array = [1, 2, 3, 4, 5, 9];

function processArray(data, callback) {
  setTimeout(function () {
    for (let index = 0; index < array.length; index++) {
      callback(array[index] += data);
    }
  }, 3000);
}

function output(value) {
  console.log(value);
}

processArray(2, output);

