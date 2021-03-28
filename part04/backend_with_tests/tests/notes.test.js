const mongoose = require('mongoose')
const Note = require('../models/Note')
const { server } = require('../index')

const { api, getAllNotesContent, initialNotes } = require('./helpers')

beforeEach(async () => {
  await Note.deleteMany({})

  // No funciona
  // await initialNotes.forEach(async note => {
  //   const newNote = new Note(note)
  //   await newNote.save()
  // })

  // Promise.all - en paralelo (+ rápido)
  // const newNotes = initialNotes.map(note => new Note(note))
  // const promises = newNotes.map(note => note.save())
  // await Promise.all(promises)

  // Bucle for - secuencial (+ lento)
  for (const note of initialNotes) {
    const newNote = new Note(note)
    await newNote.save()
  }
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/) // Es una regexp y no un literal
  // .expect('Content-Type', 'application/json') // Probando ...
})

describe('GET notes', () => {
  test('there are 2 notes', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('the first note is: HTML is awesome', async () => {
    const response = await api.get('/api/notes')
    expect(response.body[0].content).toBe('HTML is awesome')
  })

  test('some note is: HTML is awesome', async () => {
    const { theNotesContent } = await getAllNotesContent()
    expect(theNotesContent).toContain('HTML is awesome')
  })
})

describe('POST notes', () => {
  test('a valid note is created', async () => {
    const newNote = {
      content: 'Async / await is coming.',
      important: true
    }
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { response, theNotesContent } = await getAllNotesContent()
    expect(response.body).toHaveLength(initialNotes.length + 1)
    expect(theNotesContent).toContain(newNote.content)
  })

  test('note without content is not created', async () => {
    const newNote = {
      important: true
    }
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)
      // .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(initialNotes.length)
  })
})

describe('DELETE notes', () => {
  test('a note can be deleted', async () => {
    const { response: firstResponse } = await getAllNotesContent()
    const { body: notes } = firstResponse
    const delNoteFromDB = notes[0] // No tenemos el id en initialNotes!!!

    await api
      .delete(`/api/notes/${delNoteFromDB.id}`)
      .expect(204)

    const { theNotesContent, response: secondResponse } = await getAllNotesContent()
    expect(secondResponse.body).toHaveLength(notes.length - 1)
    expect(theNotesContent).not.toContain(delNoteFromDB.content)
  })

  test('a note that has an invalid id can not be deleted', async () => {
    await api
      .delete('/api/notes/123456')
      .expect(400)

    const { response } = await getAllNotesContent()
    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('a note with valid id but does not exists', async () => {
    const validObjectIdThatDoNotExists = '6060d035362d97ba2767a2c9'
    await api
      .delete(`/api/notes/${validObjectIdThatDoNotExists}`)
      // .delete('/api/notes/6060d035362d97ba2767aw2c9')
      .expect(404)

    const { response } = await getAllNotesContent()
    expect(response.body).toHaveLength(initialNotes.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
