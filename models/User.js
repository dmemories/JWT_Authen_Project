const mongoose = require('mongoose')
const schema = mongoose.Schema({
    username: { type: String, require: true },
    passord: { type: String, require: true },
    email: { type: String, require: true },
    createAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('user', schema)