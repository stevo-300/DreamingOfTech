const {castArray} = require('lodash')
const api = require('./fb_api')

const typingOn = (recipientId) => {
  return {
    recipient: {id: recipientId},
    sender_action: 'typing_on' // eslint-disable-line camelcase
  }
}

// Turns typing indicator off.
const typingOff = (recipientId) => {
  return {
    recipient: {id: recipientId},
    sender_action: 'typing_off' // eslint-disable-line camelcase
  }
}

// Wraps a message JSON object with recipient information.
const messageToJSON = (recipientId, messagePayload) => {
  return {
    recipient: {id: recipientId},
    message: messagePayload
  }
}

// Send one or more messages using the Send API.
const sendMessage = (recipientId, messagePayloads) => {
  const messagePayloadArray = castArray(messagePayloads)
    .map((messagePayload) => messageToJSON(recipientId, messagePayload))

  api.callMessagesAPI([
    typingOn(recipientId),
    ...messagePayloadArray,
    typingOff(recipientId)
  ])
}

// Send a read receipt to indicate the message has been read
const sendReadReceipt = (recipientId) => {
  const messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: 'mark_seen' // eslint-disable-line camelcase
  }

  api.callMessagesAPI(messageData)
}

module.exports = {
  sendMessage,
  sendReadReceipt
  // sendHelloRewardMessage,
  // sendPreferencesChangedMessage,
  // sendChooseGiftMessage,
  // sendGiftChangedMessage,
  // sendGiftPurchasedMessage,
}
