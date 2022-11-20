const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const {generateAccessToken} = require('../middlewares/jwt')

const User = require('../models/User')
const Role = require('../models/Role')
const Product = require('../models/Product')
const Basket = require('../models/Basket')

class BasketController {
    async addProduct(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({message: 'Basket error: ', errors})

            const {username, productID} = req.body

            console.log(req.body);

            let user = await User.findOne({username: username})
            if(!user) return res.status(400).json({message: `user ${username} not found`})

            const product = await Product.findById(productID)

            user.basket.push(product._id)
            await user.save()

            user = await User.findOne({username: username})
        
            return res.json({message: 'Product was added'})
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Basket add error'})
        }
    }

    async getBasket(req, res) {
        try {
            const {username} = req.query

            const user = await User.findOne({username: username})
            if(!user) return res.status(400).json({message: `user ${username} not found`})

            const products = await Product.find({
                _id: {
                    $in: user.basket
                }
            })

            return res.json(products)
        } catch (e) {
            console.log(e);
            res.json({message: 'Get basket error'})
        }
    }


    async deleteProduct(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new BasketController()