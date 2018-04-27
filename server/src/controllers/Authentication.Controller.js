const {User} = require('../models')
const passport = require('passport')

module.exports = {
  register (req, res) {
    res.send({messgae: 'register'})
  },

  async registerPost (req, res) {
    try {
      const newUser = new User({username: req.body.username})
      await User.registerAsync(newUser, req.body.password)
      passport.authenticate('local')(req, res, () => {
        res.redirect('/blog')
      })
    } catch (err) {
      console.log(err)
    }
  },

  login (req, res) {
    res.send({message: 'login', user: res.locals.currentUser})
  },

  logout (req, res) {
    req.logout()
    res.redirect('/')
  }
}
