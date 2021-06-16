const slavesRouter = require('express').Router()
const Slave = require('../models/slave')

slavesRouter.get('/', (req, res, next) => {
  Slave.find({}).then(slaves => {
    res.json(slaves)
  }).catch(error => next(error))
})

slavesRouter.post('/', (req, res, next) => {
  const body = req.body

  const slave = new Slave({
    name: body.name,
    address: body.address,
    status: 'OFFLINE',
    testsDone: 0,
    vulnerabilitiesFound: 0
  })

  slave.save().then(savedSlave => {
    res.json(savedSlave)
  }).catch(error => next(error))
})

slavesRouter.get('/:id', (req, res, next) => {
  Slave.findById(req.params.id)
    .then(slave => {
      res.json(slave)
    })
    .catch(error => next(error))
})

module.exports = slavesRouter