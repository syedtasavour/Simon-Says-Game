let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let highestScore = 0;
let btns = ["pink", "green", "yellow", "purple"];
let h2 = document.querySelector("h2");
let allBtns = document.querySelectorAll(".btn");

document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    levelUp();
  }
});
function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 300);
}
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 300);
}
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  btnFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    if (level > highestScore) {
      highestScore = level;
    }

    h2.innerHTML = `"Game Over! Your score was <b>${level}</b> and the highest score is <b>${highestScore}</b>.<br>Press any key to start."`;
    document.querySelector("body").style.backgroundColor = "red";

    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);
  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}
for (allBtn of allBtns) {
  allBtn.addEventListener("click", btnPress);
}
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
