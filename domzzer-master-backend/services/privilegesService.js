const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const checkLitePrivileges = (token) => {
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return 'token missing or invalid'
  }
}

const checkProPrivileges = (token) => {
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return 'token missing or invalid'
  }

  if (!decodedToken.userRole || decodedToken.userRole === 'LITE') {
    return 'insufficient privileges to complete the operation'
  }
}

const checkAdminPrivileges = (token) => {
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return 'token missing or invalid'
  }

  if (!decodedToken.userRole || decodedToken.userRole !== 'ADMIN') {
    return 'insufficient privileges to complete the operation'
  }
}

module.exports = {
  checkLitePrivileges,
  checkProPrivileges,
  checkAdminPrivileges
}