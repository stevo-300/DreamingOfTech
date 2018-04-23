// const path = require('path')
const express = require('express')
const bodyparser = require('body-parser')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyparser.json())

app.get('/status', (req, res) => {
  res.send({
    message: 'Hello'
  })
})

app.listen(process.env.PORT || 8081, () => { console.log('server started') })
