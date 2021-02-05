import { useState } from 'react';
import './App.css';

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, calc }) => <p>{text}: <span style={{ color: "blue", fontWeight: "bold" }}>{calc}</span></p>

//const Statistics = ({ good, neutral, bad }) => {
const Statistics = ({good, neutral, bad}) => {
  const statisticsAll = good + neutral + bad
  const statisticsAvg = isNaN(((good - bad) / (good + neutral + bad)).toFixed(2)) ? "0" : ((good - bad) / (good + neutral + bad)).toFixed(2)
  const statisticsPositive = `${isNaN((good / (good + neutral + bad)).toFixed(2)) ? 0 : (good / (good + neutral + bad)).toFixed(2)}%`

  return (
    <>
      <h2>Statistics</h2>
      <StatisticLine text='Good' calc={good} />
      <StatisticLine text='Neutral' calc={neutral} />
      <StatisticLine text='Bad' calc={bad} />
      <StatisticLine text='All' calc={statisticsAll} />
      <StatisticLine text='Average' calc={statisticsAvg} />
      <StatisticLine text='Positive' calc={statisticsPositive} />
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)

  const addGood = (good) => setGood(good + 1)
  const addNeutral = (neutral) => setNeutral(neutral + 1)
  const addBad = (bad) => setBad(bad + 1)

  return (
    <div className="App">
      <h2>Give feedback</h2>
      <Button text='good' handleClick={() => addGood(good)} />
      <Button text='neutral' handleClick={() => addNeutral(neutral)} />
      <Button text='bad' handleClick={() => addBad(bad)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
