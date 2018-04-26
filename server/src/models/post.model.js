let mongoose = require('mongoose')
// let Comment = require('./comment')

let postSchema = new mongoose.Schema({
  post: String,
  image: String,
  title: String,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  created: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Post', postSchema)
