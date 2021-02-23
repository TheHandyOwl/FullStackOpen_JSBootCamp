import './App.css';
import { useState } from 'react';
import { Note } from './Note';
import {NotificationError} from './NotificationError'
import {NotificationSuccessful} from './NotificationSuccessful'

const App = (props) => {
  //const { notes } = props
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successfulMessage, setSuccessfulMessage] = useState(null)

  if ((notes === null) || (notes === undefined) || (notes === false) || (notes.length === 0)) {
    return "No tenemos notas que mostrar"
  }

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const noteToAddToState = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }
    setNotes([...notes, noteToAddToState])
    setNewNote('')
    setSuccessfulMessage(
      `New note added: '${noteToAddToState.content}'`
    )
    setTimeout(() => {
      setSuccessfulMessage(null)
    }, 2000)
  }

  const handleClickShowAll = () => {
    setShowAll(!showAll)
  }

  const handleToggleImportanceOf = (note) => {
    const updateNote = note
    const errorRandom = Math.random() <= 0.4
    const errorAlreadyDeleted = Math.random() <= 0.1
    
    const noteFinded = notes.find(n => n.id === updateNote.id)
    
    if (!errorRandom && !errorAlreadyDeleted && noteFinded) {
      const changedNote = { ...noteFinded, important: !updateNote.important }
      setNotes( prevNotes => [...prevNotes].map(note => note.id !== noteFinded.id ? note : changedNote))
    } else if (errorAlreadyDeleted) {
      setNotes( prevNotes => [...prevNotes].filter(note => note.id !== noteFinded.id))
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else {
      setErrorMessage(
        `Another random error for note '${note.content}'`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return (
      <div style={footerStyle}>
        <br />
        <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
      </div>
    )
  }
 

  return (
    <div>
      <h1>Notes</h1>
      <NotificationError message={errorMessage} />
      <NotificationSuccessful message={successfulMessage} />
      <button onClick={handleClickShowAll}>
        {showAll ? "Show only important" : "Show all"}
      </button>
      <ul>
      { notes
        .filter(note => showAll === true ? true : note.important === true)
        .map(note => <Note key={note.id} note={note} handleToggleImportanceOf={handleToggleImportanceOf} />)
      }
      </ul>
      <h2>Formulario</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote} />
        <button>Crear una nota</button>
      </form>
      <Footer />
    </div>
  )
}

export default App;
