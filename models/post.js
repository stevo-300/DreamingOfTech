let mongoose = require('mongoose')
// let Comment = require('./comment')

let postSchema = new mongoose.Schema({
  post: String,
  snippet: String,
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
  created: {type: Date, default: Date.now},
  published: {type: Boolean, default: false},
  views: {type: Number, default: 0},
  voters: {
    like: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    dislike: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
  },
  votes: {
    like: {type: Number, default: 0},
    dislike: {type: Number, default: 0}
  },
  modified: {type: Date, default: Date.now},
  icon: String

})

module.exports = mongoose.model('Post', postSchema)
