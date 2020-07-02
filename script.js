// store turn, winning score
let turn = 1;
let winningScore; // to change this for different levels

// PLAYER OBJECT
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
const kittyDiv = document.getElementById('kitty'); // used for debugging
const playersText = document.getElementById('players');
const introText = document.getElementById('intro');
const replayBtn = document.getElementById('replay-btn');

const scoreBox = document.getElementById('score');
const playerOneScore = document.getElementById('p1-score');
const playerTwoScore = document.getElementById('p2-score');

const gameOver = document.createElement('div');
gameOver.classList.add('game-over')

const scoreToWin = document.createElement('p');
scoreToWin.classList.add('winning-score');
scoreBox.appendChild(scoreToWin);

const meow = new Audio('./audio/meow.mp3');
const yowl = new Audio('./audio/yowl.mp3');
const victory = new Audio('./audio/victory.mp3');

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

// visual feedback for each click
catParts.forEach((part) => {
  part.classList.add('cat-part')
})

$(".cat-part").click(function() {
  doBounce($('#kitty'), 3, '7px', 100);   
  doBounce($('#players'), 3, '7px', 100);   
});

function doBounce(element, times, distance, speed) {
  for(i = 0; i < times; i++) {
      element.animate({marginTop: '-='+distance},speed)
          .animate({marginTop: '+='+distance},speed);
  }        
}

// click title to reload page
$('.title').click(function() {
  location.reload();
});

// select all text in input box
$("input[type='text']").on("click", function () {
  $(this).select();
});

// function to show information about cats
$('.cat-thumbnail').click(function(e) {catInfo(e)})

function catInfo(e){
  if (e.target.id === "baby") {
    Swal.fire({
      title: 'baby kitty',
      text: 'So smol. Easily appeased. Just hit 3 points to win! 1 spot to watch out for.',
      imageUrl: './img/baby.png',
      imageWidth: 220,
      showConfirmButton: false,
      showCloseButton: true
    });
  } else if (e.target.id === "catto") {
    Swal.fire({
      title: 'Catto',
      text: 'Slightly grompy. Reach 5 points to win himb over. 2 spots to watch out for.',
      imageUrl: './img/catto.png',
      imageWidth: 220,
      showConfirmButton: false,
      showCloseButton: true
    });
  } else if (e.target.id === "chonk") {
    Swal.fire({
      title: 'CHONK',
      text: 'He is LORGE. Player must hit 10 points to win. 3 spots to watch out for.',
      imageUrl: './img/chonk.png',
      imageWidth: 220,
      showConfirmButton: false,
      showCloseButton: true
    });
  }
}

// change cat colour function
function greyCat() {
  $('#left-ear').css("border-bottom", "120px solid #d8d8d8");
  $('#right-ear').css("border-bottom", "120px solid #d8d8d8");
  $('#head').css("background-color", "#d8d8d8");
  $('#left-eye').css("border-color", "white");
  $('#right-eye').css("border-color", "white");
  $('#nose').css("background-color", "#dea4d0");
}

function blackCat() {
  $('#left-ear').css("border-bottom", "120px solid black");
  $('#right-ear').css("border-bottom", "120px solid black");
  $('#head').css("background-color", "black");
  $('#left-eye').css("border-color", "rgb(5, 114, 5)");
  $('#right-eye').css("border-color", "rgb(5, 114, 5)");
  $('#nose').css("background-color", "#c05a8a");
}

function orangeCat() {
  $('#left-ear').css("border-bottom", "120px solid #dda861");
  $('#right-ear').css("border-bottom", "120px solid #dda861");
  $('#left-eye').css("border-color", "white");
  $('#right-eye').css("border-color", "white");
  $('#head').css("background-color", "#dda861");
  $('#nose').css("background-color", "#323333");
}

// load game function
function loadGame(){
  players.one.name = $('#p1-name').val();
  players.two.name = $('#p2-name').val();
  $('.start-screen').hide();
  $('.grid-container').css("display", "grid");

  // set difficulty level
  if ($('select').val() === "baby kitty"){
    randomPart(1);
    greyCat();
    winningScore = 3;
  } else if ($('select').val() === "catto"){
    randomPart(2);
    blackCat();
    winningScore = 5;
  } else if ($('select').val() === "chonk"){
    randomPart(3);
    orangeCat();
    winningScore = 10;
  }
  // display the players turn text
  showPlayers();
  scoreToWin.innerText = `Score to win: ${winningScore}`
}

