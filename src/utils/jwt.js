const jwt = require('jsonwebtoken')
const tokenType = require('../constants/tokenType')
const { env } = require('../configs/env')

// Sign token
const signToken = ({
    payload,
    privateKey,
    options = {
        algorithm: 'HS256'
    }
}) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, privateKey, options, (error, token) => {
            if (error) {
                throw reject(error)
            }

            resolve(token)
        })
    })
}

// Verify token
const verifyToken = ({ token, secretOrPublicKey }) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretOrPublicKey, (error, decoded) => {
            if (error) {
                throw reject(error)
            }
            resolve(decoded)
        })
    })
}

const signAccessToken = (user_id, verify) => {
    return signToken({
        payload: {
            user_id,
            token_type: tokenType.ACCESS_TOKEN,
            verify
        },
        privateKey: env.jwtAccessTokenSecret,
        options: {
            expiresIn: env.jwtAccessTokenExpireIn
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
            privateKey: env.jwtRefreshTokenSecret
        })
    }
    return signToken({
        payload: {
            user_id,
            token_type: tokenType.REFRESH_TOKEN,
            verify
        },
        privateKey: env.jwtRefreshTokenSecret,
        options: {
            expiresIn: env.jwtAccessTokenExpireIn
        }
    })
}

const signAccessAndRefreshToken = ({ user_id, verify }) => {
    return Promise.all([signAccessToken(user_id, verify), signRefreshToken(user_id, verify)])
}

const decodeRefreshToken = (refresh_token) => {
    return verifyToken({
        token: refresh_token,
        secretOrPublicKey: env.jwtRefreshTokenSecret
    })
}
module.exports = {
    signAccessAndRefreshToken,
    decodeRefreshToken
}
