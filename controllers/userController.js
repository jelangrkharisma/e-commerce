const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
class UserController {
	static signup(req, res, next) {
		const { name, email, password } = req.body
		User.create({
			name,
			email,
			password
		})
			.then(result => {
				const response = {
					_id: result._id,
					email: result.email,
					name: result.name
				}
				res.status(201).json(response)
			})
			.catch(err => {
				next(err)
			})
	}

	static signin(req, res, next) {
		const { email, password } = req.body

		User.findOne({
			email: email
		})
			.then(result => {
				if (result) {
					const authorized = bcrypt.compareSync(password, result.password)
					if (authorized) {
						const access_token = jwt.sign({ _id: result._id }, process.env.JWTKEY)
						res.status(200).json({ access_token: access_token })
					} else {
						next({
							code: 403,
							msg: 'username / password is wrong'
						})
					}
				} else {
					next({
						code: 403,
						msg: 'username / password is wrong'
					})
				}
			})
			.catch(err => {
				next(err)
			})
	}
}

module.exports = UserController