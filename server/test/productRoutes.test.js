const chai = require('chai')
const chaiHttp = require('chai-http')
const fs = require('fs')
const expect = chai.expect
const User = require('../models/User')

const app = require('../app')

const TestHelper = require('./helpers/index')

let adminEmail = 'admin@mail.com'
let adminPassword = '1234'

let editDeleteId
let access_token

let name = 'Kitten Smoothies'
let stock = '99'
let price = 6000
let image = 'https://placekitten.com/g/600/600'
let description = 'this is a cake, trust me'

describe('Product', function () {
  // before(TestHelper.removeDummiesUser)
  before(TestHelper.addDummyAdmin)
  // get access_token
  before(function (done) {    
    chai.request(app)
      .post('/signin')
      .send({
        email: adminEmail,
        password: adminPassword
      })
      .end((err, res) => {
        // console.log(res.body)
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('access_token')
        access_token = res.body.access_token
        done()
      })
  })

  describe('ROUTE: POST /products', function () {
    // Test pre-condition
    // before(TestHelper.removeDummiesProduct)
    // get editDeleteId
    // // // // // //

    // it('on successful insertions: Should return status 201, and obj{_id, name, price, stock}', function (done) {
    //   const filename = 'test-placeholder.jpg'
    //   const boundary = Math.random()
    //   chai.request(app)
    //     .post('/products')
    //     .set('access_token', access_token)
    //     .field('Content-Type', 'multipart/form-data')
    //     .attach('image', 'test/test-placeholder.jpg')
    //     .attach("logo","test/images/user.jpg") 
    //     .end((err, res) => {
    //       console.log(err)
    //       editDeleteId = res.body._id
    //       expect(err).to.be.null;
    //       expect(res).to.have.status(201);
    //       expect(res.body).to.have.property('_id')
    //       expect(res.body).to.have.property('name')
    //       expect(res.body).to.have.property('price')
    //       expect(res.body).to.have.property('stock')
    //       done()
    //     })
    // })

    // it('wrong / invalid / non-admin access_token, should return 403 status and error obj with unauthorized message { msg: ["unauthorized action"] }', function (done) {
    //   chai.request(app)
    //     .post('/products')
    //     .set('access_token', 'wrong accesstoken')
    //     .send({
    //       name: 'pisang',
    //       price: 15000000,
    //       stock: 230
    //     })
    //     .end((err, res) => {
    //       expect(err).to.be.null;
    //       expect(res).to.have.status(403);
    //       expect(res.body).to.have.property('msg').that.includes('malformed / invalid access_token')
    //       done()
    //     })
    // })

    // it('on missing stock field: Should return status 400, and error informing that stock is required', function (done) {
    //   chai.request(app)
    //     .post('/products')
    //     .set('access_token', access_token)
    //     .send({
    //       name: 'pisang',
    //       price: 15000000,
    //     })
    //     .end((err, res) => {
    //       expect(err).to.be.null;
    //       expect(res).to.have.status(400);
    //       expect(res.body).to.have.property('msg').that.includes('stock is required')
    //       done()
    //     })
    // })

    // it('on missing name field: Should return status 400, and error informing that name is required', function (done) {
    //   chai.request(app)
    //     .post('/products')
    //     .set('access_token', access_token)
    //     .send({
    //       price: 15000000,
    //       stock: 230
    //     })
    //     .end((err, res) => {
    //       expect(err).to.be.null;
    //       expect(res).to.have.status(400);
    //       expect(res.body).to.have.property('msg').that.includes('name is required')
    //       done()
    //     })
    // })

    // it('on more than 1 field missing: Should return status 400, and error informing that missing field is required', function (done) {
    //   chai.request(app)
    //     .post('/products')
    //     .set('access_token', access_token)
    //     .send({})
    //     .end((err, res) => {
    //       expect(err).to.be.null;
    //       expect(res).to.have.status(400);
    //       expect(res.body).to.have.property('msg').that.includes('stock is required')
    //       expect(res.body).to.have.property('msg').that.includes('name is required')
    //       expect(res.body).to.have.property('msg').that.includes('price is required')
    //       done()
    //     })
    // })

    // it('on stock less than 0: Should return status 400, and error informing that minimal amount of stock is 0', function (done) {
    //   chai.request(app)
    //     .post('/products')
    //     .set('access_token', access_token)
    //     .send({
    //       name: 'pisang',
    //       price: 15000000,
    //       stock: -1
    //     })
    //     .end((err, res) => {
    //       expect(err).to.be.null;
    //       expect(res).to.have.status(400);
    //       expect(res.body).to.have.property('msg').that.includes('you cannot enter stock less than 0')
    //       done()
    //     })
    // })

    // it('on price less than 0: Should return status 400, and error informing that minimal amount of price is 0', function (done) {
    //   chai.request(app)
    //     .post('/products')
    //     .set('access_token', access_token)
    //     .send({
    //       name: 'pisang',
    //       price: -1,
    //       stock: 99
    //     })
    //     .end((err, res) => {
    //       expect(err).to.be.null;
    //       expect(res).to.have.status(400);
    //       expect(res.body).to.have.property('msg').that.includes('you cannot enter price less than 0')
    //       done()
    //     })
    // })

    // it('on price datatype not a number: Should return status 400, and error informing that price only accept number', function (done) {
    //   chai.request(app)
    //     .post('/products')
    //     .set('access_token', access_token)
    //     .send({
    //       name: 'pisang',
    //       price: 'sembilan',
    //       stock: 99
    //     })
    //     .end((err, res) => {
    //       expect(err).to.be.null;
    //       expect(res).to.have.status(400);
    //       expect(res.body).to.have.property('msg').that.includes('price field is not valid number')
    //       done()
    //     })
    // })

    // it('on more than one datatype mistake: Should return status 400, and error informing that only accept number', function (done) {
    //   chai.request(app)
    //     .post('/products')
    //     .set('access_token', access_token)
    //     .send({
    //       name: 'pisang',
    //       price: 'sembilan',
    //       stock: 'sembilan'
    //     })
    //     .end((err, res) => {
    //       expect(err).to.be.null;
    //       expect(res).to.have.status(400);
    //       expect(res.body).to.have.property('msg').that.includes('price field is not valid number')
    //       expect(res.body).to.have.property('msg').that.includes('stock field is not valid number')
    //       done()
    //     })
    // })

  })

  describe('ROUTE: GET /products', function () {
    // before(TestHelper.addDummyProduct)
    it('on Successfull fetch, should return status 200 and all of the products obj in an array', function (done) {
      chai.request(app)
        .get('/products')
        .end((err, res) => {
          console.log(err)
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('products').be.an('array')
          editDeleteId = '5e2cd05af57ae75f3f95faa3'
          done()
        })
    })

    it('on successful single fetch, should return status 200 and product object', function (done) {      
      chai.request(app)
        .get('/products/'+editDeleteId)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          done()
        })
    })
  })

  describe("ROUTE: POST /carts", function () {
    it("on successfull add to cart, should return status 200, and updated user data", function (done) {
      // chai.request(app)
      //   .post('/carts')
      //   .set({
      //     'access_token' : access_token
      //   })
      //   .send({
      //     productId: editDeleteId
      //   })
      //   .end((err, res) => {
      //     console.log(res.body)
      //     done()
      //   })
      done()
    })
  })
  
  describe('ROUTE: GET /cart', function () {
    it("on successful cart-fetch, should return status 200 and an array containing cart", function (done) {
      done()
    })
  })

  describe('ROUTE: PATCH /products', function () {  
    it('on successful data update, should return an updated object', function (done) {
      // chai.request(app)
      //   .put('/products')
      //   .set('access_token',access_token)
      //   .send({
      //     productId: editDeleteId,
      //     name: 'updated name',
      //     stock: 0,
      //     price: 0,
      //     image: 'updated image',
      //     description: 'updated description'
      //   })
      //   .end((err, res) => {
      //     console.log(err)
      //     expect(err).to.be.null
      //     expect(res).to.have.status(200)
      //     expect(res.body).to.have.property('name').that.equal('updated name')
      //     expect(res.body).to.have.property('stock').that.equal(0)
      //     expect(res.body).to.have.property('price').that.equal(0)
      //     expect(res.body).to.have.property('image').that.equal('updated image')
      //     expect(res.body).to.have.property('description').that.equal('updated description')
      //     done()
      //   })
      done()
    })

    it("on unauthorized update attempt, should return status 401, and error obj{msg: 'Unauthorized, you're not allowed to do that.' }", function (done) {
      chai.request(app)
      .put('/products')
      .send({
        productId: editDeleteId,
        name: 'updated name',
        stock: 0,
        price: 0,
        image: 'updated image',
        description: 'updated description'
      })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(401)
        expect(res.body).to.have.property('msg').that.includes("Unauthorized, you're not allowed to do that.")
        done()
      })
    })
  })

  describe(`ROUTE: DELETE /products`, function () {
    it("on unauthorized delete attempt, should return status 401, and error obj{msg: 'Unauthorized, you're not allowed to do that.' }", function (done) {
      chai.request(app)
      .delete('/products')
      .send({
        productId: editDeleteId,
        name: 'updated name',
        stock: 0,
        price: 0,
        image: 'updated image',
        description: 'updated description'
      })
      .end((err, res) => {
        expect(err).to.be.null
        expect(res).to.have.status(401)
        expect(res.body).to.have.property('msg').that.includes("Unauthorized, you're not allowed to do that.")
        done()
      })
    })
    
    it(`on successful delete, should return 204 status`, function (done) {
      chai.request(app)
        .delete('/products')
        .set('access_token', access_token)
        .send({
          productId:editDeleteId
        })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(204)
          done()
        })
    })
  })
})