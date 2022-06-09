const item = document.querySelector('.item');
const counter = document.querySelector('.counter');
const gameBtn = document.querySelector('.gameBtn');
let isStart = false;
 
// const myinterval = setInterval(setTimer, 1000);
let timeCounter = 10;


gameBtn.addEventListener('click', () => {
  isStart = !isStart;
  console.log(isStart);

  // const myinterval = setInterval(setTimer, 1000);

  if(isStart) {
    gameBtn.innerHTML = `<i class="fa-solid fa-stop"></i>`;
    clearInterval(myinterval);
  } else {
    gameBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
  }

  // setTimer();
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
  // let timeCounter = 10;
  const timer = document.querySelector('.timer');

  // timer.innerText = `0:${timeCounter}`;

  // let interval = setInterval(function () {
  //   timeCounter--;
  //   if (timeCounter < 0 || isStart === false) {
  //     clearInterval(interval);
  //     return;
  //   }
  //   timer.innerText = `0:${timeCounter}`;
  // }, 1000);


  timer.innerHTML = `0:${timeCounter--}`;
  console.log("hello");
}