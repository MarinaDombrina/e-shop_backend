const {Schema, model} = require('mongoose')

const Product = new Schema({
    name: {
        type: String,
        required: true
    },        
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        ref: 'Role'
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = model('Product', Product)