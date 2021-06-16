const infoRouter = require('express').Router()
const Slave = require('../models/slave')
const serverInfoService = require('../services/serverInfoService')

const numberOfVulnerabilities = 0
const numberOfTestsPerformed = 0

infoRouter.get('/', (req, res, next) => {
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
  }).catch(error => next(error))
})

module.exports = infoRouter