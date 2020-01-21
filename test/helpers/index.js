const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const app = require('../../app')
const User = require('../../models/User')

module.exports = class TestHelpers {
	static addDummyUser(done) {
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
	}

	static removeDummiesUser(done) {
		User.deleteMany()
			.then(_ => {
				done()
			})
			.catch(err => {
				done(err)
			})
	}
}