const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again'
  }

  if(err.name === 'ValidationError') {
    customError.msg = Obect.values(err.errors).map((item) => item.message).join(', ')
    customError.statsCode = 400
  }

  if(err.name = 'CastError') {
    customError.msg = `No item found with id: ${err.value}`
    customError.statusCode = 404
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware