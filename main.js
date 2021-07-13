function add(a,b) {return a+b;};
function subtract(a,b) {return a-b;};
function multiply(a,b) {return a*b;};
function divide(a,b) {return a/b;};

function operate(operation, a, b) {
    return operation(a,b);
}

const container = document.querySelector(".container");
const calculatorButtons = container.querySelectorAll(".calc-button");
let previousValue;
let operation;

function buttonMasterFunction() {
    const displayScreen = container.querySelector("#display-screen");
    const symbol = this.textContent;
    if (symbol >= '0' && symbol <= '9') {
        displayScreen.value += symbol;
        return;
    }
    if (symbol=="CLEAR") {
        displayScreen.value = '';
        previousValue = null;
        return;
    }
    if (symbol=="=") {
        if (!previousValue) return;
        const result = operate(operation, parseInt(previousValue), parseInt(displayScreen.value));
        previousValue = result;
        displayScreen.value = result;
        return;
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
    previousValue = displayScreen.value;
    displayScreen.value = '';
}

calculatorButtons.forEach((button) => {
    button.addEventListener('click', buttonMasterFunction);
});
