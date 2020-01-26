if (process.env.NODE_ENV != 'production') {
	require('dotenv').config()
}

const mongoDBConnection = require('./configs/mongoDBConnection')
const errorHandlers = require('./middlewares/errorHandlers')
const router = require('./routes/index')
const express = require('express');
const cors = require('cors')


mongoDBConnection()
const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', router)


// err handlers
app.use('/', errorHandlers)
app.listen(process.env.PORT, () => {
	console.log('App running on PORT:', process.env.PORT)
})
module.exports = app