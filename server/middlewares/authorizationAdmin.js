const User = require('../models/User')

module.exports = function (req, res, next) {
  const authenticated_id = req.authenticated_id
  User.findOne({
    _id: authenticated_id
  })
    .then(result => {
      if (result.role == 'admin') {
        req.authenticated_id = authenticated_id
        next()
      } else {      
        next({
          code: 401
        })
      }
    })
    .catch(err => {
      next(err)
    })
}