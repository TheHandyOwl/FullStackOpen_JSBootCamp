import { useState } from 'react'
import Numbers from './Numbers'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleClickOnSubmit = (event) => {
    event.preventDefault()

    const nameToAddToState = {
      name: newName
    }

    setPersons(prevPersons => {
      return [...prevPersons, nameToAddToState]
        .sort((a, b) => {
          var x = a.name.toLowerCase();
          var y = b.name.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        })
    })

  }

  const handleOnChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleClickOnSubmit}>
        <div>
          name: <input onChange={handleOnChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        { /* <div>debug: {newName}</div> */}
      </form>
      <h2>Numbers</h2>
      {
        (
          (persons === undefined) || (persons === null) || (persons === false) || (persons.length === 0)
        ) ? <p>Your phonebook is empty</p>
          : <Numbers persons={persons} />
      }
    </div>
  )
}

export default App