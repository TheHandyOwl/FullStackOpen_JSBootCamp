import './App.css';
import { useState } from 'react';
import { Note } from './Note';

const App = (props) => {
  //const { notes } = props
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

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
    console.log("New note:", noteToAddToState)
    setNotes([...notes, noteToAddToState])
    setNewNote('')
  }

  const handleClickShowAll = () => {
    setShowAll(!showAll)
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={handleClickShowAll}>
        {showAll ? "Show only important" : "Show all"}
      </button>
      { notes
        .filter(note => showAll === true ? true : note.important === true)
        .map(note => <Note key={note.id} {...note} />)
      }
      <h2>Formulario</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote} />
        <button>Crear una nota</button>
      </form>
    </div>
  )
}

export default App;
