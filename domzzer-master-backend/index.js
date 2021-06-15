require('dotenv').config()
const express = require('express')
const cors = require('cors')
const unknownEndpoint = require('./middlewares/unknownEndpoint')
const errorHandler = require('./middlewares/errorHandler')
const serverInfoService = require('./services/serverInfoService')
const Slave = require('./models/slave')
const Vulnerability = require('./models/vulnerability')

const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())

// define usefull variables to hold data
const numberOfVulnerabilities = 0
const numberOfTestsPerformed = 0

///////////////////// ROUTES //////////////////////


app.get('/api/info', (req, res) => {
  Slave.countDocuments({}).then(count => {
    const info = serverInfoService.getSystemInformation()
    const details = {
      'numberOfPotentialVulnerabilities': numberOfVulnerabilities,
      'numberOfSlaves': count,
      'numberOfTestsPerformed': numberOfTestsPerformed,
      'serverDate': info.time,
      'serverMemoryMb': info.serverMemoryMb,
      'serverName': info.hostname,
      'serverType': info.serverType,
      'serverUptime': info.uptime,
      'serverVersion': info.serverVersion,
    }
    res.send(details)
  })
})

app.get('/api/slaves', (req, res, next) => {
  Slave.find({}).then(slaves => {
    res.json(slaves)
  }).catch(error => next(error))
})

app.post('/api/slaves', (req, res, next) => {
  const body = req.body

  if (body.name === undefined || body.address === undefined) {
    res.status(400).json({ error: 'invalid slave information' }).end()
    return
  }

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

app.get('/api/slaves/:id', (req, res, next) => {
  Slave.findById(req.params.id)
    .then(slave => {
      res.json(slave)
    })
    .catch(error => next(error))
})

app.get('/api/vulnerabilities', (req, res, next) => {
  Vulnerability.find({}).then(vulnerabilities => {
    res.json(vulnerabilities)
  }).catch(error => next(error))
})

app.get('/api/vulnerabilities/:id', (req, res, next) => {
  Vulnerability.findById(req.params.id)
    .then(vulnerability => {
      res.json(vulnerability)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

//////////////// SET APP TO LISTEN PORT ////////////////

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`domzzer-master-backend listening on port ${PORT}!`)
})