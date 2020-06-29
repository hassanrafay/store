const express = require('express')

const authorize = require('./middlewares/authorize')
const roles = require('./helpers/roles')
const ProductController = require('./controllers/product')
const UserController = require('./controllers/user')

const router = express.Router()

router.get('/users/populate', UserController.populate)
router.post('/login', UserController.login)

router.post('/products', authorize(roles.admin), ProductController.create)
router.get('/products', authorize([roles.client, roles.admin]), ProductController.getAll)
router.get('/products/:id', authorize([roles.client, roles.admin]), ProductController.get)
router.put('/products/:id', authorize(roles.admin), ProductController.update)
router.delete('/products/:id', authorize(roles.admin), ProductController.delete)

module.exports = router
