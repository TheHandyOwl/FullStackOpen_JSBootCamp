import axios from 'axios'

export const getAllPersons = () => {
    return axios
        .get("http://localhost:3001/persons")
        .then(response => {
            console.log("getAllPersons response", response)
            const data = response.data
            return data
        })
}