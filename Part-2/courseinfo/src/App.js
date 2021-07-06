import React from 'react'

const Header = ({ name }) => {
  return <h1>{name}</h1>
}

const Part = ({ name, exercises}) => {
  return <li>{name} {exercises}</li>
}

const Content = ({ parts }) => {
  return (
    <div>
      <ul>
        {parts.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </ul>
    </div>
  )
}

const Total = ({ parts }) => {
  const exercises = parts.map(part => part.exercises)
  const sum = exercises.reduce((sum, current) => sum + current, 0)

  return <p>Number of exercises {sum}</p>
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
    
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App;
