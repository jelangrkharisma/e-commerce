const Product = require('../models/Product')
const User = require('../models/User')
const Transaction = require('../models/Transaction')

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
  static checkOut (req, res, next) {
    User.findOne({_id: req.authenticated_id})
      .then(result => {
        return Transaction.create({
          userId: req.authenticated_id
        })
      })
      .then(transaction => {
        res.status(201).json(transaction)
      })
  }
  static checkStock (req, res, next) {
    console.log('processing checkout for:', req.authenticated_id)
    let shoppingCart
    let validOrder = true
    let noStock = []
    User.findOne({_id:req.authenticated_id},['cart'])
    .populate({
      path: 'cart._id',
      model: 'Product'
    })
      .then(result => {
        shoppingCart = result.cart
        // console.log(shoppingCart)
        if (shoppingCart.length > 0) {          // (row.quantity >= res.stock)
          Promise.all(
            shoppingCart.map(row => Product.findOne(
              {_id: row._id._id,
                stock: {
                  $lt: (row.quantity)
                }},))
          )
            .then(result => {
              let response = []
              result.forEach(row => {
                // promise findOne return null and pushed it into an array
                // this code to filterout nulls, and push non-null's _id into response array
                if (row != null) {
                  response.push(row._id)
                }
              })
              if (response.length == 0) {
                // send call checkout function
                next()
              } else {
                // send 400 response because some/all of the product are not available
                res.status(400).json({outOfStockProducts: response})
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          throw new Error('Your Shoppingcart is empty')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = CartController