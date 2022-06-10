const item = document.querySelector('.item');
const counter = document.querySelector('.counter');
const gameBtn = document.querySelector('.gameBtn');
const timer = document.querySelector('.timer');
const modal = document.querySelector('.modal');
const replayBtn = document.querySelector('.replayBtn');
let isStart = false;
 
let myinterval;
let timeCounter = 10;

gameBtn.addEventListener('click', () => {
  isStart = !isStart;

  if(isStart) {
    gameBtn.innerHTML = `<i class="fa-solid fa-stop"></i>`;
    timer.innerHTML = `0:${timeCounter}`;
    myinterval = setInterval(setTimer, 1000);
  } else {
    gameBtn.style.visibility = 'hidden';
    modal.style.display = 'inline';
    clearInterval(myinterval);
  }
})

replayBtn.addEventListener('click', () => {
  location.reload();
})



item.addEventListener('click', () => {
  setCounter();
})

function setCounter() {
  let carrotCounter = +counter.textContent;

  if (carrotCounter > 0) {
    counter.innerText = `${carrotCounter - 1}`
  }
}

function setTimer() {
  if (timeCounter >= 0) {
    timer.innerHTML = `0:${--timeCounter}`;
  } else {
    return;
  }
}