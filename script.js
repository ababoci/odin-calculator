let button_array = [7, 8, 9, "/",
6, 5, 4, "*",
3, 2, 1, "+",
0, ".", "=", "-"]

const container = document.querySelector(".outer-container")
const display = document.querySelector(".display")

const clear = document.querySelector(".clear")
clear.addEventListener('click', function (event) {
    num_1 = undefined;
    num_2 = undefined;
    operator = undefined;
    displayText = "";
    display.innerText = displayText;

})

const backspace = document.querySelector(".backspace")
backspace.addEventListener('click', function (event) {
    displayText = displayText.slice(0, -1);
    display.innerText = displayText;
})

let num_1;
let operator;
let num_2;
let displayText = "";

function operate(num_1, num_2, operator) {
    num_1 = Number(num_1);
    num_2 = Number(num_2);
    if (operator === "+") return add(num_1, num_2);
    else if (operator === "-") return subtract(num_1, num_2);
    else if (operator === "*") return multiply(num_1, num_2);
    else if (operator === "/") {
        if (num_2 === 0) return "Cannot divide by zero!";
        return divide(num_1, num_2);
    }
}

function add(num_1, num_2) {
    return num_1 + num_2;
}

function subtract(num_1, num_2) {
    return num_1 - num_2;
}

function multiply(num_1, num_2) {
    return num_1 * num_2;
}

function divide(num_1, num_2) {
    return num_1 / num_2;
}

button_array.forEach(element => {
    let div = document.createElement('div');
    div.classList.add('button');
    if (!["+", "-", "*", "/", "="].includes(element)) {
        div.addEventListener('click', function (event) {
            if (element === "." && displayText.includes(element)){
                return;
            }
            displayText = displayText + element
            display.innerText = displayText;
        });
    }
    else if (element !== "=") {
        div.classList.add('operator');
        div.addEventListener('click', function(event) {
            if (display.innerText !== "") {
                if (num_1) {
                    num_1 = operate(num_1, display.innerText, operator)
                    displayText = num_1;
                    display.innerText = displayText;
                    operator = element;
                    console.log("num1:", num_1, "\noperator:", element);
                    displayText = "";
                }
                else {
                    operator = element;
                    num_1 = display.innerText;
                    console.log("num1:", num_1, "\noperator:", operator);
                    displayText = "";
                    display.innerText = displayText;
                }
            }
            
        })
    }
    else { // =
        div.addEventListener('click', function(event) {
            if (num_1) {
                displayText = operate(num_1, display.innerText, operator);
                display.innerText = displayText;
                num_1 = undefined;
                num_2 = undefined;
                operator = undefined;
                displayText = "";
            }
        })
    }
    div.textContent = element;
    container.appendChild(div);
})



