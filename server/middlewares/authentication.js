const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  if (req.headers.access_token) {
    // console.log('authenticating...', req.headers.access_token.substr(0, 20))
    const access_token = req.headers.access_token
    try {
      const decoded = jwt.verify(access_token, process.env.JWT_PRIVATEKEY)
      const authenticated_id = decoded._id
      User.findOne({
        _id: authenticated_id
      })
        .then(result => {
          if (result) {
            // authorization
            req.authenticated_id = result._id
            next()
          } else {
            next({
              code: 403
            })
          }
        })
    } catch (error) {
      next(error)
    }
  } else {    
    next({
      code: 401
    })
  }
}