// to do: body, get random cat facts, UX. store player names. 

// keep track of whose turn it is
let turn = 1;

let winningScore = 2;

// player objects
const players = {
  one: {
    score: 0,
    message() {
      playersText.innerText = `It's Player 1's turn!`
    },
    win() {
      this.score++;
      playerOneScore.innerText = `Player 1: ${this.score}`;
    },
    lose() {
      gameOver.innerText = `Player 1 made chonky A N G Y`;
      playerOneScore.innerText = `Player 1: ${this.score}`;
    },
    resetScore() {
      this.score = 0;
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
    },
    resetScore() {
      this.score = 0;
      playerTwoScore.innerText = `Player 2: ${this.score}`;
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
gameOver.classList.add('game-over')

// cat parts
const head = document.getElementById('head'); 
const leftEar = document.getElementById('left-ear');
const rightEar = document.getElementById('right-ear');
const leftEye = document.getElementById('left-eye');
const rightEye = document.getElementById('right-eye');
const nose = document.getElementById('nose');

const catParts = [head, leftEar, rightEar, leftEye, rightEye, nose];
let badPart;


// function to attach event listeners to all cat parts and a "woops" class to a random part 
function randomPart(){
  
  index = Math.floor(Math.random() * catParts.length);
  badPart = catParts[index]; 
  badPart.classList.add("woops");
  
  catParts.forEach((part) => {
    part.addEventListener('click', checkPart)
  });

  playersText.style.visibility = "visible";

  showPlayers();
}

// function to check if clicked part contains woops class
function checkPart(e){

  showPlayers();

  let selected = e.target;

  selected.removeEventListener('click', checkPart);
  selected.addEventListener('click', alreadyClicked);

  if (selected.classList.contains("woops")) {
    if (turn === 1) {
      players.one.lose();
      players.two.win();
      Swal.fire({
        title: '<h2>Stop mean to kitty, Player 1!</h2>',
        background: '#fff',
        imageUrl: '/img/stopmean.jpg',
        imageWidth: 400,
        imageHeight: 400,
        showConfirmButton: false,
        backdrop: true,
        timer: 1100,
        position: 'top-end'
      });
    } else {
      players.one.win();
      players.two.lose();
      Swal.fire({
        title: '<h2>Stop mean to kitty, Player 2!</h2>',
        background: '#fff',
        imageUrl: '/img/stopmean.jpg',
        imageWidth: 400,
        imageHeight: 400,
        showConfirmButton: false,
        backdrop: true,
        timer: 1100,
        position: 'top-end'
      });
    }

    if (players.one.score === winningScore) {
      Swal.fire({
        title: '<h2 style="color:#000">Player 1 won more rounds!</h2>',
        background: '#fff',
        imageUrl: '/img/scritch.gif',
        imageWidth: 220,
        imageHeight: 220,
        showConfirmButton: false,
        showCloseButton: true
      });
    } else if (players.two.score === winningScore) {
      Swal.fire({
        title: '<h2 style="color:#000">Player 2 won more rounds!</h2>',
        background: '#fff',
        imageUrl: '/img/scritch.gif',
        imageWidth: 220,
        imageHeight: 220,
        showConfirmButton: false,
        showCloseButton: true
      });
    }

    // remove players turn text
    playersText.style.visibility = "hidden";
    // display game over message
    displayGameOver();
    // remove event listeners
    catParts.forEach((part) => {
      part.removeEventListener('click', checkPart);
      part.removeEventListener('click', alreadyClicked);
    });
    // remove woops class from bad part
    selected.classList.remove("woops");
  }
}

// already clicked function
function alreadyClicked() {
  Swal.fire({
    title: 'Kitty wants to be petted somewhere else!',
    text: 'Click anywhere to continue',
    background: '#fff',
    backdrop: true,
    showConfirmButton: false
  });
}

// game over display
function displayGameOver() {
  if (players.one.score === winningScore || players.two.score === winningScore) {
    $('#reset-btn').show();
    document.getElementById('result').appendChild(gameOver);
  } else {
    document.getElementById('result').appendChild(gameOver);
    $('#replay-btn').show();
  }
}

// show players function
function showPlayers() {
  if (turn === 1) {
    players.one.message();
    turn = 2;
  } else {
    players.two.message();
    turn = 1;
  }

  $('#intro').hide();
  $('#score').show();
}

// replay function
function replayGame() {
  turn = 1;
  randomPart();
  $('#replay-btn').hide();
  document.getElementById('result').removeChild(gameOver);
}

// reset function
function resetGame() {
  $('#reset-btn').hide();
  $('#intro').show();
  $('#score').hide();
  players.one.resetScore();
  players.two.resetScore();
  turn = 1;
  document.getElementById('result').removeChild(gameOver);
}