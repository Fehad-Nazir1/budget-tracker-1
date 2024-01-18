let form = document.querySelector('form')

let incomeList = document.querySelector('.income-list')
let expenseList = document.querySelector('.expense-list')

let incomeStat = document.querySelector('.income')
let balanceStat = document.querySelector('.balance')
let expenseStat = document.querySelector('.expense')

let income = 0
let balance = 0
let expense = 0

let transactions = JSON.parse(localStorage.getItem("transactions"))


if(transactions == null){
    transactions = []
}

function addTransactionDom (title, amount, id, time){
    if(amount > 0){
        incomeList.innerHTML += `<li class="income-item" data-id = "${id}">

        <div class="left">
            <p class="tname">${title}</p>
            <p class="time">${time}</p>
        </div>

        <div class="right">
            <span class="amount">
                $${Math.abs(amount)}
            </span>
            <i class="bi bi-trash"></i>
        </div>

    </li>`

    income += Number(amount)
    balance = income + expense
    
    incomeStat.innerHTML = `Income: $ ${income}`
    balanceStat.innerHTML = `Balance: $ ${balance}`

    }else{
        expenseList.innerHTML += `<li class="expense-item" data-id = "${id}">

        <div class="left">
            <p class="tname">${title}</p>
            <p class="time">${time}</p>
        </div>

        <div class="right">
            <span class="amount">
                $${Math.abs(amount)}
            </span>
            <i class="bi bi-trash"></i>
        </div>

    </li>`

    expense += Number(amount)
    balance = income + expense

    expenseStat.innerHTML = `Expense: $ ${Math.abs(expense)}`
    balanceStat.innerHTML = `balance: $ ${balance}`

    }
}


function getTransactions (){

    transactions.forEach(transaction =>{

        addTransactionDom(transaction.source, transaction.amount, transaction.id, transaction.time);
    })
}

getTransactions()

function addTransaction (source, amount){
    const id = Math.floor(Math.random() * 100000)
    const time = new Date()
    const time_ = `${time.toLocaleTimeString() } ${time.toLocaleDateString() }`

    let transaction = {
        id: id,
        source: source,
        amount: amount,
        time: time_
    }

    transactions.push(transaction)
    localStorage.setItem('transactions', JSON.stringify(transactions))

    addTransactionDom (source, amount, id, time_)
}


form.addEventListener('submit', (event)=>{
    event.preventDefault()

    if(form.source.value && form.amount.value){
        addTransaction(form.source.value, form.amount.value)
        form.reset()
    }
})


incomeList.addEventListener('click', event => {

    if(event.target.classList.contains('bi-trash')){

        let id = event.target.parentElement.parentElement.getAttribute('data-id')

        let transactionAmount = 0

        transactions.forEach(transaction => {
            if(transaction.id == id){
                transactionAmount = Number(transaction.amount)
            }
        })

        let filteredTransactions = transactions.filter(transaction => transaction.id != id);

        transactions = filteredTransactions
        localStorage.setItem('transactions', JSON.stringify(transactions))
        event.target.parentElement.parentElement.remove()


            income -= Number(transactionAmount)
            balance = income + expense
            
            incomeStat.innerHTML = `Income: $ ${income}`
            balanceStat.innerHTML = `Balance: $ ${balance}`
            expenseStat.innerHTML = `Expense: $ ${Math.abs(expense)}`

    }
})


expenseList.addEventListener('click', event => {

    if(event.target.classList.contains('bi-trash')){

        let id = event.target.parentElement.parentElement.getAttribute('data-id')

        let transactionAmount = 0

        transactions.forEach(transaction => {
            if(transaction.id == id){
                transactionAmount = Number(transaction.amount)
            }
        })

        let filteredTransactions = transactions.filter(transaction => transaction.id != id);

        transactions = filteredTransactions
        localStorage.setItem('transactions', JSON.stringify(transactions))
        event.target.parentElement.parentElement.remove()


        expense -= Number(transactionAmount)
        balance = income + expense
            
        incomeStat.innerHTML = `Income: $ ${income}`
        expenseStat.innerHTML = `Expense: $ ${Math.abs(expense)}`
        balanceStat.innerHTML = `balance: $ ${balance}`
        
    }
})