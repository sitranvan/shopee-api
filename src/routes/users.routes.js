const { Router } = require('express')
const wrapRequest = require('../utils/request')
const { validate } = require('../utils/validate')
const { registerController } = require('../controllers/users.controllers')

const { registerValidator } = require('../middlewares/users.middlewares')

const usersRouter = Router()

usersRouter.post('/register', validate(registerValidator), wrapRequest(registerController))

module.exports = usersRouter
