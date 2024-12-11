import { useState } from "react";
import styles from "./Calculator.module.css"

export const Calculator = () => {

 const [expression, setExpression] = useState('');
 const [result, setResult] = useState(null);
 
 // Method to handle button click which accepts a value passed from button and updates the state in expression
 const handleButtonClick = (value) => {
    setExpression((prev)=> prev + value);
 };

// Creating a method that accepts the expression which is a string 
 const calculateExpression = (expression) => {

// Create empty array for storing numbers and operators separately 
//Create a variable to store current number as string
    const numbers = [];
    const operators = [];
    let currentNumber = '';

    //running a for loop for the expression we got from input
    for(let i = 0; i < expression.length; i++){
     //On each iteration on the string put each into variable called as character   
        const character = expression[i];
        // If character has number as string we concat it to a single number string and assign it to a variable called as currentNumber
        if('0123456789'.includes(character)){
            currentNumber += character;
        }
        //In else if condition we check if the character is an operator/symbol inside which we 
        //first check if its a currentNumber which we got from first if block then we push it to numbers array
        // and finally we push the character opeators checked in else if condition to operators array 
        else if('*/+-'.includes(character)) {
            if(currentNumber){
                numbers.push(currentNumber);
         // After pushing currentNumber to numbers array , again make currentNumber as ""empty to store next number       
                currentNumber = "";
            }
            operators.push(character);
        }
    }
    // At last we again check if there is any other number then we push it to numbers array

    if(currentNumber){
        numbers.push(currentNumber);
    }

    // Now running a for loop on operators array and first we calculate the multiplication and divison 
        for(let i =0; i < operators.length;i++){
    // if operators index is having * or / -> we assign num1 as numbers[i] and num2 as numbers[i+1]        
            if(operators[i] === '*' || operators[i] === '/'){
                const num1 = Number(numbers[i]);
                const num2 = Number(numbers[i + 1]);

                let result = 0;

                if(operators[i] === '*') result = num1 * num2;
                if(operators[i] === '/') result = num1 / num2;

                numbers.splice(i, 2, result.toString());
                operators.splice(i, 1);
                //Need to check operator from previous index after splicing array to find if any higher precedence operator is there or not 
                //If after splicing we simply follow i++ of for loop we might loose to check the previous index operator whiv=ch got changed after splicing
                i--;
            }
        }
        // Calculate addition and substraction
        // Assign number at 0 index as finalResult
        let finalResult = Number(numbers[0]);
        for(let i = 0; i < operators.length; i ++){
            const num = Number(numbers[i+1]);
            if(operators[i] === '+') finalResult += num;
            if(operators[i] === '-') finalResult -= num;
        }
        return finalResult;        
 }

 // A method to call the calculateExpression method with the value of expression
 // store the value returned by calling the function into a variable called as res
 // store the value in the state result
 
    const handleEvaluation = () => {
        const res = calculateExpression(expression);
        setResult(res);
        if(!expression) setResult("Error")
    }
// On clicking the button C clear the expression state and set it as empty
//and set the result state to null
    const handleClear = () => {
        setExpression('');
        setResult(null);
    }

//Under return we area showing the value of expression state via input tag in its attribute value
//In button with numbers we are sending the value of each button via onClick to the handleButtonClick function
//In button with C we are passing handleClear function via onClick which handles to clear the input bar 
//In button with = we are passing a function handleEvaluation via OnClick to handle the evalutaion and return the result
    return (
        <>
            <h1>React Calculator</h1>

            <div className={styles.root}>
                <div>
                    <input type="text" value={expression} className={styles.input} readOnly/>
                </div>
                <div className={styles.result}>
                    {result}
                </div>
                
                <div className={styles.buttonRow}>
                    <button onClick={()=> handleButtonClick('7')}  className={styles.button}>7</button>
                    <button onClick={()=> handleButtonClick('8')}  className={styles.button} >8</button>
                    <button onClick={()=> handleButtonClick('9')}  className={styles.button}>9</button>
                    <button onClick={()=> handleButtonClick('+')}  className={styles.button}>+</button>
                </div>
                <div className={styles.buttonRow}>
                    <button onClick={()=> handleButtonClick('4')} className={styles.button}>4</button>
                    <button onClick={()=> handleButtonClick('5')} className={styles.button} >5</button>
                    <button onClick={()=> handleButtonClick('6')} className={styles.button}>6</button>
                    <button onClick={()=> handleButtonClick('-')} className={styles.button}>-</button>
                </div>
                <div className={styles.buttonRow}>
                    <button onClick={()=> handleButtonClick('1')} className={styles.button}>1</button>
                    <button onClick={()=> handleButtonClick('2')} className={styles.button} >2</button>
                    <button onClick={()=> handleButtonClick('3')} className={styles.button}>3</button>
                    <button onClick={()=> handleButtonClick('*')} className={styles.button}>*</button>
                </div>
                <div className={styles.buttonRow}>
                    <button onClick={handleClear} className={styles.button}>C</button>
                    <button onClick={()=> handleButtonClick('0')} className={styles.button}>0</button>
                    <button onClick={handleEvaluation} className={styles.button}>=</button>
                    <button onClick={()=> handleButtonClick('/')} className={styles.button}>/</button>
                </div>
                
            </div>
        </>
    );
}