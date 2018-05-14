const express = require('express')
const router = express.Router()
const passport = require('passport')
const policies = require('../policies')
const {AuthenticationController} = require('../controllers')

// Temp Route

router.get('/status', (req, res) => {
  res.send({
    message: 'Hello'
  })
})
// AUTH ROUTES

router.get('/register', AuthenticationController.register)
router.post('/register', policies.AuthenticationControllerPolicy.register, AuthenticationController.registerPost)
router.get('/login', AuthenticationController.login)

router.post('/login', passport.authenticate('local', {
  successRedirect: '/blog',
  failureRedirect: '/login'
}))

router.get('/logout', AuthenticationController.logout)

module.exports = router
