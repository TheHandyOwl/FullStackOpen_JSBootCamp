const mongoose = require('mongoose')
const User = require('../models/User')
const { server } = require('../index')

const { api, getAllUsersUsername, initialUsers } = require('./helpers')

beforeEach(async () => {
  await User.deleteMany({})

  for (const user of initialUsers) {
    const newUser = new User(user)
    await newUser.save()
  }
})

describe('POST users', () => {
  test('A valid user is created', async () => {
    const newUser = {
      username: 'Misa',
      name: 'Misa Yar Yar Binks',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { response, theUsersUsername } = await getAllUsersUsername()
    expect(response.body).toHaveLength(initialUsers + 1)
    expect(theUsersUsername).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
