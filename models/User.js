const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const userSchema = new mongoose.Schema({
	role: {
		type: String,
	},
	email: {
		unique: true,
		required: [ true, 'email is required' ],
		type: String,
		match: [ emailRegex, 'not a valid email address' ]
	},
	password: {
		type: String,
		required: [ true, 'password is required' ],
	},
	name: {
		type: String,
		required: [ true, 'name is required' ],
	},
	cart: [
		{
			productId: {
				type: mongoose.Schema.Types.ObjectId, ref: 'Product'
			},
			quantity: {
				type: Number
			}
		}
	]

})

userSchema.pre('save', function () {
	hashed = bcrypt.hashSync(this.password, 5)
	this.password = hashed
	next()
})


module.exports = mongoose.model('User', userSchema)