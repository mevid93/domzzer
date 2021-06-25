const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Slave = require('../models/slave')
const config = require('../utils/config')
const bcrypt = require('bcrypt')
const User = require('../models/user')

jest.setTimeout(10000)

describe('/api/slaves', () => {
  let token

  beforeAll(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', config.SALT_ROUNDS)
    const user = new User({ username: 'rootme', userRole: 'ADMIN', passwordHash })
    await user.save()
    const response = await api.post('/api/login').send({ username: 'rootme', password: 'sekret' })
    token = response.body.token
  })

  beforeEach(async () => {
    await Slave.deleteMany({})
    await Slave.insertMany(helper.initialSlaves)
  })

  test('should return existing slaves as json', async () => {
    const response = await api.get('/api/slaves').set('authorization', `bearer ${token}`)
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
  })

  test('should return all existing slaves', async () => {
    const response = await api.get('/api/slaves').set('authorization', `bearer ${token}`)
    expect(response.body).toHaveLength(helper.initialSlaves.length)
  })

  test('should return 401 when adding slave to database with insufficient privileges', async () => {
    const passwordHash = await bcrypt.hash('sekret', config.SALT_ROUNDS)
    const user = new User({ username: 'noobster', userRole: 'LITE', passwordHash })
    await user.save()
    const r = await api.post('/api/login').send({ username: 'noobster', password: 'sekret' })
    const newtoken = r.body.token
    const newSlave = {
      name: 'SlaveMachine3',
      address: 'http://127.0.0.1:1003',
      status: 'OFFLINE',
      testsDone: 0,
      vulnerabilitiesFound: 0,
      username: 'User3',
      password: 'Password3'
    }
    const response = await api.post('/api/slaves').send(newSlave).set('authorization', `bearer ${newtoken}`)
    expect(response.status).toEqual(401)
  })

  test('should add slave to database when posted information contains all required fields', async () => {
    const newSlave = {
      name: 'SlaveMachine3',
      address: 'http://127.0.0.1:1003',
      status: 'OFFLINE',
      testsDone: 0,
      vulnerabilitiesFound: 0,
      username: 'User3',
      password: 'Password3'
    }
    const slavesBefore = await helper.slavesInDb()
    const response = await api.post('/api/slaves').send(newSlave).set('authorization', `bearer ${token}`)
    const slavesAfter = await helper.slavesInDb()
    expect(response.status).toEqual(200)
    expect(slavesBefore.length).toEqual(slavesAfter.length - 1)
  })

  test('should return 400 when posted information is missing required fields', async () => {
    const newSlave = {
      name: 'SlaveMachine4',
      status: 'OFFLINE',
      testsDone: 0,
      vulnerabilitiesFound: 0
    }
    const slavesBefore = await helper.slavesInDb()
    const response = await api.post('/api/slaves').send(newSlave).set('authorization', `bearer ${token}`)
    const slavesAfter = await helper.slavesInDb()
    expect(response.status).toEqual(400)
    expect(slavesBefore.length).toEqual(slavesAfter.length)
  })

  test('should return correct error message when posted information is missing required address field', async () => {
    const newSlave = {
      name: 'SlaveMachine4',
      status: 'OFFLINE',
      testsDone: 0,
      vulnerabilitiesFound: 0
    }
    const response = await api.post('/api/slaves').send(newSlave).set('authorization', `bearer ${token}`)
    const errorText = JSON.parse(response.error.text).error
    expect(errorText).toEqual('Slave validation failed: address: field is required!')
  })

  test('should return 400 when posted information contains name that already exists', async () => {
    const slaves = await helper.slavesInDb()
    const newSlave = {
      name: slaves[0].name,
      address: 'http:127.0.0.0:1004',
      status: 'OFFLINE',
      testsDone: 0,
      vulnerabilitiesFound: 0
    }
    const response = await api.post('/api/slaves').send(newSlave).set('authorization', `bearer ${token}`)
    expect(response.status).toEqual(400)
  })

  test('should return correct error message when posted information contains name that already exists', async () => {
    const slaves = await helper.slavesInDb()
    const newSlave = {
      name: slaves[0].name,
      address: 'http:127.0.0.0:1004',
      status: 'OFFLINE',
      testsDone: 0,
      vulnerabilitiesFound: 0
    }
    const response = await api.post('/api/slaves').send(newSlave).set('authorization', `bearer ${token}`)
    const errorText = JSON.parse(response.error.text).error
    expect(errorText).toEqual('Slave validation failed: name: field must be unique!')
  })

  test('should return 400 when posted information contains username but no password', async () => {
    const newSlave = {
      name: 'SlaveMachine4',
      address: 'http:127.0.0.0:1004',
      status: 'OFFLINE',
      testsDone: 0,
      vulnerabilitiesFound: 0,
      username: 'user4',
    }
    const response = await api.post('/api/slaves').send(newSlave).set('authorization', `bearer ${token}`)
    expect(response.status).toEqual(400)
  })

  test('should return 400 when posted information contains password but no username', async () => {
    const newSlave = {
      name: 'SlaveMachine4',
      address: 'http:127.0.0.0:1004',
      status: 'OFFLINE',
      testsDone: 0,
      vulnerabilitiesFound: 0,
      password: 'YOLOadmin'
    }
    const response = await api.post('/api/slaves').send(newSlave).set('authorization', `bearer ${token}`)
    expect(response.status).toEqual(400)
  })

  test('should return correct error message when posted information contains password but no username', async () => {
    const newSlave = {
      name: 'SlaveMachine4',
      address: 'http:127.0.0.0:1004',
      status: 'OFFLINE',
      testsDone: 0,
      vulnerabilitiesFound: 0,
      password: 'YOLOadmin'
    }
    const response = await api.post('/api/slaves').send(newSlave).set('authorization', `bearer ${token}`)
    const errorText = JSON.parse(response.error.text).error
    expect(errorText).toEqual('Slave validation failed: username: field is required when password is defined!')
  })
})

