const Product = require('../models/Product')

module.exports = class ProductController {
  static getOne(req, res, next) {
    Product.findById(req.params.id)
      .then(result => {
        res.status(200).json({ products: result })
      })
      .catch(err => {
        next(err)
      })
  }
  static getAll(req, res, next) {
    Product.find()
      .then(result => {
        res.status(200).json({ products: result })
      })
      .catch(err => {
        next(err)
      })
  }
  static createProduct(req, res, next) {
    const name = req.body.name
    const stock = req.body.stock
    const price = req.body.price
    const image = req.file.cloudStoragePublicUrl

    Product.create({
      name, stock, price, image
    })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        next(err)
      })
  }
  static updateProduct(req, res, next) {
    const { productId, name, price, stock, image, description } = req.body

    Product.findOneAndUpdate({
      _id: productId
    }, {
      name, price, stock, image, description
    }, {
      new: true
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }
  static deleteProduct(req, res, next) {
    const {productId} = req.body
    Product.deleteOne({_id: productId})
      .then((result) => {
        res.status(204).json({msg: 'product deleted'})
      })
      .catch(err => {
        next(err)
      })
  }
}