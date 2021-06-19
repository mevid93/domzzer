const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

jest.setTimeout(10000)

describe('/api/info', () => {
  let response

  beforeAll(async () => {
    response = await api.get('/api/info')
  })

  test('should return info as json', async () => {
    console.log('RESPONSE FOR GET', response)
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
  })

  test('should return json which contains server name', async () => {
    expect(response.body.serverName).toBeDefined()
  })

  test('should return json which contains server OS', async () => {
    expect(response.body.serverType).toBeDefined()
  })

  test('should return json which contains server OS-version', async () => {
    expect(response.body.serverVersion).toBeDefined()
  })

  test('should return json which contains server memory', async () => {
    expect(response.body.serverMemoryMb).toBeDefined()
  })

  test('should return json which contains server date', async () => {
    expect(response.body.serverDate).toBeDefined()
  })

  test('should return json which contains server uptime', async () => {
    expect(response.body.serverUptime).toBeDefined()
  })

  test('should return json which contains number of server controlled slave machines', async () => {
    expect(response.body.numberOfSlaves).toBeDefined()
  })

  test('should return json which contains number of tests performed', async () => {
    expect(response.body.numberOfTestsPerformed).toBeDefined()
  })

  test('should return json which contains number of potential vulnerabilities found', async () => {
    expect(response.body.numberOfPotentialVulnerabilities).toBeDefined()
  })

  test('should return json which contains potential vulnerabilities to tests ratio', async () => {
    expect(response.body.numberOfPotentialVulnerabilities).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})