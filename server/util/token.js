const jwt = require('jsonwebtoken')

const creayeLoginToken = (id) => {
     return jwt.sign(id,process.env.SECRET_TOKEN, {expiresIn: 'id'})
}

module.exports = {creayeLoginToken} //typr or const or named exports