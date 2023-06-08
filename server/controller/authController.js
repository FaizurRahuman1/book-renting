const User = require('../model/userModel')
const bcrypt = require('bcryptjs')
const {createLoginToken} = require('../util/token')
const jwt = require("jsonwebtoken")

const authController = {
    register:async (req,res) => {
        try{
          const {name, email,mobile,password} = req.body

          //encrypt the password
          const encPass = await bcrypt.hash(password,10)
          //checking email already excist or not
          const extEmail = await User.findOne({email})
          if(extEmail)
          return res.status(400).json({msg: `${email} already registered`})

          //checking mobile num registerde already
          const extMobile = await User.findOne({mobile})
          if(extMobile)
          return res.status(400).json({msg: `${mobile} already registered`})

          
          const newUser = await User.create({
            name,
            email,
            mobile,
            password: encPass
          })
          res.json({msg: "registered succesfully", data: newUser})
        } catch (err) {
           return res.status(500).json({msg: err.message})
        }
    },
    login: async (req,res) => {
        try{
            const {email, password} = req.body

            //user email excist or not
            const extUser = await User.findOne({ email })
            if(!extUser)
            return res.status(404).json({msg: `${email} doesnot excists`})

            //comapre the passwords
            const isMatch = await bcrypt.compare(password, extUser.password)
            if(!isMatch)
            return res.status(400).json({msg: `passwords are not matched..`})

            //chck if user is blocked or Not
            if(!extUser.isActive)
            return res.status(400).json({msg: `hi ${extUser.name}, sorry your account is blocked contact admin .. `})

            //generate login token
            const token = createLoginToken({id: extUser._id})
            //save the token in cookies
            res.cookie('loginToken', token, {
               httpOnly: true,
               signed: true,
               path: `/api/auth/token`,
               maxAge: 1 * 24 * 60 * 60 * 1000
            })
            res.json({msg: "Login successful", token})
         } catch (err) {
            return res.status(500).json({msg: err.message})
         }
    },
    logout: async (req,res) => {
        try{
         res.clearCookie('loginToken', {path: `/api/auth/token`})
            res.json({msg: 'logout successfully'})
         } catch (err) {
            return res.status(500).json({msg: err.message})
         }
    },
    currentUser: async (req,res) =>  {
        try{
         const data = await User.findById({_id: req.user.id}).select('-password')
         if(!data)
           return res.status(404).json({msg:`requested user not found` })
            res.json({currentUser: data})
         } catch (err) {
            return res.status(500).json({msg: err.message})
         }
    },
    authToken: async (req,res) => {
        try{
            const cToken = req.signedCookies.loginToken
            if(!cToken)
            return res.status(404).json({msg: "token not found, session expired"})

            //verify login token
            jwt.verify(cToken, process.env.SECRET_TOKEN,(err,user) => {
               if(err)
               return res.status(400).json({msg: `invalid token..unAutorised`})
               
               //res.json({ user })
             const rToken = createLoginToken({id: user.id})
             res.json({ authToken: rToken })
            })
            
         } catch (err) {
            return res.status(500).json({msg: err.message})
         }
    }
}

module.exports = authController