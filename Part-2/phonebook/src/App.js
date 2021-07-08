import React, { useState } from "react";

function App() {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas'}
  ])
  console.log('persons list: ', persons)
  const [ newName, setNewName ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const nameList = persons.map(person => person.name)
    
    if (nameList.includes(newName)) {
      alert(event.target.value + ' is already added to phonebook')
    } else {
      const personObject = {
      name: newName
      }

      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
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
