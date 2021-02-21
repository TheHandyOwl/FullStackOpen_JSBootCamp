import axios from 'axios'

export const getAllCountries = () => {
    return axios
        .get("https://restcountries.eu/rest/v2/all")
        .then(response => {
            console.log("getAllCountries response", response)
            const data = response.data
            return data
        })
}