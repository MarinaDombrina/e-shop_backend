const {Schema, model} = require('mongoose')

const Category = new Schema({
    value: {
        type: String,
        unique: true,
        default: ''
    }
})

module.exports = model('Category', Category)