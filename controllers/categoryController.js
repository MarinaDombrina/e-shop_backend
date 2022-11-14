const {validationResult} = require('express-validator')

const Category = require('../models/Category')

class CategoryController {
    async add(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({message: 'Category error: ', errors})

            const {category} = req.body
            const isExists = await Category.findOne({value: category})
            if (isExists) return res.status(400).json({message: 'this category already exists'})

            const newCategory = new Category({value: category})
            await newCategory.save();
            
            return res.json({message: `Category ${newCategory.value} was created`})
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Category creation error'})
        }
    }

    async get(req, res) {
        try {
            const {categoryName} = req.body
            const category = await Category.findOne({categoryName})
            if (!category) return res.status(400).json({message: 'This category doesn`t exist'})

            return res.json({category})
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Error'})
        }
    }


    async getAll(req, res) {
        try {
            const categories = await Category.find()
            return res.json(categories)
        } catch (e) {
            console.log(e)
        }
    }

    async delete(req, res) {
        try {
            const {categoryName} = req.body
            const category = await Category.findOne({value: categoryName})

            if (!category) return res.status(400).json({message: 'this category does`t exists'})
            await category.remove()

            return res.json({message: `Category ${categoryName} was deleted`})
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new CategoryController()