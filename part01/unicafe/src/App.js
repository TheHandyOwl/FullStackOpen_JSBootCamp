import { useState } from 'react';
import './App.css';

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const Statistic = ({ text, value }) => <p>{text}: <span style={{ color: "blue", fontWeight: "bold" }}>{value}</span></p>

//const Statistics = ({ good, neutral, bad }) => {
const Statistics = ({ good, neutral, bad }) => {
  const statisticsAll = good + neutral + bad
  const statisticsAvg = isNaN(((good - bad) / (good + neutral + bad)).toFixed(2)) ? "0" : ((good - bad) / (good + neutral + bad)).toFixed(2)
  const statisticsPositive = `${isNaN((good / (good + neutral + bad)).toFixed(2)) ? 0 : (good / (good + neutral + bad)).toFixed(2)}%`

  const hasData = (good > 0 || neutral > 0 || bad > 0) ? true : false

  const withStats = () => {
    return (
      <>
        <h2>Statistics</h2>
        <Statistic text='Good' value={good} />
        <Statistic text='Neutral' value={neutral} />
        <Statistic text='Bad' value={bad} />
        <Statistic text='All' value={statisticsAll} />
        <Statistic text='Average' value={statisticsAvg} />
        <Statistic text='Positive' value={statisticsPositive} />
      </>
    )
  }

  const withoutStats = () => {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    hasData ? withStats() : withoutStats()
  )

}

const App = () => {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)

  const addGood = (good) => setGood(good + 1)
  const addNeutral = (neutral) => setNeutral(neutral + 1)
  const addBad = (bad) => setBad(bad + 1)
  const resetStats = () => {
    setGood(0)
    setNeutral(0)
    setBad(0)
  }

  return (
    <div className="App">
      <h2>Give feedback</h2>
      <Button text='good' handleClick={() => addGood(good)} />
      <Button text='neutral' handleClick={() => addNeutral(neutral)} />
      <Button text='bad' handleClick={() => addBad(bad)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
      <h2>Reset</h2>
      <Button text='Reset statistics' handleClick={() => resetStats()} />
    </div>
  );
}

export default App;
