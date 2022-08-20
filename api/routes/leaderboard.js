const express = require('express')

const router = express.Router()

const { 
  getLeaderboard,
  getUserScore,
  createUserRank,
  updateScore
} = require('../controllers/leaderboard')

router.route('/')
  .get(getUserScore)
  .post(createUserRank)
  .patch(updateScore)

router.route('/all')
  .get(getLeaderboard)

module.exports = router