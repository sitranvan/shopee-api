const { checkSchema } = require('express-validator')
const { userMessage } = require('../constants/message')
const UserModles = require('../models/User.modles')
const { hashPassword } = require('../utils/crypto')

const passwordSchema = {
    notEmpty: {
        errorMessage: userMessage.PASSWORD_NOT_EMPTY
    },
    isStrongPassword: {
        options: {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        },
        errorMessage: userMessage.PASSWORD_STRONG
    }
}

const registerValidator = checkSchema(
    {
        email: {
            notEmpty: {
                errorMessage: userMessage.EMAIL_NOT_EMPTY
            },
            isEmail: {
                errorMessage: userMessage.EMAIL_INVALID
            },
            custom: {
                options: async (value) => {
                    const user = await UserModles.findOne({ email: value })
                    if (user) {
                        throw new Error(userMessage.EMAIL_EXISTED)
                    }
                }
            }
        },
        password: passwordSchema
    },
    ['body']
)
const loginValidator = checkSchema(
    {
        email: {
            notEmpty: {
                errorMessage: userMessage.EMAIL_NOT_EMPTY
            },
            isEmail: {
                errorMessage: userMessage.EMAIL_INVALID
            },
            custom: {
                options: async (value, { req }) => {
                    const user = await UserModles.findOne({ email: value, password: hashPassword(req.body.password) })
                    if (!user) {
                        throw new Error(userMessage.EMAIL_OR_PASSWORD_IS_INCORRECT)
                    }
                    user.password = undefined
                    req.user = user
                    return true
                }
            }
        },
        password: passwordSchema
    },
    ['body']
)

module.exports = {
    registerValidator,
    loginValidator
}
