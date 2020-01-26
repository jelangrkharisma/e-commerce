const Product = require('../models/Product')
const User = require('../models/User')

class CartController {
  static addToCart (req, res, next) {
    User.findOne({_id: req.authenticated_id})
      .then(result => {
        let isFound = false
        if (result) {
          result.cart.forEach((product, index) => {
            if(product._id == req.body.productId){
              isFound = true
              product.quantity++
              // ketemu, increment quantity + 1
              User.findOne({_id: req.authenticated_id},['-password'])
                .populate({
                  path: 'cart._id',
                  model: 'Product'
                })
                .exec(function (err, doc) {
                  doc.cart[index].quantity = product.quantity
                  doc.save()
                  delete doc.password
                  res.status(200).json(doc)
                })
            }
          })
          if(!isFound){
            const updateField = {
              $push: {cart: {
                _id: req.body.productId,
                quantity: 1
              }}
            }
            const options = {
              new: true,
              fields: {
                '_id': 1,
                'name':1,
                'email':1,
                'cart': 1
              }
            }
            User.findOneAndUpdate({_id: req.authenticated_id},updateField,options)
              .populate({
                path: 'cart._id',
                model: 'Product'
              })
              .then(updatedResult => {
                res.status(200).json(updatedResult)
              })
          }
        }
      })
        .catch(err => {
          console.log(err)
        })
  }
  static removeFromCart (req, res, next) {
    User.findOne({_id: req.authenticated_id})
      .then(result => {
        if (result) {
          result.cart.forEach((product, index) => {
            if(product._id == req.body.productId){
              product.quantity--
              if (product.quantity >= 0) {
                User.findOne({_id: req.authenticated_id},['-password'])
                  .populate({
                    path: 'cart._id',
                    model: 'Product'
                  })
                  .exec(function (err, doc) {
                    doc.cart[index].quantity = product.quantity
                    doc.save()
                    delete doc.password
                    res.status(200).json(doc)
                  })
              } else {
                console.log('gabisa ngurangin sampe negatif')
                res.status(204)
              }
            }
          })
        }
      })
        .catch(err => {
          console.log(err)
        })
  }
  static banishFromCart (req, res, next) {
    User.findOneAndUpdate({_id: req.authenticated_id},
      {
        $pull: {
          'cart': {_id:req.body.productId}
        }
      },
      {
        fields: {
          _id:1,name:1,email:1,cart:1
        },
        new: true
      })
      .populate({
        path: 'cart._id',
        model: 'Product'
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = CartController