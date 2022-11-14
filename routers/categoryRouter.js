const Router = require('express')

const controller = require('../controllers/categoryController')
const roleMiddleware = require('../middlewares/roleMiddleware')

const router = new Router()

router.post('/add', roleMiddleware(['ADMIN']), controller.add)
router.get('/:id', controller.get)
router.get('/', controller.getAll)
router.delete('/delete', roleMiddleware(['ADMIN']), controller.delete)

module.exports = router