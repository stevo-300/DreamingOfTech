const removeMD = require('remove-markdown')
// const categories = require('../models/categories')

module.exports = {
  isLoggedIn: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login')
  },
  checkCampgroundOwnership: function (req, res, next) {
    next()
  },
  getRawText: function (txt) {
    return removeMD(txt)
  },
  getBlogFilter: (user) => {
    if (user) {
      if (user.username === 'steveadmin') {
        return {}
      }
    }
    return {published: true}
  },
  strings: require('./strings'),
  updateCategories: function (postCategories) {
    postCategories.forEach(e => {
      /*
      * 1) Determine if the category exists in DB
      * 2) IF Yes
      * 2a) increase count by 1
      * 3) IF No
      * 3a) add new category
      */
    })
  },
  voterIdExists: (id, arr) => {
    if (arr.length > 0) {
      arr.forEach(e => {
        if (String(e) === id) {
          return false
        }
      })
    }
    return true
  }
}
