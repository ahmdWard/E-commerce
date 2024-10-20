const express = require('express')
const userController= require('../controllers/userController')
const authController= require('../controllers/authController')
const router= express.Router()


router
.route('/signUp')
.post(authController.signUp)


router
.route('/login')
.post(authController.login)


router.use(authController.protect)

router
.route("/")
.get(userController.getAllUsers)
.post(userController.createUser)

router
.route('/id:')
.get(userController.getUser)
.delete(userController.deleteUser)
.patch(userController.updateUser)



 module.exports= router