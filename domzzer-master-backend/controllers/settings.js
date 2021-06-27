const settingsRouter = require('express').Router()
const privilegesService = require('../services/privilegesService')
const pollingService = require('../services/pollingService')

settingsRouter.get('/', async (request, response) => {
  const error = privilegesService.checkAdminPrivileges(request.token)
  if (error) {
    return response.status(401).json({ error: error })
  }
  const isPolling = pollingService.isPolling()
  const pollInterval = pollingService.getPollingInterval()
  response.status(200).json({ isPolling, pollInterval })
})

settingsRouter.put('/', async (request, response) => {
  const error = privilegesService.checkAdminPrivileges(request.token)
  if (error) {
    return response.status(401).json({ error: error })
  }
  const pollInterval = request.body.pollInterval
  if (pollInterval === undefined) {
    return response.status(400).json({ error: 'Error: polling interval must be defined!' })
  }

  const wasPollingBefore = pollingService.isPolling()
  pollingService.stopPolling()
  pollingService.setPollingInterval(Number(pollInterval))
  if (wasPollingBefore) {
    pollingService.startPolling()
  }
  const interval = pollingService.getPollingInterval()
  response.status(200).json({ isPolling: wasPollingBefore, pollInterval: interval })
})

settingsRouter.post('/start', async (request, response) => {
  const error = privilegesService.checkAdminPrivileges(request.token)
  if (error) {
    return response.status(401).json({ error: error })
  }
  if (!pollingService.isPolling()) {
    pollingService.startPolling()
  }
  response.status(200).end()
})

settingsRouter.post('/stop', async (request, response) => {
  const error = privilegesService.checkAdminPrivileges(request.token)
  if (error) {
    return response.status(401).json({ error: error })
  }
  if (pollingService.isPolling()) {
    pollingService.stopPolling()
  }
  response.status(200).end()
})

module.exports = settingsRouter