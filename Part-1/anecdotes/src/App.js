import React, { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Display = ({anecdote, points}) => {
  return (
    <div>
      {anecdote}
      <p>Has {points} votes</p>
    </div> 
  )
}

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
  // console.log(copyPoints)
  const handleSelectedClick = () => setSelected(Math.floor(Math.random() * 7));
  const handlePointsClick = () => {
    copyPoints[selected]++
    setPoints(copyPoints)
  }

  const max =  Math.max(...points)
  const indexOfMax = points.indexOf(max)

  return (
    <div>
      <h1>Software Engineering Anecdotes</h1>
      <Button handleClick={handleSelectedClick} text="Get Random Anecdote" />
      <br />
      <br />
      <Display anecdote={anecdotes[selected]} points={points[selected]} />
      <Button handleClick={handlePointsClick} text="Vote" />
      <h2>Anecdote with the most votes</h2>
      <Display anecdote={anecdotes[indexOfMax]} points={points[indexOfMax]} />
    </div>
  )
}

export default App
