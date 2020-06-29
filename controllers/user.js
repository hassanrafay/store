const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const roles = require('../helpers/roles')
const { secret, tokenLife } = require('../config/config')
const { CustomError } = require('../helpers/error-handler')

class UserController {
  async login (req, res, next) {
    const username = req.body.username
    const password = req.body.password
    try {
      // retrieving the user with the provide email
      const user = await User.findOne({ username: username }).exec()
      if (!user) {
        throw new CustomError(404, "User doesn't exist")
      }
      // comparing the password to check if its correct
      if (bcrypt.compareSync(password, user.password)) {
        user.password = undefined
        const token = jwt.sign({ user: user }, secret, { expiresIn: tokenLife })

        res.status(200).json({
          success: true,
          status: 200,
          message: 'User successfully logged in.',
          data: {
            user: user,
            token: token
          }
        })
      } else {
        throw new CustomError(403, 'Bad authentication')
      }
    } catch (error) {
      next(error)
    }
  }

  async populate (req, res, next) {
    const adminUser = new User({
      firstName: 'Rafay',
      lastName: 'Admin',
      username: 'rafayadmin',
      password: bcrypt.hashSync('password', 10),
      age: 30,
      role: roles.admin
    })
    const clientUser = new User({
      firstName: 'Rafay',
      lastName: 'Client',
      username: 'rafayclient',
      password: bcrypt.hashSync('password', 10),
      age: 25,
      role: roles.client
    })
    try {
      const [admin, client] = await Promise.all([adminUser.save(), clientUser.save()])
      admin.password = undefined
      client.password = undefined

      return res.status(201).json({
        success: true,
        message: 'Users created successfully.',
        data: [admin, client]
      })
    } catch (error) {
      next(error)
    }
  }
}

const userController = new UserController()
module.exports = userController
