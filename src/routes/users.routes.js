const { Router } = require('express')
const wrapRequest = require('../utils/request')
const { validate } = require('../utils/validate')
const { registerController, loginController } = require('../controllers/users.controllers')
const { registerValidator, loginValidator } = require('../middlewares/users.middlewares')

const usersRouter = Router()

usersRouter.post('/register', validate(registerValidator), wrapRequest(registerController))
usersRouter.post('/login', validate(loginValidator), wrapRequest(loginController))

module.exports = usersRouter
