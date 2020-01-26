const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
class UserController {
	static signup(req, res, next) {
    const role = req.body.role
    const { name, email, password } = req.body
		User.create({
			name,
			email,
      password,
      role
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
		}).then(result => {
				if (result) {
					const authorized = bcrypt.compareSync(password, result.password)
					if (authorized) {
						const access_token = jwt.sign({ _id: result._id }, process.env.JWT_PRIVATEKEY)
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
  static verifyToken(req, res, next) {
    try {
      let payload = jwt.verify(req.headers.access_token, process.env.JWT_PRIVATEKEY)
      User.findOne({ _id: payload._id}, ['_id', 'name', 'email', 'cart'])
        .populate({
          path: 'cart._id',
          model: 'Product'
        })
        .then(result => {
          res.status(200).json(result)
        })
        .catch(err => {
          next(err)
        })
    } catch (err) {
      next(err)
    }
  }
  static fetchUserInfo(req, res, next) {
    User.findOne({ _id: req.authenticated_id}, ['_id', 'name', 'email', 'cart'])
      .populate({
        path: 'cart._id',
        model: 'Product'
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController