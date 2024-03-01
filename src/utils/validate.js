const { validationResult } = require('express-validator')

const validate = (schema) => {
    return async (req, res, next) => {
        await schema.run(req)
        const errors = validationResult(req)
        const errorsObject = errors.mapped()

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
