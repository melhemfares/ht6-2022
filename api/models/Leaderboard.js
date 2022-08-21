const mongoose = require('mongoose')

const LeaderboardSchema = new mongoose.Schema({
  points: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
  }
})

module.exports = mongoose.model('Leaderboard', LeaderboardSchema)