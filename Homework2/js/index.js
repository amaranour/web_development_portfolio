// wait till the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    const historyList = document.getElementById('history');
    const clearHistoryButton = document.getElementById('clearHistory');
    let operation = '';
    let firstOperand = '';
    let secondOperand = '';
    let awaitingOperation = false;
    let lastResultAddedToHistory = null; // Keep track of the last result added to history

    // Update display with the initial state
    function updateDisplay(value) {
        display.value = value;
    }

    // Handle input from keyboard or button press
    function handleInput(input) {
        // Handle numeric and decimal point input
        if ('0123456789.'.includes(input) && !awaitingOperation) {
            firstOperand += input;
            updateDisplay(firstOperand);
        } else if ('0123456789.'.includes(input) && awaitingOperation) {
            secondOperand += input;
            updateDisplay(secondOperand);
        } else if ('+-X/'.includes(input)) {
            // Handle operation input
            if (!firstOperand) firstOperand = '0'; // Start with zero if no operand
            operation = input;
            awaitingOperation = true;
        } else if (input === '=') {
            // Perform calculation
            if (firstOperand && secondOperand && operation) {
                calculate();
            }
        } else if (input === 'C') {
            // Clear calculator
            firstOperand = '';
            secondOperand = '';
            operation = '';
            awaitingOperation = false;
            updateDisplay('');
        }
    }

    // Perform calculation
    function calculate() {
        let num1 = parseFloat(firstOperand);
        let num2 = parseFloat(secondOperand);
        let result;

        switch (operation) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case 'X':
                result = num1 * num2;
                break;
            case '/':
                result = num2 === 0 ? 'Error' : num1 / num2;
                break;
            default:
                result = 'Error';
        }

        if (result !== 'Error') {
            if (result !== lastResultAddedToHistory) { // Only add to history if different from last result
                addToHistory(result);
            }
        }
        updateDisplay(result.toString());
        firstOperand = result.toString(); // Prepare for next operation or calculation
        secondOperand = '';
        operation = '';
        awaitingOperation = false;
    }

    // Add result to history list
    function addToHistory(result) {
        const entry = document.createElement('li');
        entry.textContent = result;
        entry.addEventListener('click', () => {
           // Clicking on history item should input the number if in an acceptable state
           if (firstOperand && awaitingOperation && !secondOperand) {
                // If awaiting second operand but none entered yet
                secondOperand = entry.textContent;
                updateDisplay(secondOperand);
            } else if (!firstOperand || (!awaitingOperation && !secondOperand)) {
                // If starting a new calculation or no operation set yet
                firstOperand = entry.textContent;
                updateDisplay(firstOperand);
            }
        });
        historyList.appendChild(entry);
        lastResultAddedToHistory = result; // Update last added result
    }

     // Add event listener for keyboard input
     display.addEventListener('keydown', (e) => {
        console.log(e.key)
        if ("0123456789+-X/.".includes(e.key) || e.key === 'Enter' || e.key === 'Backspace') {
            e.preventDefault(); // Prevent default to manage input manually

            if (e.key === 'Enter') {
                handleInput('=');
            }  else {
                handleInput(e.key.replace('X', '*').replace('/', '÷'));
            }
        }
    });

    // Add event listener for button clicks
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const btnValue = e.target.textContent;

            if ('0123456789.'.includes(btnValue)) {
                if (awaitingOperation) {
                    secondOperand += btnValue;
                } else {
                    firstOperand += btnValue;
                }
            } else if (btnValue === '-' && firstOperand === '' && !awaitingOperation) {
                firstOperand = btnValue; // Start negative number
            } else if ('+X/'.includes(btnValue) || (btnValue === '-' && firstOperand !== '')) {
                if (firstOperand !== '' && secondOperand !== '') {
                    calculate(); // Perform calculation with previous operands and operation
                }
                operation = btnValue;
                awaitingOperation = true;
            } else if (btnValue === 'C') {
                firstOperand = '';
                secondOperand = '';
                operation = '';
                awaitingOperation = false;
                updateDisplay('');
            } else if (btnValue === '=') {
                if (firstOperand && secondOperand && operation) {
                    calculate();
                }
            }
            console.log("fir: ", firstOperand, " op: ", operation, " sec: ",secondOperand, " await: ",awaitingOperation);
            // Update display after every button press, focusing on the operand being entered or modified
            updateDisplay(awaitingOperation && secondOperand !== '' ? secondOperand : firstOperand);
        });
        
    });

    // Add event listener for clear history button
    clearHistoryButton.addEventListener('click', () => {
        historyList.innerHTML = ''; // Clear history list in the UI
        lastResultAddedToHistory = null; // Reset tracking of last result added
    });
});
