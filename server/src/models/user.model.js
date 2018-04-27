const mongoose = require('mongoose')
const passportLocalPassport = require('passport-local-mongoose')

let UserSchema = new mongoose.Schema({
  username: String,
  password: String
})

UserSchema.plugin(passportLocalPassport)
UserSchema.statics.registerAsync = function (data, password) {
  return new Promise((resolve, reject) => {
    this.register(data, password, (err, user) => {
      if (err) return reject(err)
      resolve(user)
    })
  })
}
module.exports = mongoose.model('User', UserSchema)
