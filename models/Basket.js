const { Schema, model } = require('mongoose')

const Basket = new Schema({
    products: [
        {
            type: String,
            ref: 'Product',
            default: undefined
        }
    ]
})

module.exports = model('Basket', Basket)