import './App.css';
import React, {useState} from 'react';

let cOp = 0;
//var sum = [];
//let aux = '';

function App() {
  const[reg='', setReg] = useState(); //reg = registro (registro de lo que se ha presionado)
  const[currentVar='0', setCurrentVar] = useState(); //currentVar = valor actualmente presionado
  //const ct = reg.trim();

  const isOperator = (event) => {
    return /[*/+-]/.test(event);
  };

  const buttonPress = (event) => {
    if (event === 'clear') {
      setReg('');
      setCurrentVar(0);
      cOp = 0;
    } else if (isOperator(event)) {
      if (cOp === 0) {
        setReg(reg + ' ' + event + ' ');
        setCurrentVar(event);
        cOp++;
        console.log(cOp);
      } else {
        if (event !== '-') {
          if (cOp === 1) {
            setReg(reg.substring(0, reg.length -  3) + ' ' + event + ' ');
            setCurrentVar(event);
          } else {
            setReg(reg.substring(0, reg.length - 5) + ' ' + event + ' ');
            setCurrentVar(event);
            cOp = 1;
            console.log(cOp);
          }
        } else {
          if (cOp < 2 && reg.charAt(reg.length - 3) !== '-') {
            setReg(reg + ' ' + event + ' ');
            setCurrentVar(event);
            cOp++;
            console.log(cOp);
          }
        }
      }
    } else if (event === "=") {
      let resultado = calculate(reg);
      setCurrentVar(resultado);
      setReg(resultado);
      cOp = 0;
    } else if (event === "0") {
      if (reg.charAt(0) !== "0") {
        setReg(reg + event);
        setCurrentVar(event);
        cOp = 0;
      }
    } else if (event === ".") {
      // split by operators and get last number
      const lastNumber = reg.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      console.log("lastNumber :>> ", lastNumber);
      // if last number already has a decimal, don't add another
      if (lastNumber?.includes(".")) return;
      setReg(reg + event);
      cOp = 0;
    } else {
      if (reg.charAt(0) === "0") {
        setReg(reg.slice(1) + event);
        setCurrentVar(event);
      } else {
        setReg(reg + event);
        setCurrentVar(event);
      }
      cOp = 0;
      console.log(cOp);
    }
  }

  const calculate = (expresion) => {
    // Utilizamos una expresión regular para dividir la cadena en números y operadores
    const tokens = expresion.match(/(\d+\.\d+|\d+|\+|\*|\/)/g);

    // Realizamos las multiplicaciones y divisiones
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i] === "*") {
        if (tokens[i + 1] !== '-') {
          tokens[i - 1] = Number(tokens[i - 1]) * Number(tokens[i + 1]);
          tokens.splice(i, 2);
          i--; // Ajustamos el índice después de la eliminación
        } else {
          tokens[i - 1] = Number(tokens[i - 1]) * ( - Number(tokens[i + 2]));
          tokens.splice(i, 3);
          i--; // Ajustamos el índice después de la eliminación
        }
      } else if (tokens[i] === "/") {
        if (tokens[i + 1] !== '-') {
          tokens[i - 1] = Number(tokens[i - 1]) / Number(tokens[i + 1]);
          tokens.splice(i, 2);
          i--; // Ajustamos el índice después de la eliminación
        } else {
          tokens[i - 1] = Number(tokens[i - 1]) / ( - Number(tokens[i + 2]));
          tokens.splice(i, 3);
          i--; // Ajustamos el índice después de la eliminación
        }
      }
    }

    // Realizamos las sumas y restas
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i] === "+") {
        tokens[i - 1] = Number(tokens[i - 1]) + Number(tokens[i + 1]);
        tokens.splice(i, 2);
        i--; // Ajustamos el índice después de la eliminación
      } else if (tokens[i] === "-") {
        tokens[i - 1] = Number(tokens[i - 1]) - Number(tokens[i + 1]);
        tokens.splice(i, 2);
        i--; // Ajustamos el índice después de la eliminación
      }
    }

    // El resultado debería estar en el primer y único elemento restante en el array
    return tokens[0];
  };

  return (
    <div id='app'>
      <h1><span>JavaScript</span> Calculator</h1>
      <div id='calc-container' className="row">
        <div id="display">
          <div id='sum-of-buttons'>{reg}</div>
          <div id='current-button'>{currentVar}</div>
        </div>
        <div id="buttons-container">
          <div id='clear' onClick={() => buttonPress('clear')}>AC</div>
          <div id='divide' className='operator' onClick={() => buttonPress('/')}>/</div>
          <div id='multiply' className='operator' onClick={() => buttonPress('*')}>*</div>
          <div id='seven' className='number' onClick={() => buttonPress('7')}>7</div>
          <div id='eight' className='number' onClick={() => buttonPress('8')}>8</div>
          <div id='nine' className='number' onClick={() => buttonPress('9')}>9</div>
          <div id='subtract' className='operator' onClick={() => buttonPress('-')}>-</div>
          <div id='four' className='number' onClick={() => buttonPress('4')}>4</div>
          <div id='five' className='number' onClick={() => buttonPress('5')}>5</div>
          <div id='six' className='number' onClick={() => buttonPress('6')}>6</div>
          <div id='add' className='operator' onClick={() => buttonPress('+')}>+</div>
          <div id='one' className='number' onClick={() => buttonPress('1')}>1</div>
          <div id='two' className='number' onClick={() => buttonPress('2')}>2</div>
          <div id='three' className='number' onClick={() => buttonPress('3')}>3</div>
          <div id='equals' className='operator' onClick={() => buttonPress('=')}><p>=</p></div>
          <div id='zero' className='number' onClick={() => buttonPress('0')}>0</div>
          <div id='decimal' className='number' onClick={() => buttonPress('.')}>.</div>
        </div>
      </div>
      <h2>Designed and Coded By <span>BERNARDO BASALDUA</span></h2>
    </div>
  );
}

export default App;
