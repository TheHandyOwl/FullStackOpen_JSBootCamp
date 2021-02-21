import './App.css';
import { useEffect, useState } from 'react';
import { Post } from './Post';

/*
import {getAllPosts} from './services/posts/getAllPosts'
import {createNewPost} from './services/posts/createNewPost'
*/
import {createNewPost, getAllPosts} from './services/posts/index'

const App = () => {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    getAllPosts()
      .then( posts => {
        setPosts(posts)
        setLoading(false)  
      } )
      .catch(e => {
        console.log(e)
      })
  }, [])

  const handleChange = (event) => {
    setNewPost(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const postToAddToState = {
      userId: 1,
      title: newPost,
      body: newPost.concat(" ", new Date().toISOString())
    }

    setError('')

    // El 'id' se genera sólo
    createNewPost(postToAddToState)
      .then( newPost => {
        console.log("New post:", newPost)
        setPosts( prevNotes => [...prevNotes, newPost])
      })
      .catch(e => {
        console.log(e)
        setError('La API ha petado')
      })

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
      { error.length !== 0 ? <span style={{"color": "red"}}>{error}</span> : "" }
      { posts
        .map(post => <Post key={post.id} {...post} />)
      }
    </div>
  )
}

export default App;