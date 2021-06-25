const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const config = require('../utils/config')
const User = require('../models/user')
const privilegesService = require('../services/privilegesService')

usersRouter.get('/', async (request, response) => {
  const error = privilegesService.checkAdminPrivileges(request.token)
  if (error) {
    return response.status(401).json({ error: error })
  }

  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const error = privilegesService.checkAdminPrivileges(request.token)
  if (error) {
    return response.status(401).json({ error: error })
  }

  const body = request.body

  const passwordHash = await bcrypt.hash(body.password, config.SALT_ROUNDS)

  const user = new User({
    username: body.username,
    userRole: body.userRole,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/:id', async (request, response) => {
  const error = privilegesService.checkTokenMatchesUserId(request.token, request.params.id)
  if (error) {
    return response.status(401).json({ error: error })
  }

  const user = await User.findById(request.params.id)
  response.json(user)
})

usersRouter.delete('/:id', async (request, response) => {
  const error = privilegesService.checkAdminPrivileges(request.token)
  if (error) {
    return response.status(401).json({ error: error })
  }

  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = usersRouter