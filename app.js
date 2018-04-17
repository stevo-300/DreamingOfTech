/**
 * Portfolio Server for dreamingoftech.uk
 * Built with Node.js with Express.js
 * Using Semantic UI for styling
 */

// Application Namespace
global.dreamspace = require('./namespace/namespace')

// Server Requires
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const exphbsHelpers = require('just-handlebars-helpers')
const expressSession = require('express-session')
const expressValidator = require('express-validator')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')
const favicon = require('serve-favicon')
const compression = require('compression')
const helmet = require('helmet')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressSanitizer = require('express-sanitizer')
// Connect to the DB
mongoose.connect('mongodb://localhost/dreamspace')


// // Create Express-Handlebars
let hbs = exphbs.create({
  defaultLayout: 'layout',
  partialsDir: path.join(__dirname, '/views/partials')
})
// register handlebars helpers module
exphbsHelpers.registerHelpers(hbs.handlebars)

// declare app
let app = express()
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))

// Middleware
// Helmet
app.use(helmet())

// Compression
app.use(compression())

// View Engine
// Load View Engine
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

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

// Body Parser Middleware
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(expressSanitizer())

app.use((req, res, next) => {
  res.locals.currentUser = req.user
  res.locals.globalStrings = dreamspace.strings.global
  next()
})

// Route Files

app.use('/blog', require('./routes/blog'))
app.use('/blog/:id/comments', require('./routes/blogcomments'))
app.use('/coding', require('./routes/coding'))
app.use('/tools', require('./routes/tools'))
app.use('/', require('./routes/index'))

// Set Port and start the server
app.set('port', 5000)

// listen on port
module.exports = app

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log('Server started on port ' + app.get('port'))
  })
}