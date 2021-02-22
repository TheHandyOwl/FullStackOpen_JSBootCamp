import React, { useEffect, useState } from 'react';
import { getCountryWeather } from './services/weather/getCountryWeather'

const CountryWeather = ({ capital }) => {
    const [loading, setLoading] = useState(false)
    const [weather, setWeather] = useState(undefined)

    useEffect(() => {
        if (capital !== undefined) {
            setLoading(true)
            getCountryWeather(capital)
                .then(weather => {
                    setWeather(weather)
                    setLoading(false)
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }, [capital])

    return (
        <>
            <h2>Weather in {capital}</h2>
            { loading ? <span style={{ "color": "red" }}>Loading weather ...</span> : ""}
            {
                ((weather === undefined) || (weather === false) || (weather === null) || (weather === []))
                    ? <p>Weather info not available</p>
                    :  (<>
                        <p>
                            Temperature: {weather.weather[0].main !== undefined ? weather.weather[0].main : "Not available"} ({weather.weather[0].description !== undefined ? weather.weather[0].description : "Not available"})
                            </p>
                        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon !== undefined ? weather.weather[0].icon : "50d"}@2x.png`} alt={`${weather.weather[0].main !== undefined ? weather.weather[0].main : "Not available"}`} />
                        <p>
                            Wind: {weather.wind.speed !== undefined ? weather.wind.speed : "Not available"} m/s
                                        </p>
                    </>)
            }
        </>
    )
}

export default CountryWeather