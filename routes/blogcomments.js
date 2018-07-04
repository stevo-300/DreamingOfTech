const express = require('express')
const router = express.Router({mergeParams: true})
const Post = require('../models/post')
const Comment = require('../models/comment')

// Comments Routes
router.get('/new', global.dreamspace.isLoggedIn, (req, res) => {
  Post.findById(req.params.id, function (err, data) {
    if (err) {
      console.log(err)
    } else {
      res.render('comment/new', {post: data})
    }
  })
})

router.put('/', global.dreamspace.isLoggedIn, (req, res) => {
  Post.findById(req.params.id, function (err, data) {
    if (err) {
      console.log(err)
      res.redirect('/blog')
    } else {
      Comment.create(req.body.comment, function (err, data2) {
        if (err) {
          console.log(err)
        } else {
            // add username to comment
          data2.author.id = req.user._id
          data2.author.username = req.user.username
            // save comment
          data2.save()
          data.comments.push(data2._id)
          data.save()
          res.redirect(`/blog/${data._id}`)
        }
      })
    }
  })
})

// TODO: Edit Comment

router.put(':cid', global.dreamspace.isLoggedIn, (req, res) => {
})

module.exports = router
