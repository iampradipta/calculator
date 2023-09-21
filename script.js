const calculatorDisplay = document.querySelector('h1')
const inputBtns = document.querySelectorAll('button')
const clearBtn = document.getElementById('clear-btn')

let firstValue = 0
let operatorValue = ''
let awaitingNextValue = false


function sendNumberValue(number) {
    //replace current display value if first value entered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        const displayNumber = calculatorDisplay.textContent
        calculatorDisplay.textContent = displayNumber === '0' ? number : displayNumber + number
    }
}

inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value))
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value))
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal())
    }
})

//calculate first and second values 
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

    '=': (firstNumber, secondNumber) => secondNumber
}
function useOperator(operator) {

    const currentValue = Number(calculatorDisplay.textContent)
    if (currentValue && awaitingNextValue) {
        operatorValue = operator
        return
    };
    if (!firstValue) {
        firstValue = currentValue
    } else {

        const calculation = calculate[operatorValue](firstValue, currentValue)
        calculatorDisplay.textContent = calculation
        firstValue = calculation
    }
    //ready for next value
    awaitingNextValue = true
    operatorValue = operator

}


//reset display
function resetAll() {
    firstValue = 0
    operatorValue = ''
    awaitingNextValue = false
    calculatorDisplay.textContent = '0'
}
clearBtn.addEventListener('click', resetAll)

//decimal
function addDecimal() {
    //
    if (awaitingNextValue) return;
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = calculatorDisplay.textContent + '.'
    }
}