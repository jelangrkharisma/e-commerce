const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const User = require('../models/User')

const app = require('../app')

const TestHelper = require('./helpers/index')

describe('Product', function () {
	describe('ROUTE: POST /products', function () {
		it('on successful insertions: Should return status 201, and obj{_id, name, price, stock}', function (done) {
			chai.request(app)
				.post('/products')
				.send({
					name: 'pisang',
					price: 15000000,
					stock: 230
				})
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(201);
					expect(res.body).to.have.property('_id')
					expect(res.body).to.have.property('name')
					expect(res.body).to.have.property('price')
					expect(res.body).to.have.property('stock')
					done()
				})
		})

		it('on missing stock field: Should return status 400, and error informing that stock is required', function (done) {
			chai.request(app)
				.post('/products')
				.send({
					name: 'pisang',
					price: 15000000,
				})
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(400);
					expect(res.body).to.have.property('msg').that.includes('stock is required')
					done()
				})
		})

		it('on missing name field: Should return status 400, and error informing that name is required', function (done) {
			chai.request(app)
				.post('/products')
				.send({
					price: 15000000,
					stock: 230
				})
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(400);
					expect(res.body).to.have.property('msg').that.includes('name is required')
					done()
				})
		})

		it('on more than 1 field missing: Should return status 400, and error informing that missing field is required', function (done) {
			chai.request(app)
				.post('/products')
				.send({})
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(400);
					expect(res.body).to.have.property('msg').that.includes('stock is required')
					expect(res.body).to.have.property('msg').that.includes('name is required')
					expect(res.body).to.have.property('msg').that.includes('price is required')
					done()
				})
		})

		it('on stock less than 0: Should return status 400, and error informing that minimal amount of stock is 0', function (done) {
			chai.request(app)
				.post('/products')
				.send({
					name: 'pisang',
					price: 15000000,
					stock: -1
				})
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(400);
					expect(res.body).to.have.property('msg').that.includes('you cannot enter stock less than 0')
					done()
				})
		})

		it('on price less than 0: Should return status 400, and error informing that minimal amount of price is 0', function (done) {
			chai.request(app)
				.post('/products')
				.send({
					name: 'pisang',
					price: -1,
					stock: 99
				})
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(400);
					expect(res.body).to.have.property('msg').that.includes('you cannot enter price less than 0')
					done()
				})
		})

		it('on price datatype not a number: Should return status 400, and error informing that price only accept number', function (done) {
			chai.request(app)
				.post('/products')
				.send({
					name: 'pisang',
					price: 'sembilan',
					stock: 99
				})
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(400);
					expect(res.body).to.have.property('msg').that.includes('price field is not valid number')
					done()
				})
		})

		it('on more than one datatype mistake: Should return status 400, and error informing that only accept number', function (done) {
			chai.request(app)
				.post('/products')
				.send({
					name: 'pisang',
					price: 'sembilan',
					stock: 'sembilan'
				})
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(400);
					expect(res.body).to.have.property('msg').that.includes('price field is not valid number')
					expect(res.body).to.have.property('msg').that.includes('stock field is not valid number')
					done()
				})
		})

	})

	describe('ROUTE: GET /products', function () {

	})
})