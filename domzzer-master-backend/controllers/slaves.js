const slavesRouter = require('express').Router()
const Slave = require('../models/slave')
const aes256 = require('../services/aesCryptoService')
const privilegesService = require('../services/privilegesService')

slavesRouter.get('/', async (request, response) => {

  const error = privilegesService.checkLitePrivileges(request.token)
  if (error) {
    return response.status(401).json({ error: error })
  }

  const slaves = await Slave.find({})
  response.json(slaves)
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
  response.json(savedSlave)
})

slavesRouter.get('/:id', async (request, response) => {

  const error = privilegesService.checkLitePrivileges(request.token)
  if (error) {
    return response.status(401).json({ error: error })
  }

  const slave = await Slave.findById(request.params.id)
  response.json(slave)
})

slavesRouter.put('/:id', async (request, response) => {

  const error = privilegesService.checkProPrivileges(request.token)
  if (error) {
    return response.status(401).json({ error: error })
  }

  const slave = request.body
  const updatedSlave = await Slave.findByIdAndUpdate(
    request.params.id,
    { ...slave, password: aes256.encrypt(slave.password) },
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  )
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