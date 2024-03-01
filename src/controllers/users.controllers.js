const { omit } = require('lodash')
const { userMessage } = require('../constants/message')
const usersService = require('../services/users.services')

const registerController = async (req, res) => {
    const body = omit(req.body, 'confirm_password')
    const result = await usersService.register(body)
    return res.json({
        message: userMessage.REGISTER_SUCCESS,
        data: result
    })
}

const loginController = async (req, res) => {
    const { user } = req
    const result = await usersService.login({ user_id: user._id, verify: user.verify })

    return res.json({
        message: userMessage.LOGIN_SUCCESS,
        data: result
    })
}

const logoutController = async (req, res) => {
    const { refresh_token } = req.body
    const result = await usersService.logout({ refresh_token })

    return res.json({
        message: result
    })
}

const refreshTokenController = async (req, res) => {
    const { refresh_token } = req.body
    const { user_id, verify, exp } = req.decoded_refresh_token

    const result = await usersService.refreshToken({ user_id, verify, exp, refresh_token })
    return res.json({
        message: userMessage.REFRESH_TOKEN_SUCCESS,
        data: result
    })
}
module.exports = {
    registerController,
    loginController,
    logoutController,
    refreshTokenController
}
