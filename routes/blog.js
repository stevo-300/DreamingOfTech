const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const markdown = require('markdown-it')({linkify: true, html: true})
const moment = require('moment')
// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// TODO: Snippet code not working on new post or edit

router.get('/', (req, res) => {
  Post.find(global.dreamspace.getBlogFilter(req.user)).sort('-created').exec((err, allPosts) => {
    if (err) {
      console.log(err)
    } else {
      allPosts.forEach(e => {
        e.shortDate = moment(e.created).format('D MMMM YYYY')
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
  req.body.snippet = global.dreamspace.getRawText(req.body.blog.post).substring(0, 75)
  if (req.body.blog.published) {
    req.body.blog.published = true
  } else {
    req.body.blog.published = false
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
      let updatedPost = foundPost
      updatedPost.post = markdown.render(updatedPost.post)
      updatedPost.commentCount = foundPost.comments.length
      for (let i = 0; i < updatedPost.commentCount; i++) {
        let a = moment(foundPost.comments[i].created)
        updatedPost.comments[i].daysAgo = a.diff(moment(), 'days')
      }
      // console.log(updatedPost)
      res.render('blog/show', {
        post: updatedPost
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

    // Edit post details
    let updatedPost = foundPost
    // updatedPost.post = markdown.render(updatedPost.post)
    // console.log(updatedPost.post)

    res.render('blog/edit', {
      post: updatedPost
    })
  })
})

router.put('/:id', (req, res) => {
  req.body.blog.post = req.sanitize(req.body.blog.post)
  req.body.snippet = global.dreamspace.getRawText(req.body.blog.post).substring(0, 75)
  if (req.body.blog.published) {
    req.body.blog.published = true
  } else {
    req.body.blog.published = false
  }

  Post.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedCampground) => {
    if (err) {
      res.redirect('/blog')
    } else {
      res.redirect('/blog/' + req.params.id)
    }
  })
})

router.post('/:id/likes/:vote', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) { console.log(err) } else {
      let updatePost = post
      console.log(updatePost)
      if (req.params.vote === 'yes') {
        if (global.dreamspace.voterIdExists(req.user.id, updatePost.voters.like)) {
          updatePost.votes.like++
          updatePost.voters.like.push(req.user.id)
        }
      } else if (req.params.vote === 'no') {
        if (global.dreamspace.voterIdExists(req.user.id, updatePost.voters.dislike)) {
          updatePost.votes.dislike++
          updatePost.voters.dislike.push(req.user.id)
        }
      }
      console.log(updatePost)
      Post.findByIdAndUpdate(updatePost._id, updatePost, (err, update) => {
        if (err) { res.send(err) } else {
          if (req.params.vote === 'yes') {
            res.send('Post Liked')
          } else {
            res.send('Post Disliked')
          }
        }
      })
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
