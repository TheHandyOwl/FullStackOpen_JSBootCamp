import './App.css';
import { useEffect, useState } from 'react';
import { Post } from './Post';
import axios from 'axios';

const App = () => {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    //console.log("useEffect")
    setLoading(true)
    setTimeout(() => {
      axios.get("http://localhost:3001/posts")
      //.then(response => response.json())
      .then(response => {
        console.log(response)
        setLoading(false)
        const data = response.data
        setPosts(data)
      })
    }, 2000);
  }, [])

  const handleChange = (event) => {
    setNewPost(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const postToAddToState = {
      userId: 1,
      id: posts.length + 1,
      title: newPost,
      body: newPost.concat(" ", new Date().toISOString())
    }
    console.log("New post:", postToAddToState)
    setPosts([...posts, postToAddToState])
    setNewPost('')
  }

  return (
    <div>
      <h2>Formulario</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newPost} />
        <button>Crear un post</button>
      </form>
      <h1>Posts</h1>
      { loading ? "Cargando ..." : "" }
      { posts
        .map(post => <Post key={post.id} {...post} />)
      }
    </div>
  )
}

export default App;