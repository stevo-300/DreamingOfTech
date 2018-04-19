const mongoose = require('mongoose')
const passportLocalPassport = require('passport-local-mongoose')

let UserSchema = new mongoose.Schema({
  username: String,
  password: String
})

UserSchema.plugin(passportLocalPassport)
module.exports = mongoose.model('User', UserSchema)
