const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const marked = require('marked')
// data
let holdingPage = require('../Ideas/ideas.js')

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