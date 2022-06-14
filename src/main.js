'use strict';
import PopUp from './popup.js';

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 10;
const GAME_DURATION_TIME= 1000;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const bgSound = new Audio('./sound/bg.mp3');
const alertSound = new Audio('./sound/alert.wav');
const gameWinSound = new Audio('./sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListner(() => {
  startGame();
});

field.addEventListener('click', onFieldClick);

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
})

function startGame() {
  started = true;
  initGame();
  showStopBtn();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  gameFinishBanner.showWithText('REPLAY?');
  playSound(alertSound);
  stopSound(bgSound); 
}

function finishGame(win) {
  win ? playSound(gameWinSound) : playSound(bugSound);
  started = false;
  hideGameButton();
  gameFinishBanner.showWithText(win? 'YOU WON!' : 'YOU LOST');
  stopGameTimer();
  stopSound(bgSound);
}

function showStopBtn() {
  const icon = gameBtn.querySelector('.fa-solid');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function startGameTimer() {
  let remainingTime = GAME_DURATION_TIME;
  let remainingTimeSec = GAME_DURATION_SEC;

  let second = remainingTime / 100;
  let milliSec = remainingTime / remainingTimeSec;

  updateTimerText(--second, --milliSec);

  timer = setInterval(() => {
    if (second === 0 && milliSec === 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    } else if (milliSec === 0) {
      second--;
      milliSec = 99;
    }
    updateTimerText(second, --milliSec); 
  }, 10);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(second, milliSec) {
  const sec = String(second).padStart(2, '0');
  const milli = String(milliSec).padStart(2, '0');

  gameTimer.innerText = `${sec}:${milli}`;
}

function initGame() {
  score = 0;
  field.innerHTML = '';
  gameBtn.style.visibility = 'visible';
  gameScore.innerText = CARROT_COUNT;
  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');
}

function onFieldClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches('.carrot')) {
    target.remove();
    score++;
    updateScoreBoard();
    playSound(carrotSound);

    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches('.bug')) {
    playSound(bugSound);
    finishGame(false);
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
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
    item.style.cursor = 'pointer';

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
