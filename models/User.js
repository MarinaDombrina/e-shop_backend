const {Schema, model} = require('mongoose')

const User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },        
    password: {
        type: String,
        required: true
    },
    roles: [
        {
            type: String,
            ref: 'Role'
        }
    ],
    basket: [
        {
            type: String,
            ref: 'Product',
            default: undefined
        }
    ]
})

module.exports = model('User', User)