const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const defaultErrorHandler = require('./middlewares/errors.middlewares')
const usersRouter = require('./routes/users.routes')
const connectToDatabase = require('./databases/connect.databases')
const { env } = require('./configs/env')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

connectToDatabase()

app.use('/api/v1', usersRouter)

app.use(defaultErrorHandler)

app.listen(env.port, () => {
    console.log(`Example app listening on port ${env.port}`)
})
