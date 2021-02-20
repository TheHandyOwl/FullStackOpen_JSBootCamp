import axios from 'axios'

export const getAllPosts = () => {
    //return Promise.reject("Something bad happened getting data")

    return axios
        .get("http://localhost:3001/posts")
        .then(response => {
            console.log("getAllPosts response", response)
            const data = response.data
            return data
        })
}

export const createNewPost = ({ title, body, userId }) => {
  return Promise.reject("Something bad happened creating Post")

  return axios
    .post("http://localhost:3001/posts", { title, body, userId })
    .then(response => {
      console.log("Response post:", response)
      const { data } = response
      return data
    })
}