// html number buttons
// 0 through to 9
// data-number
// html clear button
// data-reset
// html operator buttons
// data-operator
// html hint display zone
// html working display zone
// html equal sign
// data-equal
// html dot sign
// data-dot

// store inputs
// logic to run inputs
// event listener for number button press
// event listener reset
// event listener for operator
// event listener for equal
// event listener for dot
// "basic 1 + 2 = 3" operations
// on click 1
// store operand 1
// show operand 1 on working display zone
// on click +
// store operator
// show operand 1 and operator in hint display zone
// on click 2
// store operand 2
// show operand 1, operator and operand 2 in hint display zone
// show operand 2 on working display zone.
// on click =
// process stored operand and operators
// show output on working display zone.
// clear working memory and reset calculator
// bonus: backspace button
// bonus: handling for order of operations * and divide?
// TODO bonus: handle decimals
// TODO bonus: handling for brackets
// TODO equal sign needs to repeat the action previous
// TODO equal sign with one operandUnit needs to show operandUnit and then clear it


let workingMemory = [];
let operandUnit = "";
const operatorInstructions = ['add', 'subtract', 'multiply', 'divide'];

const operands = document.querySelectorAll('button[data-number]');
const operators = document.querySelectorAll('button[data-operator]');
const workingDisplay = document.querySelector('.working-display');
const hintDisplay = document.querySelector('.hint-display');
const resetButton = document.querySelector('button[data-utility]');

function getOperandInput(event) {
    return event.target.getAttribute('data-number');
}

function storeOperandAsUnit(input) {
    operandUnit += input;
}

function updateWorkingDisplay() {
    workingDisplay.textContent = operandUnit;
}

function clearWorkingDisplay() {
    workingDisplay.textContent = "";
}

resetButton.addEventListener('click', () => {
    clearOperandUnit();
    clearWorkingMemory();
    clearWorkingDisplay();
})

operands.forEach(node => {
    node.addEventListener('click', event => {
        let input = getOperandInput(event);
        storeOperandAsUnit(input);
        updateWorkingDisplay();
        console.log('operandUnit');
        console.log(operandUnit);
        console.log('workingMemory');
        console.log(workingMemory);
    })
})

operators.forEach(node => {
    node.addEventListener('click', event => {
        let input = event.target.getAttribute('data-operator');

        if (input === 'equal' && (workingMemory.length === 0 || workingMemory.length === 1)) {
            console.log("CHECK ONE")
            return;
        }

        if (workingMemory.length === 0 && operandUnit.length === 0) {
            console.log("CHECK TWO")
            return;

        } // prevents workingMemory being used when there are no operators
          // but there are operands being called

        if (operandUnit.length > 0) {
            workingMemory.push(+operandUnit);
        }
        console.log('operandUnit');
        console.log(operandUnit);

        // TODO separate logic out here into different functions
        // Then set up another branch to handle the condition where "equals" is being pressed
        // multiple times in relation to something like 1 + 2 =
        // pressing = again should return 5, since the previous result was 3 and you add 2.

        if (workingMemory.length === 3) {
            // if (workingMemory.some(hasDecimalPoint)) {
            //     console.log("TRUE");
            // }

            let result = calculate(workingMemory);
            workingMemory = []; // reset working memory;
            workingMemory.push(result);
            console.log('workingMemory')
            console.log(workingMemory);
        }

        clearOperandUnit();
        clearWorkingDisplay();
        storeOperator(input);
        console.log("workingMemory:")
        console.log(workingMemory);
    })
})

function catchNothingToDo() {

}

function storeOperator(input) {
    switch(input) {
        case('add'):
            checkOperatorDuplicateExists();
            workingMemory.push('add');
            break
        case('subtract'):
            checkOperatorDuplicateExists();
            workingMemory.push('subtract');
            break
        case('multiply'):
            checkOperatorDuplicateExists();
            workingMemory.push('multiply');
            break
        case('divide'):
            checkOperatorDuplicateExists();
            workingMemory.push('divide');
            break
        default:
            console.log("ERROR: No operators found.")
            break
    }
}

function checkOperatorDuplicateExists() {
    if (workingMemory.some((element) => operatorInstructions.includes(element))) {
        workingMemory.pop();
    }
}

function clearOperandUnit() {
    operandUnit = "";
}

function clearWorkingMemory() {
    workingMemory = [];
}
function multiply(array) {
    return array.reduce((total, value) => {return total * value}, 1)
}

function add(array) {
    return array.reduce((total, value) => {return total + value}, 0)
}

function subtract(array) {
    return array.reduce((total, value) => {return total - value}, )
}

function divide(array) {
    return array.reduce((total, value) => {return total / value}, )
}

function calculate(array) {
    if (array.includes('add')) {
        let index = array.indexOf('add');
        array.splice(index, 1);
        return add(array);
    }

    if (array.includes('subtract')) {
        let index=array.indexOf('subtract');
        array.splice(index, 1);
        return subtract(array)
    }

    if (array.includes('multiply')) {
        let index = array.indexOf('multiply');
        array.splice(index, 1);
        return multiply(array);
    }

    if (array.includes('divide')) {
        let index = array.indexOf('divide');
        array.splice(index, 1);
        return divide(array);
    }

    return 1;
}

// decimal point feature
// find position of decimal point
// compare dp position to number length
// the difference is constant
// do this for both numbers
// take the highest
// multiply this constant by 10
// this is the correction factor
// apply correction factor to both numbers
// run the equation to get result
// divide result by the correction factor ^ 2 (the count of numbers)

function hasDecimalPoint(number) {
    if (number.includes('.')) return true;
}

function getDecimalPlaces(number) {
    let decimalPointIndex = number.findIndex('.');
    let decimalPlaces = number.length - decimalPointIndex - 1;
    return decimalPlaces;
}

function getHighestDecimalPlace(num1, num2) {
    return num1 > num2 ? num1 : num2;
}

function getCorrectionFactor(num) {
    return num * 10;
}

function startApp() {

}

