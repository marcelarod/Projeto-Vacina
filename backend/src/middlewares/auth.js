const jwt = require('jsonwebtoken')
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (typeof authHeader !== 'undefined') {
            const token = authHeader.split(' ')[1];
            if (!token) { return res.status(401).json({ success: false, message: 'not logged in' }) }
            req.decoded = jwt.verify(token, process.env.SECRET)
            next()
        } else {
            return res.status(401).json({ success: false, message: 'not logged in' })
        }
    } catch (err) {
        console.log(err)
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        })
    }
}

module.exports = authMiddleware