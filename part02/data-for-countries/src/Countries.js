import Country from './Country'
import CountryDetail from './CountryDetail'

const Countries = ({ filteredCountries }) => {
  return (
    <div>
      <h2>Countries</h2>
      {
        (
          (filteredCountries === undefined) || (filteredCountries === null) || (filteredCountries === false) || (filteredCountries.length === 0)
        ) ? <p>No countries founded</p>
          : (filteredCountries.length === 1) ? <CountryDetail country={filteredCountries[0]} />
            : (filteredCountries.length < 10) ? <ul>{filteredCountries.map(country => <Country key={country.name} country={country} />)}</ul>
              : <p>Too many countries</p>
      }
    </div>
  )
}

export default Countries