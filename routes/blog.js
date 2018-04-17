const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const markdown = require('markdown')
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

router.get('/', (req, res) => {
  Post.find({}).sort('-created').exec((err, allPosts) => {
    if (err) {
      console.log(err)
    } else {
      allPosts.forEach(e => {
        e.shortDate = e.created.getDate() + " " + months[e.created.getMonth()] + " " + e.created.getFullYear()
      })
      res.render('blog/index', {
        campgrounds: allPosts
      })
    }
  })
})

router.post('/', global.dreamspace.isLoggedIn, (req, res) => {
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
})

router.get('/new', global.dreamspace.isLoggedIn, (req, res) => {
  res.render('blog/new')
})

router.get('/:id', (req, res) => {
  Post.findById(req.params.id).populate('comments').exec(function (err, foundPost) {
    if (err) {
      console.log(err)
    } else {
      res.render('blog/show', {
        post: foundPost
      })
    }
  })
})

router.get('/:id/edit', global.dreamspace.checkCampgroundOwnership, (req, res) => {
  Post.findById(req.params.id, (err, foundPost) => {
    if (err) {
      console.log(err)
    }
    // console.log(foundPost)

    //Edit post details
    let updatedPost = foundpost
    updatedPost.post = markdown.toHTML(updatedPost.post)

    res.render('blog/edit', {
      post: updatedPost
    })
  })
})

router.put('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
    if (err) {
      res.redirect('/blog')
    } else {
      res.redirect('/blog/' + req.params.id)
    }
  })
})

router.delete('/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log(err)
    }
    res.redirect('/blog')
  })
})



module.exports = router