const router = require('express').Router()
const validation = require('../validation')
const User = require('../models/User')

router.post('/register', async (req, res) => {
    try {
        // Checking request data
        // Return validation's data as object || Throw if error
        const reqData = validation.register(req.body)

        // Checking username && email
        const hasUser = await User.findOne({ username: reqData.username })
        if (hasUser) throw 'This username has already taken !'
        const hasEmail = await User.findOne({ email: reqData.email })
        if (hasEmail) throw 'This email has already taken !'

        // Add new data
        const newUser = new User(reqData)
        let result = await newUser.save()
        res.send(result)
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router