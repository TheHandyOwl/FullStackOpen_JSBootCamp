import axios from 'axios'

export const createNewPost = ({ title, body, userId }) => {
  return axios
    .post("http://localhost:3001/posts", { title, body, userId })
    .then(response => {
      console.log("Response post:", response)
      const { data } = response
      return data
    })
}