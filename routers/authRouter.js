const Router = require('express')
const {check} = require('express-validator')
const authController = require('../controllers/authController')

const controller = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

const router = new Router()

router.post('/registration', [
    check('username', 'Username can not be empty').notEmpty(),
    check('password', 'Password must be 4-16 symbols').isLength({min: 4, max: 16})
], controller.register)
router.post('/login', controller.login)
router.get('/auth', authMiddleware, authController.check)
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers)

module.exports = router