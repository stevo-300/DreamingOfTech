const {Post} = require('../models')
const markdown = require('markdown')
// const moment = require('moment')

module.exports = {
  async index (req, res) {
    let allPosts
    try {
      allPosts = await Post.find({}).sort('-created').exec()
      res.send({posts: allPosts})
    } catch (err) {
      console.log(err)
    }
  },

  async PostBlog (req, res) {
    req.body.blog.post = req.sanitize(req.body.blog.post)
    req.body.blog.author = {
      id: req.user.id,
      username: req.user.username
    }
    try {
      let post = await Post.create(req.body.blog).exec()
      console.log(`Post ${post.title} added`)
      res.redirect('/blog')
    } catch (err) {
      console.log(err)
    }
  },

  async ShowSpecificPost (req, res) {
    try {
      let post = await Post.findById(req.params.id).populate('comments').exec()
      res.send({post: post})
    } catch (err) {
      console.log(err)
    }
  },

  async PostUpdatePut (req, res) {
    try {
      await Post.findByIdAndUpdate(req.params.id, req.body.campground).exec()
      res.redirect('/blog/' + req.params.id)
    } catch (err) {
      res.redirect('/blog')
    }
  },

  async PostDelete (req, res) {
    try {
      await Post.findByIdAndRemove(req.params.id).exec()
      res.redirect('/blog')
    } catch (err) {
      console.log(err)
    }
  },

  async PostEditGet (req, res) {
    try {
      let post = await Post.findById(req.params.id).exec()
      res.send({post: markdown.toHTML(post)})
    } catch (err) {
      console.log(err)
    }
  },

  NewPostGet (req, res) {
    res.send({message: 'New Post'})
  }
}
