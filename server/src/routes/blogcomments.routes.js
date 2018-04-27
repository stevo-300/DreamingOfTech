const express = require('express')
const router = express.Router({mergeParams: true})
const {BlogCommentsController} = require('../controllers')
const {functions} = require('../mixins')

// Comments Routes
router.get('/new', functions.isLoggedIn, BlogCommentsController.NewCommentGet)
router.post('/', functions.isLoggedIn, BlogCommentsController.CommentPost)

module.exports = router
