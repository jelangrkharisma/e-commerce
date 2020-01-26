const Router = require('express').Router()

const authentication = require('../middlewares/authentication')
const adminAuthorization = require('../middlewares/authorizationAdmin')
const gcsUpload = require('../helpers/gcsBucketUpload')

const ProductController = require('../controllers/productController')


Router.get('/', ProductController.getAll)

Router.post('/', 
  authentication, 
  adminAuthorization, 
  gcsUpload.multer.single('image'),
  gcsUpload.sendUploadToGCS,
  ProductController.createProduct)

Router.put('/', authentication, adminAuthorization, ProductController.updateProduct)
Router.delete('/', authentication, adminAuthorization, ProductController.deleteProduct)
Router.get('/:id', ProductController.getOne)

module.exports = Router