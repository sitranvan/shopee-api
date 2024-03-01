const { checkSchema } = require('express-validator')
const { userMessage } = require('../constants/message')
const UserModles = require('../models/User.modles')
const { hashPassword } = require('../utils/crypto')
const { ErrorWithStatus } = require('../models/Error')
const RefreshTokenModels = require('../models/RefreshToken.models')
const { verifyToken } = require('../utils/jwt')
const { env } = require('../configs/env')
const { JsonWebTokenError } = require('jsonwebtoken')
const { capitalize } = require('lodash')
const httpStatus = require('../constants/httpStatus')

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

const refreshTokenValidator = checkSchema({
    refresh_token: {
        trim: true,
        custom: {
            options: async (value, { req }) => {
                if (!value) {
                    throw new ErrorWithStatus({
                        message: userMessage.REFRESH_TOKEN_NOT_EMPTY,
                        status: httpStatus.UNAUTHORIZED
                    })
                }
                try {
                    const [decoded_refresh_token, refresh_token] = await Promise.all([
                        verifyToken({ token: value, secretOrPublicKey: env.jwtRefreshTokenSecret }),
                        RefreshTokenModels.findOne({ token: value })
                    ])

                    if (!refresh_token) {
                        throw new ErrorWithStatus({
                            message: userMessage.REFRESH_TOKEN_INVALID,
                            status: httpStatus.UNAUTHORIZED
                        })
                    }
                    req.decoded_refresh_token = decoded_refresh_token
                } catch (error) {
                    if (error instanceof JsonWebTokenError) {
                        throw new ErrorWithStatus({
                            message: capitalize(error.message),
                            status: httpStatus.UNAUTHORIZED
                        })
                    }
                    throw error
                }
                return true
            }
        }
    }
})

module.exports = {
    registerValidator,
    loginValidator,
    refreshTokenValidator
}
