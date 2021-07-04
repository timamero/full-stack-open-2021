import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>{value} {text === 'Positive' ? '%' : ''}</td>
    </tr>
  
  )
}

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  if (all === 0) {
    return <p>No Feedback Given</p>
  }

  return (
    <table>
      <tbody>
        <Statistic text="Good" value={good} />
        <Statistic text="Neutral" value={neutral} />
        <Statistic text="Bad" value={bad} />
        <Statistic text="All" value={all} />
        <Statistic text="Average" value={average.toFixed(2)} />
        <Statistic text="Positive" value={positive.toFixed(2)} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [score, setScore] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
    setScore(score + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setScore(score - 1)
  }

  let average
  let positive
  if (all === 0) {
    average = 0
    positive = 0
  } else {
    average = score / all
    positive = (good / all) * 100
  }

  return (
    <div>
      <h1>Unicafe</h1>
      <h2>Give Feedback</h2>
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App