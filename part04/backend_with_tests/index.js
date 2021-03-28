require('dotenv').config()
require('./config/db')

const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./middlewares/loggerMiddleware')
const Note = require('./models/Note')
const notFound = require('./middlewares/notFound')
const handleErrors = require('./middlewares/handleErrors')

// Sentry modules
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const { response } = require('express')

app.use(cors())
app.use(express.json())
// app.use(express.static('./images'))
// app.use('/static', express.static('./images'))
app.use('/images', express.static('./images'))

// Sentry init
Sentry.init({
  dsn: 'https://f90ed4e9bdd14fcb94e1668242d4ae16@o558101.ingest.sentry.io/5691157',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app })
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

app.use(logger)

app.use((req, res, next) => {
  // console.log('Middleware2')
  next()
})

// Sentry before routes
// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

// V1 /api/notes sin async / await
/*
app.get('/api/notes', (req, res, next) => {
  Note.find({})
    .then(notes => {
      res.json(notes)
    })
    .catch(err => { next(err) })
  })
 */
// V2 /api/notes sin async / await, versión mejorada
/*
app.get('/api/notes', (req, res, next) => {
  Note.find({})
    .then(notes => res.json(notes))
})
*/
// V3 /api/notes con async / await (si no necesitamos el catch)
app.get('/api/notes', async (req, res, next) => {
  const notes = await Note.find({})
  res.json(notes)
})

app.get('/api/notes/:id', (req, res, next) => {
  // const id = req.params.id
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

app.put('/api/notes/:id', (req, res, next) => {
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

app.delete('/api/notes/:id', async (req, res, next) => {
  const { id } = req.params
  const note = await Note.findByIdAndDelete(id)
  if (!note) return res.sendStatus(404)
  res.status(204).end()

  // V1 sin async / await
  // Note
  //   .findByIdAndDelete(id)
  //   .then(() => {
  //     return res.status(204).end()
  //   })
  //   .catch(err => { next(err) })

  // V2 con async / await
  /*
  try {
    await Note.findByIdAndDelete(id)
    return res.status(204).end()
  } catch (error) {
    next(error)
  }
  */

  // V3 con async / await y sin catch (entra en el error general)
  // await Note.findByIdAndDelete(id)
  // res.status(204).end()
})

app.post('/api/notes', async (req, res, next) => {
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

  // V1 sin async / await
  // newNote
  //   .save()
  //   .then(savedNote => {
  //     res.status(201).json(savedNote)
  //   })
  //   .catch(err => { next(err) })

  // V2 con async / await
  try {
    const savedNote = await newNote.save()
    res.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }
})

// Middleware - 404 y sin errores
app.use(notFound)

// Sentry errorHandler
// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

// Middleware - Error control
app.use(handleErrors)

// const PORT = 3001
const PORT = Number(process.env.PORT) || 3002

const server = app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})

module.exports = { app, server }
