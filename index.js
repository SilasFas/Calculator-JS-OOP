class Calculator {

    constructor() {
        this.upperValue = document.querySelector('#upper-number')
        this.resultValue = document.querySelector('#result-number')
        this.reset = 0
    }

    checkLastDigit(input, upperValue, reg) {

        if ((
            !reg.test(input) &&
            !reg.test(upperValue.substr(upperValue.length - 1))
        )) {
            return true
        } else {
            return false
        }
    }

    clearValues() {
        this.upperValue.textContent = '0'
        this.resultValue.textContent = '0'
    }

    //sum method
    sum(n1, n2) {
        return parseFloat(n1) + parseFloat(n2)
    }

    //subtraction method
    subtraction(n1, n2) {
        return parseFloat(n1) - parseFloat(n2)
    }

    //multiplication method
    multiplication(n1, n2) {
        return parseFloat(n1) * parseFloat(n2)
    }

    //division method
    division(n1, n2) {
        return parseFloat(n1) / parseFloat(n2)
    }

    // update values
    refreshValues(total) {
        this.upperValue.textContent = total
        this.resultValue.textContent = total
    }
    // solve the operation
    resolutiton() {
        let upperValueArray = this.upperValue.textContent.split(' ');

        // Perform multiplication and division operations first
        for (let i = 1; i < upperValueArray.length; i += 2) {
            if (upperValueArray[i] === 'x') {
                const result = this.multiplication(upperValueArray[i - 1], upperValueArray[i + 1]);
                upperValueArray.splice(i - 1, 3, result);
                i -= 2;
            } else if (upperValueArray[i] === '/') {
                const result = this.division(upperValueArray[i - 1], upperValueArray[i + 1]);
                upperValueArray.splice(i - 1, 3, result);
                i -= 2;
            }
        }

        let result = parseFloat(upperValueArray[0]);

        // Perform addition and subtraction operations
        for (let i = 1; i < upperValueArray.length; i += 2) {
            if (upperValueArray[i] === '+') {
                result = this.sum(result, parseFloat(upperValueArray[i + 1]));
            } else if (upperValueArray[i] === '-') {
                result = this.subtraction(result, parseFloat(upperValueArray[i + 1]));
            }
        }

        this.refreshValues(result);
    }

    btnPress() {

        let input = this.textContent
        let upperValue = calculator.upperValue.textContent

        //check if it is only numbers
        var reg = new RegExp('^\\d+$')

        // clear the display if there's need for that 
        if (calculator.reset && reg.test(input)) {
            upperValue = '0'
        }

        // clear the reset prop
        calculator.reset = 0

        // clear the display
        if (input == 'AC') {

            calculator.clearValues()
        } else if (input == '=') {

            calculator.resolutiton()
        } else {
            //check weather there's need to add or not 
            if (calculator.checkLastDigit(input, upperValue, reg)) {
                return false
            }
            // add black splace to the operators
            if (!reg.test(input)) {
                input = ` ${input} `
            }

            if (upperValue == '0') {
                if (reg.test(input)) {
                    calculator.upperValue.textContent = input
                }

            } else {
                calculator.upperValue.textContent += input
            }
        }
    }
}

// Create a new object
let calculator = new Calculator

// select all buttons
let buttons = Array.from(document.querySelectorAll('.btn'));

//Map all buttons and add event listeners
buttons.map((button) => {
    button.addEventListener('click', calculator.btnPress);
});