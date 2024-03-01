const { validationResult } = require('express-validator')
const { ErrorWithStatus } = require('../models/Error')
const httpStatus = require('../constants/httpStatus')
const { omit } = require('lodash')

const validate = (schema) => {
    return async (req, res, next) => {
        await schema.run(req)
        const errors = validationResult(req)
        const errorsObject = errors.mapped()
        for (const key in errorsObject) {
            const { msg } = errorsObject[key]
            // Trả về không phải lỗi validation
            if (msg instanceof ErrorWithStatus && msg.status !== httpStatus.UNPROCESSABLE_ENTITY) {
                return res.status(msg.status).json({
                    data: omit(msg, 'status')
                })
            }
        }
        if (Object.keys(errorsObject).length > 0) {
            return res.status(422).json({
                data: errorsObject
            })
        }
        next()
    }
}

module.exports = {
    validate
}
