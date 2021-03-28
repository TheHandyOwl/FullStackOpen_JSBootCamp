const bcrypt = require('bcrypt')

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

const initialUsers = [
  {
    username: 'Mando',
    name: 'Din Djarin',
    password: bcrypt.hash('password', 10)
  }
]

const getAllNotesContent = async () => {
  const response = await api.get('/api/notes')
  return {
    theNotesContent: response.body.map(note => note.content),
    response
  }
}

const getAllUsersUsername = async () => {
  const response = await api.get('/api/users')
  return {
    theUsersUsername: response.body.map(user => user.username),
    response
  }
}

module.exports = {
  api,
  getAllNotesContent,
  getAllUsersUsername,
  initialNotes,
  initialUsers
}
