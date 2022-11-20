const Router = require('express')

const controller = require('../controllers/basketController')
const roleMiddleware = require('../middlewares/roleMiddleware')

const router = new Router()

router.post('/add', controller.addProduct)
router.get('/', controller.getBasket)
router.delete('/delete', controller.deleteProduct)

module.exports = router