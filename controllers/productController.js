const Product = require('../models/Product')

module.exports = class ProductController {
	static getAll(req, res, next) {

	}

	static createProduct(req, res, next) {
		const name = req.body.name
		const stock = req.body.stock
		const price = req.body.price

		Product.create({
			name, stock, price
		})
			.then(result => {
				res.status(201).json(result)
			})
			.catch(err => {
				next(err)
			})
	}
}