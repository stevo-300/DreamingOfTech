const twit = require('twit')
const axios = require('axios')

let T = new twit(require('../Configs/twit_config'))

// T.get('search/tweets', {q: '@chooseblocks', count: 1000}, (err, data, response) => {
//   if (err) {
//     console.log(`Error: ${err}`)
//   } else {
//     // let d = Object.keys(data)
//     // console.log(`DATA: ${d}`)
//     data.statuses.forEach((e) => {
//       if (!e.text.startsWith('RT')) {
//         console.log(`DATA: ${e.text} -- ${e.created_at} -- ${e.user.name}`)
//       }
      
//     })
//   }
// })

function tweet(data) {
  let tweet = {status: data}
  T.post('statuses/update', tweet, tweeted)
  function tweeted(err, data, response) {
    if (err) {
      console.log('ERROR: ' + err)
    } else {
      console.log('Tweeted')
    }
  }
}

async function chuck(user) {
  let res = await axios.get('http://api.icndb.com/jokes/random?escape=javascript')
  tweet(`@${user} ${res.data.value.joke}`)
}

console.log('Bot Started')
let stream = T.stream('user')
stream.on('tweet', (e) => {
  if (e.text.toLowerCase().includes('@tech_dreamer_uk')) {
    tweetedMe(e)
  }
})

function tweetedMe(tweet) {
  let user = tweet.user.screen_name
  console.log('I have been tweeted - ' + user + ' - ' + tweet.text)
  if (tweet.text.toLowerCase().includes('chuck norris')) {
    chuck(user)
  }
}