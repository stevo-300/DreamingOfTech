const express = require('express')
const router = express.Router()

router.get('/challenges', (req, res) => {
  res.render('coding/challenges')
})

router.get('/challenges/noughts_crosses', (req, res) => {
  res.render('coding/challenge/noughts_crosses')
})

router.get('/games', (req, res) => {
  res.render('coding/challenges')
})

module.exports = router
