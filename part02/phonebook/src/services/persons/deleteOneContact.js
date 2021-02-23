import axios from 'axios'

export const deleteOneContact = (contactId) => {
    return axios
        .delete(`http://localhost:3001/persons/${contactId}`)
        .then(response => {
            console.log("deleteOneContact response", response)
            const data = response.data
            return data
        })
}