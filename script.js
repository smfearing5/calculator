let topDisplay = document.querySelector("#top-display");
let bottomDisplay = document.querySelector("#bottom-display");
let clearButton = document.querySelector("#clear-btn");
let backspace = document.querySelector("#backspace");
let numButtons = document.querySelectorAll(".num-btn");
let opButtons = document.querySelectorAll(".op-btn");

let currentDisplay = topDisplay;
let opButtonSelected = null;
let overwrite = false;

// main
buttonSetup();


// functions
function buttonSetup() {
    // top buttons
    clearButton.addEventListener("click", () => {
        topDisplay.textContent = "0";
        bottomDisplay.textContent = "";
        topDisplay.previousElementSibling.textContent = "";
        bottomDisplay.previousElementSibling.textContent = "";
        currentDisplay = topDisplay;

        if (opButtonSelected != null) {
            opButtonSelected.setAttribute("class", "btn op-btn");
            opButtonSelected = null;
        }
    });

    backspace.addEventListener("click", () => {
        if (opButtonSelected != null && bottomDisplay.textContent === "") {
            opButtonSelected.setAttribute("class", "btn op-btn");
            opButtonSelected = null;
            currentDisplay = topDisplay;
        }
        else {
            currentDisplay.textContent = currentDisplay.textContent.slice(
                0, currentDisplay.textContent.length - 1
            );
        };

        if (topDisplay.textContent === "") {
            topDisplay.textContent = 0;
        };
    });

    // num buttons
    numButtons.forEach(btn => {
        if (isNaN(btn.textContent) == false) {  // if it is a number...
            btn.addEventListener("click", () => {
                if (currentDisplay.textContent === "0" || overwrite) {
                    overwrite = false;
                    currentDisplay.textContent = "";
                };
                if (currentDisplay.textContent.length < 11) {
                    currentDisplay.textContent += btn.textContent;
                }
            });
        }
        else if (btn.textContent == ".") {
            btn.addEventListener("click", () => {
                if (!currentDisplay.textContent.includes(".")) {
                    currentDisplay.textContent += ".";
                };
            });
        }
        else if (btn.textContent == "+/-") {
            btn.addEventListener("click", () => {
                // if already adding or subtracting, just toggle which
                if (opButtonSelected != null && opButtonSelected.textContent == "+") {
                    opButtonSelected.setAttribute("class", "btn op-btn");
                    opButtonSelected = opButtonSelected.previousElementSibling;
                    opButtonSelected.setAttribute("class", "btn sel-op-btn");
                }
                else if (opButtonSelected != null && opButtonSelected.textContent == "-") {
                    opButtonSelected.setAttribute("class", "btn op-btn");
                    opButtonSelected = opButtonSelected.nextElementSibling;
                    opButtonSelected.setAttribute("class", "btn sel-op-btn");
                }
                // otherwise toggle negative sign
                else {
                    if (currentDisplay.previousElementSibling.textContent == "-") {
                        currentDisplay.previousElementSibling.textContent = "";
                    }
                    else currentDisplay.previousElementSibling.textContent = "-";
                };
            });
        };
    });

    // op buttons
    opButtons.forEach(btn => {
        // operations
        if (btn.textContent != "=") {
            btn.addEventListener("click", () => operatorButton(btn));
        }
        // equals button
        else btn.addEventListener("click", () => {
            if (opButtonSelected != null) equalsButton();
        });
    });
}

function operatorButton(btn) {
    if (opButtonSelected == null) {
        opButtonSelected = btn;
        btn.setAttribute("class", "btn sel-op-btn");
        currentDisplay = bottomDisplay;
    }
}

function equalsButton() {
    // get the right numbers
    let num1 = parseFloat(topDisplay.textContent);
    if (topDisplay.previousElementSibling.textContent == "-") {
        num1 *= -1;
    };

    let num2 = parseFloat(bottomDisplay.textContent);
    if (bottomDisplay.previousElementSibling.textContent == "-") {
        num2 *= -1;
    };

    // execute operation
    let output = operate(num1, num2, opButtonSelected.textContent);

    // adjust output
    if (output < 0) {  // move the negative sign
        output *= -1;
        topDisplay.previousElementSibling.textContent = "-";
    }
    else topDisplay.previousElementSibling.textContent = "";

    if (output > 99999999999) output = "OVERFLOW";

    output = output.toString();
    if (output.length > 11) {
        output = output.slice(0, 11);
    };

    // update display
    bottomDisplay.previousElementSibling.textContent = "";
    topDisplay.textContent = output;
    bottomDisplay.textContent = "";
    currentDisplay = topDisplay;
    overwrite = true;

    // reset operation button
    opButtonSelected.setAttribute("class", "btn op-btn");
    opButtonSelected = null;
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
    if (num2 == 0) return "BLACK HOLE"
    else return num1 / num2;
}

function operate(num1, num2, operator) {
    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            console.log("operate() switch ERROR");
    };
}