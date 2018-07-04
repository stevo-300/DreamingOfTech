/* jshint esversion: 6 */

let squares = document.querySelectorAll('td')
let turn = 'X'
let turncount = 0
let gameOver = false
let gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let winningStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// changeTurn
function changeTurn () {
  if (!gameOver) {
    if (turn === 'X') {
      turn = 'O'
    } else {
      turn = 'X'
    }
  } else {
    document.getElementById('reset').style.display = 'block'
  }
}

// Set click events
for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener('click', function () {
    if (!gameOver && gameState[i] === 0) {
      this.textContent = turn
      gameState[i] = turn
      gameOver = gameWon(turn)
      changeTurn()
    }
    if (!gameOver && turn === 'O') {
      AI()
    }
  })
}

// reset button
document.getElementById('reset').addEventListener('click', function () {
  gameOver = false
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = ''
    squares[i].classList.remove('winner')
  }
  turn = 'X'
  gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  this.style.display = 'none'
})

// Checking for game win
function gameWon (t) {
  turncount++
  for (let i = 0; i < winningStates.length; i++) {
    let stateCount = 0
    for (let j = 0; j < winningStates[i].length; j++) {
      if (gameState[winningStates[i][j]] === t) {
        stateCount++
      }
    }
    if (stateCount === 3) {
      for (let j = 0; j < winningStates[i].length; j++) {
        squares[winningStates[i][j]].classList.add('winner')
      }
      return true
    }
  }
  for (let i = 0; i < 9; i++) {
    if (gameState[i] === 0) {
      return false
    }
  }
  return true
}

// AI turn
// Draft 1, picking random available square
// function AI() {
//   let selected = true
//   let guess
//   while (selected) {
//   guess = Math.floor(Math.random() * 9)
//   // console.log(guess)
//   if (gameState[guess] === 0) {
//     selected = false
//   }
//   }
//   squares[guess].click()
// }

// Draft 2, picking at random UNLESS I can win OR Player can win
function AI () {
  let selected = true
  let guess = ''
  if (turncount >= 3) {
        // Check if I can win
    guess = canWin('O')
        // console.log(guess)
        // console.log(turncount)
        // Check if Player can win
    if (guess === '') {
      guess = canWin('X')
            // console.log(guess)
            // console.log(turncount)
    }
  }
  if (guess === '') {
    while (selected) {
      guess = Math.floor(Math.random() * 9)
            // console.log(guess)
      if (gameState[guess] === 0) {
        selected = false
      }
    }
  }
    // console.log(guess)
  squares[guess].click()
}

function canWin (t) {
  for (let i = 0; i < winningStates.length; i++) {
    let stateCount = 0
    for (let j = 0; j < winningStates[i].length; j++) {
      if (gameState[winningStates[i][j]] === t) {
        stateCount++
      }
    }
        // console.log('state: ' + stateCount)
    if (stateCount === 2) {
            // console.log(stateCount)
      for (let j = 0; j < winningStates[i].length; j++) {
        if (gameState[winningStates[i][j]] === 0) {
          console.log(winningStates[i][j])
          return winningStates[i][j]
        }
      }
    }
  }
  return ''
}

function loadCSS (filename) {
  var file = document.createElement('link')
  file.setAttribute('rel', 'stylesheet')
  file.setAttribute('type', 'text/css')
  file.setAttribute('href', filename)
  document.head.appendChild(file)
}

// just call a function to load your CSS
// this path should be relative your HTML location
loadCSS('/css/challenges/noughts_crosses.css')
