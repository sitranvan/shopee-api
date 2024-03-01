const { checkSchema } = require('express-validator')
const { userMessage } = require('../constants/message')
const UserModles = require('../models/User.modles')

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
        password: {
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
        },
        confirm_password: {
            notEmpty: {
                errorMessage: userMessage.CONFIRM_PASSWORD_NOT_EMPTY
            },
            custom: {
                options: (value, { req }) => {
                    if (value !== req.body.password) {
                        throw new Error(userMessage.CONFIRM_PASSWORD_NOT_MATCH)
                    }
                    return true
                }
            }
        }
    },
    ['body']
)
module.exports = {
    registerValidator
}
