const User = require('../model/userModel')

const adminAuth = async (req,res,next) => {
    try {
        const id = req.user.id

        const extUser = await User.findById({_id: id})
        if(!extUser)
        return res.status(404).json({msg: `user id  not found`})

        //validate role
        if(extUser.role !== "superadmin" )
        return res.status(400).json({msg: `access deneid for non admin users..`})

        next()
    } catch{
       return res.status(500).json({msg: err.message})
    }
}