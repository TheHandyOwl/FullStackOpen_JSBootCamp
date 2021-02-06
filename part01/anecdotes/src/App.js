import { useState } from 'react';
import './App.css';

function App({ anecdotes }) {
  const [anecdoteNumber, setAnecdoteNumber] = useState(0)
  const [anecdote, setAnecdote] = useState(anecdotes[anecdoteNumber])
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const randomAnecdoteNumber = () => {
    let randomNumber = anecdoteNumber
    do {
      randomNumber = Math.round(Math.random() * (anecdotes.length - 1))
    } while (randomNumber === anecdoteNumber)
    return randomNumber
  }

  const newAnecdote = () => {
    const newNumber = randomAnecdoteNumber(anecdoteNumber)
    setAnecdoteNumber(newNumber)
    setAnecdote(anecdotes[newNumber])
  }

  const addPoint = () => {
    setPoints({
      ...points,
      [anecdoteNumber]: points[anecdoteNumber] + 1
    })
  }

  const resetVotes = () => {
    const newPoints = new Array(anecdotes.length).fill(0)
    setPoints({
      ...newPoints
    })
  }

  const MostVoted = ({ points }) => {
    const mostPointsPosition = Object.keys(points).reduce((acc, item) => (points[item] > points[acc] ? item : acc), 0)
    return (mostPointsPosition >= 0 && points[mostPointsPosition] !== 0 ) ? (<p>{anecdotes[mostPointsPosition]}</p>): (<p>No votes yet!</p>)
  }

  return (
    <div className="App">
      <h1>Anecdote</h1>
      <p>{anecdote}</p>
      <h1>Votes</h1>
      <p>has {points[anecdoteNumber]} votes</p>
      <button onClick={() => addPoint()}>Vote!</button>
      <button onClick={() => newAnecdote()}>Next anecdote</button>
      <button onClick={() => resetVotes()}>Reset</button>
      <h1>Anecdote with most votes</h1>
      <MostVoted points={points} />
    </div>
  );
}

export default App;
