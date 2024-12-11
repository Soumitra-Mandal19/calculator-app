import { useState } from "react";
import styles from "./Calculator.module.css"

export const Calculator = () => {

    const [expression, setExpression] = useState('');
    const [result, setResult] = useState(null);


    const handleButtonClick = (value) => {
        setExpression((prev) => prev + value);
    };

    const calculateExpression = (expression) => {

        const numbers = [];
        const operators = [];
        let currentNumber = '';

        for (let i = 0; i < expression.length; i++) {

            const character = expression[i];

            if ('0123456789'.includes(character)) {
                currentNumber += character;
            }

            else if ('*/+-'.includes(character)) {
                if (currentNumber) {
                    numbers.push(currentNumber);

                    currentNumber = "";
                }
                operators.push(character);
            }
        }

        if (currentNumber) {
            numbers.push(currentNumber);
        }

        for (let i = 0; i < operators.length; i++) {

            if (operators[i] === '*' || operators[i] === '/') {
                const num1 = Number(numbers[i]);
                const num2 = Number(numbers[i + 1]);

                let result = 0;

                if (operators[i] === '*') result = num1 * num2;
                if (operators[i] === '/') result = num1 / num2;

                numbers.splice(i, 2, result.toString());
                operators.splice(i, 1);
                i--;
            }
        }

        let finalResult = Number(numbers[0]);
        for (let i = 0; i < operators.length; i++) {
            const num = Number(numbers[i + 1]);
            if (operators[i] === '+') finalResult += num;
            if (operators[i] === '-') finalResult -= num;
        }
        return finalResult;
    }

    const handleEvaluation = () => {
        const res = calculateExpression(expression);
        setResult(res);
        if (!expression) setResult("Error")
    }

    const handleClear = () => {
        setExpression('');
        setResult(null);
    }

    return (
        <>
            <h1>React Calculator</h1>
            <div className={styles.root}>
                <div>
                    <input type="text" value={expression} className={styles.input} readOnly />
                </div>
                <div className={styles.result}>
                    {result}
                </div>
                <div className={styles.buttonRow}>
                    <button onClick={() => handleButtonClick('7')} className={styles.button}>7</button>
                    <button onClick={() => handleButtonClick('8')} className={styles.button} >8</button>
                    <button onClick={() => handleButtonClick('9')} className={styles.button}>9</button>
                    <button onClick={() => handleButtonClick('+')} className={styles.button}>+</button>
                </div>
                <div className={styles.buttonRow}>
                    <button onClick={() => handleButtonClick('4')} className={styles.button}>4</button>
                    <button onClick={() => handleButtonClick('5')} className={styles.button} >5</button>
                    <button onClick={() => handleButtonClick('6')} className={styles.button}>6</button>
                    <button onClick={() => handleButtonClick('-')} className={styles.button}>-</button>
                </div>
                <div className={styles.buttonRow}>
                    <button onClick={() => handleButtonClick('1')} className={styles.button}>1</button>
                    <button onClick={() => handleButtonClick('2')} className={styles.button} >2</button>
                    <button onClick={() => handleButtonClick('3')} className={styles.button}>3</button>
                    <button onClick={() => handleButtonClick('*')} className={styles.button}>*</button>
                </div>
                <div className={styles.buttonRow}>
                    <button onClick={handleClear} className={styles.button}>C</button>
                    <button onClick={() => handleButtonClick('0')} className={styles.button}>0</button>
                    <button onClick={handleEvaluation} className={styles.button}>=</button>
                    <button onClick={() => handleButtonClick('/')} className={styles.button}>/</button>
                </div>
            </div>
        </>
    );
}