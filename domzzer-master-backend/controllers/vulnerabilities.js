const vulnerabilitiesRouter = require('express').Router()
const Vulnerability = require('../models/vulnerability')

vulnerabilitiesRouter.get('/', (req, res, next) => {
  Vulnerability.find({}).then(vulnerabilities => {
    res.json(vulnerabilities)
  }).catch(error => next(error))
})

vulnerabilitiesRouter.get('/:id', (req, res, next) => {
  Vulnerability.findById(req.params.id)
    .then(vulnerability => {
      res.json(vulnerability)
    })
    .catch(error => next(error))
})

module.exports = vulnerabilitiesRouter