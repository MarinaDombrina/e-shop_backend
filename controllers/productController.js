const {validationResult} = require('express-validator')
const Category = require('../models/Category')


const Product = require('../models/Product')

class ProductController {
    async add(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({message: 'Add product error: ', errors})

            const {name, price, category, description} = req.body

            const productCategory = await Category.findById(category._id)

            const product = new Product({name, price, category: productCategory.value, description})
            await product.save();
            
            return res.json({message: 'Product added'})
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Product creation error'})
        }
    }

    async update(req, res) {

        

        // try {
        //     const {username, password} = req.body
        //     const user = await User.findOne({username: username})
        //     if(!user) return res.status(400).json({message: `user ${username} not found`})
            
        //     const validPassword = bcrypt.compareSync(password, user.password)

        //     if (!validPassword) return res.status(400).json({message: 'Password is incorrect'})

        //     const token = generateAccessToken(user._id, user.roles)

        //     return res.json({token})
        // } catch (e) {
        //     console.log(e);
        //     res.status(400).json({message: 'Login error'})
        // }
    }


    async getProduct(req, res) {
        try {
            const {id} = req.params
            const product = await Product.findById(id)
            return res.json(product)
        } catch (e) {
            console.log(e)
        }
    }

    async getAll(req, res) {
        try {
            const {categoryId} = req.query
            let products
            if (!categoryId) {
                products = await Product.find()
            }
            if (categoryId) {
                const category = await Category.findById(categoryId)
                products = await Product.find({category: category.value})
            }
            return res.json(products)
        } catch (e) {
            console.log(e)
        }
    }

    async deleteProduct(req, res) {
        try {
            const {_id} = req.body

            await Product.deleteOne({_id: _id})
            res.status(210).json({message: 'Product deleted'})
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new ProductController()