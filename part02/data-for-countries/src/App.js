import { useEffect, useState } from 'react'
import Countries from './Countries'
import FilterCountryName from './FilterCountryName'

import { getAllCountries } from './services/persons/getAllCountries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [nameFilter, setNameFilter] = useState('')
  const [lastFilter, setLastFilter] = useState('')
  
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

  const handleCountryOnClick = (event) => {
    setLastFilter(nameFilter)
    handleNameFilterOnChange(event)
  }
  
  const handleLastFilterOnClick = (event) => {
    setNameFilter(event.target.value)
    setLastFilter('')
  }

  const handleNameFilterOnChange = (event) => {
    setNameFilter(event.target.value)
  }

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(nameFilter.toLowerCase()))

  return (
    <div>
      <h1>Data for countries</h1>
      { error.length !== 0 ? <span style={{ "color": "red" }}>{error}</span> : ""}
      <FilterCountryName handleNameFilterOnChange={handleNameFilterOnChange} nameFilter={nameFilter} />
      { lastFilter ? <button value={lastFilter} onClick={handleLastFilterOnClick}>&lt; Go back</button> : ""}
      <Countries filteredCountries={filteredCountries} handleCountryOnClick={handleCountryOnClick} />
      { loading ? <span style={{ "color": "red" }}>Loading countries ...</span> : ""}
    </div>
  )
}

export default App