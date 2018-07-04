const express = require('express')
const router = express.Router()
// const User = require('../models/user')
// const passport = require('passport')
// const markdown = require('markdown')
// data
// let holdingPage = require('../Ideas/ideas.js')

router.get('/decisiontree', (req, res) => {
  res.render('tools/decisiontree')
})

router.get('/shopping', (req, res) => {
  res.render('tools/Shopping/list')
})

module.exports = router
