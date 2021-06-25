const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Vulnerability = require('../models/vulnerability')
const config = require('../utils/config')
const bcrypt = require('bcrypt')
const User = require('../models/user')

jest.setTimeout(10000)

describe('/api/vulnerabilities', () => {
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
    await Vulnerability.deleteMany({})
    await Vulnerability.insertMany(helper.initialVulnerabilities)
  })

  test('should return existing vulnerabilities as json', async () => {
    const response = await api.get('/api/vulnerabilities').set('authorization', `bearer ${token}`)
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
  })

  test('should return all existing vulnerabilities', async () => {
    const response = await api.get('/api/vulnerabilities').set('authorization', `bearer ${token}`)
    expect(response.body).toHaveLength(helper.initialVulnerabilities.length)
  })
})

describe('/api/vulnerabilities/:id', () => {

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
    await Vulnerability.deleteMany({})
    await Vulnerability.insertMany(helper.initialVulnerabilities)
  })

  test('should return existing vulnerability when trying to get with valid id', async () => {
    const response = await api.get('/api/vulnerabilities').set('authorization', `bearer ${token}`)
    const vulnerabilities = response.body
    const vulnerabilityToView = vulnerabilities[0]
    const resultVulnerability = await api
      .get(`/api/vulnerabilities/${vulnerabilityToView.id}`)
      .set('authorization', `bearer ${token}`)
      .then(200)
      .then(response => response.body)
    const processedVulnerabilityToView = JSON.parse(JSON.stringify(vulnerabilityToView))
    expect(resultVulnerability).toEqual(processedVulnerabilityToView)
  })

  test('should return null when trying to get nonexisting vulnerability', async () => {
    const id = await helper.nonExistingVulnerabilityId()
    const response = await api.get(`/api/vulnerabilities/${id}`).set('authorization', `bearer ${token}`)
    expect(response.status).toEqual(200)
    expect(response.body).toEqual(null)
  })

  test('should return 400 when trying to get vulnerability with invalid id', async () => {
    const response = await api.get('/api/vulnerabilities/NotSoValidID123').set('authorization', `bearer ${token}`)
    expect(response.status).toEqual(400)
  })

  test('should return correct error message when trying to get vulnerability with invalid id', async () => {
    const response = await api.get('/api/vulnerabilities/NotSoValidID123').set('authorization', `bearer ${token}`)
    const errorText = JSON.parse(response.error.text).error
    expect(errorText).toEqual('malformatted id')
  })

  test('should delete existing vulnearbility when id is valid', async () => {
    const vulnerabilitiesBefore = await api.get('/api/vulnerabilities').set('authorization', `bearer ${token}`).then(response => response.body)
    const id = vulnerabilitiesBefore[0].id
    const response = await api.delete(`/api/vulnerabilities/${id}`).set('authorization', `bearer ${token}`)
    const vulnerabilitiesAfter = await api.get('/api/vulnerabilities').set('authorization', `bearer ${token}`).then(response => response.body)
    const vulnerability = vulnerabilitiesAfter.find(v => v.id === id)
    expect(response.status).toEqual(204)
    expect(vulnerability).not.toBeDefined()
  })

  test('should return 204 when trying to delete nonexisting vulnerability', async () => {
    const id = await helper.nonExistingVulnerabilityId()
    const response = await api.delete(`/api/vulnerabilities/${id}`).set('authorization', `bearer ${token}`)
    expect(response.status).toEqual(204)
  })

  test('should return 400 when trying to delete vulnerability with invalid id', async () => {
    const response = await api.delete('/api/vulnerabilities/NotSoValidId123').set('authorization', `bearer ${token}`)
    expect(response.status).toEqual(400)
  })

  test('should return correct error message when trying to delete vulnerability with invalid id', async () => {
    const response = await api.delete('/api/vulnerabilities/NotSoValidId123').set('authorization', `bearer ${token}`)
    const errorText = JSON.parse(response.error.text).error
    expect(errorText).toEqual('malformatted id')
  })

  test('should update existing vulnerability when id is valid and update information is valid', async () => {
    const vulnerabilities = await helper.vulnerabilitiesInDb()
    const { id, ...vulnerability } = vulnerabilities[0]
    const updatedVulnerability = { ...vulnerability, status: 'CLOSED' }
    const response = await api.put(`/api/vulnerabilities/${id}`).send(updatedVulnerability).set('authorization', `bearer ${token}`)
    expect(response.status).toEqual(200)
    expect(response.body.status).toEqual('CLOSED')
  })

  test('should return 400 when vulnerability id is valid and update information is invalid', async () => {
    const vulnerabilities = await helper.vulnerabilitiesInDb()
    const { id, ...vulnerability } = vulnerabilities[0]
    const updatedVulnerability = { ...vulnerability, status: 'not supported status' }
    const response = await api.put(`/api/vulnerabilities/${id}`).send(updatedVulnerability).set('authorization', `bearer ${token}`)
    expect(response.status).toEqual(400)
  })

  test('should return correct error message when vulnerability id is valid and update contains invalid status', async () => {
    const vulnerabilities = await helper.vulnerabilitiesInDb()
    const { id, ...vulnerability } = vulnerabilities[0]
    const updatedVulnerability = { ...vulnerability, status: 'NOT SUPPORTED' }
    const response = await api.put(`/api/vulnerabilities/${id}`).send(updatedVulnerability).set('authorization', `bearer ${token}`)
    const errorText = JSON.parse(response.error.text).error
    expect(errorText).toEqual('Validation failed: status: `NOT SUPPORTED` is not a valid enum value for path `status`.')
  })
})

afterAll(() => {
  mongoose.connection.close()
})