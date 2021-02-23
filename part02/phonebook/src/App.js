import { useEffect, useState } from 'react'
import Numbers from './Numbers'
import ContactForm from './ContactForm'
import FilterContactName from './FilterContactName'
import {NotificationError} from './NotificationError'
import {NotificationSuccessful} from './NotificationSuccessful'

import { createNewPerson } from './services/persons/createNewPerson'
import { deleteOneContact } from './services/persons/deleteOneContact'
import { getAllPersons } from './services/persons/getAllPersons'
import { updateOneContact } from './services/persons/updateOneContact'

const App = () => {
  const [persons, setPersons] = useState([])
  const [nameFilter, setNameFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successfulMessage, setSuccessfulMessage] = useState(null)

  useEffect(() => {
    getAllPersons()
      .then(persons => {
        setPersons(persons
          .sort((a, b) => {
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
          })
        )
      })
      .catch(e => console.log(e))
  }, [])

  const handleClickDeleteContact = (deleteThisContact) => {
    const areYourSure = window.confirm(`Are you sure that you want to delete the contact named ${deleteThisContact.name}?`)
    if (areYourSure) {
      deleteOneContact(deleteThisContact.id)
        .then(() => {
          const newPersonsArray = persons.filter(person => person.id !== deleteThisContact.id)
          setPersons(() => [...newPersonsArray])
          setSuccessfulMessage(`Contacto borrado: ${deleteThisContact.name}`)
          setTimeout(() => {
            setSuccessfulMessage(null)
          }, 5000);
          console.log("no entra")
        })
        .catch(e => {
          if (e.response.status === 404) {
            const newPersonsArray = persons.filter(person => person.id !== deleteThisContact.id)
            setPersons(() => [...newPersonsArray])
            setErrorMessage(`El contacto ${deleteThisContact.name} ya ha sido borrado en del servidor`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000);
            return
          }
          setErrorMessage('La API ha petado')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
        })
    }
  }

  const handleClickOnSubmit = (event) => {
    event.preventDefault()
    let alertMessages = 'Check this fileds:\n'

    const contactToAddToState = {
      name: newName,
      number: newNumber
    }
    const personExists = persons.find(person => person.name.toLowerCase() === contactToAddToState.name.toLowerCase())
    
    if (personExists) {
      console.log("Dentro person:", personExists)
      const alertMessage = `- ${personExists.name} is already added to phonebook`
      alertMessages += alertMessage.concat('\n')
    }

    const updateContactNumber = (personExists) => {
      const areYourSure = window.confirm(`Are you sure that you want to delete the contact named ${personExists.name}?`)

      if (areYourSure) {
        personExists.number = contactToAddToState.number
        updateOneContact(personExists)
        .then((response) => {
          console.log(response)
          const newPersonsArray = persons.map(person => person.id === response.id ? response : person)
          setPersons(() => [...newPersonsArray])
          setSuccessfulMessage(`Contacto actualizado: ${personExists.name} ahora tiene el teléfono ${personExists.number}`)
          setTimeout(() => {
            setSuccessfulMessage(null)
          }, 5000);
        })
        .catch(e => {
          console.log(e)
          setErrorMessage('La API ha petado')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        setNewName('')
        setNewNumber('')
      }
    }

    const checkName = (newName) => {
      if (newName.length !== 0) {
        return true
      } else {
        const alertMessage = `- Put a name to this phone`
        alertMessages += alertMessage.concat('\n')
        return false
      }
    }

    const checkNumberWithNineCharactersLong = (newNumber) => {
      const numberFormattedLength = newNumber.replace(/\s/g, '').length
      if (numberFormattedLength === 9) {
        return true
      } else {
        const alertMessage = `- ${newNumber} should be 9 characters long (without spaces)`
        alertMessages += alertMessage.concat('\n')
        return false
      }
    }

    const savePersons = () => {

      createNewPerson(contactToAddToState)
        .then(newPerson => {
          setPersons(prevPersons => [...prevPersons, newPerson]
            .sort((a, b) => {
              var x = a.name.toLowerCase();
              var y = b.name.toLowerCase();
              return x < y ? -1 : x > y ? 1 : 0;
            })
          )
          setSuccessfulMessage(`Contacto añadido: ${newPerson.name} con teléfono ${newPerson.number}`)
          setTimeout(() => {
            setSuccessfulMessage(null)
          }, 5000);
        })
        .catch(e => {
          console.log(e)
          setErrorMessage('La API ha petado')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
        })
      setNewName('')
      setNewNumber('')
    }

    const checkNameOk = checkName(contactToAddToState.name)
    const checkNumberOk = checkNumberWithNineCharactersLong(contactToAddToState.number)

    if (!personExists && checkNameOk && checkNumberOk) {
      savePersons()
    } else if (personExists && checkNameOk && checkNumberOk) {
      updateContactNumber(personExists)
    } else {
      console.log("Entra 3:", "Show messages")
      alert(alertMessages)
    }

  }

  const handleNameFilterOnChange = (event) => {
    setNameFilter(event.target.value)
  }

  const handleNameOnChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberKeyPress = (event) => {
    var code = (event.which) ? event.which : event.keyCode;

    if (!((code === 8) || (code === 13) || (code >= 48 && code <= 57))) { // not backspace or intro or number
      event.returnValue = false;
      event.preventDefault()
    }
  }

  const handleNumberOnChange = (event) => {
    const numberToFormat = event.target.value.replace(/\s/g, '')
    let formattedNumber = ""

    const numberLength = numberToFormat.length
    switch (true) {
      case numberLength <= 3:
        formattedNumber = numberToFormat
        break
      case numberLength <= 6:
        formattedNumber = numberToFormat.substring(0, 3).concat(" ", numberToFormat.substring(3, numberLength))
        break
      case numberLength <= 9:
        formattedNumber = numberToFormat.substring(0, 3).concat(" ", numberToFormat.substring(3, 6) + " " + numberToFormat.substring(6, numberLength))
        break
      default:
        formattedNumber = numberToFormat.substring(0, 3).concat(" ", numberToFormat.substring(3, 6) + " " + numberToFormat.substring(6, 9))
        break
    }
    setNewNumber(formattedNumber)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationError message={errorMessage} />
      <NotificationSuccessful message={successfulMessage} />
      <FilterContactName handleNameFilterOnChange={handleNameFilterOnChange} nameFilter={nameFilter} />
      <ContactForm newName={newName} newNumber={newNumber} handleClickOnSubmit={handleClickOnSubmit} handleNameOnChange={handleNameOnChange} handleNumberOnChange={handleNumberOnChange} handleNumberKeyPress={handleNumberKeyPress} />
      <Numbers filteredPersons={filteredPersons} handleClickDeleteContact={handleClickDeleteContact} />
    </div>
  )
}

export default App