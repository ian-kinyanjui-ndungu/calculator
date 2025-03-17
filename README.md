# Calculator Project

This is a functional calculator web app built with HTML, CSS, and JavaScript. It implements all the basic calculator operations and includes extra features like keyboard support and decimal input.

## Features

- Basic math operations: add, subtract, multiply, and divide
- Clear button to reset the calculator
- Backspace button to delete the last input
- Decimal point button for floating-point numbers
- Error handling for division by zero
- Keyboard support for all operations
- Responsive design with a modern interface
- Visual feedback when buttons are pressed

## Usage

1. **Open the calculator in a web browser by opening the index.html file**
2. **Perform calculations:**
   - Click the digit buttons to input numbers
   - Click the operator buttons (+, -, ×, ÷) to select an operation
   - Click equals (=) to see the result
   - Click AC to clear all input
   - Click ⌫ to delete the last digit
   - Use decimal point (.) for floating-point numbers

3. **Keyboard shortcuts:**
   - Numbers: 0-9
   - Operations: + (add), - (subtract), * (multiply), / (divide)
   - Equals: Enter or =
   - Clear: Escape
   - Backspace: Backspace key

## Technical Implementation

- The calculator follows the standard order of operations and evaluates one pair of numbers at a time
- Results with long decimals are rounded to avoid display overflow
- The calculator prevents division by zero with a helpful error message
- Only one decimal point can be entered per number
- When a result is displayed, pressing a new digit starts a new calculation
- The calculator correctly handles consecutive operator button presses by using only the last operator

## Design

The calculator features a modern design with a gradient background using the specified colors:
- #03bbd8 (light blue)
- #4e006d (deep purple)
- #02d3ff (bright blue)

## Files

- `index.html`: The structure of the calculator
- `style.css`: Styling for the calculator
- `calc.js`: JavaScript code for calculator functionality
