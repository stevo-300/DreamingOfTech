// Application Namespace
global.dreamspace = require('./namespace/namespace')

const express = require("express");
const config = require("./config");
const Router = require("./router");




// declare app
let app = express()

Router.init(app, config);
// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))

// Set Port and start the server
app.set('port', 5000)

// listen on port
module.exports = app

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log('Server started on port ' + app.get('port'))
  })
}