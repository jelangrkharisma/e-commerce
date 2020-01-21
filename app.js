require('dotenv').config()

const mongoDBConnection = require('./configs/mongoDBConnection')
mongoDBConnection()

const router = require('./routes/index')
const errorHandlers = require('./middlewares/errorHandlers')

const express = require('express');
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', router)


// err handlers
app.use('/', errorHandlers)
app.listen(process.env.PORT, () => {
	console.log('App running on PORT:', process.env.PORT)
})
module.exports = app