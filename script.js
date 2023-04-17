let topDisplay = document.querySelector("#top-display");
let bottomDisplay = document.querySelector("#bottom-display");
let clearButton = document.querySelector("#clear-btn");
let numButtons = document.querySelectorAll(".num-btn");
let opButtons = document.querySelectorAll(".op-btn");

let currentDisplay = topDisplay;

// main
buttonSetup();


// functions
function buttonSetup() {
    // top buttons
    clearButton.addEventListener("click", () => {
        topDisplay.textContent = "0";
        bottomDisplay.textContent = "";
        currentDisplay = topDisplay;
    });

    // num buttons
    numButtons.forEach(btn => {
        if (parseInt(btn.textContent) != NaN) {  // if it is a number...
            btn.addEventListener("click", () => {
                if (currentDisplay.textContent === "0") {
                    currentDisplay.textContent = "";
                };
                currentDisplay.textContent += btn.textContent;
            });
        };
    });

    // op buttons
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, num2, operator) {
    switch(operator) {
        case "+":
            break;
        case "-":
            break;
        case "*":
            break;
        case "/":
            break;
        default:
            console.log("operate() switch ERROR");
    };
}