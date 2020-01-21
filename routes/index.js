const Router = require('express').Router()

const UserController = require('../controllers/userController')

const productRoute = require('./productRoute')
Router.use('/products', productRoute)

Router.post('/signup', UserController.signup)
Router.post('/signin', UserController.signin)


module.exports = Router