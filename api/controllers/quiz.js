const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors')
const Leaderboard = require('../models/Leaderboard')
const Quiz = require('../models/Quiz')
const User = require('../models/User')

const getAllQuestions = async (req, res) => {
  const questions = await Quiz.find().sort('points')
  res.status(StatusCodes.OK).json({ questions })
}

const getOneQuestion = async (req, res) => {
  
  const question = await Quiz.findOne({
    id: req.params.id
  })

  if(!question) {
    throw new NotFoundError(`No question with id: ${id}`)
  }

  res.status(StatusCodes.OK).json({ question })
}

const checkQuestionResponse = async (req, res) => {
  
  const response = req.body.answer

  const question = await Quiz.findOne({
    id: req.params.id
  })

  if(response === question.answer) {
    const rank = await Leaderboard.findOneAndUpdate(
      { user: req.user.userId },
      { $inc: { points: question.points } },
      { new: true }
    )

    if(!rank) {
      throw new NotFoundError(`No user with id ${req.user.userId}`)
    }

    const user = await User.findByIdAndUpdate(
      { _id: req.user.userId },
      { $push: { answeredQuestions: question.id } },
      { new: true }
    )
    
    if(!user) {
      throw new NotFoundError(`No user with id ${req.user.userId}`)
    }
  
    res.status(StatusCodes.OK).json({ msg: 'Correct answer!', rank })
  } else {
    res.status(StatusCodes.OK).json({ msg: 'Wrong answer. Try again' })
  }
  
}

module.exports = {
  getAllQuestions,
  getOneQuestion,
  checkQuestionResponse
}