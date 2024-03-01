const { verify } = require('crypto')
const { userMessage } = require('../constants/message')
const UserModles = require('../models/User.modles')
const { signToken, verifyToken } = require('../utils/jwt')
const tokenType = require('../constants/tokenType')
const { env } = require('../configs/env')

const signAccessToken = (user_id, verify) => {
    return signToken({
        payload: {
            user_id,
            token_type: tokenType.ACCESS_TOKEN,
            verify
        },
        privateKey: env.jwtAccessTokenSecret,
        options: {
            expiresIn: env.jwtExpireIn
        }
    })
}

const signRefreshToken = (user_id, verify, exp) => {
    if (exp) {
        return signToken({
            payload: {
                user_id,
                token_type: tokenType.REFRESH_TOKEN,
                verify,
                exp
            },
            privateKey: env.jwtSecretRefreshToken
        })
    }
    return signToken({
        payload: {
            user_id,
            token_type: tokenType.REFRESH_TOKEN,
            verify
        },
        privateKey: env.jwtSecretRefreshToken,
        options: {
            expiresIn: env.refreshTokenExpiresIn
        }
    })
}

const signAccessAndRefreshToken = ({ user_id, verify }) => {
    return Promise.all([signAccessToken(user_id, verify), signRefreshToken(user_id, verify)])
}

const decodeRefreshToken = (refresh_token) => {
    return verifyToken({
        token: refresh_token,
        secretOrPublicKey: env.jwtSecretRefreshToken
    })
}

const registerController = async (req, res) => {
    const { email, password } = req.body

    const user = await UserModles.create({
        email,
        password
    })

    // Gửi email xác thực tài khoản

    return res.json({
        message: userMessage.REGISTER_SUCCESS,
        data: user
    })
}
module.exports = {
    registerController
}
