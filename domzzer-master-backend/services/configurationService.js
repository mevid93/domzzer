const config = require('../utils/config')
const bcrypt = require('bcrypt')
const User = require('../models/user')

// create default user if no users exist in database
const configure = async () => {
  const users = await User.find({})
  if (users === null || users.length === 0) {
    const defaultUser = new User({
      username: 'admin',
      userRole: 'ADMIN',
      passwordHash: await bcrypt.hash('admin', config.SALT_ROUNDS)
    })
    await defaultUser.save()
  }
}

module.exports = { configure }