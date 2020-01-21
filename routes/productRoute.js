const Router = require('express').Router()

const ProductController = require('../controllers/productController')

Router.get('/', ProductController.getAll)
Router.post('/', ProductController.createProduct)

module.exports = Router