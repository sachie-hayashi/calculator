'use strict';

const display = document.getElementById('display');
const operatorList = ['+', '−', '×', '÷'];
let firstValue;
let secondValue;
let operator;
let previousKeyType;

function keyContent(i) {
    let displayedNum = display.textContent;

    if (!isNaN(i)) {
        if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
            display.textContent = String(i);
        } else {
            display.textContent = String(displayedNum + i);
        }
        previousKeyType = 'number';
    } else if (i === '.') {
        if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
            display.textContent = '0.'
        } else if (!displayedNum.includes('.')){
            display.textContent = displayedNum + '.';
        }
        previousKeyType = 'decimal';
    } else if (operatorList.includes(i)) {  // if '+', '−', '×' or '÷' pressed
        if (previousKeyType === 'operator') {
            operator = i;
        } else if (firstValue && operator) {
            secondValue = parseFloat(displayedNum);
            display.textContent = calculate();
            firstValue = calculate();
            operator = i;
        } else {
            firstValue = parseFloat(displayedNum);
            operator = i;
        }
        previousKeyType = 'operator';
    } else if (i === '%') {
        display.textContent = parseFloat(displayedNum) / 100;
    } else if (i === '+/−') {
        display.textContent = parseFloat(displayedNum) * -1;
    } else if (i === '=') {
        if (firstValue && previousKeyType !== 'operator') {
            secondValue = parseFloat(displayedNum);
            display.textContent = calculate();
        }
        firstValue = null;
        operator = null;
        previousKeyType = 'calculate';
    } else if (i === 'C') {
        display.textContent = '0';
        firstValue = null;
        operator = null;
        secondValue = null;
        previousKeyType = null;
        displayedNum = '0';
    }
}

function calculate() {
    let result;
    
    if (operator === '+') {
        result = firstValue + secondValue;
    } else if (operator === '−') {
        result = firstValue - secondValue;
    } else if (operator === '×') {
        result = firstValue * secondValue;
    } else if (operator === '÷'){
        result = firstValue / secondValue;
    }

    return result;
}