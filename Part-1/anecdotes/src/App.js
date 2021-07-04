import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(7).fill(0))
  const copyPoints = [...points]
  console.log('points: ', copyPoints)
  const handleSelectedClick = () => setSelected(Math.floor(Math.random() * 7));
  const handlePointsClick = () => {
    copyPoints[selected]++
    setPoints(copyPoints)
  }

  const max =  Math.max(...points)
  const indexOfMax = points.indexOf(max)
  console.log('max', max)
  console.log('index of max: ', indexOfMax)

  return (
    <div>
      <h1>Software Engineering Anecdotes</h1>
      <button onClick={handleSelectedClick}>Get Random Anecdote</button>
      <br />
      <br />
      {anecdotes[selected]}
      <p>Has {points[selected]} votes</p>
      <button onClick={handlePointsClick}>Vote</button>
    
      <h2>Anecdote with the most votes</h2>
      {anecdotes[indexOfMax]}
      <p>Has {points[indexOfMax]} votes</p>
    </div>
  )
}

export default App
