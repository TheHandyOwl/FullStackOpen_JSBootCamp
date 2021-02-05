import { useState } from 'react';
import './App.css';

const Button = ( { text, handleClick } ) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  
  const addGood = (good) => setGood(good+1)
  const addNeutral = (neutral) => setNeutral(neutral+1)
  const addBad = (bad) => setBad(bad+1)

  return (
    <div className="App">
      <h2>Give feedback</h2>
      <Button text='good' handleClick={ () => addGood(good) } />
      <Button text='neutral' handleClick={ () => addNeutral(neutral) } />
      <Button text='bad' handleClick={ () => addBad(bad) } />
      <h2>Statistics</h2>
      <p>Good: { good }</p>
      <p>Neutral: { neutral }</p>
      <p>Bad: { bad }</p>
    </div>
  );
}

export default App;
