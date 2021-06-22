const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const config = require('../utils/config')
const User = require('../models/user')

usersRouter.get('/', async (requres, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
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

module.exports = usersRouter