let mongoose = require('mongoose')

let categorySchema = new mongoose.Schema({
  name: String,
  count: {type: Number, default: 1}
})

module.exports = mongoose.model('Categories', categorySchema)
