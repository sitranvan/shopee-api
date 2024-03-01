const mongoose = require('mongoose')

const RefreshToken = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    iat: {
        type: Date,
        required: true
    },
    exp: {
        type: Date,
        required: true
    }
})
module.exports = mongoose.model('refresh_token', RefreshToken)
