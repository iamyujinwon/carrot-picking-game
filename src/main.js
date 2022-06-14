'use strict';
import PopUp from './popup.js';
import Field from './field.js';

const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const GAME_DURATION_SEC = 10;
const GAME_DURATION_TIME= 1000;

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

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

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListner(onItemClick);

function onItemClick(item) {
  if (!started) {
    return;
  }
  if (item === 'carrot') {
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (item === 'bug') {
    finishGame(false);
  }
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}

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

function initGame() {
  score = 0;
  gameBtn.style.visibility = 'visible';
  gameScore.innerText = CARROT_COUNT;
  gameField.initGame();
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

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}