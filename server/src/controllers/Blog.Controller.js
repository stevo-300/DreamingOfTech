const {functions} = require('../mixins')
const {Post} = require('../models')

module.exports = {
  index (req, res) {
    Post.find({}).sort('-created').exec((err, allPosts) => {
      if (err) {
        console.log(err)
      } else {
        allPosts.forEach(e => {
          e.shortDate = e.created.getDate() + ' ' + functions.months[e.created.getMonth()] + ' ' + e.created.getFullYear()
        })
        res.send({
          campgrounds: allPosts
        })
      }
    })
  },

  PostBlog (req, res) {
    req.body.blog.post = req.sanitize(req.body.blog.post)
    req.body.blog.author = {
      id: req.user.id,
      username: req.user.username
    }
    Post.create(req.body.blog, (err, post) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`Post ${post.title} added`)
        res.redirect('/blog')
      }
    })
  },

  PostUpdatePut (req, res) {
    Post.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
      if (err) {
        res.redirect('/blog')
      } else {
        res.redirect('/blog/' + req.params.id)
      }
    })
  }
}
