const mongoose = require('mongoose')
const { model, Schema } = mongoose

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = model('Note', noteSchema)

/*
Note
  .find({})
  .then(result => {
    console.log({ result })
    mongoose.connection.close()
  })

const note = Note({
  content: 'MongoDB is awesome',
  date: new Date(),
  important: false
})

note
  .save()
  .then(result => {
    console.log({ result })
    mongoose.connection.close()
  })
  .catch(err => {
    console.error(err)
  })
*/

module.exports = Note
