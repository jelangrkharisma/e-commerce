const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const User = require('../models/User')

const app = require('../app')

const TestHelper = require('./helpers/index')

chai.use(chaiHttp)

describe('User', function () {
	describe('ROUTE: /signup', function () {
		// delete all Users from table   
		// using Hooks
		before(TestHelper.removeDummiesUser)
		after(TestHelper.removeDummiesUser)

		// end hooks
		// on Success
		describe('on success user creation, checking duplication', function () {
			it('Should return 201 status and return userData{_id, name, email}', function (done) {
				chai.request(app)
					.post('/signup')
					.send({
						name: 'jelang ramadhan',
						email: 'jelang@mail.com',
						password: '1234',
					})
					.end((err, res) => {
						expect(err).to.be.null;
						expect(res).to.have.status(201);
						expect(res.body).to.have.property('_id')
						expect(res.body).to.have.property('name')
						expect(res.body).to.have.property('email')
						done()
					})
			})

			it('Should return 409 status and err{msg:["email is already registered]}', function (done) {
				chai.request(app)
					.post('/signup')
					.send({
						name: 'jelang ramadhan',
						email: 'jelang@mail.com',
						password: '1234',
					})
					.end((err, res) => {
						expect(err).to.be.null;
						expect(res).to.have.status(409);
						expect(res.body).to.have.property('msg').that.includes('email already exists')
						done()
					})
			})
		})

		describe('on fail, should return correct error messages', function () {
			// when user insert only name fields
			it('Should return 400 status and return err{msg:["email is required", "password is required"]}', function (done) {
				chai.request(app)
					.post('/signup')
					.send({
						name: 'jelang ramadhan',

					})
					.end((err, res) => {
						expect(err).to.be.null;
						expect(res).to.have.status(400);
						expect(res.body).to.have.property('msg').that.includes('email is required')
						expect(res.body).to.have.property('msg').that.includes('password is required')
						done()
					})
			})

			// when user insert only password fields
			it('Should return 400 status and return err{msg:["email is required", "name is required"]}', function (done) {
				chai.request(app)
					.post('/signup')
					.send({
						password: '1234',
					})
					.end((err, res) => {

						expect(err).to.be.null;
						expect(res).to.have.status(400);
						expect(res.body).to.have.property('msg').to.include.members([ 'email is required' ])
						expect(res.body).to.have.property('msg').to.include.members([ 'name is required' ])
						done()
					})
			})

			// when user insert only email fields
			it('Should return 400 status and return err{msg:["password is required", "name is required"]}', function (done) {
				chai.request(app)
					.post('/signup')
					.send({
						email: 'jelang@mail.com',
					})
					.end((err, res) => {
						expect(err).to.be.null;
						expect(res).to.have.status(400);
						expect(res.body).to.have.property('msg').that.include('password is required')
						expect(res.body).to.have.property('msg').that.include('name is required')
						done()
					})
			})

			// when user does not insert valid email fields
			it('Should return 400 status and return err{msg:["not a valid email address"]}', function (done) {
				chai.request(app)
					.post('/signup')
					.send({
						name: 'jelang ramadhan',
						email: 'jelangmail.com',
						password: '1234',
					})
					.end((err, res) => {
						expect(err).to.be.null;
						expect(res).to.have.status(400);
						expect(res.body).to.have.a.property('msg').that.include('not a valid email address')
						done()
					})
			})

		})
	})

	describe('ROUTE: /signin', function () {
		before(TestHelper.removeDummiesUser)
		before(TestHelper.addDummyUser)
		after(TestHelper.removeDummiesUser)
		// -- end hooks --

		// on successful
		it('on correct email and password: Should return status 200 and a valid access_token object after user insert correct username and password', function (done) {
			chai.request(app)
				.post('/signin')
				.send({
					email: 'jelang@mail.com',
					password: '1234',
				})
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(200);
					expect(res.body).to.have.property('access_token')
					done()
				})
		})

		// on correct email, wrong password
		it('on correct email with wrong password: Should return status 403 and an object stating username / password is wrong', function (done) {
			chai.request(app)
				.post('/signin')
				.send({
					email: 'jelang@mail.com',
					password: 'wrong password',
				})
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(403);
					expect(res.body).to.have.property('msg').that.includes('username / password is wrong')
					done()
				})
		})

		// on wrong email, correct password
		it('on wrong email with correct password:  Should return status 403 and an object stating username / password is wrong', function (done) {
			chai.request(app)
				.post('/signin')
				.send({
					email: 'wrongemail',
					password: '123456',
				})
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(403);
					expect(res.body).to.have.property('msg').that.includes('username / password is wrong')
					done()
				})
		})

		// 
		it('on empty email dan address:  Should return status 403 and an object stating username / password is wrong', function (done) {
			chai.request(app)
				.post('/signin')
				.send({})
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(403);
					expect(res.body).to.have.property('msg').that.includes('username / password is wrong')
					done()
				})
		})
	})
})


