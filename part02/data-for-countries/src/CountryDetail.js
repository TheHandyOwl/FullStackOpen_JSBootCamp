const CountryDetail = ({ country }) => {
    return (
        <>
            <h2>{country.name}</h2>
            <p>
                Capital: {country.capital}
            </p>
            <p>
                Population: {country.population}
            </p>
            <h2>Languages:</h2>
            <ul>
                {country.languages.map(language => <li>{language.name}</li>)}
            </ul>
            <br />
            <img src={country.flag} width="100px" alt={ "Flag from ".concat(`${country.name}`)  }/>
        </>
    )
}

export default CountryDetail