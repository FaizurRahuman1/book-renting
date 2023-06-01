const user = require('../model/userModel')
const bcrypt = require('bcryptjs')

const authController = {
    register:async (req,res) => {
        try{
          const {name, email,mobile,password} = req.body

          //encrypt the password
          const encPass = await bcrypt.hash(password,10)
          //checking email already excist or not
          const extEmail = await user.findOne({email})
          if(extEmail)
          return res.status(400).json({msg: `${email} already registered`})

          //checking mobile num registerde already
          const extMobile = await user.findOne({mobile})
          if(extMobile)
          return res.status(400).json({msg: `${mobile} already registered`})

          
          const newUser = await user.create({
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
            res.json({msg: 'login called'})
         } catch (err) {
            return res.status(500).json({msg: err.message})
         }
    },
    logout: async (req,res) => {
        try{
            res.json({msg: 'logout called'})
         } catch (err) {
            return res.status(500).json({msg: err.message})
         }
    },
    currentUser: async (req,res) =>  {
        try{
            res.json({msg: 'current user called'})
         } catch (err) {
            return res.status(500).json({msg: err.message})
         }
    },
    authToken: async (req,res) => {
        try{
            res.json({msg: 'authtoken called'})
         } catch (err) {
            return res.status(500).json({msg: err.message})
         }
    }
}

module.exports = authController