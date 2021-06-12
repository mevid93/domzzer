require('dotenv').config()
const express = require('express')
const cors = require('cors')
const serverInfoService = require('./services/serverInfoService')
const Slave = require('./models/slave')
const Vulnerability = require('./models/vulnerability')
const app = express()

// set middlewares into use
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

app.get('/api/slaves', (req, res) => {
  Slave.find({}).then(slaves => {
    res.json(slaves)
  }).catch(error => {
    console.log(error)
    res.status(500).end()
  })
})

app.get('/api/slaves/:id', (req, res) => {
  Slave.findById(req.params.id)
    .then(slave => {
      res.json(slave)
    })
    .catch(error => {
      console.log(error)
      res.status(400).end()
    })
})

app.get('/api/vulnerabilities', (req, res) => {
  Vulnerability.find({}).then(vulnerabilities => {
    res.json(vulnerabilities)
  }).catch(error => {
    console.log(error)
    res.status(500).end()
  })
})

app.get('/api/vulnerabilities/:id', (req, res) => {
  Vulnerability.findById(req.params.id)
    .then(vulnerability => {
      res.json(vulnerability)
    })
    .catch(error => {
      console.log(error)
      res.status(400).end()
    })
})

//////////////// SET APP TO LISTEN PORT ////////////////

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`domzzer-master-backend listening on port ${PORT}!`)
})