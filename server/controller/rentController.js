const Rentb= require('../model/rentModel')

const rentController = {
    getAll: async (req,res) => {
        try {
            const data = await Rent.find({})
            res.status(200).json({length: data.length, rents: data})
        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    },
    getSingle: async (req,res) => {
        try {
            let id = req.params.id
            const data = await Rent.findById({_id: id})
            if(!data)
            return res.status(400).json({msg: `rent id not found`})

            res.status(200).json({rent: data})
        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    },
    create: async (req,res) => {
        try {
            let extRent = await Rent.findOne({bookId: req.body.bookId} && {userId: req.body.userId})
            if(extRent)
            return res.status(400).json({msg: `already you have rented a book`})

            const data = await Rent.create(req.body)
            return res.status(200).json({msg: `rent details added successfully`, rent: data})
        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    },
    update: async (req,res) => {
        try {
            let id = req.params.id

            let extId = await Rent.findById({_id: id})
            if(!extId)
            return res.status(404).json({msg: `requested rent id not found`})
            if(extRent.bookId === req.body.bookId && extRent.userId === req.body.userId)
            return res.status(400).json({msg: `already you have rented a book`})

            await Rent.findByIdAndUpdate({_id: id}, {
                amount: req.body.amount,
                returnDate: req.body.returnDate,
                paymentStatus: req.body.paymentStatus
            })
            return res.status(200).json({msg: `rent updated deleted successfully`})
        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    },
    delete: async (req,res) => {
        try {
            let id = req.params.id

            let extId = await Rent.findById({_id: id})
            if(!extId)
            return res.status(404).json({msg: `requested rent id not found`})
            
            await Rent.findByIdAndUpdate({_id: id}, req.body)
            return res.status(200).json({msg: `rent details deleted successfully`})

        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    }
}
module.exports = rentController