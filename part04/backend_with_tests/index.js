require('dotenv').config()
require('./config/db')

const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./middlewares/loggerMiddleware')
const notFound = require('./middlewares/notFound')
const handleErrors = require('./middlewares/handleErrors')

const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')

// Sentry modules
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')

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

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)

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
