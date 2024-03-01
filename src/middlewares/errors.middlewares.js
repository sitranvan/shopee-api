const httpStatus = require('../constants/httpStatus')
const { serverMessage } = require('../constants/message')

const defaultErrorHandler = (err, req, res, next) => {
    const { code, message } = err

    res.status(typeof code === 'number' ? code : httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: message || serverMessage.INTERNAL_SERVER_ERROR
    })
}

module.exports = defaultErrorHandler
