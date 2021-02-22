import axios from 'axios'

export const getCountryWeather = (capital) => {
    const api_key = process.env.REACT_APP_API_KEY
    
    return axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=${api_key}`)
        .then(response => {
            console.log("getCountryWeather response:", response)
            const data = response.data
            return data
        })
}