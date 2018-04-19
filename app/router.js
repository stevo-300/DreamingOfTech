// Server Requires
const path = require('path')
const express = require('express')
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
const expressVue = require('express-vue')
const glob = require("glob");
// Connect to the DB


module.exports.init = (app, config) => {
  const router = express.Router()
  mongoose.connect('mongodb://localhost/dreamspace')
  // Middleware
  // Helmet
  app.use(helmet())
  app.disable("x-powered-by");

  // Compression
  app.use(compression())

  // Load Vue
  app.use(expressVue.init(require('./vue/options')))

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
  app.use("/", router);

  let controllers = glob.sync(config.root + "/routes/**/*.js");
  controllers.forEach(function (controller) {
    module.require(controller)(router);
  });

  /**
   * Generic 404 handler
   * @param {object} req
   * @param {object} res
   */
  function error404handler(req, res) {
    const data = {
      title: "Error 404",
    };
    req.vueOptions = {
      head: {
        title: "Error 404",
      },
    };
    res.statusCode = 404;
    res.renderVue("error.vue", data, req.vueOptions);
  }
  app.use(error404handler);

  /**
   * Generic Error handling route
   * @param {object} error
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   */
  function genericErrorHandler(error, req, res, next) {
    res.statusCode = 500;
    let data = {
      debug: true,
      errorCode: error.code,
      error: error.stack,
    };
    if (res.statusCode) {
      res.renderVue("error.vue", data);
    } else {
      next();
    }
  }
  app.use(genericErrorHandler);
}