function add(a,b) {return a+b;};
function subtract(a,b) {return a-b;};
function multiply(a,b) {return a*b;};
function divide(a,b) {return a/b;};

function operate(operation, a, b) {
    return operation(a+b);
}

const container = document.querySelector(".container");
const calculatorButtons = container.querySelectorAll(".calc-button");
calculatorButtons.forEach((button) => {
    
});