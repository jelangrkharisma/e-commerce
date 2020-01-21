require('dotenv').config()
const app = require('../app')

console.log(process.env.PORT, 'ini didalem bin')


app.listen(process.env.PORT, () => {
	console.log('App running on PORT:', process.env.PORT)
})