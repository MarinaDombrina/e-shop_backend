const jwt = require('jsonwebtoken')

const {secret} = require('../config')

const generateAccessToken = (id, username, roles) => {
    const payload = {id, username, roles}

    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

module.exports = {
    generateAccessToken
}