const mongoose = require('mongoose')
const categoryModel = new mongoose.Schema({
     title: {
        type: String,
        required: true,
        unique: true,
        trim: true
     },
     desc: {
        type: String,
        required: true
     },
     isActive: {
        type: Boolean,
        default: true
     }
},{
    collection: "category",
    timestamps: true
})

module.exports = mongoose.model("Category", categoryModel)