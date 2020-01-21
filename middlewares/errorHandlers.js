module.exports = function (error, req, res, next) {


	let errorArr = []
	let code = 500
	let response = {}

	if (error.code == 403) {
		errorArr.push(error.msg)
		code = error.code
	}

	if (error.name == 'ValidationError') {
		for (key in error.errors) {
			if (error.errors[ key ].name == 'CastError') {
				errorArr.push(`${error.errors[ key ].path} field is not valid number`)
			} else {
				errorArr.push(error.errors[ key ].message)
			}
		}
		code = 400
	}

	if (error.code == 11000) {
		code = 409
		errorArr.push('email already exists')
	}

	response.msg = errorArr
	res.status(code).json(response)

}