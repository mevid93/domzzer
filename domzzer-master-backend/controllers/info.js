const infoRouter = require('express').Router()
const Slave = require('../models/slave')
const serverInfoService = require('../services/serverInfoService')
const privilegesService = require('../services/privilegesService')

const numberOfVulnerabilities = 0
const numberOfTestsPerformed = 0

infoRouter.get('/', (request, response, next) => {

  const error = privilegesService.checkLitePrivileges(request.token)
  if (error) {
    return response.status(401).json({ error: error })
  }

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
    response.send(details)
  }).catch(error => next(error))
})

module.exports = infoRouter