const jwt = require('jsonwebtoken');

const createJWTToken = user => {
    return jwt.sign({ user }, 'secret', {
        expiresIn: '1h'
    })
}

module.exports = {
    createJWTToken,
}
