const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const config = require('../utils/config')

describe('/api/users', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', config.SALT_ROUNDS)
    const user = new User({ username: 'root', userRole: 'ADMIN', passwordHash })
    await user.save()
  })

  test('should return existing users as json', async () => {
    const response = await api.get('/api/users')
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
  })

  test('should return all existing users', async () => {
    const response = await api.get('/api/users')
    const users = await helper.usersInDb()
    expect(response.body).toHaveLength(users.length)
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'propro',
      userRole: 'PRO',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const newUser = {
      username: 'propro',
      userRole: 'PRO',
      password: 'salainen',
    }

    await api.post('/api/users').send(newUser)
    const usersAtStart = await helper.usersInDb()
    const response = await api.post('/api/users').send(newUser)
    const usersAtEnd = await helper.usersInDb()

    expect(response.status).toEqual(400)
    const errorText = JSON.parse(response.error.text).error
    expect(errorText).toEqual('User validation failed: username: field must be unique!')
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})