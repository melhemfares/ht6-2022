const express = require('express')

const router = express.Router()

const { 
  getAllQuestions,
  getOneQuestion,
  checkQuestionResponse,
} = require('../controllers/quiz')

router.route('/')
  .get(getAllQuestions)

router.route('/:id')
  .get(getOneQuestion)
  .post(checkQuestionResponse)

module.exports = router