describe('/api/slaves/:id', () => {

  let token

  beforeAll(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', config.SALT_ROUNDS)
    const user = new User({ username: 'rootme', userRole: 'ADMIN', passwordHash })
    await user.save()
    const response = await api.post('/api/login').send({ username: 'rootme', password: 'sekret' })
    token = response.body.token
  })

  beforeEach(async () => {
    await Slave.deleteMany({})
    await Slave.insertMany(helper.initialSlaves)
  })

  test('should return existing slave when trying to get with valid id', async () => {
    const response = await api.get('/api/slaves').set('authorization', `bearer ${token}`)
    const slaves = response.body
    const slaveToView = slaves[0]
    const resultSlave = await api
      .get(`/api/slaves/${slaveToView.id}`).set('authorization', `bearer ${token}`)
      .then(200)
      .then(response => response.body)
    const processedSlaveToView = JSON.parse(JSON.stringify(slaveToView))
    expect(resultSlave).toEqual(processedSlaveToView)
  })

  test('should return null when trying to get nonexisting slave', async () => {
    const id = await helper.nonExistingSlaveId()
    const response = await api.get(`/api/slaves/${id}`).set('authorization', `bearer ${token}`)
    expect(response.status).toEqual(200)
    expect(response.body).toEqual(null)
  })

  test('should return 400 when trying to get with invalid id', async () => {
    const response = await api.get('/api/slaves/NotSoValidID123').set('authorization', `bearer ${token}`)
    expect(response.status).toEqual(400)
  })

  test('should return correct error message when trying to get with invalid id', async () => {
    const response = await api.get('/api/slaves/NotSoValidID123').set('authorization', `bearer ${token}`)
    const errorText = JSON.parse(response.error.text).error
    expect(errorText).toEqual('malformatted id')
  })

  test('should delete existing slave when id is valid', async () => {
    const slavesBefore = await api.get('/api/slaves').set('authorization', `bearer ${token}`).then(response => response.body)
    const id = slavesBefore[0].id
    const response = await api.delete(`/api/slaves/${id}`).set('authorization', `bearer ${token}`)
    const slavesAfter = await api.get('/api/slaves').set('authorization', `bearer ${token}`).then(response => response.body)
    const slave = slavesAfter.find(s => s.id === id)
    expect(response.status).toEqual(204)
    expect(slave).not.toBeDefined()
  })

  test('should return 204 when trying to delete nonexisting slave', async () => {
    const id = await helper.nonExistingSlaveId()
    const response = await api.delete(`/api/slaves/${id}`).set('authorization', `bearer ${token}`)
    expect(response.status).toEqual(204)
  })

  test('should return 400 when trying to delete with invalid id', async () => {
    const response = await api.delete('/api/slaves/NotSoValidId123').set('authorization', `bearer ${token}`)
    expect(response.status).toEqual(400)
  })

  test('should return correct error message when trying to delete with invalid id', async () => {
    const response = await api.delete('/api/slaves/NotSoValidId123').set('authorization', `bearer ${token}`)
    const errorText = JSON.parse(response.error.text).error
    expect(errorText).toEqual('malformatted id')
  })

  test('should update existing slave when id is valid and update information is valid', async () => {
    const slaves = await helper.slavesInDb()
    const { id, ...slave } = slaves[0]
    const updatedSlave = { ...slave, name: 'UpdatedName1' }
    const response = await api.put(`/api/slaves/${id}`).send(updatedSlave).set('authorization', `bearer ${token}`)
    expect(response.status).toEqual(200)
    expect(response.body.name).toEqual('UpdatedName1')
  })

  test('should return 401 when updating existing slave with insufficient privileges', async () => {
    const passwordHash = await bcrypt.hash('sekret', config.SALT_ROUNDS)
    const user = new User({ username: 'noobster', userRole: 'LITE', passwordHash })
    await user.save()
    const r = await api.post('/api/login').send({ username: 'noobster', password: 'sekret' })
    const newtoken = r.body.token
    const slaves = await helper.slavesInDb()
    const { id, ...slave } = slaves[0]
    const updatedSlave = { ...slave, name: 'UpdatedName1' }
    const response = await api.put(`/api/slaves/${id}`).send(updatedSlave).set('authorization', `bearer ${newtoken}`)
    expect(response.status).toEqual(401)
  })

  test('should return 400 when id is valid and update information is invalid', async () => {
    const slaves = await helper.slavesInDb()
    const { id, ...slave } = slaves[0]
    const updatedSlave = { ...slave, name: '12' }
    const response = await api.put(`/api/slaves/${id}`).send(updatedSlave).set('authorization', `bearer ${token}`)
    expect(response.status).toEqual(400)
  })

  test('should return correct error message when id is valid and update contains invalid name', async () => {
    const slaves = await helper.slavesInDb()
    const { id, ...slave } = slaves[0]
    const updatedSlave = { ...slave, name: '12' }
    const response = await api.put(`/api/slaves/${id}`).send(updatedSlave).set('authorization', `bearer ${token}`)
    const errorText = JSON.parse(response.error.text).error
    expect(errorText).toEqual('Validation failed: name: field length must be at least 3 characters!')
  })
})

afterAll(() => {
  mongoose.connection.close()
})