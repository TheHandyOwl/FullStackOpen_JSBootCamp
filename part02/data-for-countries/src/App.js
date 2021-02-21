import { useEffect, useState } from 'react'
import Countries from './Countries'
import FilterCountryName from './FilterCountryName'

import { getAllCountries } from './services/persons/getAllCountries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    setLoading(true)
    getAllCountries()
      .then(countries => {
        setCountries(countries)
        setLoading(false)
      })
      .catch(e => {
        console.log(e)
        setLoading(false)
        setError('La API ha petado')
        setTimeout(() => {
          setError('')
        }, 3000);
      })
  }, [])

  /*
  const handleClickOnSubmit = (event) => {
    event.preventDefault()
    let alertMessages = 'Check this fileds:\n'

    const contactToAddToState = {
      name: newName,
      number: newNumber
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

    const checkPersonExists = (contactToAddToState, persons) => {
      const person = persons.find(person => person.name === contactToAddToState.name)
      if (person) {
        const alertMessage = `- ${person.name} is already added to phonebook`
        alertMessages += alertMessage.concat('\n')
        return true
      }
      return false
    }

    const savePersons = () => {

      createNewPerson(contactToAddToState)
        .then(newPerson => {
          console.log("New person:", newPerson)
          setPersons(prevPersons => [...prevPersons, newPerson]
            .sort((a, b) => {
              var x = a.name.toLowerCase();
              var y = b.name.toLowerCase();
              return x < y ? -1 : x > y ? 1 : 0;
            })
          )
        })
        .catch(e => {
          console.log(e)
          setError('La API ha petado')
          setTimeout(() => {
            setError('')
          }, 3000);
        })
      setNewName('')
      setNewNumber('')
    }

    const personExists = checkPersonExists(contactToAddToState, persons)
    const checkNumberOk = checkNumberWithNineCharactersLong(contactToAddToState.number)

    if (!personExists && checkNumberOk) {
      savePersons()
    } else {
      alert(alertMessages)
    }

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
  */


  const handleNameFilterOnChange = (event) => {
    setNameFilter(event.target.value)
  }

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(nameFilter.toLowerCase()))

  return (
    <div>
      <h1>Data for countries</h1>
      { error.length !== 0 ? <span style={{ "color": "red" }}>{error}</span> : ""}
      <FilterCountryName handleNameFilterOnChange={handleNameFilterOnChange} nameFilter={nameFilter} />
      <Countries filteredCountries={filteredCountries} />
      { loading ? <span style={{ "color": "red" }}>Loading countries ...</span> : ""}
    </div>
  )
}

export default App