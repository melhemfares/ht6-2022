const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  //Create user given the request body
  const user = await User.create({...req.body})
  const token = user.createJWT()

  //Server responds with user payload
  res.status(StatusCodes.CREATED).json({ user:{name:user.name}, token })
}

const login = async (req, res) => {
  //Check for missing fields
  const { email, password } = req.body
  if(!email || !password) {
    throw new BadRequestError('Email and/or password is misisng')
  }

  //Check database to see if user exists
  const user = await User.findOne({ email })
  if(!user) {
    throw new UnauthenticatedError('The provided email does not exist')
  }

  //Compare password to see if it matches
  const isPasswordCorrect = await user.comparePassword(password)
  if(!isPasswordCorrect) {
    throw new UnauthenticatedError('Incorrect password. Try again')
  }

  //Once all checks pass, token is created and server responds with user payload
  const token = user.createJWT()
  res.StatusCodes(StatusCodes.OK).json({ user:{name:user.name}, token })
}

module.exports = {
  register,
  login
}