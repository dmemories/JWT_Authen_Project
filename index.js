// Import Modoules
const express = require('express')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const dataRoute = require('./routes/data')
require('dotenv').config()

// Initial
const app = express()
app.use(express.json())
const svPort = 3000
const LOG_COLOR_SUCC = '\x1b[32m%s\x1b[0m'
const LOG_COLOR_INFO = '\x1b[33m%s\x1b[0m'
const LOG_COLOR_ERR = '\x1b[31m%s\x1b[0m'

mongoose.connect(process.env.MONGO_CONNECT).then(() => {
    console.log(LOG_COLOR_SUCC, 'Mongoose connected')
}).catch(err => {
    console.log(LOG_COLOR_ERR, `Mongoose connect error\n${err}`)
})

// Routes
app.use('/user', authRoute)
app.use('/data', dataRoute)


app.listen(svPort, () => {
    console.log(LOG_COLOR_INFO, `Server is running on port ${svPort}`)
})