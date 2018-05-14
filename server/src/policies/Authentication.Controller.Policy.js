const Joi = require('Joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      username: Joi.string(),
      password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$'))
    }

    const {error} = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
        case 'username':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: 'bad password'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      next()
    }
  }
}
