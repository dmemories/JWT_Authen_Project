const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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

        // Hash passwords
        const salt = await bcrypt.genSalt(10)
        reqData.password = await bcrypt.hash(reqData.password, salt) 

        // Add new data
        const newUser = new User(reqData)
        let result = await newUser.save()
        res.status(200).json(result)
    } catch (err) {
        res.status(400).json({ error: err })
    }
})

router.post('/login', async (req, res) => {
    try {
        // Checking request data
        // Return validation's data as object || Throw if error
        const { username, password } = validation.login(req.body)
        // Checking username
        const userData = await User.findOne({ username })
        if (!userData) throw 'Username is not found !'

        // Checking password
        const loginSucc = await bcrypt.compare(password, userData.password)
        if (!loginSucc) throw 'Password is incorrect !'
        
        // Create JWT Token
        const token = jwt.sign({ _id: userData._id }, process.env.JWT_SECRET)

        res.status(200).json({ result: 'Login Successfully', token: token })
    } catch (err) {
        res.status(400).json({ error: err })
    }
})

module.exports = router