const express = require('express')
const router = express.Router()
const {BlogController} = require('../controllers')
const {functions} = require('../mixins')

router.get('/', BlogController.index)

router.post('/', functions.isLoggedIn, BlogController.PostBlog)

router.get('/new', functions.isLoggedIn, BlogController.NewPostGet)

router.get('/:id', BlogController.ShowSpecificPost)

router.get('/:id/edit', functions.checkCampgroundOwnership, BlogController.PostEditGet)

router.put('/:id', BlogController.PostUpdatePut)

router.delete('/:id', BlogController.PostDelete)

module.exports = router