// function to attach event listeners to all cat parts and a "woops" class to a random part 
function randomPart(num){
  let numbers = [0, 1, 2, 3, 4, 5, 6, 7];
  let index = Math.floor(Math.random() * numbers.length);
  let numOne = numbers[index];
  numbers.splice(numbers.indexOf(numOne), 1);

  let indexTwo = Math.floor(Math.random() * numbers.length);
  let numTwo = numbers[indexTwo];
  numbers.splice(numbers.indexOf(numTwo), 1);

  let indexThree = Math.floor(Math.random() * numbers.length);
  let numThree = numbers[indexThree];
  numbers.splice(numbers.indexOf(numThree), 1);
  
  switch(num) {
    case 1:
      catParts[numOne].classList.add("woops");
      break;
    case 2:
      catParts[numOne].classList.add("woops");
      catParts[numTwo].classList.add("woops");
      break;
    case 3:
      catParts[numOne].classList.add("woops");
      catParts[numTwo].classList.add("woops");
      catParts[numThree].classList.add("woops");
      break;
    default:
      catParts[numOne].classList.add("woops");
  }
  
  catParts.forEach((part) => {
    part.addEventListener('click', checkPart)
  });
}

// function to check if clicked part contains woops class
function checkPart(e){
  showPlayers();

  let selected = e.target;

  if (!selected.classList.contains("woops")) {
    meow.play();
    }
  
  selected.removeEventListener('click', checkPart);
  selected.addEventListener('click', alreadyClicked);

  if (selected.classList.contains("woops")) {
    if (turn === 1) {
      yowl.play();
      players.one.lose();
      players.two.win();
      Swal.fire({
        title: `stop mean to kitty, ${players.one.name}!`,
        background: '#fff',
        imageUrl: './img/stopmean.jpg',
        imageWidth: 300,
        imageHeight: 300,
        showConfirmButton: false,
        backdrop: true,
        timer: 1300,
      });

      $('#top-message').css("visibility", "hidden");

    } else {
      yowl.play();
      players.one.win();
      players.two.lose();
      Swal.fire({
        title: `stop mean to kitty, ${players.two.name}!`,
        background: '#fff',
        imageUrl: './img/stopmean.jpg',
        imageWidth: 300,
        imageHeight: 300,
        showConfirmButton: false,
        backdrop: true,
        timer: 1300,
      });

      $('#top-message').css("visibility", "hidden");

    }

    if (players.one.score === winningScore) {
      victory.play();
      Swal.fire({
        title: `😻 ${$('select').val()} loves ${players.one.name} 💖`,
        background: '#fff',
        imageUrl: './img/roller.png',
        imageWidth: 220,
        imageHeight: 220,
        showConfirmButton: false,
        showCloseButton: true
      });
    } else if (players.two.score === winningScore) {
      victory.play();
      Swal.fire({
        title: `😻 ${$('select').val()} loves ${players.two.name} 💖`,
        background: '#fff',
        imageUrl: './img/roller.png',
        imageWidth: 220,
        imageHeight: 220,
        showConfirmButton: false,
        showCloseButton: true
      });
    }

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
    showConfirmButton: false,
    showCloseButton: true
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

// function to show whose turn it is and player scores 
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

  $('#top-message').show();
  $('#players').show();
  $('#score').show();
  $('#top-message').css("visibility", "visible");
}

// replay function
function replayGame() {
  catParts.forEach((part) => {
    part.classList.remove('woops')
  })

  turn = 1;

  if ($('select').val() === "baby kitty"){
    randomPart(1);
  } else if ($('select').val() === "catto"){
    randomPart(2);
  } else if ($('select').val() === "chonk"){
    randomPart(3);
  }

  $('#replay-btn').hide();
  $('#top-message').show();
  $('#top-message').css("visibility", "visible");

  showPlayers();
  document.getElementById('result').removeChild(gameOver);
}

// reset function
function resetGame() {
  catParts.forEach((part) => {
    part.classList.remove('woops')
  })

  $('#reset-btn').hide();
  $('.start-screen').show();
  $('.grid-container').css("display", "none");
  $('#score').hide();
  players.one.resetScore();
  players.two.resetScore();
  turn = 1;
  document.getElementById('result').removeChild(gameOver);
}