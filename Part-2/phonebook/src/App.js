import React, { useState } from "react";

function App() {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas'}
  ])
  const [ newName, setNewName ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submitted form')
    const personObject = {
      name: newName
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <li key={person.name}>{person.name}</li>
          )
        )}
      </ul>
    </div>
  );
}

export default App;
