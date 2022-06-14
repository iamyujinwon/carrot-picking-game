'use strict';
import Field from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
  win: 'win', 
  lose: 'lose', 
  cancel: 'cancel',
});

export class GameBuilder {
  gameDuration(gameDuration) {
    this.gameDuration = gameDuration;
    return this;
  }

  carrotCount(carrotCount) {
    this.carrotCount = carrotCount;
    return this;
  }

  bugCount(bugCount) {
    this.bugCount = bugCount;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration,
      this.carrotCount,
      this.bugCount
    );
  }
}

class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameBtn = document.querySelector('.game__button');
    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.gameBtn.addEventListener('click', () => {
      if (this.started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      }
    })

    this.started = false;
    this.score = 0;
    this.timer = undefined;

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListner(this.onItemClick);
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopBtn();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }
  
  stop(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.stopBackground(); 
    this.onGameStop && this.onGameStop(reason);
  }

  onItemClick = item => {
    if (!this.started) {
      return;
    }
    if (item === 'carrot') {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotCount) {
        this.stop(Reason.win);
      }
    } else if (item === 'bug') {
      this.stop(Reason.lose);
    }
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.carrotCount - this.score;
  }
  
  initGame() {
    this.score = 0;
    this.gameBtn.style.visibility = 'visible';
    this.gameScore.innerText = this.carrotCount;
    this.gameField.initGame();
  }
  
  showStopBtn() {
    const icon = this.gameBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
  }
  
  hideGameButton() {
    this.gameBtn.style.visibility = 'hidden';
  }
  
  showTimerAndScore() {
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }
  
  startGameTimer() {
    let remainingTime = this.gameDuration;
  
    let second = remainingTime / 100;
    let milliSec = remainingTime / 10;
  
    this.updateTimerText(--second, --milliSec);
  
    this.timer = setInterval(() => {
      if (second === 0 && milliSec === 0) {
        clearInterval(this.timer);
        this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
        return;
      } else if (milliSec === 0) {
        second--;
        milliSec = 99;
      }
      this.updateTimerText(second, --milliSec); 
    }, 10);
  }
  
  stopGameTimer() {
    clearInterval(this.timer);
  }
  
  updateTimerText(second, milliSec) {
    const sec = String(second).padStart(2, '0');
    const milli = String(milliSec).padStart(2, '0');
  
    this.gameTimer.innerText = `${sec}:${milli}`;
  }
}