// to do: body, get random cat facts, UX. store player names. 

// store turn, winning score, names
let turn = 1;
let winningScore = 2; // to change this for different levels

// player objects
const players = {
  one: {
    score: 0,
    name: "",
    message() {
      playersText.innerText = `It's ${this.name}'s turn!`
    },
    win() {
      this.score++;
      playerOneScore.innerText = `${this.name}: ${this.score}`;
    },
    lose() {
      gameOver.innerText = `${this.name} made chonky A N G Y`;
      playerOneScore.innerText = `${this.name}: ${this.score}`;
    },
    resetScore() {
      this.score = 0;
      playerOneScore.innerText = `${this.name}: ${this.score}`;
    }
  },
  two: {
    score: 0,
    name: "",
    message() {
      playersText.innerText = `It's ${this.name}'s turn!`
    },
    win() {
      this.score++;
      playerTwoScore.innerText = `${this.name}: ${this.score}`
    },
    lose() {
      gameOver.innerText = `${this.name} made chonky A N G Y`;
      playerTwoScore.innerText = `${this.name}: ${this.score}`
    },
    resetScore() {
      this.score = 0;
      playerTwoScore.innerText = `${this.name}: ${this.score}`;
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
const leftMouth = document.getElementById('mouth-left');
const rightMouth = document.getElementById('mouth-right');

const catParts = [head, leftEar, rightEar, leftEye, rightEye, nose, leftMouth, rightMouth];
let badPart;

// information about cats functions
function babyInfo(){
  Swal.fire({
    title: 'baby kitty',
    text: 'So smol. Easily appeased. Just hit 3 points to win! 1 spot to watch out for.',
    imageUrl: '/img/baby.png',
    imageWidth: 220,
    imageHeight: 220,
    showConfirmButton: false,
    showCloseButton: true
  });
}

function cattoInfo(){
  Swal.fire({
    title: 'Catto',
    text: 'Slightly grompy. Reach 5 points to win himb over. 2 spots to watch out for.',
    imageUrl: '/img/catto.png',
    imageWidth: 220,
    imageHeight: 220,
    showConfirmButton: false,
    showCloseButton: true
  });
}

function chonkInfo(){
  Swal.fire({
    title: 'CHONK',
    text: 'He is LORGE. Player must hit 10 points to win. 3 spots to watch out for.',
    imageUrl: '/img/chonk.png',
    imageWidth: 220,
    imageHeight: 220,
    showConfirmButton: false,
    showCloseButton: true
  });
}

// load game function
function loadGame(){
  players.one.name = $('#p1-name').val();
  players.two.name = $('#p2-name').val();
  $('.start-screen').hide();
  $('.grid-container').css("display", "grid");
  $('#intro').show();
}

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
        title: 'Stop mean to kitty, Player 1!',
        background: '#fff',
        imageUrl: 'https://i.imgur.com/cLWmuzO.jpg',
        imageWidth: 300,
        imageHeight: 300,
        showConfirmButton: false,
        backdrop: true,
        timer: 1100,
        position: 'top-end'
      });
    } else {
      players.one.win();
      players.two.lose();
      Swal.fire({
        title: 'Stop mean to kitty, Player 2!',
        background: '#fff',
        imageUrl: 'https://i.imgur.com/cLWmuzO.jpg',
        imageWidth: 300,
        imageHeight: 300,
        showConfirmButton: false,
        backdrop: true,
        timer: 1100,
        position: 'top-end'
      });
    }

    if (players.one.score === winningScore) {
      Swal.fire({
        title: 'CHONK chooses Player 1!',
        background: '#fff',
        imageUrl: '/img/scritch.gif',
        imageWidth: 220,
        imageHeight: 220,
        showConfirmButton: false,
        showCloseButton: true
      });
    } else if (players.two.score === winningScore) {
      Swal.fire({
        title: 'CHONK chooses Player 2!',
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
    background: '#fff',
    timer: 800,
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

  playerOneScore.innerText = `${players.one.name}: ${players.one.score}`
  playerTwoScore.innerText = `${players.two.name}: ${players.two.score}`

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
  $('.start-screen').show();
  $('.grid-container').css("display", "none");
  $('#score').hide();
  players.one.resetScore();
  players.two.resetScore();
  turn = 1;
  document.getElementById('result').removeChild(gameOver);
}