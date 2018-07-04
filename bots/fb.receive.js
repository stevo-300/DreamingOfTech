const messages = require('./fb_messages')

const handleReceiveMessage = (event) => {
  const message = event.message
  const social = {
    type: 'facebook',
    senderID: event.sender.id
  }

  if (message.text) {
    if (message.text === 'chuck') {
      messages.chuckNorrisJoke(social)
    } else {
      messages.helloMessage(social)
    }
  }
}

module.exports = {
  // handleReceivePostback,
  handleReceiveMessage
  // handleReceiveReferral,
  // handleNewGiftSelected,
  // handleNewGiftPurchased,
}
