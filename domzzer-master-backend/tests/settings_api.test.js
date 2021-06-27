const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const config = require('../utils/config')

jest.setTimeout(10000)

describe('/api/settings', () => {

  describe('when signed in with admin user role', () => {
    let token

    beforeAll(async () => {
      await User.deleteMany({})
      const passwordHash = await bcrypt.hash('sekret', config.SALT_ROUNDS)
      const user = new User({ username: 'rootme', userRole: 'ADMIN', passwordHash })
      await user.save()
      const response = await api.post('/api/login').send({ username: 'rootme', password: 'sekret' })
      token = response.body.token
    })

    test('should return settings as json', async () => {
      const response = await api.get('/api/settings').set('authorization', `bearer ${token}`)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
    })

    test('should return default settings', async () => {
      const response = await api.get('/api/settings').set('authorization', `bearer ${token}`)
      expect(response.body.isPolling).toEqual(false)
      expect(response.body.pollInterval).toEqual(10)
    })

    test('should allow to change settings with valid new settings', async () => {
      const newSettings = { pollInterval: 20 }
      const response = await api.put('/api/settings').send(newSettings).set('authorization', `bearer ${token}`)
      expect(response.status).toEqual(200)
      expect(response.body.isPolling).toEqual(false)
      expect(response.body.pollInterval).toEqual(20)
    })

    test('should return 400 and error when trying to change settings with missing poll interval', async () => {
      const newSettings = {}
      const response = await api.put('/api/settings').send(newSettings).set('authorization', `bearer ${token}`)
      expect(response.status).toEqual(400)
      const errorText = JSON.parse(response.error.text).error
      expect(errorText).toEqual('Error: polling interval must be defined!')
    })
  })

  describe('when signed in with non admin user role', () => {
    let token

    beforeAll(async () => {
      await User.deleteMany({})
      const passwordHash = await bcrypt.hash('sekret', config.SALT_ROUNDS)
      const user = new User({ username: 'rootme', userRole: 'PRO', passwordHash })
      await user.save()
      const response = await api.post('/api/login').send({ username: 'rootme', password: 'sekret' })
      token = response.body.token
    })

    test('should return 401 and error when trying to get settings information', async () => {
      const response = await api.get('/api/settings').set('authorization', `bearer ${token}`)
      expect(response.status).toEqual(401)
      const errorText = JSON.parse(response.error.text).error
      expect(errorText).toEqual('Insufficient privileges to complete the operation!')
    })

    test('should return 401 and error when trying to change settings with valid new settings', async () => {
      const newSettings = { pollInterval: 20 }
      const response = await api.put('/api/settings').send(newSettings).set('authorization', `bearer ${token}`)
      expect(response.status).toEqual(401)
      const errorText = JSON.parse(response.error.text).error
      expect(errorText).toEqual('Insufficient privileges to complete the operation!')
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})