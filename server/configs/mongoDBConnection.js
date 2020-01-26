module.exports = function () {
	const mongoose = require('mongoose');

  let MONGOURI
  if(process.env.NODE_ENV === 'testing'){
    MONGOURI = `mongodb://localhost/ecommerce-${process.env.NODE_ENV}`
  } else {
    MONGOURI = process.env.MONGOURI
  }

	const configs = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
	}
	mongoose.connect(MONGOURI, configs)

	const db = mongoose.connection
	db.on('error', console.error.bind(console, 'MongoDB Connection Error, sudah nyalain sudo mongod?'))
	db.once('open', function () {
		console.log('MongoDB Connected', MONGOURI)
	})
}