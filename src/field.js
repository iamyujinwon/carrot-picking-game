'use strict';
import * as sound from './sound.js';

const CARROT_SIZE = 80;

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.onClick = this.onClick.bind(this);
    this.field.addEventListener('click', this.onClick);
  }

  initGame() {
    this.field.innerHTML = '';
    this._addItem('carrot', this.carrotCount, 'img/carrot.png');
    this._addItem('bug', this.bugCount, 'img/bug.png');
  }

  setClickListner(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _addItem(className, count, imgPath) {
    const startX = 0;
    const startY = 0;
    const endX = this.fieldRect.width - CARROT_SIZE;
    const endY = this.fieldRect.height - CARROT_SIZE;
  
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
      this.field.appendChild(item);
    }
  }
  
  onClick = event => {
    const target = event.target;
    if (target.matches('.carrot')) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick('carrot');
    } else if (target.matches('.bug')) {
      sound.playBug();
      this.onItemClick && this.onItemClick('bug');
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}