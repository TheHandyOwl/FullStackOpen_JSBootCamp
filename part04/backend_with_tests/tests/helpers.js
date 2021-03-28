const { app } = require('../index')
const supertest = require('supertest')
const api = supertest(app)

const initialNotes = [
  {
    content: 'HTML is awesome',
    important: true,
    date: new Date()
  },
  {
    content: 'CSS is awesome',
    important: false,
    date: new Date()
  },
  {
    content: 'Node is awesome',
    important: true,
    date: new Date()
  }
]

const getAllNotesContent = async () => {
  const response = await api.get('/api/notes')
  return {
    theNotesContent: response.body.map(note => note.content),
    response
  }
}

module.exports = {
  api,
  getAllNotesContent,
  initialNotes
}
