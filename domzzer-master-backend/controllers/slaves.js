const slavesRouter = require('express').Router()
const Slave = require('../models/slave')
const aes256 = require('../services/aesCryptoService')
const privilegesService = require('../services/privilegesService')

slavesRouter.get('/', async (request, response) => {

  const error = privilegesService.checkLitePrivileges(request.token)
  if (error) {
    return response.status(401).json({ error: error })
  }

  const slaves = await Slave.find({}).lean()
  const mappedSlaves = slaves.map(s => {
    const object = {
      id: s._id,
      name: s.name,
      address: s.address,
      username: s.username,
      password: aes256.decrypt(s.password),
      status: s.status,
      testsDone: s.testsDone,
      vulnerabilitiesFound: s.vulnerabilitiesFound
    }
    return object
  })
  response.json(mappedSlaves)
})

slavesRouter.post('/', async (request, response) => {

  const error = privilegesService.checkProPrivileges(request.token)
  if (error) {
    return response.status(401).json({ error: error })
  }

  const body = request.body

  const slave = new Slave({
    name: body.name,
    address: body.address,
    status: 'OFFLINE',
    testsDone: 0,
    vulnerabilitiesFound: 0,
    username: body.username,
    password: aes256.encrypt(body.password),
  })

  const savedSlave = await slave.save()
  response.json({ ...savedSlave, password: aes256.decrypt(savedSlave.password) })
})

slavesRouter.get('/:id', async (request, response) => {

  const error = privilegesService.checkLitePrivileges(request.token)
  if (error) {
    return response.status(401).json({ error: error })
  }

  const s = await Slave.findById(request.params.id).lean()
  const slave = s ? {
    id: s._id,
    name: s.name,
    address: s.address,
    username: s.username,
    password: aes256.decrypt(s.password),
    status: s.status,
    testsDone: s.testsDone,
    vulnerabilitiesFound: s.vulnerabilitiesFound
  } : null
  response.json(slave)
})

slavesRouter.put('/:id', async (request, response) => {

  const error = privilegesService.checkProPrivileges(request.token)
  if (error) {
    return response.status(401).json({ error: error })
  }

  const slave = request.body
  if (slave.username !== undefined && slave.username.length !== 0 && slave.username.length < 5) {
    return response.status(400).json({ error: 'Slave validation failed: username: field length must be at least 5 characters!' })
  }
  if (slave.username !== undefined && slave.username.length !== 0 && (slave.password === undefined || slave.password.length === 0)) {
    return response.status(400).json({ error: 'Slave validation failed: password: field is required when username is defined!' })
  }
  if (slave.password !== undefined && slave.password.length !== 0 && slave.password.length < 5) {
    return response.status(400).json({ error: 'Slave validation failed: password: field length must be at least 5 characters!' })
  }
  if (slave.password !== undefined && slave.password.length !== 0 && (slave.username === undefined || slave.username.length === 0)) {
    return response.status(400).json({ error: 'Slave validation failed: username: field is required when password is defined!' })
  }

  const s = await Slave.findByIdAndUpdate(
    request.params.id,
    { ...slave, password: aes256.encrypt(slave.password) },
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  ).lean()

  const updatedSlave = s ? {
    id: s._id,
    name: s.name,
    address: s.address,
    username: s.username,
    password: aes256.decrypt(s.password),
    status: s.status,
    testsDone: s.testsDone,
    vulnerabilitiesFound: s.vulnerabilitiesFound
  } : null

  response.json(updatedSlave)
})

slavesRouter.delete('/:id', async (request, response) => {

  const error = privilegesService.checkProPrivileges(request.token)
  if (error) {
    return response.status(401).json({ error: error })
  }

  await Slave.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = slavesRouter