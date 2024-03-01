const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        default: null
    },
    address: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    isVerified: {
        type: String,
        default: 'unverified'
    },
    role: {
        type: String,
        default: 'user'
    }
})

module.exports = mongoose.model('user', User)
