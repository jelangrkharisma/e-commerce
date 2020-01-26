const Router = require('express').Router()

const UserController = require('../controllers/userController')
const CartController = require('../controllers/cartController')

const authentication = require('../middlewares/authentication')

const productRoute = require('./productRoute')
Router.use('/products', productRoute)

Router.post('/signup', UserController.signup)
Router.post('/signin', UserController.signin)
Router.post('/verifyToken', UserController.verifyToken)


// get user cart via req.authenticated_id
Router.get('/fetchuserinfo',authentication, UserController.fetchUserInfo)
Router.post('/carts', authentication, CartController.addToCart)
Router.delete('/carts', authentication, CartController.removeFromCart)
Router.delete('/allcarts', authentication, CartController.banishFromCart)

// Checkout
Router.post('/checkout', authentication, CartController.checkStock, CartController.checkOut)

module.exports = Router