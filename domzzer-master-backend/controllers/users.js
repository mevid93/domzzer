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

  const passwordError = checkPasswordLength(body.password)
  if (passwordError) {
    return response.status(400).json({ error: passwordError })
  }

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

usersRouter.put('/:id', async (request, response) => {
  const error = privilegesService.checkTokenMatchesUserId(request.token, request.params.id)
  if (error) {
    return response.status(401).json({ error: error })
  }

  const body = request.body
  const passwordError = checkPasswordLength(body.password)
  if (passwordError) {
    return response.status(400).json({ error: passwordError })
  }

  const passwordHash = await bcrypt.hash(body.password, config.SALT_ROUNDS)

  const user = await User.findByIdAndUpdate(
    request.params.id,
    { ...body, passwordHash },
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  )
  response.json(user)
})

const checkPasswordLength = (password) => {
  if (password === null || password === undefined || password.length < 5) {
    return 'Validation failed: password: field length must be at least 5 characters!'
  }
}

module.exports = usersRouter