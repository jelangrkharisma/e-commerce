const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
	name: {
		type: String,
		required: [ true, 'name is required' ]
	},
	stock: {
		type: Number,
		required: [ true, 'stock is required' ],
		min: [ 0, 'you cannot enter stock less than 0' ]
	},
	price: {
		type: Number,
		required: [ true, 'price is required' ],
		min: [ 0, 'you cannot enter price less than 0' ]
	}
})

module.exports = mongoose.model('Product', productSchema)