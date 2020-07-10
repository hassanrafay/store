const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')
const { CustomError } = require('../helpers/error-handler')

const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles]
  }

  return (req, res, next) => {
    const token = req.headers.Authorization ? req.headers.Authorization : req.headers.authorization

    if (!token) {
      throw new CustomError(401, 'Unauthorized request.')
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        throw new CustomError(401, 'Unauthorized request')
      }
      req.user = decoded.user
      req.role = decoded.user.role
      if (roles.length && !roles.includes(req.user.role)) {
        throw new CustomError(401, 'Unauthorized request')
      }
      next()
    })
  }
}

module.exports = authorize
