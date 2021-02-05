import { useState } from 'react';
import './App.css';

function App({ anecdotes }) {
  const [anecdoteNumber, setAnecdoteNumber] = useState(0)
  const [anecdote, setAnecdote] = useState(anecdotes[anecdoteNumber])

  const randomAnecdoteNumber = () => {
    //const randomNumber = (anecdoteNumber === anecdotes.length - 1) ? 0 : anecdoteNumber + 1
    /**/
    let randomNumber = anecdoteNumber
    do {
      randomNumber = Math.round(Math.random() * (anecdotes.length - 1))
    } while (randomNumber === anecdoteNumber)
    /**/
    return randomNumber
  }

  const handleClick = () => {
    const newNumber = randomAnecdoteNumber(anecdoteNumber)
    setAnecdoteNumber(newNumber)
    setAnecdote(anecdotes[newNumber])
  }

  console.log("BEGIN:", anecdoteNumber, anecdotes[anecdoteNumber])

  return (
    <div className="App">
      <h1>Anecdote</h1>
      <p>{ anecdote }</p>
      <button onClick={() => handleClick()}>Next anecdote</button>
    </div>
  );
}

export default App;
