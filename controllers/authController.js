const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const {generateAccessToken} = require('../middlewares/jwt')

const User = require('../models/User')
const Role = require('../models/Role')
const Basket = require('../models/Basket')

class AuthController {
    async register(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({message: 'Registration error: ', errors})

            const {username, password} = req.body
            const isExists = await User.findOne({username})

            if (isExists) return res.status(400).json({message: 'this username already exists'})

            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: 'USER'})

            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save();

            const userData = await User.findOne({username: username})

            const token = generateAccessToken(user._id, user.username, user.roles)
            
            return res.json({message: 'User was registered', token: token})
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username: username})
            if(!user) return res.status(400).json({message: `user ${username} not found`})
            
            const validPassword = bcrypt.compareSync(password, user.password)

            if (!validPassword) return res.status(400).json({message: 'Password is incorrect'})

            const token = generateAccessToken(user._id, user.username, user.roles)

            return res.json({token})
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }

    async check(req, res) {
        try {
            const token = generateAccessToken(req.user._id, req.user.username, req.user.roles)
            return res.json({token})
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new AuthController()