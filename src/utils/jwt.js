const jwt = require('jsonwebtoken')
// Sign token
const signToken = ({
    payload,
    privateKey,
    options = {
        algorithm: 'HS256'
    }
}) => {
    return new Promise()((resolve, reject) => {
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
    return new Promise()((resolve, reject) => {
        jwt.verify(token, secretOrPublicKey, (error, decoded) => {
            if (error) {
                throw reject(error)
            }
            resolve(decoded)
        })
    })
}

module.exports = {
    signToken,
    verifyToken
}
