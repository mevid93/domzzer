const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const configurator = require('./services/configurationService')
const usersRouter = require('./controllers/users')
const infoRouter = require('./controllers/info')
const slavesRouter = require('./controllers/slaves')
const loginRouter = require('./controllers/login')
const settingsRouter = require('./controllers/settings')
const vulnerabilitiesRouter = require('./controllers/vulnerabilities')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())

logger.info('connecting to', config.MONGODB_URI)

mongoose.set('runValidators', true)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/settings', settingsRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/info', infoRouter)
app.use('/api/slaves', slavesRouter)
app.use('/api/vulnerabilities', vulnerabilitiesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

configurator.configure()

module.exports = app