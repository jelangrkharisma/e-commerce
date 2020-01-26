const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const app = require('../../app')
const User = require('../../models/User')
const Product = require('../../models/Product')

module.exports = class TestHelpers {

  static addDummyAdmin(done) {
    chai.request(app)
      .post('/signup')
      .send({
        role: 'admin',
        name: 'admin ramadhan',
        email: 'admin@mail.com',
        password: '1234',
      })
      .end((err, res) => {
        done()
      })
  }

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

  static removeDummiesProduct(done) {
    Product.deleteMany()
      .then(_ => {
        done()
      })
      .catch(err => {
        done(err)
      })
  }

  static addDummyProduct(done) {
    Product.create({
      name: 'cupcake pisang',
      stock: 3,
      price: 20000,
      image: 'https://placekitten.com/g/600/600',
      description: 'this is a cake, trust me'
    }).then(()=>{
      done()
    }).catch(err => done(err))
  }
}