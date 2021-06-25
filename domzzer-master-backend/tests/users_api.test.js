const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const config = require('../utils/config')

describe('/api/users', () => {

  describe('when logged in as admin', () => {
    let token

    beforeEach(async () => {
      await User.deleteMany({})
      const passwordHash = await bcrypt.hash('sekret', config.SALT_ROUNDS)
      const user = new User({ username: 'rootme', userRole: 'ADMIN', passwordHash })
      await user.save()
      const response = await api.post('/api/login').send({ username: 'rootme', password: 'sekret' })
      token = response.body.token
    })

    test('should return existing users as json', async () => {
      const response = await api.get('/api/users').set('authorization', `bearer ${token}`)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
    })

    test('should return all existing users', async () => {
      const response = await api.get('/api/users').set('authorization', `bearer ${token}`)
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
        .set('authorization', `bearer ${token}`)
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

      await api.post('/api/users').send(newUser).set('authorization', `bearer ${token}`)
      const usersAtStart = await helper.usersInDb()
      const response = await api.post('/api/users').send(newUser).set('authorization', `bearer ${token}`)
      const usersAtEnd = await helper.usersInDb()

      expect(response.status).toEqual(400)
      const errorText = JSON.parse(response.error.text).error
      expect(errorText).toEqual('User validation failed: username: field must be unique!')
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('should return 204 when deleting user with valid id', async () => {
      const newUser = {
        username: 'propro',
        userRole: 'PRO',
        password: 'salainen',
      }
      const postResponse = await api.post('/api/users').send(newUser).set('authorization', `bearer ${token}`)
      const usersAtStart = await helper.usersInDb()
      const response = await api.delete(`/api/users/${postResponse.body.id}`).set('authorization', `bearer ${token}`)
      const usersAtEnd = await helper.usersInDb()

      expect(response.status).toEqual(204)
      expect(usersAtEnd).toHaveLength(usersAtStart.length - 1)
    })

    test('should return 204 when trying to delete user with nonexisting id', async () => {
      const id = await helper.nonExistingUserId()
      const response = await api.delete(`/api/users/${id}`).set('authorization', `bearer ${token}`)

      expect(response.status).toEqual(204)
    })

    test('should return 400 when trying to delete user with invalid id', async () => {
      const response = await api.delete('/api/users/NotSovalidID1234').set('authorization', `bearer ${token}`)
      expect(response.status).toEqual(400)
    })
  })

  describe('when not logged in as admin', () => {
    let token

    beforeEach(async () => {
      await User.deleteMany({})
      const passwordHash = await bcrypt.hash('sekret', config.SALT_ROUNDS)
      const user = new User({ username: 'rootme', userRole: 'PRO', passwordHash })
      await user.save()
      const response = await api.post('/api/login').send({ username: 'rootme', password: 'sekret' })
      token = response.body.token
    })

    test('should return 401 when trying to get all users', async () => {
      const response = await api.get('/api/users').set('authorization', `bearer ${token}`)
      expect(response.status).toEqual(401)
    })

    test('should return correct error message when trying to get all users', async () => {
      const response = await api.get('/api/users').set('authorization', `bearer ${token}`)
      const errorText = JSON.parse(response.error.text).error
      expect(errorText).toEqual('Insufficient privileges to complete the operation!')
    })

    test('should return 401 when trying to delete user with valid id', async () => {
      const users = await helper.usersInDb()
      const response = await api.delete(`/api/users/${users[0].id}`).set('authorization', `bearer ${token}`)
      expect(response.status).toEqual(401)
    })

    test('should return correct error message when trying to delete user with valid id', async () => {
      const users = await helper.usersInDb()
      const response = await api.delete(`/api/users/${users[0].id}`).set('authorization', `bearer ${token}`)
      const errorText = JSON.parse(response.error.text).error
      expect(errorText).toEqual('Insufficient privileges to complete the operation!')
    })

    test('should return 401 when trying to get some other users information with valid id', async () => {
      const passwordHash = await bcrypt.hash('othersekret', config.SALT_ROUNDS)
      const user = new User({ username: 'otheraccount', userRole: 'PRO', passwordHash })
      const saved = await user.save()
      const response = await api.get(`/api/users/${saved._id}`).set('authorization', `bearer ${token}`)
      expect(response.status).toEqual(401)
    })

    test('should return 200 when getting users own information with valid id', async () => {
      const users = await helper.usersInDb()
      const currentUser = users.find(u => u.username === 'rootme')
      const response = await api.get(`/api/users/${currentUser.id}`).set('authorization', `bearer ${token}`)
      expect(response.status).toEqual(200)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})