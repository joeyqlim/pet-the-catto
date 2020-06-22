// to do: animations, body, get random cat facts, styling. try and clean up code. add reset score function.
// keep track of whose turn it is
let turn = 0;

// keep track of player scores
const players = {
  one: {
    score: 0,
    message() {
      playersText.innerText = `Go forth, Player 1!`
    },
    win() {
      this.score++;
      playerOneScore.innerText = `Player 1: ${this.score}`;
    },
    lose() {
      gameOver.innerText = `Player 1 made chonky A N G Y`;
      playerOneScore.innerText = `Player 1: ${this.score}`;
    }
  },
  two: {
    score: 0,
    message() {
      playersText.innerText = `It's Player 2's turn!`
    },
    win() {
      this.score++;
      playerTwoScore.innerText = `Player 2: ${this.score}`
    },
    lose() {
      gameOver.innerText = `Player 2 made chonky A N G Y`;
      playerTwoScore.innerText = `Player 2: ${this.score}`
    }
  }
}

// ui elements
const playersText = document.getElementById('players');
const introText = document.getElementById('intro');
const replayBtn = document.getElementById('replay-btn');

const scoreBox = document.getElementById('score');
const playerOneScore = document.getElementById('p1-score');
const playerTwoScore = document.getElementById('p2-score');

const gameOver = document.createElement('div');
  gameOver.innerText = `Game over! CHONK is A N G Y`
  gameOver.classList.add('game-over')

// cat parts
const head = document.getElementById('head'); 
const leftEar = document.getElementById('left-ear');
const rightEar = document.getElementById('right-ear');
const leftEye = document.getElementById('left-eye');
const rightEye = document.getElementById('right-eye');
const nose = document.getElementById('nose');

const catParts = [head, leftEar, rightEar, leftEye, rightEye, nose];

// function to attach event listeners to all cat parts and a "woops" class to a random part 
function randomPart(){
  let badPart;

  playersText.style.visibility = "visible";

  showPlayers();

  catParts.forEach((part) => {
    part.addEventListener('click', checkPart)
  });

  index = Math.floor(Math.random() * catParts.length+1);
  badPart = catParts[index]; // ISSUE: Takes time to load and might bug the game.
  badPart.classList.add("woops");

  console.log(document.body) // see where randomPart is
}

// function to check if clicked part contains woops class
function checkPart(e){
  showPlayers();
  let selected = e.target;
  turn++;

  if (selected.classList.contains("woops")) {
    if (turn % 2 === 0) {
      players.one.lose();
      players.two.win();
    } else{
      players.one.win();
      players.two.lose();
    }
    // remove players turn text
    playersText.style.visibility = "hidden";
    // display game over message
    displayGameOver();
    // remove event listeners
    catParts.forEach((part) => {
      part.removeEventListener('click', checkPart)
    });
    // remove woops class from bad part
    selected.classList.remove("woops");
  }
}

// game over display
function displayGameOver() {
  document.getElementById('result').appendChild(gameOver);
  replayBtn.style.visibility = "visible";
}

// show players function
function showPlayers() {
  turn % 2 === 0
  ? players.one.message()
  : players.two.message();

  scoreBox.style.visibility = "visible";
  introText.style.visibility = "hidden";
}

// replay function
function replayGame() {
  turn = 0;
  playersText.style.visibility = "hidden";
  introText.style.visibility = "visible";
  document.getElementById('result').removeChild(gameOver);
  replayBtn.style.visibility = "hidden";
}