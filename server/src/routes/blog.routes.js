const express = require('express')
const router = express.Router()
// const markdown = require('markdown')
const {BlogController} = require('../controllers')
const {functions} = require('../mixins')

router.get('/', BlogController.index)

router.post('/', functions.isLoggedIn, BlogController.PostBlog)

// router.get('/new', functions.isLoggedIn, (req, res) => {
//   res.render('blog/new')
// })

// router.get('/:id', (req, res) => {
//   Post.findById(req.params.id).populate('comments').exec(function (err, foundPost) {
//     if (err) {
//       console.log(err)
//     } else {
//       res.render('blog/show', {
//         post: foundPost
//       })
//     }
//   })
// })

// router.get('/:id/edit', functions.checkCampgroundOwnership, (req, res) => {
//   Post.findById(req.params.id, (err, foundPost) => {
//     if (err) {
//       console.log(err)
//     }
//     // console.log(foundPost)

//     // Edit post details
//     let updatedPost = foundPost
//     updatedPost.post = markdown.toHTML(updatedPost.post)

//     res.render('blog/edit', {
//       post: updatedPost
//     })
//   })
// })

router.put('/:id', BlogController.PostUpdatePut)

// router.delete('/:id', (req, res) => {
//   Post.findByIdAndRemove(req.params.id, (err) => {
//     if (err) {
//       console.log(err)
//     }
//     res.redirect('/blog')
//   })
// })

module.exports = router
