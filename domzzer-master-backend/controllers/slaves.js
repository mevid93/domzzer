const slavesRouter = require('express').Router()
const Slave = require('../models/slave')

slavesRouter.get('/', async (request, response) => {
  const slaves = await Slave.find({})
  response.json(slaves)
})

slavesRouter.post('/', async (request, response) => {
  const body = request.body

  const slave = new Slave({
    name: body.name,
    address: body.address,
    status: 'OFFLINE',
    testsDone: 0,
    vulnerabilitiesFound: 0
  })

  const savedSlave = await slave.save()
  response.json(savedSlave)
})

slavesRouter.get('/:id', async (request, response) => {
  const slave = await Slave.findById(request.params.id)
  response.json(slave)
})

slavesRouter.put('/:id', async (request, response) => {
  const slave = await Slave.findByIdAndUpdate(
    request.params.id,
    request.body,
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  )
  response.json(slave)
})

slavesRouter.delete('/:id', async (request, response) => {
  await Slave.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = slavesRouter