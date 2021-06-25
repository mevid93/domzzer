const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const checkLitePrivileges = (token) => {
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return 'Token missing or invalid!'
  }
}

const checkProPrivileges = (token) => {
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return 'Token missing or invalid!'
  }

  if (!decodedToken.userRole || decodedToken.userRole === 'LITE') {
    return 'Insufficient privileges to complete the operation!'
  }
}

const checkAdminPrivileges = (token) => {
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return 'Token missing or invalid!'
  }

  if (!decodedToken.userRole || decodedToken.userRole !== 'ADMIN') {
    return 'Insufficient privileges to complete the operation!'
  }
}

const checkTokenMatchesUserId = (token, id) => {
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return 'Token missing or invalid!'
  }

  if(decodedToken.userRole !== 'ADMIN' && decodedToken.id !== id) {
    return 'Insufficient privileges to complete the operation!'
  }
}

module.exports = {
  checkLitePrivileges,
  checkProPrivileges,
  checkAdminPrivileges,
  checkTokenMatchesUserId,
}