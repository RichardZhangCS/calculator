function add(a,b) {return a+b;};
function subtract(a,b) {return a-b;};
function multiply(a,b) {return a*b;};
function divide(a,b) {return (b!=0)? a/b : "CANNOT DIVIDE BY ZERO";};

function operate(operation, a, b) {
    return operation(a,b);
}

const container = document.querySelector(".container");
const calculatorButtons = container.querySelectorAll(".calc-button");
let previousValue;
let operation;

function buttonMasterFunction() {
    const displayScreen = container.querySelector("#display-screen");
    const pVDisplayScreen = container.querySelector("#pV-display-screen");
    if (pVDisplayScreen.value == "CANNOT DIVIDE BY ZERO") pVDisplayScreen.value = '';
    const symbol = this.textContent;
    if (symbol >= '0' && symbol <= '9') {
        displayScreen.value += symbol;
        return;
    } 
    if (symbol == ".") {
        if (displayScreen.value.includes('.')) return;
        if (!displayScreen.value) displayScreen.value += 0;
        displayScreen.value += symbol;
        return;
    }
    if (symbol == "+/-") {
        if (!displayScreen.value) displayScreen.value += 0;
        if (displayScreen.value.includes('-')) 
            displayScreen.value = displayScreen.value.substr(1);
        else
            displayScreen.value = '-' + displayScreen.value;
        return;
    }

    console.log(symbol);
    if (symbol == "\u232b") {
        const newValue = displayScreen.value.slice(0,-1);
        displayScreen.value = newValue;
        return;
    }
    if (symbol=="C") {
        displayScreen.value = '';
        previousValue = null;
        operation = null;
        pVDisplayScreen.value = '';
        return;
    }
    if (symbol=="=") {
        if (!previousValue || !displayScreen.value) return;
        const result = operate(operation, parseFloat(previousValue), parseFloat(displayScreen.value));
        if (result == "CANNOT DIVIDE BY ZERO") {
            pVDisplayScreen.value = "CANNOT DIVIDE BY ZERO";
            previousValue = null;
            operation = null;
            displayScreen.value = '';
            return;
        }
        //previousValue = result;
        previousValue = null;
        pVDisplayScreen.value = '';
        displayScreen.value = result;
        return;
    }

    // Checks if there are two operands to do an operation (without pressing '=')
    if (previousValue && displayScreen.value) {
        const result = operate(operation, parseFloat(previousValue), parseFloat(displayScreen.value));
        if (result == "CANNOT DIVIDE BY ZERO") {
            pVDisplayScreen.value = "CANNOT DIVIDE BY ZERO";
            previousValue = null;
            operation = null;
            displayScreen.value = '';
            return;
        }
        previousValue = result;
        pVDisplayScreen.value = result+symbol;
        displayScreen.value = '';
    }
    switch (symbol) {
        case '+':
            operation = add;
            break;
        case '-':
            operation = subtract;
            break;
        case '*':
            operation = multiply;
            break;
        case '/':
            operation = divide;
            break;
    }
    if (!displayScreen.value && pVDisplayScreen.value!="CANNOT DIVIDE BY ZERO" && pVDisplayScreen.value) {
        pVDisplayScreen.value = pVDisplayScreen.value.slice(0,-1) + symbol;
    }
    
    if (displayScreen.value) {
        previousValue = displayScreen.value;
        pVDisplayScreen.value = previousValue+symbol;
        displayScreen.value = '';
    }
}

calculatorButtons.forEach((button) => {
    button.addEventListener('click', buttonMasterFunction);
});
