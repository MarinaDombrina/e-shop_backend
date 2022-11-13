const Router = require('express')

const controller = require('../controllers/productController')
const roleMiddleware = require('../middlewares/roleMiddleware')

const router = new Router()

router.post('/add', controller.add)
router.put('/:id', roleMiddleware(['ADMIN']), controller.update)
router.get('/:id', controller.getProduct)
router.get('/', controller.getAll)
router.delete('/delete', roleMiddleware(['ADMIN']), controller.deleteProduct)

module.exports = router