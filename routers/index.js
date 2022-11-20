const Router = require('express')
const { model } = require('mongoose')

const authRouter = require('./authRouter')
const productRouter = require('./productRouter')
const categoryRouter = require('./categoryRouter')
const basketRouter = require('./basketRouter')

const router = new Router()

router.use('/auth', authRouter)
router.use('/product', productRouter)
router.use('/category', categoryRouter)
router.use('/basket', basketRouter)

module.exports = router