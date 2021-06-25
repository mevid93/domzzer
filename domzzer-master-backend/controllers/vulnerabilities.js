const vulnerabilitiesRouter = require('express').Router()
const Vulnerability = require('../models/vulnerability')
const privilegesService = require('../services/privilegesService')

vulnerabilitiesRouter.get('/', async (request, response) => {
  const error = privilegesService.checkLitePrivileges(request.token)
  if (error) {
    return response.status(401).json({ error: error })
  }

  const vulnerabilities = await Vulnerability.find({})
  response.json(vulnerabilities)
})

vulnerabilitiesRouter.get('/:id', async (request, response) => {
  const error = privilegesService.checkLitePrivileges(request.token)
  if (error) {
    return response.status(401).json({ error: error })
  }

  const vulnerability = await Vulnerability.findById(request.params.id)
  response.json(vulnerability)
})

vulnerabilitiesRouter.put('/:id', async (request, response) => {
  const error = privilegesService.checkLitePrivileges(request.token)
  if (error) {
    return response.status(401).json({ error: error })
  }

  const vulnerability = request.body
  const updatedVulnerability = await Vulnerability.findByIdAndUpdate(
    request.params.id,
    vulnerability,
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  )
  response.json(updatedVulnerability)
})

vulnerabilitiesRouter.delete('/:id', async (request, response) => {
  const error = privilegesService.checkProPrivileges(request.token)
  if (error) {
    return response.status(401).json({ error: error })
  }

  await Vulnerability.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = vulnerabilitiesRouter