import React, { useState, useEffect } from "react";
import personsServices from './services/persons'

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

const Person = ({name, number, handleDelete}) => {
  return (
    <li>
        {name} {number}
        <button value={name} onClick={handleDelete}>Delete?</button>
    </li>
  )}

const Persons = ({personsToShow, handleDelete}) => {
  return (
    <ul>
      {personsToShow.map(person => (
        <Person key={person.name} name={person.name} number={person.number} handleDelete={handleDelete}/>
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
    personsServices.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const nameList = persons.map(person => person.name)
    
    if (!nameList.includes(newName)) {
      const personObject = {
      name: newName,
      number: newNumber
      }

      personsServices.create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    
    } else {
      const number = persons.find(person => person.name === newName).number
      if (number === newNumber) {
        alert(`${newName} is already added to phonebook`) 
      
      } else {
        if (window.confirm(`${newName} is already in the phonebook, replace the old number with the new number?`)) {
          const obj = persons.find(person => person.name === newName)
          const changedObj = {...obj, number: newNumber}
          personsServices.update(obj.id, changedObj)
            .then(response => {
              setPersons(persons.map(person => person.name !== newName ? person : response.data))
            })
        }
      }  
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

  const handleDelete = (event) => {
    if (window.confirm(`Do you want to delete the information for ${event.target.value}`)) {
      const obj = persons.find(person => person.name === event.target.value)
      personsServices.deleteObj(obj.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== obj.id))
        })
    }
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
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  );
}

export default App;
