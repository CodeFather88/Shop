const Router = require('express')
const controller = require('../Сontrollers/authController')
const router = new Router()
const {check} = require("express-validator")
const authMiddleware = require('../Middlewares/AuthMiddleware')
const roleMiddleware = require('../Middlewares/RoleMiddleware')



router.post('/registration',[
    check('email', 'Хуевое имя пользователя').notEmpty(),
    check('password', 'Хуевый пароль').isLength({min: 4, max: 10})
] ,controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers)
router.get('/myProfile', authMiddleware, controller.myProfile)

module.exports = router