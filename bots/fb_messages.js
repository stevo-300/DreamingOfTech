const axios = require('axios')
const sendApi = require('./fb_send')

async function chuckNorrisJoke (socialObject) {
  sendApi.sendReadReceipt(socialObject.senderID)
  try {
    let res = await axios.get('http://api.icndb.com/jokes/random?escape=javascript')
    sendApi.sendMessage(socialObject.senderID, {text: res.data.value.joke})
  } catch (error) {
    console.log(error)
  }
}

function helloMessage (socialObject) {
  sendApi.sendReadReceipt(socialObject.senderID)
  sendApi.sendMessage(socialObject.senderID, {text: 'Hello'})
}

module.exports = {
  helloMessage,
  chuckNorrisJoke
}
