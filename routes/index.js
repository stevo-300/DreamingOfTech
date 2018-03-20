const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const marked = require('marked')
// data
let holdingPage = require('../Ideas/ideas.js')

router.get('/', (req, res) => {
  res.render('landing', {
    landingPage: true
  })
})

// AUTH ROUTES

router.get('/register', (req, res) => {
  res.render('auth/register')
})

router.post('/register', (req, res) => {
  User.register(new User({
    username: req.body.username
  }), req.body.password, (err, user) => {
    if (err) {
      console.log(err)
      return res.redirect('/register')
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/blog')
    })
  })
})

router.get('/login', (req, res) => {
  res.render('auth/login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}), (req, res) => {})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('*', function (req, res) {
  res.render('holding', {
    text: marked(holdingPage)
  })
})

module.exports = router