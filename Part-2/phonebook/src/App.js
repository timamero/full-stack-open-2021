import React, { useState, useEffect } from "react";
import axios from 'axios'

const Filter = ({handleFilterChange, filter}) => {
  return <div>filter shown with: <input onChange={handleFilterChange} value={filter}/></div>
}

const PersonForm = ({handleSubmit, handleNameChange, handleNumberChange, newName, newNumber}) => {
  return (
    <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          phone: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Person = ({name, number}) => {
  return <li>{name} {number}</li>
}

const Persons = ({personsToShow}) => {
  return (
    <ul>
      {personsToShow.map(person => (
        <Person key={person.name} name={person.name} number={person.number} />
        )
      )}
    </ul>
  )
}


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const nameList = persons.map(person => person.name)
    
    if (nameList.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
      name: newName,
      number: newNumber
      }

      const url = 'http://localhost:3001/persons'

      axios
        .post(url, personObject).then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })

      
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} filter={filter} />
      <h2>Add new person</h2>
      <PersonForm 
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
}

export default App;
