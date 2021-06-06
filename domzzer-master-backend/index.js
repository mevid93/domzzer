const express = require('express')
const cors = require('cors')
const serverInfoService = require('./services/serverInfoService')
const app = express()

// set middlewares into use
app.use(express.json())
app.use(express.static('build'))
app.use(cors())

// define usefull variables to hold data
const slaves = []
const vulnerabilities = []
const testsPerformed = 0

///////////////////// ROUTES //////////////////////


app.get('/api/info', (req, res) => {
  const info = serverInfoService.getSystemInformation()
  const details = {
    "numberOfPotentialVulnerabilities": vulnerabilities.length,
    "numberOfSlaves": slaves.length,
    "numberOfTestsPerformed": testsPerformed,
    "serverDate": info.time,
    "serverMemoryMb": info.serverMemoryMb,
    "serverName": info.hostname,
    "serverType": info.serverType,
    "serverUptime": info.uptime,
    "serverVersion": info.serverVersion,
  }
  res.send(details)
})

app.get('/api/slaves', (req, res) => {
  const slaves = [{
    "id": 0,
    "name": "slaavikone",
    "address": "http://127.0.0.0:3333",
    "status": "UNAVAILABLE",
    "testsDone": 0,
    "vulnerabilitiesFound": 0
  }]
  res.send(slaves)
})

//////////////// SET TO LISTEN PORT //////////////

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`domzzer-master-backend listening on port ${PORT}!`)
})