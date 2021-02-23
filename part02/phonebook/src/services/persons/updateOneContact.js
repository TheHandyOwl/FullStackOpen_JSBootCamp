import axios from 'axios'

export const updateOneContact = (contact) => {
    console.log("contact:", contact)
    return axios
        .put(`http://localhost:3001/persons/${contact.id}`, contact)
        .then(response => {
            console.log("updateContact response", response)
            const data = response.data
            return data
        })
}