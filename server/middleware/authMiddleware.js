const jwt = require('jsonwebtoken')

const authMiddleware = ((req,res, next) => {
    try {
        //headers
        const token = req.headers('authorization')

        jwt.verify(token,process.env.SECRET_TOKEN,(err,user)=> {
            if(err)
            return res.status(404).json({msg: `unAuthorised token`})
            //res.json({user})
            req.user = user //assigning to request variable
            next() //send the data to next controller
        })
        
    } catch(err) {
        return res.status(500).json({msg: err.message })
    }
})

module.exports = authMiddleware