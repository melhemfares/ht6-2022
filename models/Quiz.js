const mongoose = require('mongoose')

const QuizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: [mongoose.Schema.Types.Mixed],
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  id: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Quiz', QuizSchema)