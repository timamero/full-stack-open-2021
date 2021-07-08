import React, { useState } from "react";

function App() {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '123-456-7890'}
  ])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const nameList = persons.map(person => person.name)
    
    if (nameList.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
      name: newName,
      phone: newPhone
      }

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewPhone('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
          phone: <input onChange={handlePhoneChange} value={newPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <li key={person.name}>{person.name} {person.phone}</li>
          )
        )}
      </ul>
    </div>
  );
}

export default App;
