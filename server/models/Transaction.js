const mongoose = require('mongoose')
const User = require('../models/User')
const Product = require('../models/Product')

const txSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Product'
        },
        quantity: {type: Number}
    }],
    totalPayment: Number
  },
  { timestamps: { createdAt: 'checkout_date' } }
)

txSchema.pre('save', async function () {
  let total = 0
  await User.findOne({_id: this.userId})
    .populate({
      path: 'cart._id',
      model: 'Product'
    })
    .then(result => {
      this.cart = result.cart
      result.cart.forEach(row => {
        const subTotal = row._id.price * row.quantity
        total += subTotal
      })
      this.totalPayment = total

      Promise.all(
        result.cart.map(row => Product.updateOne(
          {_id: row._id._id},
          {$inc: {stock: row.quantity * -1}}
        ))
      )
        .then(result => {
          console.log('stock updated', result)
        })
        .catch(err => {
          console.log(err)
        })
        
    })
    .catch(err => {
      console.log(err)
      throw err
    })
})

txSchema.post('save', async function () {
  await User.updateOne({_id: this.userId},{cart: []})
    .then(result => {
      console.log('transaction finalized')
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = mongoose.model('Transaction', txSchema)