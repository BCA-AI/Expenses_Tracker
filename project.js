let form = document.getElementById("transactionForm");

let description = document.getElementById("description");

let amount = document.getElementById("amount");

let type = document.getElementById("type");

let category = document.getElementById("category");

let date = document.getElementById("date");

let transactionList = document.getElementById("transactionList");

let balance = document.getElementById("balance");

let income = document.getElementById("income");

let expenses = document.getElementById("expenses");

let filter = document.getElementById("filter");

let transactions = [];


form.addEventListener("submit", function (event) {

    event.preventDefault();

    let transaction = {

        id: Date.now(),

        description: description.value,

        amount: Number(amount.value),

        type: type.value,

        category: category.value,

        date: date.value

    };

    transactions.push(transaction);

    saveData();
    form.reset();

    displayTransactions();

    updateSummary();

});


function displayTransactions() {

    transactionList.innerHTML = "";

    transactions.forEach(function (item) {

        let div = document.createElement("div");

        div.className = "transaction";

        div.innerHTML = `
            <div class="transaction-info">

                <h4>${item.description}</h4>

                <p>${item.category} · ${item.date}</p>

            </div>

            <div class="transaction-right">

                <span class="amount ${item.type}">
                    ${item.type === "income" ? "+" : "-"}₹${item.amount}
                </span>

                <button class="delete-btn" onclick="deleteTransaction(${item.id})">
                    Delete
                </button>

            </div>
        `;

        transactionList.appendChild(div);

    });

}

function deleteTransaction(id) {

    transactions = transactions.filter(function (item) {

        return item.id !== id;

    });

    saveData();
    displayTransactions();

    updateSummary();

}


function updateSummary() {

    let totalIncome = 0;

    let totalExpenses = 0;

    transactions.forEach(function (item) {

        if (item.type === "income") {

            totalIncome = totalIncome + item.amount;

        } else {

            totalExpenses = totalExpenses + item.amount;

        }

    });

    let totalBalance = totalIncome - totalExpenses;

    balance.innerText = "₹" + totalBalance;

    income.innerText = "₹" + totalIncome;

    expenses.innerText = "₹" + totalExpenses;

}

filter.addEventListener("change", function () {

    let selectedType = filter.value;

    transactionList.innerHTML = "";

    transactions.forEach(function (item) {

        if (selectedType === "all" || item.type === selectedType) {

            let div = document.createElement("div");

            div.className = "transaction";

            div.innerHTML = `
                <div class="transaction-info">
                    <h4>${item.description}</h4>
                    <p>${item.category} · ${item.date}</p>
                </div>

                <div class="transaction-right">
                    <span class="amount ${item.type}">
                        ${item.type === "income" ? "+" : "-"}₹${item.amount}
                    </span>

                    <button class="delete-btn" onclick="deleteTransaction(${item.id})">
                        Delete
                    </button>
                </div>
            `;

            transactionList.appendChild(div);

        }

    });

});

function saveData() {

    localStorage.setItem("transactions", JSON.stringify(transactions));

}

function getData() {

    let data = localStorage.getItem("transactions");

    if (data !== null) {

        transactions = JSON.parse(data);

    }

}

getData();

displayTransactions();

updateSummary();