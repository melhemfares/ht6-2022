const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors')
const Leaderboard = require('../models/Leaderboard')

const getLeaderboard = async (req, res) => {
  const leaderboard = await Leaderboard.find().sort([['points', -1]])
  res.status(StatusCodes.OK).json({ leaderboard, count: leaderboard.length })
}

const getUserScore = async (req, res) => {
  
  const score = await Leaderboard.findOne({
    user: req.user.userId
  })

  if(!score) {
    throw new NotFoundError(`No score associated with user: ${req.user.userId}`)
  }

  res.status(StatusCodes.OK).json({ score })
}

const createUserRank = async (req, res) => {
  req.body.user = req.user.userId
  const rank = await Leaderboard.create( req.body )
  res.status(StatusCodes.CREATED).json({ rank })
}

// const updateScore = async (req, res) => {
  
//   const {
//     user: { userId },
//     query: { points }
//   } = req

//   const rank = await Leaderboard.findOneAndUpdate(
//     { user: userId },
//     {$inc: { points: points } },
//     { new: true }
//   )

//   if(!rank) {
//     throw new NotFoundError(`No user with id ${userId}`)
//   }

//   res.status(StatusCodes.OK).json({ rank })
// }

module.exports = {
  getLeaderboard,
  getUserScore,
  createUserRank,
  // updateScore
}