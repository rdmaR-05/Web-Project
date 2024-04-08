let totalIncomes = 0;
let totalExpenses = 0;
let monthlyBudget = 0;

function addIncome() {
    const descriptionInput = document.getElementById("income-description");
    const amountInput = document.getElementById("income-amount");
    const categorySelect = document.getElementById("income-category");

    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const category = categorySelect.value;

    if (description.trim() === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    totalIncomes += amount;

    const incomesList = document.getElementById("incomes-list");
    const incomeElement = document.createElement("div");
    incomeElement.classList.add("income");
    incomeElement.innerHTML = `<span>${description}</span> - $${amount.toFixed(2)} (${category})`;
    incomesList.appendChild(incomeElement);

    document.getElementById("total-incomes").textContent = totalIncomes.toFixed(2);
    updateBalance();
    calculateDailyLimit();

    descriptionInput.value = "";
    amountInput.value = "";
}

function addExpense() {
    const descriptionInput = document.getElementById("expense-description");
    const amountInput = document.getElementById("expense-amount");
    const categorySelect = document.getElementById("expense-category");

    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const category = categorySelect.value;

    if (description.trim() === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    totalExpenses += amount;

    const expensesList = document.getElementById("expenses-list");
    const expenseElement = document.createElement("div");
    expenseElement.classList.add("expense");
    expenseElement.innerHTML = `<span>${description}</span> - $${amount.toFixed(2)} (${category})`;
    expensesList.appendChild(expenseElement);

    document.getElementById("total-expenses").textContent = totalExpenses.toFixed(2);
    updateBalance();
    calculateDailyLimit();

    descriptionInput.value = "";
    amountInput.value = "";
}

function setMonthlyBudget() {
    const budgetInput = document.getElementById("monthly-budget");
    monthlyBudget = parseFloat(budgetInput.value);
    calculateDailyLimit();
}

function updateBalance() {
    const balance = totalIncomes - totalExpenses;
    document.getElementById("total-balance").textContent = balance.toFixed(2);
}

function calculateDailyLimit() {
    const daysInMonth = 30; // Assuming 30 days in a month
    const remainingBudget = monthlyBudget - totalExpenses;
    const dailyLimit = remainingBudget / daysInMonth;

    document.getElementById("daily-limit").textContent = dailyLimit.toFixed(2);
}
function openTab(evt, tabName) {
    const tabcontents = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = "none";
    }

    const tabs = document.getElementsByClassName("tab");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");

    if (tabName === 'history') {
        displayHistory();
    }
}

function displayHistory() {
    const historyContent = document.getElementById('history-content');
    historyContent.innerHTML = "";

    // Display income history
    const incomeHistory = document.createElement('div');
    incomeHistory.innerHTML = "<h2>Income History</h2>";
    const incomes = document.getElementsByClassName('income');
    for (let i = 0; i < incomes.length; i++) {
        incomeHistory.appendChild(incomes[i].cloneNode(true));
    }
    historyContent.appendChild(incomeHistory);

    // Display expense history
    const expenseHistory = document.createElement('div');
    expenseHistory.innerHTML = "<h2>Expense History</h2>";
    const expenses = document.getElementsByClassName('expense');
    for (let i = 0; i < expenses.length; i++) {
        expenseHistory.appendChild(expenses[i].cloneNode(true));
    }
    historyContent.appendChild(expenseHistory);
}

// Show default tab on page load
document.getElementById("tracker").style.display = "block";
document.getElementsByClassName("tab")[0].classList.add("active");
