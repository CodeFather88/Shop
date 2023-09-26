const Router = require('express')
const controller = require('../Сontrollers/productController')
const router = new Router()
const {check} = require("express-validator")
const authMiddleware = require('../Middlewares/AuthMiddleware')
const roleMiddleware = require('../Middlewares/RoleMiddleware')



router.post('/createProduct',roleMiddleware(["ADMIN"]) , controller.createProduct)
router.get('/getAll', controller.getAll)
router.post('/createCategory',roleMiddleware(["ADMIN"]), controller.createCategory)
router.post('/productInCart', authMiddleware, controller.productInCart)
router.get('/getMyCart', authMiddleware, controller.getMyCart)
router.post('/deleteFromCart', authMiddleware, controller.deleteFromCart)
router.post('/findProduct', controller.findProduct)
// router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers)
// router.get('/myProfile', authMiddleware, controller.myProfile)

module.exports = router