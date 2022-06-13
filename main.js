'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 10;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false;
let score = 0;
let timer = undefined;


gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
})

function startGame() {
  initGame();
  showStopBtn();
  showTimerAndScore();
  startGameTimer();
}

function stopGame() {
 
}

function showStopBtn() {
  const icon = gameBtn.querySelector('.fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {

}

function showPopup() {

}

function initGame() {
  field.innerHTML = '';
  gameScore.innerText = CARROT_COUNT;
  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');
}

function addItem(className, count, imgPath) {
  const startX = 0;
  const startY = 0;
  const endX = fieldRect.width - CARROT_SIZE;
  const endY = fieldRect.height - CARROT_SIZE;

  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(startX, endX);
    const y = randomNumber(startY, endY);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}





// const items = document.querySelectorAll('.item');
// const bugs = document.querySelectorAll('.bug');
// const counter = document.querySelector('.counter');
// const gameBtn = document.querySelector('.gameBtn');
// const timer = document.querySelector('.timer');
// const modal = document.querySelector('.modal');
// const replayBtn = document.querySelector('.replayBtn');
// let isStart = false;
 
// let myinterval;
// let timeCounter = 10;

// const getRandom = (min, max) => Math.floor(Math.random()*(max-min+1)+min);

// gameBtn.addEventListener('click', () => {
//   isStart = !isStart;

//   if(isStart) {
//     gameBtn.innerHTML = `<i class="fa-solid fa-stop"></i>`;
//     timer.innerHTML = `0:${timeCounter}`;
//     myinterval = setInterval(setTimer, 1000);


//     for (i = 0; i < items.length; i++) {
//       items[i].style.left= getRandom(0, 1000)+'px'; 
//       items[i].style.top = getRandom(0, 800)+'px'; 
//     }

//     for (i = 0; i < bugs.length; i++) {
//       bugs[i].style.left= getRandom(0, 1000)+'px'; 
//       bugs[i].style.top = getRandom(0, 800)+'px'; 
//     }

//   } else {
//     gameBtn.style.visibility = 'hidden';
//     modal.style.display = 'inline';
//     clearInterval(myinterval);
//   }
// })

// replayBtn.addEventListener('click', () => {
//   location.reload();
// })



// for (i = 0; i < items.length; i++) {
//   items[i].addEventListener('click', () => {
//     setCounter();
//   })
// }

// function setCounter() {
//   let carrotCounter = +counter.textContent;

//   if (carrotCounter > 0) {
//     counter.innerText = `${carrotCounter - 1}`
//   }
// }

// function setTimer() {
//   if (timeCounter >= 0) {
//     timer.innerHTML = `0:${--timeCounter}`;
//   } else {
//     return;
//   }
// }