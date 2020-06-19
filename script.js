// to add: animations, body, get random cat facts

// cat parts
const head = document.getElementById('head'); 
const leftEar = document.getElementById('left-ear');
const rightEar = document.getElementById('right-ear');
const leftEye = document.getElementById('left-eye');
const rightEye = document.getElementById('right-eye');
const nose = document.getElementById('nose');

// add event listeners
const catParts = [head, leftEar, rightEar, leftEye, rightEye, nose];

catParts.forEach((part) => {
  part.addEventListener('click', checkPart)
});

// keep track of whose turn it is
let turn = 0;

// function to attach woops class to a random part 
function randomPart(){
  index = Math.floor(Math.random() * catParts.length+1);
  badPart = catParts[index];
  badPart.classList.add("woops");

  console.log(document.body) // see where randomPart is
}

// function to check if clicked part contains woops class
function checkPart(e){
  let selected = e.target;
  if (selected.classList.contains("woops")) {
    console.log('game over')
    // display game over message
    displayGameOver();
    // remove event listeners
    catParts.forEach((part) => {
      part.removeEventListener('click', checkPart)
    });
  }
}

// game over display
const gameOver = document.createElement('div');
gameOver.innerText = `Game over! CHONK is A N G Y`
gameOver.classList.add('game-over')

function displayGameOver() {
  document.getElementById('result').appendChild(gameOver);
}