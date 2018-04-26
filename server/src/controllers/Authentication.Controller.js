const {User} = require('../models')
const passport = require('passport')

module.exports = {
  register (req, res) {
    res.send({messgae: 'register'})
  },

  registerPost (req, res) {
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
  },

  login (req, res) {
    res.send({message: 'login'})
  },

  logout (req, res) {
    req.logout()
    res.redirect('/')
  }
}
