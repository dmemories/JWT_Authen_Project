const router = require('express').Router()
const authToken = require('./authToken')
const User = require('../models/User')

router.get('/', authToken, async (req, res) => {
    const { username, email } = await User.findOne({ _id: req.userId })
    res.status(200).json({
        result: "Hello",
        username,
        email
    })
})


module.exports = router