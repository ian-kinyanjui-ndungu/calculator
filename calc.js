// Basic math functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Division by zero";
    }
    return a / b;
}

// Main operate function
function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    
    switch (operator) {
        case 'add':
            return add(a, b);
        case 'subtract':
            return subtract(a, b);
        case 'multiply':
            return multiply(a, b);
        case 'divide':
            return divide(a, b);
        default:
            return null;
    }
}

// Calculator class to handle operations
class Calculator {
    constructor() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
        this.hasDecimal = false;
    }
    
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
        this.hasDecimal = false;
    }
    
    delete() {
        if (this.currentOperand === '0' || this.currentOperand.length === 1) {
            this.currentOperand = '0';
            this.hasDecimal = false;
            return;
        }
        
        if (this.currentOperand[this.currentOperand.length - 1] === '.') {
            this.hasDecimal = false;
        }
        
        this.currentOperand = this.currentOperand.slice(0, -1);
    }
    
    appendNumber(number) {
        if (number === '.' && this.hasDecimal) return;
        
        if (number === '.') {
            this.hasDecimal = true;
        }
        
        if (this.shouldResetScreen) {
            this.currentOperand = number === '.' ? '0.' : number;
            this.shouldResetScreen = false;
            this.hasDecimal = number === '.';
            return;
        }
        
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }
    
    chooseOperation(operation) {
        if (this.currentOperand === 'Error: Division by zero') return;
        
        if (this.operation && !this.shouldResetScreen) {
            this.compute();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.shouldResetScreen = true;
    }
    
    compute() {
        if (this.operation == null || this.shouldResetScreen || this.currentOperand === 'Error: Division by zero') return;
        
        const result = operate(this.operation, this.previousOperand, this.currentOperand);
        
        if (typeof result === 'string') {
            this.currentOperand = result;
        } else {
            // Round results to avoid floating point issues
            this.currentOperand = Math.round(result * 100000) / 100000;
            this.currentOperand = this.currentOperand.toString();
        }
        
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetScreen = true;
        this.hasDecimal = this.currentOperand.includes('.');
    }
    
    updateDisplay() {
        document.querySelector('.current-operand').textContent = this.currentOperand;
        
        if (this.operation) {
            let operationSymbol;
            switch (this.operation) {
                case 'add': operationSymbol = '+'; break;
                case 'subtract': operationSymbol = '−'; break;
                case 'multiply': operationSymbol = '×'; break;
                case 'divide': operationSymbol = '÷'; break;
            }
            document.querySelector('.previous-operand').textContent = `${this.previousOperand} ${operationSymbol}`;
        } else {
            document.querySelector('.previous-operand').textContent = '';
        }
    }
}

// Initialize calculator
const calculator = new Calculator();

// Add event listeners for all buttons
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.dataset.number);
        calculator.updateDisplay();
    });
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.dataset.operator);
        calculator.updateDisplay();
    });
});

document.querySelector('.equals').addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

document.querySelector('.clear').addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

document.querySelector('.decimal').addEventListener('click', () => {
    calculator.appendNumber('.');
    calculator.updateDisplay();
});

document.querySelector('.backspace').addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

// Add keyboard support
document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') {
        calculator.appendNumber(event.key);
    } else if (event.key === '.') {
        calculator.appendNumber('.');
    } else if (event.key === '+') {
        calculator.chooseOperation('add');
    } else if (event.key === '-') {
        calculator.chooseOperation('subtract');
    } else if (event.key === '*') {
        calculator.chooseOperation('multiply');
    } else if (event.key === '/') {
        event.preventDefault(); // Prevent browser from opening search
        calculator.chooseOperation('divide');
    } else if (event.key === 'Enter' || event.key === '=') {
        calculator.compute();
    } else if (event.key === 'Backspace') {
        calculator.delete();
    } else if (event.key === 'Escape') {
        calculator.clear();
    }
    calculator.updateDisplay();
});

// Initialize display
calculator.updateDisplay();