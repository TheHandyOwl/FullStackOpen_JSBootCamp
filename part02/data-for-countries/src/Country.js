const Country = ({country, handleCountryOnClick}) => {
    return (
        <div>
            <li>
                {country.name} <button value={country.name} onClick={handleCountryOnClick}>Filter this!</button>
            </li>
        </div>
    )
}

export default Country