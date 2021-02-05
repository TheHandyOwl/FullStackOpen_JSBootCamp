import { useState } from 'react';
import './App.css';

function App({ anecdotes }) {
  const [anecdoteNumber, setAnecdoteNumber] = useState(0)
  const [anecdote, setAnecdote] = useState(anecdotes[anecdoteNumber])
  const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))

  Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0);
  
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

  const newAnecdote = () => {
    const newNumber = randomAnecdoteNumber(anecdoteNumber)
    setAnecdoteNumber(newNumber)
    setAnecdote(anecdotes[newNumber])
  }

  const addPoint = () => {
    setPoints( {
      ...points,
      [anecdoteNumber] : points[anecdoteNumber] + 1
    })
  }

  return (
    <div className="App">
      <h1>Anecdote</h1>
      <p>{ anecdote }</p>
      <h1>Votes</h1>
      <p>has { points[anecdoteNumber] } votes</p>
      <button onClick={() => addPoint()}>Vote!</button>
      <button onClick={() => newAnecdote()}>Next anecdote</button>
    </div>
  );
}

export default App;
