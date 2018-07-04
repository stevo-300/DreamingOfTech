const express = require('express')
const router = express.Router()
const receiveApi = require('../bots/fb.receive')

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || 'EAAJNjwIrZCiYBAJvbvaU86u68VtFW5oVlNwXQUWHVU1R9qxTLQGx8EZBT6VKYqKJzS7qBB0W806VX718hSk8YiYda4oEyAAShlwZBIgIANtk4ZCrUDIJBQriVQOa6okxbSYnuk6uglQ3ZAKRT231X7H70ht6oE8ZCiih0ZBecAXMwZDZD'  // eslint-disable-line

// Accepts POST requests at /webhook endpoint
router.post('/dot_fb_webhook', (req, res) => {
  // Parse the request body from the POST
  // res.status(200).send('EVENT_RECEIVED')
  let body = req.body
  // let messaging_events = body.entry[0].messaging
  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {
    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Get the webhook event. entry.messaging is an array, but
      // will only ever contain one event, so we get index 0
      let webhookEvent = entry.messaging[0]

      // console.log(JSON.stringify(webhookEvent,null,2))
      receiveApi.handleReceiveMessage(webhookEvent)
    })

    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED')
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404)
  }
})

// Accepts GET requests at the /webhook endpoint
router.get('/dot_fb_webhook', (req, res) => {
  /** UPDATE YOUR VERIFY TOKEN **/
  const VERIFY_TOKEN = 'boom-shaka-lacka'

  // Parse params from the webhook verification request
  let mode = req.query['hub.mode']
  let token = req.query['hub.verify_token']
  let challenge = req.query['hub.challenge']

  // console.log('here')

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED')
      res.status(200).send(challenge)
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403)
    }
  }
})

module.exports = router

// curl -X POST "https://graph.facebook.com/v3/me/subscribed_apps?access_token=EAAJNjwIrZCiYBAJvbvaU86u68VtFW5oVlNwXQUWHVU1R9qxTLQGx8EZBT6VKYqKJzS7qBB0W806VX718hSk8YiYda4oEyAAShlwZBIgIANtk4ZCrUDIJBQriVQOa6okxbSYnuk6uglQ3ZAKRT231X7H70ht6oE8ZCiih0ZBecAXMwZDZD"
