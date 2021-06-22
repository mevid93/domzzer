const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const config = require('../utils/config')

jest.setTimeout(10000)

describe('/api/login', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', config.SALT_ROUNDS)
    const user = new User({ username: 'rootme', userRole: 'ADMIN', passwordHash })
    await user.save()
  })

  test('should allow login with valid credentials', async () => {
    const credentials = { username: 'rootme', password: 'sekret' }
    const response = await api.post('/api/login').send(credentials)
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
  })

  test('should return 401 with invalid credentials', async () => {
    const credentials = { username: 'rootme', password: 'sret' }
    const response = await api.post('/api/login').send(credentials)
    expect(response.status).toEqual(401)
  })

  test('should return correct error message with invalid credentials', async () => {
    const credentials = { username: 'rootme', password: 'sret' }
    const response = await api.post('/api/login').send(credentials)
    const errorText = JSON.parse(response.error.text).error
    expect(errorText).toEqual('Invalid username or password!')
  })
})

afterAll(() => {
  mongoose.connection.close()
})