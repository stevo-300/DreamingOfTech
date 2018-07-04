const cp = require('child_process').spawn
const op = cp.spawn

let children = [
 
]

function twitterBot() {
  children.push({
    name: 'twitterBot',
    task: cp('node', ['./bots/twit_post.js']),
    status: 'open'
  })
  setTimeout(() => {
    children.forEach((e) => {
      console.log(e.task.pid)
      //console.log(e.task)
      killChild(children[0].task)
      console.log('ID: ' + e.task)
    })
     
  },5000)
}


children.forEach((e) => {
  e.task.stdout.on('data', (data) => {
    console.log(`STDOUT: ${data}`)
  })
  
  e.task.stderr.on('data', (data) => {
    console.log(`STDERR: ${data}`)
  })
  
  e.task.on('close', (data) => {
    console.log(`CLOSE: ${data}`)
  })
})



twitterBot()

function killChild(e) {
  e.kill()
  console.log('ID: ' + e.task)
}