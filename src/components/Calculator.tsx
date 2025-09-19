import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const formatDisplay = (value: string) => {
    // Limit display to reasonable length and handle decimal formatting
    if (value.length > 12) {
      const num = parseFloat(value);
      if (num > 999999999999) {
        return num.toExponential(6);
      }
      return num.toFixed(6).replace(/\.?0+$/, '');
    }
    return value;
  };

  return (
    <div className="max-w-sm mx-auto bg-card rounded-3xl p-6 shadow-2xl">
      {/* Display */}
      <div className="bg-calculator-display rounded-2xl p-6 mb-6 min-h-[120px] flex items-end justify-end shadow-inner">
        <div className="text-calculator-display-text font-mono text-right">
          <div className="text-5xl font-light tracking-tight leading-none">
            {formatDisplay(display)}
          </div>
        </div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <Button
          variant="calc-clear"
          size="calculator"
          onClick={clear}
          className="col-span-2"
        >
          C
        </Button>
        <Button
          variant="calc-operation"
          size="calculator"
          onClick={() => inputOperation('÷')}
        >
          ÷
        </Button>
        <Button
          variant="calc-operation"
          size="calculator"
          onClick={() => inputOperation('×')}
        >
          ×
        </Button>

        {/* Row 2 */}
        <Button
          variant="calc-number"
          size="calculator"
          onClick={() => inputNumber('7')}
        >
          7
        </Button>
        <Button
          variant="calc-number"
          size="calculator"
          onClick={() => inputNumber('8')}
        >
          8
        </Button>
        <Button
          variant="calc-number"
          size="calculator"
          onClick={() => inputNumber('9')}
        >
          9
        </Button>
        <Button
          variant="calc-operation"
          size="calculator"
          onClick={() => inputOperation('-')}
        >
          -
        </Button>

        {/* Row 3 */}
        <Button
          variant="calc-number"
          size="calculator"
          onClick={() => inputNumber('4')}
        >
          4
        </Button>
        <Button
          variant="calc-number"
          size="calculator"
          onClick={() => inputNumber('5')}
        >
          5
        </Button>
        <Button
          variant="calc-number"
          size="calculator"
          onClick={() => inputNumber('6')}
        >
          6
        </Button>
        <Button
          variant="calc-operation"
          size="calculator"
          onClick={() => inputOperation('+')}
        >
          +
        </Button>

        {/* Row 4 */}
        <Button
          variant="calc-number"
          size="calculator"
          onClick={() => inputNumber('1')}
        >
          1
        </Button>
        <Button
          variant="calc-number"
          size="calculator"
          onClick={() => inputNumber('2')}
        >
          2
        </Button>
        <Button
          variant="calc-number"
          size="calculator"
          onClick={() => inputNumber('3')}
        >
          3
        </Button>
        <Button
          variant="calc-equals"
          size="calculator"
          onClick={performCalculation}
          className="row-span-2"
        >
          =
        </Button>

        {/* Row 5 */}
        <Button
          variant="calc-number"
          size="calculator"
          onClick={() => inputNumber('0')}
          className="col-span-2"
        >
          0
        </Button>
        <Button
          variant="calc-number"
          size="calculator"
          onClick={() => inputNumber('.')}
        >
          .
        </Button>
      </div>
    </div>
  );
};

export default Calculator;