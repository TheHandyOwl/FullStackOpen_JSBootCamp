import axios from 'axios'

export const getAllPosts = () => {
    return axios
        .get("http://localhost:3001/posts")
        .then(response => {
            console.log("getAllPosts response", response)
            const data = response.data
            return data
        })
}