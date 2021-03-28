const notesRouter = require('express').Router()
const Note = require('../models/Note')

notesRouter.get('/', async (req, res, next) => {
  const notes = await Note.find({})
  res.json(notes)
})

notesRouter.get('/:id', (req, res, next) => {
  const { id } = req.params

  Note
    .findById(id)
    .then(note => {
      if (note) {
        return res.json(note)
      } else {
        return res.status(404).end()
      }
    })
    .catch(err => { next(err) })
})

notesRouter.put('/:id', (req, res, next) => {
  const { id } = req.params
  const note = req.body

  const newNoteInfo = {
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false
  }

  Note
    .findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => {
      console.log({ result })
      res.status(201).end()
    })
    .catch(err => { next(err) })
})

notesRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const note = await Note.findByIdAndDelete(id)
  if (!note) return res.sendStatus(404)
  res.status(204).end()
})

notesRouter.post('/', async (req, res, next) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'node.content is missing!'
    })
  }

  const newNote = new Note({
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  })

  try {
    const savedNote = await newNote.save()
    res.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }
})

module.exports = notesRouter
