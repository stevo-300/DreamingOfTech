const path = require('path')

const {User} = require('./models')
const dreamspace = require('./mixins/index')

const express = require('express')
const expressSession = require('express-session')
const expressValidator = require('express-validator')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const compression = require('compression')
const helmet = require('helmet')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const methodOverride = require('method-override')
const expressSanitizer = require('express-sanitizer')

// Set the Mongoose Promise Library
mongoose.Promise = require('bluebird')

// Connect to the DB
mongoose.connect('mongodb://localhost/dreamspace')

const app = express()

// Middleware
// Helmet
app.use(helmet())

// Compression
app.use(compression())

app.use(morgan('combined'))
app.use(bodyparser.json())
app.use(cors())

// Express session
app.use(expressSession({
  secret: 'secret',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

// PASSPORT
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Express Validator
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    let namespace = param.split('.')
    let root = namespace.shift()
    let formParam = root

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']'
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    }
  }
}))

app.use(expressSanitizer())
app.use(methodOverride())

app.use((req, res, next) => {
  res.locals.currentUser = req.user
  res.locals.globalStrings = dreamspace.strings.global
  next()
})

const routes = require('./routes')
app.use('/blog', routes.blog)
app.use('/blog/:id/comments', routes.blogComments)
app.use('/coding', routes.coding)
app.use('/tools', routes.tools)
app.use('/', routes.index)

app.listen(process.env.PORT || 8081, () => { console.log('server started') })
