import { useState } from 'react';
import './App.css';

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const Statistic = ({ text, value }) => <p>{text}: <span style={{ color: "blue", fontWeight: "bold" }}>{value}</span></p>

const StatisticTRTD = ({ text, value }) => {
  return(
    <tr>
      <td>{text}:</td>
      <td style={{ color: "blue", fontWeight: "bold" }}>{value}</td>
    </tr>
  )
}

const Statistics = ({ stats }) => {
  stats.all = stats.good + stats.neutral + stats.bad
  stats.average = isNaN(((stats.good - stats.bad) / stats.all ).toFixed(2)) ? "0" : ((stats.good - stats.bad) / stats.all).toFixed(2)
  stats.positive = `${isNaN((stats.good / stats.all).toFixed(2)) ? 0.00 : (stats.good / stats.all).toFixed(2)}%`

  const hasData = (stats.good > 0 || stats.neutral > 0 || stats.bad > 0) ? true : false

  const withStats = () => {
    return (
      <>
        <h2>Statistics</h2>
        <table>
          <tbody>
            { Object.keys(stats).map( (item, i) => <StatisticTRTD key={i} text={item} value={stats[item]} /> ) }
          </tbody>
        </table>
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
      <Statistics stats={{good, neutral, bad}} />
      <h2>Reset</h2>
      <Button text='Reset statistics' handleClick={() => resetStats()} />
    </div>
  );
}

export default App;
