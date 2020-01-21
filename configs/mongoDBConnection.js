module.exports = function () {
	const mongoose = require('mongoose');

	const MONGOURI = `mongodb://localhost/ecommerce-${process.env.NODE_ENV}`
	const configs = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	}
	mongoose.connect(MONGOURI, configs)

	const db = mongoose.connection
	db.on('error', console.error.bind(console, 'MongoDB Connection Error, sudah nyalain sudo mongod?'))
	db.once('open', function () {
		console.log('MongoDB Connected')
	})
}