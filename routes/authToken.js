const jwt = require('jsonwebtoken')

const authToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(403).json({ error: 'Forbidden !' })

    try {
        const jwtResult = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = jwtResult._id
        next()
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized' })
    }
}

module.exports = authToken