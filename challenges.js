/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying;
let dice1 = document.getElementById('dice-1')
let dice2 = document.getElementById('dice-2')

init()

document.querySelector('.btn-roll').addEventListener('click',() => {
  if(gamePlaying){
    // Random Num
    let dice_num1 = Math.floor(Math.random() * 6) + 1;
    let dice_num2 = Math.floor(Math.random() * 6) + 1;

    // Display Result
    dice1.style.display = 'block'
    dice1.style.transform = 'translateX(-50%) rotate('+Math.floor(Math.random() * 269)+'deg)'
    dice1.src = 'dice-' + dice_num1 + '.png'
    dice2.style.display = 'block'
    dice2.style.transform = 'translateX(-50%) rotate('+Math.floor(Math.random() * 269)+'deg)'
    dice2.src = 'dice-' + dice_num2 + '.png'

    // Update Round score if the rolled number was not 1
    if(dice_num1 === 6 && dice_num2 === 6){
      // Player loses score
      scores[activePlayer] = 0
      document.querySelector('#score-' + activePlayer).textContent = 0
      nextPlayer()
    }
    else if(dice_num1 !== 1 || dice_num2 !== 1){
      // Add Score
      roundScore += (dice_num1 + dice_num2)
      document.querySelector('#current-' + activePlayer).textContent = roundScore
    }
    else{
      nextPlayer()
    }
  }
})

document.querySelector('.btn-hold').addEventListener('click',() => {
  if(gamePlaying){
    // Add current score to global score
    scores[activePlayer] += roundScore

    // Update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

    let input = document.querySelector('.final-score').value;
    let winningScore;
    parseInt(input) > 0 ? winningScore = input : winningScore = 100
    // check if the player won the game
    if(scores[activePlayer] >= winningScore){
      document.getElementById('name-'+ activePlayer).textContent = 'Winner!'
      dice1.style.display = 'none'
      dice2.style.display = 'none'
      document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner')
      document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active')
      gamePlaying = false
    }
    else{
      nextPlayer()
    }
  }
})

document.querySelector('.btn-new').addEventListener('click',init)

function init(){
  scores = [0,0]
  roundScore = 0
  activePlayer = 0
  gamePlaying = true

  dice1.style.display = 'none'
  dice2.style.display = 'none'
  document.getElementById('score-0').textContent = '0'
  document.getElementById('score-1').textContent = '0'
  document.getElementById('current-0').textContent = '0'
  document.getElementById('current-1').textContent = '0'

  document.querySelector('#name-0').textContent = 'Player 1'
  document.querySelector('#name-1').textContent = 'Player 2'

  document.querySelector('.player-0-panel').classList.remove('winner')
  document.querySelector('.player-1-panel').classList.remove('winner')
  document.querySelector('.player-0-panel').classList.remove('active')
  document.querySelector('.player-1-panel').classList.remove('active')
  document.querySelector('.player-0-panel').classList.add('active')
}
function nextPlayer() {
  //Next Player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
  roundScore = 0

  document.getElementById('current-0').textContent = '0'
  document.getElementById('current-1').textContent = '0'

  document.querySelector('.player-0-panel').classList.toggle('active')
  document.querySelector('.player-1-panel').classList.toggle('active')

  dice1.style.display = 'none'
  dice2.style.display = 'none'
}
