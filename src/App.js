import {
  useState,
  useRef
} from "react";
import "./App.css";

function App() {
  const inputRef = useRef(null);
  // Removed resultRef since using setResult is enough to re-render the recently reset value(0)
  const [result, setResult] = useState(0);
  // New state for displaying error
  const [error, setError] = useState('')

  const plus = (result, value) => result + value
  const minus = (result, value) => result - value
  const times = (result, value) => result * value
  const divide = (result, value) => {
    if (value === 0) {
      setError('Invalid operation: division by zero')
      return result;
    }
    else return result /value
  }

  // Single entry point for adding e.preventDefault and getting current value
  const calculate = calcFn => e => {
    e.preventDefault()
    setError('')
    const value = Number(inputRef.current.value)
    // call function operation to be performed
    setResult((result) => calcFn(result, value));
  }

  function resetInput(e) {
    e.preventDefault();
    setError('')
    inputRef.current.value = 0
  };

  function resetResult(e) {
    e.preventDefault();
    setError('')
    setResult((result) => 0);
  };

  return (
    <div className="App">
      <div>
        <h1>Simplest Working Calculator</h1>
      </div>
      <form>
        <p>
          {result}
        </p>
        <p>
          <input
            pattern="[0-9]"
            ref={inputRef}
            type="number"
            placeholder="Type a number"
          />
          {error && <small className="error">{error}</small>}
        </p>
        <button onClick={calculate(plus)}>add</button>
        <button onClick={calculate(minus)}>subtract</button>
        <button onClick={calculate(times)}>multiply</button>
        <button onClick={calculate(divide)}>divide</button>
        <button onClick={resetInput}>reset input</button>
        <button onClick={resetResult}>reset result</button>
      </form>
    </div>
  );
}

export default App;
